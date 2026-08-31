export type UserRole = 'ATHLETE' | 'ORGANIZER' | 'VERIFIER' | 'SCOUT' | 'ADMIN';

export type EventStatus = 'DRAFT' | 'APPROVED' | 'OPEN' | 'COMPLETED' | 'ARCHIVED';

export type ResultStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED' | 'CORRECTION_REQUIRED' | 'REVOKED';

export type OrganizationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export type RegistrationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'WAITLIST';

export type VerificationActionType = 'APPROVED' | 'REJECTED' | 'CORRECTION_REQUESTED' | 'REVOKED';

export interface Profile {
  id: string;
  user_id?: string;
  role: UserRole;
  full_name: string;
  email?: string;
  profile_photo_url?: string;
  age_group?: string; // 'U-17', 'U-19', 'Senior', 'Open'
  gender?: 'Male' | 'Female' | 'Other';
  district: string;
  state: string;
  institution?: string;
  academy?: string;
  sport: string;
  position?: string; // e.g. "Men Singles Specialist", "Mixed Doubles"
  bio?: string;
  is_public: boolean;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  organization_type: string;
  district: string;
  state: string;
  contact_email: string;
  verification_status: OrganizationStatus;
  created_by?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  sport: string;
  category: string;
  event_level: string; // 'District' | 'Inter-College' | 'Grassroots Academy' | 'State Open'
  description?: string;
  venue: string;
  district: string;
  state: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  organizer_id: string;
  verifier_id?: string;
  status: EventStatus;
  created_at: string;
  organizer?: Profile;
  verifier?: Profile;
}

export interface Registration {
  id: string;
  event_id: string;
  athlete_id: string;
  registration_number: string;
  status: RegistrationStatus;
  checked_in: boolean;
  registered_at: string;
  athlete?: Profile;
  event?: Event;
}

export interface Result {
  id: string;
  event_id: string;
  athlete_id: string;
  position: number; // 1 = Winner, 2 = Runner-up, 3 = 3rd place, 4 = Semi-finalist, etc.
  score?: string;
  performance_value?: number;
  evidence_file_url?: string;
  submitted_by: string;
  status: ResultStatus;
  submitted_at: string;
  athlete?: Profile;
  event?: Event;
  submitter?: Profile;
}

export interface VerificationAction {
  id: string;
  result_id: string;
  verifier_id: string;
  action: VerificationActionType;
  comments?: string;
  created_at: string;
  verifier?: Profile;
}

export interface Achievement {
  id: string;
  athlete_id: string;
  result_id?: string;
  title: string;
  event_name: string;
  position: number;
  event_level: string;
  issuer_name: string;
  credential_id: string;
  qr_verification_url: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  issued_at: string;
  revoked_at?: string;
  athlete?: Profile;
  result?: Result;
}

export interface MovementAssessment {
  id: string;
  athlete_id: string;
  video_url?: string;
  exercise_type: string;
  repetitions: number;
  pose_confidence: number;
  movement_range: string;
  video_quality: string;
  feedback: string;
  disclaimer: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  is_live_analysis?: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  record_type: 'EVENT' | 'RESULT' | 'ACHIEVEMENT' | 'ORGANIZATION' | 'PROFILE';
  record_id: string;
  action: string;
  performed_by: string;
  performer_name?: string;
  old_value?: Record<string, any> | null;
  new_value?: Record<string, any> | null;
  created_at: string;
}

export interface PerformancePassportSummary {
  verifiedEventsCount: number;
  verifiedWinsCount: number;
  verifiedRunnerUpCount: number;
  districtEventsCount: number;
  collegeEventsCount: number;
  latestVerifiedResult?: {
    eventName: string;
    position: number;
    date: string;
    credentialId: string;
  };
  reliabilityScore: 'High' | 'Medium' | 'Low';
  prototypePoints: number; // 1 for participation, 3 for semi-final/3rd, 5 for runner-up, 8 for winner
}
