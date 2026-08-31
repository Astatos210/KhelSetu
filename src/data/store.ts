import {
  Achievement,
  AuditLog,
  Event,
  MovementAssessment,
  Organization,
  Profile,
  Registration,
  Result,
  ResultStatus,
  UserRole,
  VerificationActionType
} from '../types';
import {
  INITIAL_ACHIEVEMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_EVENTS,
  INITIAL_MOVEMENT_ASSESSMENTS,
  INITIAL_ORGANIZATIONS,
  INITIAL_PROFILES,
  INITIAL_REGISTRATIONS,
  INITIAL_RESULTS
} from './mockData';
import { generateCredentialId, generateRegistrationNumber } from '../lib/utils';

const STORAGE_KEYS = {
  PROFILES: 'khelsetu_profiles',
  ORGANIZATIONS: 'khelsetu_organizations',
  EVENTS: 'khelsetu_events',
  REGISTRATIONS: 'khelsetu_registrations',
  RESULTS: 'khelsetu_results',
  ACHIEVEMENTS: 'khelsetu_achievements',
  MOVEMENT: 'khelsetu_movement',
  AUDIT_LOGS: 'khelsetu_audit_logs',
  ACTIVE_ROLE: 'khelsetu_active_role'
};

// Helper for local storage read/write
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }
}

class KhelSetuStore {
  private profiles: Profile[] = loadFromStorage(STORAGE_KEYS.PROFILES, INITIAL_PROFILES);
  private organizations: Organization[] = loadFromStorage(STORAGE_KEYS.ORGANIZATIONS, INITIAL_ORGANIZATIONS);
  private events: Event[] = loadFromStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  private registrations: Registration[] = loadFromStorage(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  private results: Result[] = loadFromStorage(STORAGE_KEYS.RESULTS, INITIAL_RESULTS);
  private achievements: Achievement[] = loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  private movementAssessments: MovementAssessment[] = loadFromStorage(STORAGE_KEYS.MOVEMENT, INITIAL_MOVEMENT_ASSESSMENTS);
  private auditLogs: AuditLog[] = loadFromStorage(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);

  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }

