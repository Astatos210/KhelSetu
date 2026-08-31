import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Trophy,
  MapPin,
  Building2,
  ShieldCheck,
  Award,
  ChevronRight,
  Activity,
  User,
  Flame
} from 'lucide-react';
import { store } from '../../data/store';
import { Achievement, Profile } from '../../types';
import { calculatePerformancePassport } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const ScoutDashboard: React.FC = () => {
  const [athletes, setAthletes] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('ALL');
  const [minVerifiedWins, setMinVerifiedWins] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');

  useEffect(() => {
    const loadAthletes = () => {
      // Scouts search only public athletes
      const allProfiles = store.getProfiles();
      const athleteProfiles = allProfiles.filter(p => p.role === 'ATHLETE' && p.is_public);
      setAthletes(athleteProfiles);
    };

    loadAthletes();
    const unsub = store.subscribe(loadAthletes);
    return () => unsub();
  }, []);

  const districts = ['ALL', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Kolhapur', 'Satara', 'Thane'];
  const ageGroups = ['ALL', 'U-15', 'U-17', 'U-19', 'Senior'];

  // Filter athletes
  const filteredAthletes = athletes.filter((ath) => {
    const achs = store.getAchievements(ath.id);
    const passport = calculatePerformancePassport(achs);

    const matchesSearch =
      ath.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ath.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ath.institution && ath.institution.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ath.position && ath.position.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDistrict = selectedDistrict === 'ALL' || ath.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesAge = selectedAgeGroup === 'ALL' || ath.age_group === selectedAgeGroup;

    let matchesWins = true;
    if (minVerifiedWins === '1+') matchesWins = passport.verifiedWinsCount >= 1;
    if (minVerifiedWins === '2+') matchesWins = passport.verifiedWinsCount >= 2;
    if (minVerifiedWins === 'PODIUM') matchesWins = passport.verifiedEventsCount >= 1;

    let matchesLevel = true;
    if (selectedLevel !== 'ALL') {
      matchesLevel = achs.some(a => a.event_level.toLowerCase().includes(selectedLevel.toLowerCase()));
    }

    return matchesSearch && matchesDistrict && matchesAge && matchesWins && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            Scout Talent Discovery
          </h1>
          <p className="text-xs text-slate-500">
            Search verified grassroots badminton talent across Western India with tamper-proof records
          </p>
        </div>

        <Badge variant="warning" size="md" dot>
          Scout Portal: Verified Grassroots Filter Active
        </Badge>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by athlete name, district, institution, or discipline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
          />
        </div>

        {/* Filter dropdowns row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">All Districts</option>
              {districts.filter(d => d !== 'ALL').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Age Category</label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">All Age Categories</option>
              {ageGroups.filter(a => a !== 'ALL').map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Verified Achievements</label>
            <select
              value={minVerifiedWins}
              onChange={(e) => setMinVerifiedWins(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">Any Achievement Level</option>
              <option value="PODIUM">At least 1 Podium Finish</option>
              <option value="1+">At least 1 Tournament Win (Gold)</option>
              <option value="2+">2+ Tournament Wins</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Event Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">All Competition Levels</option>
              <option value="District">District Championships</option>
              <option value="Inter-College">Inter-College</option>
              <option value="Grassroots">Grassroots Academy</option>
              <option value="State">State Open</option>
            </select>
          </div>
        </div>
      </div>

      {/* Athletes Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((ath) => {
          const achs = store.getAchievements(ath.id);
          const movements = store.getMovementAssessments(ath.id);
          const passport = calculatePerformancePassport(achs);
          const latestAch = achs.length > 0 ? achs[0] : null;

          return (
            <Card key={ath.id} hoverable className="border-slate-200 flex flex-col justify-between">
              <div className="p-6 space-y-4">
                {/* Athlete Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0 bg-slate-200 shadow-xs">
                      <img
                        src={ath.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                        alt={ath.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {ath.full_name}
                      </h3>
                      <span className="text-xs font-semibold text-[#146C94]">
                        {ath.sport} ({ath.position || 'Singles Specialist'})
                      </span>
                    </div>
                  </div>

                  <Badge variant="teal" size="sm">
                    {ath.age_group}
                  </Badge>
                </div>

                {/* Location & Institution */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ath.district}, {ath.state}</span>
                  </div>
                  {ath.institution && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ath.institution}</span>
                    </div>
                  )}
                </div>

                {/* Performance Passport Highlights */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Verified Wins</span>
                    <strong className="text-sm font-bold text-amber-700">{passport.verifiedWinsCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Podium Finishes</span>
                    <strong className="text-sm font-bold text-slate-800">{passport.verifiedEventsCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Prototype Pts</span>
                    <strong className="text-sm font-bold text-[#2E8B57]">{passport.prototypePoints}</strong>
                  </div>
                </div>

                {/* Latest Achievement / AI Movement status */}
                <div className="text-xs space-y-1.5">
                  {latestAch ? (
                    <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-950">
                      <span className="text-[10px] uppercase font-bold text-amber-700 block">Latest Credential:</span>
                      <span className="font-semibold truncate block">{latestAch.title}</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-[11px]">
                      Awaiting tournament verification
                    </div>
                  )}

                  {movements.length > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-[#00A6A6] font-semibold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>AI Squat Video Evidence Available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Public Record
                </span>

                <Link to={`/scout/athletes/${ath.id}`}>
                  <Button variant="primary" size="sm" className="text-xs">
                    <span>Evaluate Profile</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAthletes.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No athletes match the current search or filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the district or achievement filters.</p>
        </div>
      )}
    </div>
  );
};
