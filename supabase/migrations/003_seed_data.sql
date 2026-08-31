-- ==============================================================================
-- KhelSetu: Demo Seed Data
-- Migration 003: Realistic Fictional Grassroots Badminton Seed Data
-- ==============================================================================

-- 1. Profiles (Demo users + Athletes + Officials)
INSERT INTO public.profiles (id, user_id, role, full_name, profile_photo_url, age_group, gender, district, state, institution, academy, sport, position, bio, is_public)
VALUES
-- Demo Primary Accounts
('a1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'ATHLETE', 'Aarav Joshi', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80', 'U-19', 'Male', 'Pune', 'Maharashtra', 'Fergusson College', 'Shivaji Nagar Badminton Club', 'Badminton', 'Men Singles Specialist', 'Grassroots district-level badminton player aiming for state championship trials. 5 years competitive training.', true),
('a2000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'ORGANIZER', 'Vikram Malhotra', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80', 'Senior', 'Male', 'Pune', 'Maharashtra', 'Pune District Sports Academy', 'PDSA Badminton Wing', 'Badminton', 'Tournament Director', 'Organizing grassroots district and collegiate tournaments since 2018 under Maharashtra Sports guidelines.', true),
('a3000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'VERIFIER', 'Dr. Sunita Rao', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop&q=80', 'Senior', 'Female', 'Pune', 'Maharashtra', 'Maharashtra College Sports Council', 'State Badminton Referees Board', 'Badminton', 'Chief Verifier & Technical Official', 'Certified National Grade-A Badminton Technical Official and Grassroots Verification Officer.', true),
('a4000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'SCOUT', 'Rajesh Kadam', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80', 'Senior', 'Male', 'Mumbai', 'Maharashtra', 'Western Zone Talent Scouting Network', 'Apex Sports Foundation', 'Badminton', 'Head Talent Scout', 'Identifying junior badminton prospects across Western India for regional academy scholarships.', true),
('a5000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'ADMIN', 'KhelSetu Admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80', 'Senior', 'Other', 'Pune', 'Maharashtra', 'KhelSetu Foundation', 'National Grassroots Cell', 'Badminton', 'Platform Administrator', 'Managing platform governance, organization approvals, and audit trails.', true),

-- Additional Seed Athletes (Total 10+ Athletes)
('b1000000-0000-0000-0000-000000000001', gen_random_uuid(), 'ATHLETE', 'Riya Patil', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80', 'U-17', 'Female', 'Pune', 'Maharashtra', 'Symbiosis Sports Centre', 'Rising Stars Badminton Academy', 'Badminton', 'Women Singles', 'U-17 District finalist with aggressive baseline attacking style and agile net play.', true),
('b2000000-0000-0000-0000-000000000002', gen_random_uuid(), 'ATHLETE', 'Kabir Shah', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80', 'U-19', 'Male', 'Nagpur', 'Maharashtra', 'Nagpur University Sports Cell', 'Vidarbha Shuttle Club', 'Badminton', 'Men Singles & Doubles', 'Inter-College champion known for high smash velocity and steady defense.', true),
('b3000000-0000-0000-0000-000000000003', gen_random_uuid(), 'ATHLETE', 'Ananya Deshmukh', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&fit=crop&q=80', 'U-17', 'Female', 'Nashik', 'Maharashtra', 'KTHM College', 'Godavari Badminton Hub', 'Badminton', 'Women Singles', 'District gold medalist in U-17 singles; rigorous stamina training.', true),
('b4000000-0000-0000-0000-000000000004', gen_random_uuid(), 'ATHLETE', 'Sneha Kulkarni', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&fit=crop&q=80', 'U-19', 'Female', 'Pune', 'Maharashtra', 'Modern College', 'Shivaji Nagar Badminton Club', 'Badminton', 'Mixed Doubles Specialist', 'Strategic doubles player with quick reflexes and deceptive cross-court drops.', true),
('b5000000-0000-0000-0000-000000000005', gen_random_uuid(), 'ATHLETE', 'Rohan Mehta', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop&q=80', 'U-19', 'Male', 'Mumbai', 'Maharashtra', 'Ruia College', 'Bandra Badminton Gymkhana', 'Badminton', 'Men Singles', 'Fast-paced attacking player with state ranking tournament quarterfinal finishes.', true),
('b6000000-0000-0000-0000-000000000006', gen_random_uuid(), 'ATHLETE', 'Tanvi Shinde', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80', 'U-17', 'Female', 'Kolhapur', 'Maharashtra', 'Vivekanand College', 'Mahalaxmi Badminton Centre', 'Badminton', 'Women Singles', 'Endurance player with patient rally building and steep drop shots.', true),
('b7000000-0000-0000-0000-000000000007', gen_random_uuid(), 'ATHLETE', 'Arjun Rao', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&fit=crop&q=80', 'Senior', 'Male', 'Pune', 'Maharashtra', 'COEP Tech University', 'Deccan Gymkhana Badminton', 'Badminton', 'Men Doubles', 'University doubles team captain with exceptional court coverage.', true),
('b8000000-0000-0000-0000-000000000008', gen_random_uuid(), 'ATHLETE', 'Pooja Nair', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&fit=crop&q=80', 'U-19', 'Female', 'Thane', 'Maharashtra', 'Kelkar College', 'Thane Badminton Academy', 'Badminton', 'Women Singles', 'Consistent top-4 finisher at district school games.', true),
('b9000000-0000-0000-0000-000000000009', gen_random_uuid(), 'ATHLETE', 'Vikram Deshpande', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&fit=crop&q=80', 'U-17', 'Male', 'Satara', 'Maharashtra', 'Chhatrapati Shahu Academy', 'Satara District Sports Complex', 'Badminton', 'Men Singles', 'Emerging rural talent with great vertical leap and power smashes.', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Organizations
INSERT INTO public.organizations (id, name, organization_type, district, state, contact_email, verification_status, created_by)
VALUES
('o1000000-0000-0000-0000-000000000001', 'Pune District Sports Academy', 'District Association', 'Pune', 'Maharashtra', 'contact@punesports.org', 'VERIFIED', 'a2000000-0000-0000-0000-000000000002'),
('o2000000-0000-0000-0000-000000000002', 'Maharashtra College Sports Council', 'College Board', 'Mumbai', 'Maharashtra', 'info@mcsc-sports.in', 'VERIFIED', 'a2000000-0000-0000-0000-000000000002'),
('o3000000-0000-0000-0000-000000000003', 'Shivaji Nagar Badminton Club', 'Club', 'Pune', 'Maharashtra', 'shuttle@snbc-pune.in', 'VERIFIED', 'a2000000-0000-0000-0000-000000000002'),
('o4000000-0000-0000-0000-000000000004', 'Vidarbha Grassroots Sports Guild', 'Academy', 'Nagpur', 'Maharashtra', 'guild@vidarbhasports.org', 'PENDING', 'a2000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- 3. Events (5+ Events)
INSERT INTO public.events (id, title, sport, category, event_level, description, venue, district, state, start_date, end_date, registration_deadline, organizer_id, verifier_id, status)
VALUES
('e1000000-0000-0000-0000-000000000001', 'Pune District Badminton Open 2026', 'Badminton', 'Men & Women Singles U-19', 'District', 'Official grassroots ranking tournament organized by Pune District Sports Academy. Verified certificate for all podium finishers.', 'Balewadi Sports Complex, Court 3-6', 'Pune', 'Maharashtra', '2026-09-15', '2026-09-17', '2026-09-10', 'a2000000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'OPEN'),
('e2000000-0000-0000-0000-000000000002', 'Inter-College Badminton Championship 2026', 'Badminton', 'College Open Mixed & Singles', 'Inter-College', 'Annual inter-collegiate tournament featuring top 32 collegiate athletes in Maharashtra.', 'Fergusson College Indoor Stadium', 'Pune', 'Maharashtra', '2026-09-22', '2026-09-24', '2026-09-18', 'a2000000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'APPROVED'),
('e3000000-0000-0000-0000-000000000003', 'Rising Stars Academy Tournament - Winter Series', 'Badminton', 'Junior U-17 Singles', 'Grassroots Academy', 'Talent identification tournament designed to give junior grassroots shuttlers competitive match exposure.', 'Shivaji Nagar Club Courts', 'Pune', 'Maharashtra', '2026-08-10', '2026-08-12', '2026-08-05', 'a2000000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'COMPLETED'),
('e4000000-0000-0000-0000-000000000004', 'Maharashtra Grassroots Shuttle Fest', 'Badminton', 'Open Category Doubles', 'State Open', 'Statewide invitational gathering for top regional club pairings.', 'Andheri Sports Complex', 'Mumbai', 'Maharashtra', '2026-10-05', '2026-10-07', '2026-09-28', 'a2000000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'OPEN'),
('e5000000-0000-0000-0000-000000000005', 'Deccan Junior Badminton Cup', 'Badminton', 'Boys U-17 Singles', 'District', 'Introductory tournament for developing players under 17 in Western Maharashtra.', 'Deccan Gymkhana Courts', 'Pune', 'Maharashtra', '2026-10-15', '2026-10-16', '2026-10-08', 'a2000000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'DRAFT')
ON CONFLICT (id) DO NOTHING;

-- 4. Registrations (15+ Registrations)
INSERT INTO public.registrations (id, event_id, athlete_id, registration_number, status, checked_in, registered_at)
VALUES
('r1000000-0000-0000-0000-000000000001', 'e3000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'KS-REG-2026-001', 'CONFIRMED', true, '2026-08-01 10:00:00Z'),
('r2000000-0000-0000-0000-000000000002', 'e3000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'KS-REG-2026-002', 'CONFIRMED', true, '2026-08-01 11:30:00Z'),
('r3000000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 'KS-REG-2026-003', 'CONFIRMED', true, '2026-08-02 09:15:00Z'),
('r4000000-0000-0000-0000-000000000004', 'e3000000-0000-0000-0000-000000000003', 'b3000000-0000-0000-0000-000000000003', 'KS-REG-2026-004', 'CONFIRMED', true, '2026-08-02 14:00:00Z'),
('r5000000-0000-0000-0000-000000000005', 'e3000000-0000-0000-0000-000000000003', 'b4000000-0000-0000-0000-000000000004', 'KS-REG-2026-005', 'CONFIRMED', true, '2026-08-03 16:20:00Z'),

('r6000000-0000-0000-0000-000000000006', 'e1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'KS-REG-2026-006', 'CONFIRMED', false, '2026-08-25 10:00:00Z'),
('r7000000-0000-0000-0000-000000000007', 'e1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', 'KS-REG-2026-007', 'CONFIRMED', false, '2026-08-25 11:00:00Z'),
('r8000000-0000-0000-0000-000000000008', 'e1000000-0000-0000-0000-000000000001', 'b5000000-0000-0000-0000-000000000005', 'KS-REG-2026-008', 'CONFIRMED', false, '2026-08-26 12:30:00Z'),
('r9000000-0000-0000-0000-000000000009', 'e1000000-0000-0000-0000-000000000001', 'b6000000-0000-0000-0000-000000000006', 'KS-REG-2026-009', 'CONFIRMED', false, '2026-08-26 14:10:00Z'),
('r1000000-0000-0000-0000-000000000010', 'e1000000-0000-0000-0000-000000000001', 'b9000000-0000-0000-0000-000000000009', 'KS-REG-2026-010', 'CONFIRMED', false, '2026-08-27 09:45:00Z'),

('r1100000-0000-0000-0000-000000000011', 'e2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'KS-REG-2026-011', 'CONFIRMED', false, '2026-08-28 10:15:00Z'),
('r1200000-0000-0000-0000-000000000012', 'e2000000-0000-0000-0000-000000000002', 'b2000000-0000-0000-0000-000000000002', 'KS-REG-2026-012', 'CONFIRMED', false, '2026-08-28 11:20:00Z'),
('r1300000-0000-0000-0000-000000000013', 'e2000000-0000-0000-0000-000000000002', 'b7000000-0000-0000-0000-000000000007', 'KS-REG-2026-013', 'CONFIRMED', false, '2026-08-28 15:40:00Z'),
('r1400000-0000-0000-0000-000000000014', 'e4000000-0000-0000-0000-000000000004', 'b4000000-0000-0000-0000-000000000004', 'KS-REG-2026-014', 'CONFIRMED', false, '2026-08-29 08:30:00Z'),
('r1500000-0000-0000-0000-000000000015', 'e4000000-0000-0000-0000-000000000004', 'b8000000-0000-0000-0000-000000000008', 'KS-REG-2026-015', 'CONFIRMED', false, '2026-08-29 13:50:00Z')
ON CONFLICT (id) DO NOTHING;

-- 5. Results (Verified + Pending Verification + Rejected/Correction Required)
INSERT INTO public.results (id, event_id, athlete_id, position, score, performance_value, evidence_file_url, submitted_by, status, submitted_at)
VALUES
-- Verified historical results
('res10000-0000-0000-0000-000000000001', 'e3000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 1, '21-18, 19-21, 21-16', 8.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'VERIFIED', '2026-08-12 18:00:00Z'),
('res20000-0000-0000-0000-000000000002', 'e3000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 2, '18-21, 21-19, 16-21', 5.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'VERIFIED', '2026-08-12 18:10:00Z'),
('res30000-0000-0000-0000-000000000003', 'e3000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 3, '21-14, 21-12', 3.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'VERIFIED', '2026-08-12 18:15:00Z'),

-- 5+ Pending Results for verifier demo queue
('res40000-0000-0000-0000-000000000004', 'e3000000-0000-0000-0000-000000000003', 'b3000000-0000-0000-0000-000000000003', 4, '15-21, 18-21', 3.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'PENDING_VERIFICATION', '2026-08-30 08:30:00Z'),
('res50000-0000-0000-0000-000000000005', 'e3000000-0000-0000-0000-000000000003', 'b4000000-0000-0000-0000-000000000004', 5, 'Quarter-final finish (21-19, 14-21, 19-21)', 1.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'PENDING_VERIFICATION', '2026-08-30 09:00:00Z'),
('res60000-0000-0000-0000-000000000006', 'e2000000-0000-0000-0000-000000000002', 'b5000000-0000-0000-0000-000000000005', 1, '21-17, 21-19', 8.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'PENDING_VERIFICATION', '2026-08-30 11:20:00Z'),
('res70000-0000-0000-0000-000000000007', 'e2000000-0000-0000-0000-000000000002', 'b6000000-0000-0000-0000-000000000006', 2, '17-21, 19-21', 5.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'PENDING_VERIFICATION', '2026-08-30 11:45:00Z'),
('res80000-0000-0000-0000-000000000008', 'e2000000-0000-0000-0000-000000000002', 'b7000000-0000-0000-0000-000000000007', 3, '21-16, 21-18', 3.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'PENDING_VERIFICATION', '2026-08-30 12:10:00Z'),

-- 2 Examples of Rejected / Correction Required
('res90000-0000-0000-0000-000000000009', 'e3000000-0000-0000-0000-000000000003', 'b8000000-0000-0000-0000-000000000008', 2, '21-10, 21-12', 5.0, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80', 'a2000000-0000-0000-0000-000000000002', 'CORRECTION_REQUIRED', '2026-08-15 14:00:00Z'),
('res10000-0000-0000-0000-000000000010', 'e3000000-0000-0000-0000-000000000003', 'b9000000-0000-0000-0000-000000000009', 1, 'Unverified Walkover', 0.0, NULL, 'a2000000-0000-0000-0000-000000000002', 'REJECTED', '2026-08-15 14:30:00Z')
ON CONFLICT (id) DO NOTHING;

-- 6. Verification Actions
INSERT INTO public.verification_actions (id, result_id, verifier_id, action, comments, created_at)
VALUES
('va100000-0000-0000-0000-000000000001', 'res10000-0000-0000-0000-000000000001', 'a3000000-0000-0000-0000-000000000003', 'APPROVED', 'Verified against official scoresheet signed by chief referee Dr. Sunita Rao.', '2026-08-13 10:00:00Z'),
('va200000-0000-0000-0000-000000000002', 'res20000-0000-0000-0000-000000000002', 'a3000000-0000-0000-0000-000000000003', 'APPROVED', 'Podium finish verified with tournament desk records.', '2026-08-13 10:15:00Z'),
('va300000-0000-0000-0000-000000000003', 'res30000-0000-0000-0000-000000000003', 'a3000000-0000-0000-0000-000000000003', 'APPROVED', 'Third place playoff scorecard verified.', '2026-08-13 10:20:00Z'),
('va400000-0000-0000-0000-000000000004', 'res90000-0000-0000-0000-000000000009', 'a3000000-0000-0000-0000-000000000003', 'CORRECTION_REQUESTED', 'Score mismatch in set 2. Please re-upload verified scorecard.', '2026-08-16 09:30:00Z'),
('va500000-0000-0000-0000-000000000005', 'res10000-0000-0000-0000-000000000010', 'a3000000-0000-0000-0000-000000000003', 'REJECTED', 'No match sheet or attendance evidence attached for walkover claim.', '2026-08-16 09:45:00Z')
ON CONFLICT (id) DO NOTHING;

-- 7. Achievements (At least 3 verified achievements)
INSERT INTO public.achievements (id, athlete_id, result_id, title, event_name, position, event_level, issuer_name, credential_id, qr_verification_url, status, issued_at)
VALUES
('ach10000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'res10000-0000-0000-0000-000000000001', 'Winner - Junior U-17 Singles', 'Rising Stars Academy Tournament - Winter Series', 1, 'Grassroots Academy', 'Pune District Sports Academy', 'KS-PUN-2026-0814', 'http://localhost:5173/verify/KS-PUN-2026-0814', 'ACTIVE', '2026-08-13 10:00:00Z'),
('ach20000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'res20000-0000-0000-0000-000000000002', 'Runner-up - Junior U-17 Singles', 'Rising Stars Academy Tournament - Winter Series', 2, 'Grassroots Academy', 'Pune District Sports Academy', 'KS-PUN-2026-0815', 'http://localhost:5173/verify/KS-PUN-2026-0815', 'ACTIVE', '2026-08-13 10:15:00Z'),
('ach30000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000002', 'res30000-0000-0000-0000-000000000003', '2nd Runner-up (3rd Place) - Junior U-17 Singles', 'Rising Stars Academy Tournament - Winter Series', 3, 'Grassroots Academy', 'Pune District Sports Academy', 'KS-PUN-2026-0816', 'http://localhost:5173/verify/KS-PUN-2026-0816', 'ACTIVE', '2026-08-13 10:20:00Z')
ON CONFLICT (id) DO NOTHING;

-- 8. Movement Assessments (AI Squat Evidence)
INSERT INTO public.movement_assessments (id, athlete_id, video_url, exercise_type, repetitions, pose_confidence, movement_range, video_quality, feedback, status, created_at)
VALUES
('ma100000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'squat', 5, 0.91, 'optimal depth detected (>90° knee flexion)', 'good', 'Good stability throughout eccentric phase. Maintained upright trunk alignment and consistent tempo.', 'COMPLETED', '2026-08-20 14:00:00Z'),
('ma200000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'squat', 5, 0.88, 'full range of motion', 'acceptable', 'Keep camera at hip level to improve sagittal tracking. Consistent cadence on repetitions 1-4.', 'COMPLETED', '2026-08-22 16:30:00Z')
ON CONFLICT (id) DO NOTHING;

-- 9. Audit Logs
INSERT INTO public.audit_logs (id, record_type, record_id, action, performed_by, old_value, new_value, created_at)
VALUES
('al100000-0000-0000-0000-000000000001', 'RESULT', 'res10000-0000-0000-0000-000000000001', 'RESULT_SUBMITTED', 'a2000000-0000-0000-0000-000000000002', NULL, '{"position": 1, "score": "21-18, 19-21, 21-16", "status": "PENDING_VERIFICATION"}', '2026-08-12 18:00:00Z'),
('al200000-0000-0000-0000-000000000002', 'RESULT', 'res10000-0000-0000-0000-000000000001', 'RESULT_VERIFIED', 'a3000000-0000-0000-0000-000000000003', '{"status": "PENDING_VERIFICATION"}', '{"status": "VERIFIED", "credential_id": "KS-PUN-2026-0814"}', '2026-08-13 10:00:00Z'),
('al300000-0000-0000-0000-000000000003', 'RESULT', 'res90000-0000-0000-0000-000000000009', 'CORRECTION_REQUESTED', 'a3000000-0000-0000-0000-000000000003', '{"status": "PENDING_VERIFICATION"}', '{"status": "CORRECTION_REQUIRED", "reason": "Score mismatch in set 2"}', '2026-08-16 09:30:00Z'),
('al400000-0000-0000-0000-000000000004', 'RESULT', 'res10000-0000-0000-0000-000000000010', 'RESULT_REJECTED', 'a3000000-0000-0000-0000-000000000003', '{"status": "PENDING_VERIFICATION"}', '{"status": "REJECTED", "reason": "No evidence attached"}', '2026-08-16 09:45:00Z')
ON CONFLICT (id) DO NOTHING;
