import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Achievement, PerformancePassportSummary, Result } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateCredentialId(district: string = 'PUN'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const districtCode = district.substring(0, 3).toUpperCase();
  return `KS-${districtCode}-${year}-${randomSuffix}`;
}

export function generateRegistrationNumber(): string {
  const randomNum = Math.floor(100 + Math.random() * 900);
  const year = new Date().getFullYear();
  return `KS-REG-${year}-${randomNum}`;
}

export function calculatePerformancePassport(
  achievements: Achievement[],
  results: Result[] = []
): PerformancePassportSummary {
  const verifiedResults = results.filter(r => r.status === 'VERIFIED');
  const verifiedAchievements = achievements.filter(a => a.status === 'ACTIVE');

  const verifiedEventsCount = Math.max(verifiedAchievements.length, verifiedResults.length);
  
  let verifiedWinsCount = 0;
  let verifiedRunnerUpCount = 0;
  let districtEventsCount = 0;
  let collegeEventsCount = 0;
  let prototypePoints = 0;

  verifiedAchievements.forEach(ach => {
    if (ach.position === 1) {
      verifiedWinsCount++;
      prototypePoints += 8; // Winner
    } else if (ach.position === 2) {
      verifiedRunnerUpCount++;
      prototypePoints += 5; // Runner-up
    } else if (ach.position <= 4) {
      prototypePoints += 3; // Semi-finalist / 3rd place
    } else {
      prototypePoints += 1; // Participation
    }

    if (ach.event_level.toLowerCase().includes('district')) {
      districtEventsCount++;
    } else if (ach.event_level.toLowerCase().includes('college')) {
      collegeEventsCount++;
    }
  });

  // Latest verified result
  let latestVerifiedResult;
  if (verifiedAchievements.length > 0) {
    const sorted = [...verifiedAchievements].sort(
      (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
    );
    const latest = sorted[0];
    latestVerifiedResult = {
      eventName: latest.event_name,
      position: latest.position,
      date: latest.issued_at,
      credentialId: latest.credential_id
    };
  }

  // Reliability score calculation
  let reliabilityScore: 'High' | 'Medium' | 'Low' = 'Low';
  if (verifiedEventsCount >= 3) {
    reliabilityScore = 'High';
  } else if (verifiedEventsCount >= 1) {
    reliabilityScore = 'Medium';
  }

  return {
    verifiedEventsCount,
    verifiedWinsCount,
    verifiedRunnerUpCount,
    districtEventsCount,
    collegeEventsCount,
    latestVerifiedResult,
    reliabilityScore,
    prototypePoints
  };
}

export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
