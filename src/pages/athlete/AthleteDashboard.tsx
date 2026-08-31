import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Calendar,
  Compass,
  FileCheck2,
  Flame,
  Plus,
  ShieldCheck,
  Trophy,
  User,
  Activity,
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Achievement, Event, MovementAssessment, Registration } from '../../types';
import { formatDate } from '../../lib/utils';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { PerformancePassport } from '../../components/athlete/PerformancePassport';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AthleteDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [movement, setMovement] = useState<MovementAssessment | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    const loadData = () => {
      const regs = store.getRegistrations(undefined, currentUser.id);
      const achs = store.getAchievements(currentUser.id);
      const movs = store.getMovementAssessments(currentUser.id);

      setRegistrations(regs);
      setAchievements(achs);
      if (movs.length > 0) setMovement(movs[0]);
    };

    loadData();
    const unsub = store.subscribe(loadData);
    return () => unsub();
  }, [currentUser]);

  // Profile Completeness calculation
  const calculateCompleteness = () => {
    if (!currentUser) return 0;
    const fields = [
      currentUser.full_name,
      currentUser.age_group,
      currentUser.district,
      currentUser.state,
      currentUser.institution,
      currentUser.academy,
      currentUser.position,
      currentUser.bio
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#12355B] to-[#146C94] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/40 shadow-sm shrink-0 bg-slate-200">
              <img
                src={currentUser?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={currentUser?.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300 text-xs font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Grassroots Athlete
              </div>
              <h1 className="text-2xl font-bold font-['Outfit']">
                Welcome, {currentUser?.full_name || 'Aarav Joshi'}
              </h1>
              <p className="text-xs text-slate-200">
                {currentUser?.sport} ({currentUser?.position || 'Singles Specialist'}) • {currentUser?.district}, {currentUser?.state}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link to="/athlete/events">
              <Button
                variant="primary"
                size="sm"
                className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold border-none"
                leftIcon={<Compass className="w-4 h-4" />}
              >
                Discover Events
              </Button>
            </Link>
            <Link to="/athlete/movement-test">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                leftIcon={<Activity className="w-4 h-4" />}
              >
                AI Movement Test
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Counters & Profile Completeness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Verified Achievements</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#12355B] font-['Outfit']">
              {achievements.length}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block mt-2">
            ✓ Tamper-proof QR enabled
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Registered Tournaments</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#146C94] font-['Outfit']">
              {registrations.length}
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#146C94] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <Link to="/athlete/events" className="text-[11px] text-[#146C94] hover:underline block mt-2">
            Browse open tournaments →
          </Link>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">AI Movement Check</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              {movement ? `${movement.repetitions} Squats` : 'Not Tested'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <Link to="/athlete/movement-test" className="text-[11px] text-[#00A6A6] hover:underline block mt-2">
            {movement ? 'View biomechanics →' : 'Record squat test →'}
          </Link>
        </div>

        {/* Profile Completeness */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Profile Completeness</span>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-black text-slate-900 font-['Outfit']">
              {completeness}%
            </span>
            <Link to="/athlete/profile">
              <Button variant="outline" size="sm" className="text-[11px] h-7 px-2">
                Edit
              </Button>
            </Link>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Performance Passport */}
      <PerformancePassport achievements={achievements} />

      {/* Two Columns: Upcoming Registered Events & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Registered Events */}
        <Card className="border-slate-200">
          <CardHeader
            title="My Event Registrations"
            subtitle="Tournaments you are registered to play in"
            action={
              <Link to="/athlete/events">
                <Button variant="outline" size="sm" className="text-xs">
                  Discover More
                </Button>
              </Link>
            }
          />
          <CardContent className="p-0">
            {registrations.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {registrations.map((reg) => {
                  const evt = reg.event;
                  return (
                    <div key={reg.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={evt?.status || 'OPEN'} />
                          <span className="text-xs font-semibold text-slate-900">
                            {evt?.title || 'Badminton Open'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(evt?.start_date)}
                          </span>
                          <span>•</span>
                          <span>Venue: {evt?.venue}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Reg No: {reg.registration_number}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {reg.checked_in ? (
                          <Badge variant="green" size="sm" dot>Checked In</Badge>
                        ) : (
                          <Badge variant="blue" size="sm">Confirmed</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                No active event registrations found.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievement */}
        <Card className="border-slate-200">
          <CardHeader
            title="Recent Verified Achievement"
            subtitle="Latest credential with authenticated QR seal"
            action={
              <Link to="/athlete/achievements">
                <Button variant="outline" size="sm" className="text-xs">
                  View All ({achievements.length})
                </Button>
              </Link>
            }
          />
          <CardContent>
            {achievements.length > 0 ? (
              <AchievementCard achievement={achievements[0]} showActions={true} />
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                Participate in verified events to earn digital credentials.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