  // --- Reset Store ---
  public resetToDefault(): void {
    this.profiles = [...INITIAL_PROFILES];
    this.organizations = [...INITIAL_ORGANIZATIONS];
    this.events = [...INITIAL_EVENTS];
    this.registrations = [...INITIAL_REGISTRATIONS];
    this.results = [...INITIAL_RESULTS];
    this.achievements = [...INITIAL_ACHIEVEMENTS];
    this.movementAssessments = [...INITIAL_MOVEMENT_ASSESSMENTS];
    this.auditLogs = [...INITIAL_AUDIT_LOGS];

    saveToStorage(STORAGE_KEYS.PROFILES, this.profiles);
    saveToStorage(STORAGE_KEYS.ORGANIZATIONS, this.organizations);
    saveToStorage(STORAGE_KEYS.EVENTS, this.events);
    saveToStorage(STORAGE_KEYS.REGISTRATIONS, this.registrations);
    saveToStorage(STORAGE_KEYS.RESULTS, this.results);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, this.achievements);
    saveToStorage(STORAGE_KEYS.MOVEMENT, this.movementAssessments);
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);

    this.notify();
  }

  // --- Profiles ---
  public getProfiles(): Profile[] {
    return [...this.profiles];
  }

  public getProfileById(id: string): Profile | undefined {
    return this.profiles.find(p => p.id === id);
  }

  public getProfileByEmail(email: string): Profile | undefined {
    return this.profiles.find(p => p.email?.toLowerCase() === email.toLowerCase());
  }

  public getProfileByRole(role: UserRole): Profile | undefined {
    return this.profiles.find(p => p.role === role);
  }

  public updateProfile(id: string, updates: Partial<Profile>): Profile {
    const idx = this.profiles.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Profile not found');

    const oldProfile = { ...this.profiles[idx] };
    this.profiles[idx] = { ...this.profiles[idx], ...updates };
    saveToStorage(STORAGE_KEYS.PROFILES, this.profiles);

    this.addAuditLog({
      record_type: 'PROFILE',
      record_id: id,
      action: 'PROFILE_UPDATED',
      performed_by: id,
      performer_name: this.profiles[idx].full_name,
      old_value: oldProfile,
      new_value: this.profiles[idx]
    });

    this.notify();
    return this.profiles[idx];
  }

  // --- Organizations ---
  public getOrganizations(): Organization[] {
    return [...this.organizations];
  }

  public updateOrganizationStatus(id: string, status: 'VERIFIED' | 'REJECTED', adminId: string): void {
    const org = this.organizations.find(o => o.id === id);
    if (!org) return;
    const oldStatus = org.verification_status;
    org.verification_status = status;
    saveToStorage(STORAGE_KEYS.ORGANIZATIONS, this.organizations);

    this.addAuditLog({
      record_type: 'ORGANIZATION',
      record_id: id,
      action: `ORGANIZATION_${status}`,
      performed_by: adminId,
      performer_name: 'Platform Admin',
      old_value: { status: oldStatus },
      new_value: { status }
    });

    this.notify();
  }

  // --- Events ---
  public getEvents(): Event[] {
    return this.events.map(e => ({
      ...e,
      organizer: this.getProfileById(e.organizer_id),
      verifier: e.verifier_id ? this.getProfileById(e.verifier_id) : undefined
    }));
  }

  public getEventById(id: string): Event | undefined {
    const event = this.events.find(e => e.id === id);
    if (!event) return undefined;
    return {
      ...event,
      organizer: this.getProfileById(event.organizer_id),
      verifier: event.verifier_id ? this.getProfileById(event.verifier_id) : undefined
    };
  }

  public createEvent(eventData: Omit<Event, 'id' | 'created_at'>): Event {
    const newEvent: Event = {
      ...eventData,
      id: `e-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.events.unshift(newEvent);
    saveToStorage(STORAGE_KEYS.EVENTS, this.events);

    const organizer = this.getProfileById(newEvent.organizer_id);
    this.addAuditLog({
      record_type: 'EVENT',
      record_id: newEvent.id,
      action: 'EVENT_CREATED',
      performed_by: newEvent.organizer_id,
      performer_name: organizer?.full_name || 'Organizer',
      old_value: null,
      new_value: newEvent
    });

    this.notify();
    return newEvent;
  }

  // --- Registrations ---
  public getRegistrations(eventId?: string, athleteId?: string): Registration[] {
    let filtered = this.registrations;
    if (eventId) filtered = filtered.filter(r => r.event_id === eventId);
    if (athleteId) filtered = filtered.filter(r => r.athlete_id === athleteId);

    return filtered.map(r => ({
      ...r,
      athlete: this.getProfileById(r.athlete_id),
      event: this.getEventById(r.event_id)
    }));
  }

  public registerAthleteForEvent(eventId: string, athleteId: string): Registration {
    // Check if already registered
    const existing = this.registrations.find(r => r.event_id === eventId && r.athlete_id === athleteId);
    if (existing) return existing;

    const newReg: Registration = {
      id: `r-${Date.now()}`,
      event_id: eventId,
      athlete_id: athleteId,
      registration_number: generateRegistrationNumber(),
      status: 'CONFIRMED',
      checked_in: false,
      registered_at: new Date().toISOString()
    };

    this.registrations.push(newReg);
    saveToStorage(STORAGE_KEYS.REGISTRATIONS, this.registrations);
    this.notify();
    return newReg;
  }

  public toggleCheckIn(registrationId: string): void {
    const reg = this.registrations.find(r => r.id === registrationId);
    if (!reg) return;
    reg.checked_in = !reg.checked_in;
    saveToStorage(STORAGE_KEYS.REGISTRATIONS, this.registrations);
    this.notify();
  }

  // --- Results ---
  public getResults(filter?: { eventId?: string; athleteId?: string; status?: ResultStatus }): Result[] {
    let list = this.results;
    if (filter?.eventId) list = list.filter(r => r.event_id === filter.eventId);
    if (filter?.athleteId) list = list.filter(r => r.athlete_id === filter.athleteId);
    if (filter?.status) list = list.filter(r => r.status === filter.status);

    return list.map(r => ({
      ...r,
      athlete: this.getProfileById(r.athlete_id),
      event: this.getEventById(r.event_id),
      submitter: this.getProfileById(r.submitted_by)
    }));
  }

  public getResultById(id: string): Result | undefined {
    const result = this.results.find(r => r.id === id);
    if (!result) return undefined;
    return {
      ...result,
      athlete: this.getProfileById(result.athlete_id),
      event: this.getEventById(result.event_id),
      submitter: this.getProfileById(result.submitted_by)
    };
  }

  public submitResult(resultData: {
    event_id: string;
    athlete_id: string;
    position: number;
    score?: string;
    performance_value?: number;
    evidence_file_url?: string;
    submitted_by: string;
  }): Result {
    const submitter = this.getProfileById(resultData.submitted_by);
    
    // Check if result exists for this athlete/event
    const existingIdx = this.results.findIndex(
      r => r.event_id === resultData.event_id && r.athlete_id === resultData.athlete_id
    );

    const newResult: Result = {
      id: existingIdx >= 0 ? this.results[existingIdx].id : `res-${Date.now()}`,
      event_id: resultData.event_id,
      athlete_id: resultData.athlete_id,
      position: resultData.position,
      score: resultData.score,
      performance_value: resultData.performance_value,
      evidence_file_url: resultData.evidence_file_url,
      submitted_by: resultData.submitted_by,
      status: 'PENDING_VERIFICATION', // Organizers cannot mark verified!
      submitted_at: new Date().toISOString()
    };

    if (existingIdx >= 0) {
      const oldVal = { ...this.results[existingIdx] };
      this.results[existingIdx] = newResult;
      this.addAuditLog({
        record_type: 'RESULT',
        record_id: newResult.id,
        action: 'RESULT_RESUBMITTED',
        performed_by: resultData.submitted_by,
        performer_name: submitter?.full_name || 'Organizer',
        old_value: oldVal,
        new_value: newResult
      });
    } else {
      this.results.unshift(newResult);
      this.addAuditLog({
        record_type: 'RESULT',
        record_id: newResult.id,
        action: 'RESULT_SUBMITTED',
        performed_by: resultData.submitted_by,
        performer_name: submitter?.full_name || 'Organizer',
        old_value: null,
        new_value: newResult
      });
    }

    saveToStorage(STORAGE_KEYS.RESULTS, this.results);
    this.notify();
    return newResult;
  }

  // --- Verifier Workflow ---
  public verifyResult(params: {
    result_id: string;
    verifier_id: string;
    action: VerificationActionType;
    comments?: string;
  }): { result: Result; achievement?: Achievement } {
    const result = this.results.find(r => r.id === params.result_id);
    if (!result) throw new Error('Result not found');

    const verifier = this.getProfileById(params.verifier_id);
    const event = this.getEventById(result.event_id);
    const athlete = this.getProfileById(result.athlete_id);

    const oldResult = { ...result };
    let newStatus: ResultStatus = 'PENDING_VERIFICATION';

    if (params.action === 'APPROVED') {
      newStatus = 'VERIFIED';
    } else if (params.action === 'REJECTED') {
      newStatus = 'REJECTED';
    } else if (params.action === 'CORRECTION_REQUESTED') {
      newStatus = 'CORRECTION_REQUIRED';
    } else if (params.action === 'REVOKED') {
      newStatus = 'REVOKED';
    }

    result.status = newStatus;
    saveToStorage(STORAGE_KEYS.RESULTS, this.results);

    let createdAchievement: Achievement | undefined;

    // If Approved, generate verified Achievement with unique Credential ID
    if (params.action === 'APPROVED') {
      const credId = generateCredentialId(event?.district || 'PUN');
      const positionLabel = result.position === 1 
        ? 'Winner' 
        : result.position === 2 
        ? 'Runner-up' 
        : result.position === 3 
        ? '3rd Place' 
        : `Position ${result.position}`;

      createdAchievement = {
        id: `ach-${Date.now()}`,
        athlete_id: result.athlete_id,
        result_id: result.id,
        title: `${positionLabel} - ${event?.category || 'Badminton'}`,
        event_name: event?.title || 'Grassroots Tournament',
        position: result.position,
        event_level: event?.event_level || 'District',
        issuer_name: event?.organizer?.institution || event?.organizer?.full_name || 'Pune District Sports Academy',
        credential_id: credId,
        qr_verification_url: `/verify/${credId}`,
        status: 'ACTIVE',
        issued_at: new Date().toISOString()
      };

      // Check if achievement already exists for this result
      const existingAchIdx = this.achievements.findIndex(a => a.result_id === result.id);
      if (existingAchIdx >= 0) {
        this.achievements[existingAchIdx] = createdAchievement;
      } else {
        this.achievements.unshift(createdAchievement);
      }
      saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, this.achievements);
    }

    // Record Audit Log
    this.addAuditLog({
      record_type: 'RESULT',
      record_id: result.id,
      action: `RESULT_${params.action}`,
      performed_by: params.verifier_id,
      performer_name: verifier?.full_name || 'Verifier',
      old_value: oldResult,
      new_value: {
        status: newStatus,
        comments: params.comments,
        credential_id: createdAchievement?.credential_id
      }
    });

    this.notify();
    return { result, achievement: createdAchievement };
  }

  // --- Achievements ---
  public getAchievements(athleteId?: string): Achievement[] {
    let list = this.achievements;
    if (athleteId) list = list.filter(a => a.athlete_id === athleteId);
    return list.map(a => ({
      ...a,
      athlete: this.getProfileById(a.athlete_id)
    }));
  }

  public getAchievementByCredentialId(credentialId: string): Achievement | undefined {
    const ach = this.achievements.find(
      a => a.credential_id.toUpperCase() === credentialId.trim().toUpperCase()
    );
    if (!ach) return undefined;
    return {
      ...ach,
      athlete: this.getProfileById(ach.athlete_id),
      result: ach.result_id ? this.getResultById(ach.result_id) : undefined
    };
  }

  // --- AI Movement Assessments ---
  public getMovementAssessments(athleteId: string): MovementAssessment[] {
    return this.movementAssessments.filter(m => m.athlete_id === athleteId);
  }

  public addMovementAssessment(assessment: Omit<MovementAssessment, 'id' | 'created_at'>): MovementAssessment {
    const newAssessment: MovementAssessment = {
      ...assessment,
      id: `ma-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.movementAssessments.unshift(newAssessment);
    saveToStorage(STORAGE_KEYS.MOVEMENT, this.movementAssessments);
    this.notify();
    return newAssessment;
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  private addAuditLog(log: Omit<AuditLog, 'id' | 'created_at'>): void {
    const newLog: AuditLog = {
      ...log,
      id: `al-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString()
    };
    this.auditLogs.unshift(newLog);
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);
  }
}

export const store = new KhelSetuStore();
