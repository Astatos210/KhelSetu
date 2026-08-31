import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Trophy,
  User,
  Activity
} from 'lucide-react';
import { store } from '../../data/store';
import { Achievement, MovementAssessment, Profile, Result } from '../../types';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { PerformancePassport } from '../../components/athlete/PerformancePassport';
import { MovementCard } from '../../components/athlete/MovementCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const PublicAthletePage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [movementAssessment, setMovementAssessment] = useState<MovementAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!athleteId) return;
    const p = store.getProfileById(athleteId);
    if (p) {
      setProfile(p);
      setAchievements(store.getAchievements(p.id));
      const movements = store.getMovementAssessments(p.id);
      if (movements.length > 0) {
        setMovementAssessment(movements[0]);
      }
    }
    setLoading(false);
  }, [athleteId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <div className="w-10 h-10 border-4 border-[#12355B]/20 border-t-[#12355B] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-600">Loading verified athlete portfolio...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Athlete Profile Not Found</h2>
        <p className="text-xs text-slate-600 mb-6">The requested athlete record does not exist or has been made private.</p>
        <Link to="/scout/dashboard">
          <Button variant="primary" size="sm">Explore Talent Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/scout/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Scout Directory
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#12355B]/20 shadow-md shrink-0 bg-slate-200">
            <img
              src={profile.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
              alt={profile.full_name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                {profile.full_name}
              </h1>
              <Badge variant="teal" size="sm" dot>
                {profile.sport} ({profile.position || 'Singles Specialist'})
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {profile.district}, {profile.state}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-700">Category: {profile.age_group}</span>
              <span>•</span>
              <span>{profile.gender}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-600">
              {profile.institution && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <strong>College:</strong> {profile.institution}
                </span>
              )}
              {profile.academy && (
                <span className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <strong>Academy:</strong> {profile.academy}
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-xs text-slate-600 italic pt-2 max-w-2xl">
                "{profile.bio}"
              </p>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Public Profile • Minor privacy protection enabled (contact info withheld)
          </span>
          <span>Member since {new Date(profile.created_at).getFullYear()}</span>
        </div>
      </div>

      {/* Performance Passport Summary */}
      <PerformancePassport achievements={achievements} />

      {/* Verified Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Verified Digital Achievements ({achievements.length})</span>
          </h2>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} showActions={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No verified achievements recorded yet.
          </div>
        )}
      </div>

      {/* AI Movement Assessment Evidence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00A6A6]" />
            <span>AI Movement Biomechanics Evidence</span>
          </h2>
        </div>

        {movementAssessment ? (
          <MovementCard assessment={movementAssessment} showVideoPlayer={true} />
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No AI movement assessment uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};
