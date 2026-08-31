# KhelSetu Supabase Setup & Architecture Guide

This directory contains the database schema, Row-Level Security (RLS) policies, and seed data for the **KhelSetu** Grassroots Sports Platform.

## Database Migrations

1. **`001_initial_schema.sql`**:
   - `profiles`: Athletes, Organizers, Verifiers, Scouts, Admins
   - `organizations`: Verified sports clubs, academies, collegiate bodies
   - `events`: Grassroots competitions with verification statuses
   - `registrations`: Athlete-event check-ins & status
   - `results`: Positions, scores, and official match scorecards/evidence
   - `verification_actions`: Independent verification audit trails
   - `achievements`: Verified digital certificates with unique `credential_id` & QR verification links
   - `movement_assessments`: AI squat analysis output, repetition counts, and posture confidence
   - `audit_logs`: Immutable tracking of all result and credential mutations

2. **`002_rls_policies.sql`**:
   - Granular Row-Level Security enforcing role boundaries.
   - Organizers can submit results, but can **never** mark them `VERIFIED`.
   - Only assigned `VERIFIER` or `ADMIN` roles can approve results and issue achievements.
   - Scouts can only view public profiles and verified achievements without accessing private contact details.

3. **`003_seed_data.sql`**:
   - 10+ realistic badminton athletes (Aarav Joshi, Riya Patil, Kabir Shah, Ananya Deshmukh, Sneha Kulkarni, etc.)
   - 5+ badminton tournaments (Pune District Open, Inter-College Championship, Rising Stars Tournament)
   - 15+ registrations, 8 results (verified, pending, rejected, correction requested), achievements, and audit logs.

## Setting Up with Supabase

1. Create a new project in [Supabase](https://app.supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run `001_initial_schema.sql`, `002_rls_policies.sql`, and `003_seed_data.sql` in order.
4. Copy your project URL and anon public key into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. If running without Supabase credentials, KhelSetu automatically operates in **Demo Mode**, keeping full reactive state locally for an uninterrupted hackathon presentation.
