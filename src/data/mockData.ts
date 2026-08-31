import {
  Achievement,
  AuditLog,
  Event,
  MovementAssessment,
  Organization,
  Profile,
  Registration,
  Result
} from '../types';

export const INITIAL_PROFILES: Profile[] = [
  // 5 Primary Demo Roles
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    user_id: '00000000-0000-0000-0000-000000000001',
    role: 'ATHLETE',
    full_name: 'Aarav Joshi',
    email: 'athlete@demo.khelsetu.in',
    profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
    age_group: 'U-19',
    gender: 'Male',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'Fergusson College',
    academy: 'Shivaji Nagar Badminton Club',
    sport: 'Badminton',
    position: 'Men Singles Specialist',
    bio: 'Grassroots district-level badminton player aiming for state championship trials. 5 years competitive training.',
    is_public: true,
    created_at: '2026-01-10T10:00:00Z'
  },
  {
    id: 'a2000000-0000-0000-0000-000000000002',
    user_id: '00000000-0000-0000-0000-000000000002',
    role: 'ORGANIZER',
    full_name: 'Vikram Malhotra',
    email: 'organizer@demo.khelsetu.in',
    profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
    age_group: 'Senior',
    gender: 'Female',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'Pune District Sports Academy',
    academy: 'PDSA Badminton Wing',
    sport: 'Badminton',
    position: 'Tournament Director',
    bio: 'Organizing grassroots district and collegiate tournaments since 2018 under Maharashtra Sports guidelines.',
    is_public: true,
    created_at: '2026-01-05T09:00:00Z'
  },
  {
    id: 'a3000000-0000-0000-0000-000000000003',
    user_id: '00000000-0000-0000-0000-000000000003',
    role: 'VERIFIER',
    full_name: 'Dr. Sunita Rao',
    email: 'verifier@demo.khelsetu.in',
    profile_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop&q=80',
    age_group: 'Senior',
    gender: 'Female',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'Maharashtra College Sports Council',
    academy: 'State Badminton Referees Board',
    sport: 'Badminton',
    position: 'Chief Technical Official & Verifier',
    bio: 'Certified National Grade-A Badminton Technical Official and Grassroots Verification Officer.',
    is_public: true,
    created_at: '2026-01-05T09:30:00Z'
  },
  {
    id: 'a4000000-0000-0000-0000-000000000004',
    user_id: '00000000-0000-0000-0000-000000000004',
    role: 'SCOUT',
    full_name: 'Rajesh Kadam',
    email: 'scout@demo.khelsetu.in',
    profile_photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
    age_group: 'Senior',
    gender: 'Male',
    district: 'Mumbai',
    state: 'Maharashtra',
    institution: 'Western Zone Talent Scouting Network',
    academy: 'Apex Sports Foundation',
    sport: 'Badminton',
    position: 'Head Talent Scout',
    bio: 'Identifying junior badminton prospects across Western India for regional academy scholarships.',
    is_public: true,
    created_at: '2026-01-08T11:00:00Z'
  },
  {
    id: 'a5000000-0000-0000-0000-000000000005',
    user_id: '00000000-0000-0000-0000-000000000005',
    role: 'ADMIN',
    full_name: 'KhelSetu Admin',
    email: 'admin@demo.khelsetu.in',
    profile_photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
    age_group: 'Senior',
    gender: 'Other',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'KhelSetu Grassroots Foundation',
    academy: 'National Grassroots Cell',
    sport: 'Badminton',
    position: 'Platform Governance Lead',
    bio: 'Managing platform governance, organization verification, and audit trails.',
    is_public: true,
    created_at: '2026-01-01T08:00:00Z'
  },

  // Additional Seed Athletes (Total 10+ Athletes)
  {
    id: 'b1000000-0000-0000-0000-000000000001',
    role: 'ATHLETE',
    full_name: 'Aarohi Sharme',
    profile_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80',
    age_group: 'U-17',
    gender: 'Female',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'Symbiosis Sports Centre',
    academy: 'Rising Stars Badminton Academy',
    sport: 'Badminton',
    position: 'Women Singles',
    bio: 'U-17 District finalist with aggressive baseline attacking style and agile net play.',
    is_public: true,
    created_at: '2026-02-01T10:00:00Z'
  },
  {
    id: 'b2000000-0000-0000-0000-000000000002',
    role: 'ATHLETE',
    full_name: 'Kabir Shah',
    profile_photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80',
    age_group: 'U-19',
    gender: 'Male',
    district: 'Nagpur',
    state: 'Maharashtra',
    institution: 'Nagpur University Sports Cell',
    academy: 'Vidarbha Shuttle Club',
    sport: 'Badminton',
    position: 'Men Singles & Doubles',
    bio: 'Inter-College champion known for high smash velocity and steady defense.',
    is_public: true,
    created_at: '2026-02-05T11:00:00Z'
  },
  {
    id: 'b3000000-0000-0000-0000-000000000003',
    role: 'ATHLETE',
    full_name: 'Ananya Deshmukh',
    profile_photo_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&fit=crop&q=80',
    age_group: 'U-17',
    gender: 'Female',
    district: 'Nashik',
    state: 'Maharashtra',
    institution: 'KTHM College',
    academy: 'Godavari Badminton Hub',
    sport: 'Badminton',
    position: 'Women Singles',
    bio: 'District gold medalist in U-17 singles; rigorous stamina and drop shot specialist.',
    is_public: true,
    created_at: '2026-02-10T12:00:00Z'
  },
  {
    id: 'b4000000-0000-0000-0000-000000000004',
    role: 'ATHLETE',
    full_name: 'Sneha Kulkarni',
    profile_photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&fit=crop&q=80',
    age_group: 'U-19',
    gender: 'Female',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'Modern College',
    academy: 'Shivaji Nagar Badminton Club',
    sport: 'Badminton',
    position: 'Mixed Doubles Specialist',
    bio: 'Strategic doubles player with quick reflexes and deceptive cross-court drops.',
    is_public: true,
    created_at: '2026-02-12T14:00:00Z'
  },
  {
    id: 'b5000000-0000-0000-0000-000000000005',
    role: 'ATHLETE',
    full_name: 'Rohan Mehta',
    profile_photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop&q=80',
    age_group: 'U-19',
    gender: 'Male',
    district: 'Mumbai',
    state: 'Maharashtra',
    institution: 'Ruia College',
    academy: 'Bandra Badminton Gymkhana',
    sport: 'Badminton',
    position: 'Men Singles',
    bio: 'Fast-paced attacking player with state ranking tournament quarterfinal finishes.',
    is_public: true,
    created_at: '2026-02-15T09:00:00Z'
  },
  {
    id: 'b6000000-0000-0000-0000-000000000006',
    role: 'ATHLETE',
    full_name: 'Tanvi Shinde',
    profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
    age_group: 'U-17',
    gender: 'Female',
    district: 'Kolhapur',
    state: 'Maharashtra',
    institution: 'Vivekanand College',
    academy: 'Mahalaxmi Badminton Centre',
    sport: 'Badminton',
    position: 'Women Singles',
    bio: 'Endurance player with patient rally building and steep drop shots.',
    is_public: true,
    created_at: '2026-02-18T10:30:00Z'
  },
  {
    id: 'b7000000-0000-0000-0000-000000000007',
    role: 'ATHLETE',
    full_name: 'Arjun Rao',
    profile_photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&fit=crop&q=80',
    age_group: 'Senior',
    gender: 'Male',
    district: 'Pune',
    state: 'Maharashtra',
    institution: 'COEP Tech University',
    academy: 'Deccan Gymkhana Badminton',
    sport: 'Badminton',
    position: 'Men Doubles',
    bio: 'University doubles team captain with exceptional court coverage and tactical positioning.',
    is_public: true,
    created_at: '2026-02-20T11:45:00Z'
  },
  {
    id: 'b8000000-0000-0000-0000-000000000008',
    role: 'ATHLETE',
    full_name: 'Pooja Nair',
    profile_photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&fit=crop&q=80',
    age_group: 'U-19',
    gender: 'Female',
    district: 'Thane',
    state: 'Maharashtra',
    institution: 'Kelkar College',
    academy: 'Thane Badminton Academy',
    sport: 'Badminton',
    position: 'Women Singles',
    bio: 'Consistent top-4 finisher at district school games with strong backhand clearance.',
    is_public: true,
    created_at: '2026-02-22T15:00:00Z'
  },
  {
    id: 'b9000000-0000-0000-0000-000000000009',
    role: 'ATHLETE',
    full_name: 'Vikram Deshpande',
    profile_photo_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&fit=crop&q=80',
    age_group: 'U-17',
    gender: 'Male',
    district: 'Satara',
    state: 'Maharashtra',
    institution: 'Chhatrapati Shahu Academy',
    academy: 'Satara District Sports Complex',
    sport: 'Badminton',
    position: 'Men Singles',
    bio: 'Emerging rural talent with great vertical leap and steep attacking smashes.',
    is_public: true,
    created_at: '2026-02-25T16:20:00Z'
  }
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'o1000000-0000-0000-0000-000000000001',
    name: 'Pune District Sports Academy',
    organization_type: 'District Association',
    district: 'Pune',
    state: 'Maharashtra',
    contact_email: 'contact@punesports.org',
    verification_status: 'VERIFIED',
    created_by: 'a2000000-0000-0000-0000-000000000002',
    created_at: '2026-01-02T10:00:00Z'
  },
  {
    id: 'o2000000-0000-0000-0000-000000000002',
    name: 'Maharashtra College Sports Council',
    organization_type: 'College Board',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact_email: 'info@mcsc-sports.in',
    verification_status: 'VERIFIED',
    created_by: 'a2000000-0000-0000-0000-000000000002',
    created_at: '2026-01-03T11:00:00Z'
  },
  {
    id: 'o3000000-0000-0000-0000-000000000003',
    name: 'Shivaji Nagar Badminton Club',
    organization_type: 'Club',
    district: 'Pune',
    state: 'Maharashtra',
    contact_email: 'shuttle@snbc-pune.in',
    verification_status: 'VERIFIED',
    created_by: 'a2000000-0000-0000-0000-000000000002',
    created_at: '2026-01-04T12:00:00Z'
  },
  {
    id: 'o4000000-0000-0000-0000-000000000004',
    name: 'Vidarbha Grassroots Sports Guild',
    organization_type: 'Academy',
    district: 'Nagpur',
    state: 'Maharashtra',
    contact_email: 'guild@vidarbhasports.org',
    verification_status: 'PENDING',
    created_by: 'a2000000-0000-0000-0000-000000000002',
    created_at: '2026-02-15T09:30:00Z'
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1000000-0000-0000-0000-000000000001',
    title: 'Pune District Badminton Open 2026',
    sport: 'Badminton',
    category: 'Men & Women Singles U-19',
    event_level: 'District',
    description: 'Official grassroots ranking tournament organized by Pune District Sports Academy. Verified certificate for all podium finishers.',
    venue: 'Balewadi Sports Complex, Court 3-6',
    district: 'Pune',
    state: 'Maharashtra',
    start_date: '2026-09-15',
    end_date: '2026-09-17',
    registration_deadline: '2026-09-10',
    organizer_id: 'a2000000-0000-0000-0000-000000000002',
    verifier_id: 'a3000000-0000-0000-0000-000000000003',
    status: 'OPEN',
    created_at: '2026-08-01T08:00:00Z'
  },
  {
    id: 'e2000000-0000-0000-0000-000000000002',
    title: 'Inter-College Badminton Championship 2026',
    sport: 'Badminton',
    category: 'College Open Mixed & Singles',
    event_level: 'Inter-College',
    description: 'Annual inter-collegiate tournament featuring top 32 collegiate athletes in Maharashtra.',
    venue: 'Fergusson College Indoor Stadium',
    district: 'Pune',
    state: 'Maharashtra',
    start_date: '2026-09-22',
    end_date: '2026-09-24',
    registration_deadline: '2026-09-18',
    organizer_id: 'a2000000-0000-0000-0000-000000000002',
    verifier_id: 'a3000000-0000-0000-0000-000000000003',
    status: 'APPROVED',
    created_at: '2026-08-05T09:00:00Z'
  },
  {
    id: 'e3000000-0000-0000-0000-000000000003',
    title: 'Rising Stars Academy Tournament - Winter Series',
    sport: 'Badminton',
    category: 'Junior U-17 Singles',
    event_level: 'Grassroots Academy',
    description: 'Talent identification tournament designed to give junior grassroots shuttlers competitive match exposure.',
    venue: 'Shivaji Nagar Club Courts',
    district: 'Pune',
    state: 'Maharashtra',
    start_date: '2026-08-10',
    end_date: '2026-08-12',
    registration_deadline: '2026-08-05',
    organizer_id: 'a2000000-0000-0000-0000-000000000002',
    verifier_id: 'a3000000-0000-0000-0000-000000000003',
    status: 'COMPLETED',
    created_at: '2026-07-20T10:00:00Z'
  },
  {
    id: 'e4000000-0000-0000-0000-000000000004',
    title: 'Maharashtra Grassroots Shuttle Fest',
    sport: 'Badminton',
    category: 'Open Category Doubles',
    event_level: 'State Open',
    description: 'Statewide invitational gathering for top regional club pairings with independent referee validation.',
    venue: 'Andheri Sports Complex',
    district: 'Mumbai',
    state: 'Maharashtra',
    start_date: '2026-10-05',
    end_date: '2026-10-07',
    registration_deadline: '2026-09-28',
    organizer_id: 'a2000000-0000-0000-0000-000000000002',
    verifier_id: 'a3000000-0000-0000-0000-000000000003',
    status: 'OPEN',
    created_at: '2026-08-15T11:00:00Z'
  },
  {
    id: 'e5000000-0000-0000-0000-000000000005',
    title: 'Deccan Junior Badminton Cup',
    sport: 'Badminton',
    category: 'Boys U-17 Singles',
    event_level: 'District',
    description: 'Introductory tournament for developing players under 17 in Western Maharashtra.',
    venue: 'Deccan Gymkhana Courts',
    district: 'Pune',
    state: 'Maharashtra',
    start_date: '2026-10-15',
    end_date: '2026-10-16',
    registration_deadline: '2026-10-08',
    organizer_id: 'a2000000-0000-0000-0000-000000000002',
    verifier_id: 'a3000000-0000-0000-0000-000000000003',
    status: 'DRAFT',
    created_at: '2026-08-20T12:00:00Z'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'r1000000-0000-0000-0000-000000000001',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'a1000000-0000-0000-0000-000000000001',
    registration_number: 'KS-REG-2026-001',
    status: 'CONFIRMED',
    checked_in: true,
    registered_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'r2000000-0000-0000-0000-000000000002',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b1000000-0000-0000-0000-000000000001',
    registration_number: 'KS-REG-2026-002',
    status: 'CONFIRMED',
    checked_in: true,
    registered_at: '2026-08-01T11:30:00Z'
  },
  {
    id: 'r3000000-0000-0000-0000-000000000003',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b2000000-0000-0000-0000-000000000002',
    registration_number: 'KS-REG-2026-003',
    status: 'CONFIRMED',
    checked_in: true,
    registered_at: '2026-08-02T09:15:00Z'
  },
  {
    id: 'r4000000-0000-0000-0000-000000000004',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b3000000-0000-0000-0000-000000000003',
    registration_number: 'KS-REG-2026-004',
    status: 'CONFIRMED',
    checked_in: true,
    registered_at: '2026-08-02T14:00:00Z'
  },
  {
    id: 'r5000000-0000-0000-0000-000000000005',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b4000000-0000-0000-0000-000000000004',
    registration_number: 'KS-REG-2026-005',
    status: 'CONFIRMED',
    checked_in: true,
    registered_at: '2026-08-03T16:20:00Z'
  },

  // Registrations for upcoming Pune Open (e1)
  {
    id: 'r6000000-0000-0000-0000-000000000006',
    event_id: 'e1000000-0000-0000-0000-000000000001',
    athlete_id: 'b1000000-0000-0000-0000-000000000001',
    registration_number: 'KS-REG-2026-006',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-25T10:00:00Z'
  },
  {
    id: 'r7000000-0000-0000-0000-000000000007',
    event_id: 'e1000000-0000-0000-0000-000000000001',
    athlete_id: 'b2000000-0000-0000-0000-000000000002',
    registration_number: 'KS-REG-2026-007',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-25T11:00:00Z'
  },
  {
    id: 'r8000000-0000-0000-0000-000000000008',
    event_id: 'e1000000-0000-0000-0000-000000000001',
    athlete_id: 'b5000000-0000-0000-0000-000000000005',
    registration_number: 'KS-REG-2026-008',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-26T12:30:00Z'
  },
  {
    id: 'r9000000-0000-0000-0000-000000000009',
    event_id: 'e1000000-0000-0000-0000-000000000001',
    athlete_id: 'b6000000-0000-0000-0000-000000000006',
    registration_number: 'KS-REG-2026-009',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-26T14:10:00Z'
  },
  {
    id: 'r1000000-0000-0000-0000-000000000010',
    event_id: 'e1000000-0000-0000-0000-000000000001',
    athlete_id: 'b9000000-0000-0000-0000-000000000009',
    registration_number: 'KS-REG-2026-010',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-27T09:45:00Z'
  },

  // Registrations for Inter-College (e2)
  {
    id: 'r1100000-0000-0000-0000-000000000011',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'a1000000-0000-0000-0000-000000000001',
    registration_number: 'KS-REG-2026-011',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-28T10:15:00Z'
  },
  {
    id: 'r1200000-0000-0000-0000-000000000002',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'b2000000-0000-0000-0000-000000000002',
    registration_number: 'KS-REG-2026-012',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-28T11:20:00Z'
  },
  {
    id: 'r1300000-0000-0000-0000-000000000013',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'b7000000-0000-0000-0000-000000000007',
    registration_number: 'KS-REG-2026-013',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-28T15:40:00Z'
  },

  // Registrations for State Shuttle Fest (e4)
  {
    id: 'r1400000-0000-0000-0000-000000000014',
    event_id: 'e4000000-0000-0000-0000-000000000004',
    athlete_id: 'b4000000-0000-0000-0000-000000000004',
    registration_number: 'KS-REG-2026-014',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-29T08:30:00Z'
  },
  {
    id: 'r1500000-0000-0000-0000-000000000015',
    event_id: 'e4000000-0000-0000-0000-000000000004',
    athlete_id: 'b8000000-0000-0000-0000-000000000008',
    registration_number: 'KS-REG-2026-015',
    status: 'CONFIRMED',
    checked_in: false,
    registered_at: '2026-08-29T13:50:00Z'
  }
];

