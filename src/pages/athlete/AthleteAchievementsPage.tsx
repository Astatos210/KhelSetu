import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck, QrCode, ExternalLink, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Achievement } from '../../types';
import { AchievementCard } from '../../components/achievement/AchievementCard';
import { PerformancePassport } from '../../components/athlete/PerformancePassport';
import { Button } from '../../components/common/Button';

export const AthleteAchievementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const loadAchievements = () => {
      const achs = store.getAchievements(currentUser.id);
      setAchievements(achs);
    };

    loadAchievements();
    const unsub = store.subscribe(loadAchievements);
    return () => unsub();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            My Verified Achievements
          </h1>
          <p className="text-xs text-slate-500">
            Tamper-proof digital credentials minted upon independent verifier sign-off
          </p>
        </div>

        <Link to="/athlete/events">
          <Button variant="outline" size="sm" leftIcon={<Award className="w-4 h-4" />}>
            Compete in Tournaments
          </Button>
        </Link>
      </div>

      {/* Performance Passport */}
      <PerformancePassport achievements={achievements} />

      {/* Credentials Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Issued Digital Credentials ({achievements.length})</span>
        </h2>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} showActions={true} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Trophy className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Verified Achievements Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once an organizer records your match position and the certified verifier approves the scoresheet, your tamper-proof credential will appear here.
            </p>
            <Link to="/athlete/events">
              <Button variant="primary" size="sm" className="mt-2">
                Browse Events to Compete
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
