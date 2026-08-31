-- ==============================================================================
-- KhelSetu: Grassroots Sports Platform Schema
-- Migration 001: Initial Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('ATHLETE', 'ORGANIZER', 'VERIFIER', 'SCOUT', 'ADMIN')),
    full_name TEXT NOT NULL,
    profile_photo_url TEXT,
    age_group TEXT, -- e.g., 'U-17', 'U-19', 'Senior', 'Open'
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    institution TEXT,
    academy TEXT,
    sport TEXT NOT NULL DEFAULT 'Badminton',
    position TEXT, -- e.g., 'Singles Specialist', 'Doubles / Mixed'
    bio TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    organization_type TEXT NOT NULL, -- e.g., 'Club', 'Academy', 'District Association', 'College'
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    sport TEXT NOT NULL DEFAULT 'Badminton',
    category TEXT NOT NULL, -- e.g., 'Men Singles', 'Women Singles', 'U-19 Mixed Doubles'
    event_level TEXT NOT NULL, -- e.g., 'District', 'Inter-College', 'State Open', 'Grassroots Academy'
    description TEXT,
    venue TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE NOT NULL,
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    verifier_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'APPROVED', 'OPEN', 'COMPLETED', 'ARCHIVED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    athlete_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    registration_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'WAITLIST')),
    checked_in BOOLEAN DEFAULT false,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (event_id, athlete_id)
);

-- 5. Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    athlete_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    position INTEGER NOT NULL, -- 1 = Winner, 2 = Runner-up, 3 = 3rd place, 4 = Semi-finalist
    score TEXT, -- e.g. "21-18, 19-21, 21-16"
    performance_value NUMERIC, -- optional numerical metric
    evidence_file_url TEXT, -- Scorecard image / PDF / official match sheet
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION' CHECK (status IN ('PENDING_VERIFICATION', 'VERIFIED', 'REJECTED', 'CORRECTION_REQUIRED', 'REVOKED')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Verification Actions Table
CREATE TABLE IF NOT EXISTS public.verification_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
    verifier_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL CHECK (action IN ('APPROVED', 'REJECTED', 'CORRECTION_REQUESTED', 'REVOKED')),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    athlete_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    result_id UUID REFERENCES public.results(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    event_name TEXT NOT NULL,
    position INTEGER NOT NULL,
    event_level TEXT NOT NULL,
    issuer_name TEXT NOT NULL,
    credential_id TEXT NOT NULL UNIQUE, -- e.g. "KS-PUN-2026-0814"
    qr_verification_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE
);

-- 8. Movement Assessments Table (AI Evidence)
CREATE TABLE IF NOT EXISTS public.movement_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    athlete_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    video_url TEXT,
    exercise_type TEXT NOT NULL DEFAULT 'squat',
    repetitions INTEGER,
    pose_confidence NUMERIC,
    movement_range TEXT,
    video_quality TEXT,
    feedback TEXT,
    status TEXT NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_type TEXT NOT NULL, -- e.g. 'EVENT', 'RESULT', 'ACHIEVEMENT', 'ORGANIZATION'
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- e.g. 'RESULT_SUBMITTED', 'RESULT_VERIFIED', 'RESULT_REJECTED'
    performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_sport ON public.profiles(sport);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_district ON public.events(district);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_athlete ON public.registrations(athlete_id);
CREATE INDEX IF NOT EXISTS idx_results_event ON public.results(event_id);
CREATE INDEX IF NOT EXISTS idx_results_status ON public.results(status);
CREATE INDEX IF NOT EXISTS idx_achievements_athlete ON public.achievements(athlete_id);
CREATE INDEX IF NOT EXISTS idx_achievements_credential ON public.achievements(credential_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record ON public.audit_logs(record_type, record_id);