export const INITIAL_RESULTS: Result[] = [
  // Verified podium results
  {
    id: 'res10000-0000-0000-0000-000000000001',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'a1000000-0000-0000-0000-000000000001',
    position: 1,
    score: '21-18, 19-21, 21-16',
    performance_value: 8.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'VERIFIED',
    submitted_at: '2026-08-12T18:00:00Z'
  },
  {
    id: 'res20000-0000-0000-0000-000000000002',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b1000000-0000-0000-0000-000000000001',
    position: 2,
    score: '18-21, 21-19, 16-21',
    performance_value: 5.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'VERIFIED',
    submitted_at: '2026-08-12T18:10:00Z'
  },
  {
    id: 'res30000-0000-0000-0000-000000000003',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b2000000-0000-0000-0000-000000000002',
    position: 3,
    score: '21-14, 21-12',
    performance_value: 3.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'VERIFIED',
    submitted_at: '2026-08-12T18:15:00Z'
  },

  // 5 Pending results for verifier review queue
  {
    id: 'res40000-0000-0000-0000-000000000004',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b3000000-0000-0000-0000-000000000003',
    position: 4,
    score: '15-21, 18-21',
    performance_value: 3.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'PENDING_VERIFICATION',
    submitted_at: '2026-08-30T08:30:00Z'
  },
  {
    id: 'res50000-0000-0000-0000-000000000005',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b4000000-0000-0000-0000-000000000004',
    position: 5,
    score: 'Quarter-final finish (21-19, 14-21, 19-21)',
    performance_value: 1.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'PENDING_VERIFICATION',
    submitted_at: '2026-08-30T09:00:00Z'
  },
  {
    id: 'res60000-0000-0000-0000-000000000006',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'b5000000-0000-0000-0000-000000000005',
    position: 1,
    score: '21-17, 21-19',
    performance_value: 8.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'PENDING_VERIFICATION',
    submitted_at: '2026-08-30T11:20:00Z'
  },
  {
    id: 'res70000-0000-0000-0000-000000000007',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'b6000000-0000-0000-0000-000000000006',
    position: 2,
    score: '17-21, 19-21',
    performance_value: 5.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'PENDING_VERIFICATION',
    submitted_at: '2026-08-30T11:45:00Z'
  },
  {
    id: 'res80000-0000-0000-0000-000000000008',
    event_id: 'e2000000-0000-0000-0000-000000000002',
    athlete_id: 'b7000000-0000-0000-0000-000000000007',
    position: 3,
    score: '21-16, 21-18',
    performance_value: 3.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'PENDING_VERIFICATION',
    submitted_at: '2026-08-30T12:10:00Z'
  },

  // 2 Examples of Rejected / Correction Required
  {
    id: 'res90000-0000-0000-0000-000000000009',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b8000000-0000-0000-0000-000000000008',
    position: 2,
    score: '21-10, 21-12',
    performance_value: 5.0,
    evidence_file_url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80',
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'CORRECTION_REQUIRED',
    submitted_at: '2026-08-15T14:00:00Z'
  },
  {
    id: 'res10000-0000-0000-0000-000000000010',
    event_id: 'e3000000-0000-0000-0000-000000000003',
    athlete_id: 'b9000000-0000-0000-0000-000000000009',
    position: 1,
    score: 'Unverified Walkover',
    performance_value: 0.0,
    evidence_file_url: undefined,
    submitted_by: 'a2000000-0000-0000-0000-000000000002',
    status: 'REJECTED',
    submitted_at: '2026-08-15T14:30:00Z'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach10000-0000-0000-0000-000000000001',
    athlete_id: 'a1000000-0000-0000-0000-000000000001',
    result_id: 'res10000-0000-0000-0000-000000000001',
    title: 'Winner - Junior U-17 Singles',
    event_name: 'Rising Stars Academy Tournament - Winter Series',
    position: 1,
    event_level: 'Grassroots Academy',
    issuer_name: 'Pune District Sports Academy',
    credential_id: 'KS-PUN-2026-0814',
    qr_verification_url: '/verify/KS-PUN-2026-0814',
    status: 'ACTIVE',
    issued_at: '2026-08-13T10:00:00Z'
  },
  {
    id: 'ach20000-0000-0000-0000-000000000002',
    athlete_id: 'b1000000-0000-0000-0000-000000000001',
    result_id: 'res20000-0000-0000-0000-000000000002',
    title: 'Runner-up - Junior U-17 Singles',
    event_name: 'Rising Stars Academy Tournament - Winter Series',
    position: 2,
    event_level: 'Grassroots Academy',
    issuer_name: 'Pune District Sports Academy',
    credential_id: 'KS-PUN-2026-0815',
    qr_verification_url: '/verify/KS-PUN-2026-0815',
    status: 'ACTIVE',
    issued_at: '2026-08-13T10:15:00Z'
  },
  {
    id: 'ach30000-0000-0000-0000-000000000003',
    athlete_id: 'b2000000-0000-0000-0000-000000000002',
    result_id: 'res30000-0000-0000-0000-000000000003',
    title: '2nd Runner-up (3rd Place) - Junior U-17 Singles',
    event_name: 'Rising Stars Academy Tournament - Winter Series',
    position: 3,
    event_level: 'Grassroots Academy',
    issuer_name: 'Pune District Sports Academy',
    credential_id: 'KS-PUN-2026-0816',
    qr_verification_url: '/verify/KS-PUN-2026-0816',
    status: 'ACTIVE',
    issued_at: '2026-08-13T10:20:00Z'
  }
];

