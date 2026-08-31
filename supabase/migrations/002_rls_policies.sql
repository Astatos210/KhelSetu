-- ==============================================================================
-- KhelSetu: Row-Level Security (RLS) Policies
-- Migration 002: Security & Role Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
    SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. Profiles Policies
-- Anyone can view public profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (is_public = true OR auth.uid() = user_id OR public.get_current_user_role() = 'ADMIN');

-- Users can insert their own profile
CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update only their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Organizations Policies
CREATE POLICY "Organizations are viewable by everyone" 
ON public.organizations FOR SELECT 
USING (true);

CREATE POLICY "Organizers and Admins can create organizations" 
ON public.organizations FOR INSERT 
WITH CHECK (public.get_current_user_role() IN ('ORGANIZER', 'ADMIN'));

-- 3. Events Policies
-- Anyone can view approved or open events
CREATE POLICY "Public events are viewable by everyone" 
ON public.events FOR SELECT 
USING (status IN ('APPROVED', 'OPEN', 'COMPLETED') OR organizer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR public.get_current_user_role() IN ('VERIFIER', 'ADMIN'));

CREATE POLICY "Organizers can create events" 
ON public.events FOR INSERT 
WITH CHECK (public.get_current_user_role() IN ('ORGANIZER', 'ADMIN'));

CREATE POLICY "Organizers can update their own events" 
ON public.events FOR UPDATE 
USING (organizer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR public.get_current_user_role() = 'ADMIN');

-- 4. Registrations Policies
CREATE POLICY "Athletes can view their registrations, organizers can view their event registrations" 
ON public.registrations FOR SELECT 
USING (
    athlete_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) 
    OR event_id IN (SELECT id FROM public.events WHERE organizer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    OR public.get_current_user_role() IN ('VERIFIER', 'ADMIN')
);

CREATE POLICY "Athletes can register themselves" 
ON public.registrations FOR INSERT 
WITH CHECK (athlete_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Organizers can update attendance/check-in" 
ON public.registrations FOR UPDATE 
USING (event_id IN (SELECT id FROM public.events WHERE organizer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- 5. Results Policies
CREATE POLICY "Results are viewable by participants, organizers, verifiers, and scouts" 
ON public.results FOR SELECT 
USING (
    status = 'VERIFIED'
    OR athlete_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR submitted_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR public.get_current_user_role() IN ('VERIFIER', 'ADMIN')
);

-- Organizers submit results, but status MUST be PENDING_VERIFICATION (cannot mark VERIFIED)
CREATE POLICY "Organizers can submit results" 
ON public.results FOR INSERT 
WITH CHECK (
    public.get_current_user_role() = 'ORGANIZER' 
    AND status = 'PENDING_VERIFICATION'
);

-- Verifiers and Admins can update result verification status
CREATE POLICY "Verifiers can update result status" 
ON public.results FOR UPDATE 
USING (public.get_current_user_role() IN ('VERIFIER', 'ADMIN'));

-- 6. Verification Actions Policies
CREATE POLICY "Verification actions are viewable by authorized roles" 
ON public.verification_actions FOR SELECT 
USING (public.get_current_user_role() IN ('ORGANIZER', 'VERIFIER', 'ADMIN'));

CREATE POLICY "Verifiers can insert verification actions" 
ON public.verification_actions FOR INSERT 
WITH CHECK (public.get_current_user_role() IN ('VERIFIER', 'ADMIN'));

-- 7. Achievements Policies
-- Achievements are public for QR verification
CREATE POLICY "Achievements are publicly readable" 
ON public.achievements FOR SELECT 
USING (true);

CREATE POLICY "Verifiers and Admins can issue achievements" 
ON public.achievements FOR INSERT 
WITH CHECK (public.get_current_user_role() IN ('VERIFIER', 'ADMIN'));

-- 8. Movement Assessments Policies
CREATE POLICY "Movement assessments are viewable by owner and public scouts" 
ON public.movement_assessments FOR SELECT 
USING (
    athlete_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    OR (athlete_id IN (SELECT id FROM public.profiles WHERE is_public = true) AND public.get_current_user_role() IN ('SCOUT', 'VERIFIER', 'ADMIN'))
);

CREATE POLICY "Athletes can create their movement assessment" 
ON public.movement_assessments FOR INSERT 
WITH CHECK (athlete_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- 9. Audit Logs Policies
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs FOR SELECT 
USING (public.get_current_user_role() = 'ADMIN');

CREATE POLICY "System and authenticated users can write audit logs" 
ON public.audit_logs FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
