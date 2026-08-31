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
  Activity,
  Award,
  Lock
} from 'lucide-react';
import { store } from '../../data/store';
import { Achievement, MovementAssessment, Profile, Result } from '../../types';
import { formatDate } from '../../lib/utils';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { PerformancePassport } from '../../components/athlete/PerformancePassport';
import { MovementCard } from '../../components/athlete/MovementCard';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const ScoutAthleteDetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [movementAssessment, setMovementAssessment] = useState<MovementAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!athleteId) return;
    const p = store.getProfileById(athleteId);
    if (p) {
      setProfile(p);
      setAchievements(store.getAchievements(p.id));
      setResults(store.getResults({ athleteId: p.id }));
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
        <p className="text-sm text-slate-600">Loading scout evaluation dossier...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Athlete Dossier Not Found</h2>
        <Link to="/scout/dashboard">
          <Button variant="primary" size="sm">Back to Scout Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

      {/* Profile Header */}
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

        {/* Scout Privacy Assurance Banner */}
        <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/50 p-3 rounded-xl border border-amber-100 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Minor Protection Compliance:</strong> Athlete's private contact number and home address are withheld in compliance with grassroots privacy guidelines.
            </span>
          </div>
          <span className="text-[11px] text-amber-700 font-mono hidden sm:inline">Scout Access Verified</span>
        </div>
      </div>

      {/* Performance Passport */}
      <PerformancePassport achievements={achievements} results={results} />

      {/* Verified Achievements */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Verified Digital Achievements ({achievements.length})</span>
        </h2>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} showActions={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No verified achievements recorded yet for this athlete.
          </div>
        )}
      </div>

      {/* Complete Competition History Results */}
      <Card className="border-slate-200">
        <CardHeader
          title={`Grassroots Competition History (${results.length})`}
          subtitle="All sanctioned match results recorded by verified tournament desks"
        />
        <CardContent className="p-0">
          {results.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {results.map((res) => (
                <div key={res.id} className="p-4 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900">{res.event?.title || 'Tournament Match'}</strong>
                      <StatusBadge status={res.status} />
                    </div>
                    <div className="text-slate-500">
                      Score: <span className="font-mono font-semibold text-slate-800">{res.score || 'N/A'}</span> • {formatDate(res.submitted_at)}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 block">
                      Position #{res.position}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No historical match entries recorded.
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Movement Assessment Evidence */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00A6A6]" />
          <span>AI Movement Observation Dossier</span>
        </h2>

        {movementAssessment ? (
          <MovementCard assessment={movementAssessment} showVideoPlayer={true} />
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            No movement test uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};