export const INITIAL_MOVEMENT_ASSESSMENTS: MovementAssessment[] = [
  {
    id: 'ma100000-0000-0000-0000-000000000001',
    athlete_id: 'a1000000-0000-0000-0000-000000000001',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    exercise_type: 'squat',
    repetitions: 5,
    pose_confidence: 0.91,
    movement_range: 'optimal depth detected (>90° knee flexion)',
    video_quality: 'good',
    feedback: 'Good stability throughout eccentric phase. Maintained upright trunk alignment and consistent tempo.',
    disclaimer: 'AI-assisted movement observation only; not medical advice or official talent assessment',
    status: 'COMPLETED',
    is_live_analysis: true,
    created_at: '2026-08-20T14:00:00Z'
  },
  {
    id: 'ma200000-0000-0000-0000-000000000002',
    athlete_id: 'b1000000-0000-0000-0000-000000000001',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    exercise_type: 'squat',
    repetitions: 5,
    pose_confidence: 0.88,
    movement_range: 'full range of motion',
    video_quality: 'acceptable',
    feedback: 'Keep camera at hip level to improve sagittal tracking. Consistent cadence on repetitions 1-4.',
    disclaimer: 'AI-assisted movement observation only; not medical advice or official talent assessment',
    status: 'COMPLETED',
    is_live_analysis: false,
    created_at: '2026-08-22T16:30:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'al100000-0000-0000-0000-000000000001',
    record_type: 'RESULT',
    record_id: 'res10000-0000-0000-0000-000000000001',
    action: 'RESULT_SUBMITTED',
    performed_by: 'a2000000-0000-0000-0000-000000000002',
    performer_name: 'Vikram Malhotra (Organizer)',
    old_value: null,
    new_value: { position: 1, score: '21-18, 19-21, 21-16', status: 'PENDING_VERIFICATION' },
    created_at: '2026-08-12T18:00:00Z'
  },
  {
    id: 'al200000-0000-0000-0000-000000000002',
    record_type: 'RESULT',
    record_id: 'res10000-0000-0000-0000-000000000001',
    action: 'RESULT_VERIFIED',
    performed_by: 'a3000000-0000-0000-0000-000000000003',
    performer_name: 'Dr. Sunita Rao (Verifier)',
    old_value: { status: 'PENDING_VERIFICATION' },
    new_value: { status: 'VERIFIED', credential_id: 'KS-PUN-2026-0814' },
    created_at: '2026-08-13T10:00:00Z'
  },
  {
    id: 'al300000-0000-0000-0000-000000000003',
    record_type: 'RESULT',
    record_id: 'res90000-0000-0000-0000-000000000009',
    action: 'CORRECTION_REQUESTED',
    performed_by: 'a3000000-0000-0000-0000-000000000003',
    performer_name: 'Dr. Sunita Rao (Verifier)',
    old_value: { status: 'PENDING_VERIFICATION' },
    new_value: { status: 'CORRECTION_REQUIRED', reason: 'Score mismatch in set 2' },
    created_at: '2026-08-16T09:30:00Z'
  },
  {
    id: 'al400000-0000-0000-0000-000000000004',
    record_type: 'RESULT',
    record_id: 'res10000-0000-0000-0000-000000000010',
    action: 'RESULT_REJECTED',
    performed_by: 'a3000000-0000-0000-0000-000000000003',
    performer_name: 'Dr. Sunita Rao (Verifier)',
    old_value: { status: 'PENDING_VERIFICATION' },
    new_value: { status: 'REJECTED', reason: 'No evidence match sheet attached' },
    created_at: '2026-08-16T09:45:00Z'
  }
];
