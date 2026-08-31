import React from 'react';
import { ShieldCheck, Trophy, Medal, Award, Flame, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { Achievement, Result } from '../../types';
import { calculatePerformancePassport, formatDate } from '../../lib/utils';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';

interface PerformancePassportProps {
  achievements: Achievement[];
  results?: Result[];
  compact?: boolean;
}

export const PerformancePassport: React.FC<PerformancePassportProps> = ({
  achievements,
  results = [],
  compact = false
}) => {
  const passport = calculatePerformancePassport(achievements, results);

  const getReliabilityBadge = (score: 'High' | 'Medium' | 'Low') => {
    switch (score) {
      case 'High':
        return <Badge variant="green" size="sm" dot>Reliability: High (3+ Verified Records)</Badge>;
      case 'Medium':
        return <Badge variant="blue" size="sm" dot>Reliability: Medium (1-2 Verified Records)</Badge>;
      case 'Low':
        return <Badge variant="warning" size="sm" dot>Reliability: Initial (Awaiting Verification)</Badge>;
    }
  };

  return (
    <Card className="border-slate-200 bg-white">
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#12355B]" />
            <span>Grassroots Performance Passport</span>
          </div>
        }
        subtitle="Transparent verified competition history & prototype scoring"
        action={getReliabilityBadge(passport.reliabilityScore)}
      />

      <CardContent className="space-y-5">
        {/* Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
            <span className="text-xs text-slate-500 font-medium block mb-1">Verified Events</span>
            <div className="flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4 text-[#146C94]" />
              <span className="text-xl font-bold text-slate-900">{passport.verifiedEventsCount}</span>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-100 p-3.5 rounded-xl text-center">
            <span className="text-xs text-amber-800 font-medium block mb-1">Tournament Wins</span>
            <div className="flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="text-xl font-bold text-amber-900">{passport.verifiedWinsCount}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
            <span className="text-xs text-slate-500 font-medium block mb-1">Runner-up Finishes</span>
            <div className="flex items-center justify-center gap-1.5">
              <Medal className="w-4 h-4 text-slate-500" />
              <span className="text-xl font-bold text-slate-800">{passport.verifiedRunnerUpCount}</span>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 p-3.5 rounded-xl text-center">
            <span className="text-xs text-[#2E8B57] font-medium block mb-1">Prototype Points</span>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-[#2E8B57]" />
              <span className="text-xl font-bold text-emerald-950">{passport.prototypePoints} pts</span>
            </div>
          </div>
        </div>

        {/* Level Breakdown & Latest Result */}
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
              <h5 className="font-semibold text-slate-700">Competition Level Distribution</h5>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span className="text-slate-600">District-Level Competitions</span>
                <span className="font-bold text-slate-900">{passport.districtEventsCount}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Inter-College / Open Tournaments</span>
                <span className="font-bold text-slate-900">{passport.collegeEventsCount}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
              <h5 className="font-semibold text-slate-700">Latest Verified Event</h5>
              {passport.latestVerifiedResult ? (
                <div className="space-y-1">
                  <div className="font-medium text-slate-900 truncate">
                    {passport.latestVerifiedResult.eventName}
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Position: <strong>#{passport.latestVerifiedResult.position}</strong></span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(passport.latestVerifiedResult.date)}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    ID: {passport.latestVerifiedResult.credentialId}
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 italic">No verified tournament result recorded yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="flex items-start gap-2 text-xs text-slate-500 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
          <Info className="w-4 h-4 text-[#146C94] shrink-0 mt-0.5" />
          <p>
            <strong>Transparent Prototype Scoring:</strong> Verified participation (1 pt), Semi-final (3 pts), Runner-up (5 pts), Winner (8 pts). 
            <span className="italic block text-slate-500 mt-0.5">
              "This is a prototype points system, not an official federation ranking or talent guarantee."
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
