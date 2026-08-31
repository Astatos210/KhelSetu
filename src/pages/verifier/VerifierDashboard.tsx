import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  RotateCcw,
  ShieldCheck,
  Trophy,
  User,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Result } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const VerifierDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState<Result[]>([]);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'CORRECTION'>('PENDING');

  useEffect(() => {
    const loadResults = () => {
      const allResults = store.getResults();
      setResults(allResults);
    };

    loadResults();
    const unsub = store.subscribe(loadResults);
    return () => unsub();
  }, []);

  const pendingList = results.filter(r => r.status === 'PENDING_VERIFICATION');
  const verifiedList = results.filter(r => r.status === 'VERIFIED');
  const correctionList = results.filter(r => r.status === 'CORRECTION_REQUIRED' || r.status === 'REJECTED');

  const getFilteredList = () => {
    switch (statusFilter) {
      case 'PENDING':
        return pendingList;
      case 'VERIFIED':
        return verifiedList;
      case 'CORRECTION':
        return correctionList;
      default:
        return results;
    }
  };

  const displayedResults = getFilteredList();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12355B] to-[#146C94] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Technical Referee Verification Portal
              </span>
              <h1 className="text-2xl font-bold font-['Outfit']">
                {currentUser?.full_name || 'Dr. Sunita Rao'}
              </h1>
              <p className="text-xs text-slate-200">
                {currentUser?.institution || 'Maharashtra College Sports Council'} • Certified National Technical Official
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="green" size="lg" dot>
              Independent Sign-off Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter('PENDING')}
          className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'PENDING'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">Pending Review Queue</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-amber-950 font-['Outfit'] block mt-1">
            {pendingList.length}
          </span>
          <span className="text-[11px] text-amber-700 block mt-1">Needs verification sign-off</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('VERIFIED')}
          className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'VERIFIED'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2E8B57]">Approved & Minted</span>
            <CheckCircle2 className="w-5 h-5 text-[#2E8B57]" />
          </div>
          <span className="text-3xl font-black text-emerald-950 font-['Outfit'] block mt-1">
            {verifiedList.length}
          </span>
          <span className="text-[11px] text-[#2E8B57] block mt-1">QR credentials active</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('CORRECTION')}
          className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'CORRECTION'
              ? 'bg-red-50 border-red-300 ring-2 ring-red-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-800">Corrections & Rejected</span>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-3xl font-black text-red-950 font-['Outfit'] block mt-1">
            {correctionList.length}
          </span>
          <span className="text-[11px] text-red-700 block mt-1">Sent back to organizer</span>
        </button>
      </div>

      {/* Review Queue Table / List */}
      <Card className="border-slate-200">
        <CardHeader
          title={`Verification Review Roster (${displayedResults.length})`}
          subtitle="Audit match sheet evidence before approving tamper-proof digital achievements"
          action={
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('PENDING')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${statusFilter === 'PENDING' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('VERIFIED')}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${statusFilter === 'VERIFIED' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Verified
              </button>
            </div>
          }
        />
        <CardContent className="p-0">
          {displayedResults.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {displayedResults.map((res) => {
                const ath = res.athlete;
                const evt = res.event;
                return (
                  <div
                    key={res.id}
                    className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={res.status} />
                        <span className="text-xs font-semibold text-slate-700">
                          {evt?.title}
                        </span>
                        <span className="text-xs text-slate-400">• {evt?.category}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                          <img
                            src={ath?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                            alt={ath?.full_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-sm font-bold text-slate-900">{ath?.full_name}</strong>
                            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Position #{res.position} ({res.position === 1 ? 'Winner' : res.position === 2 ? 'Runner-up' : 'Podium'})
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {ath?.district}, {ath?.state} • {ath?.institution || 'Club'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                        <div>
                          <span className="text-slate-400">Score: </span>
                          <strong>{res.score || 'Recorded by tournament desk'}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400">Submitted by: </span>
                          <span>{res.submitter?.full_name || 'Tournament Director'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Date: </span>
                          <span>{formatDate(res.submitted_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/verifier/results/${res.id}`}>
                        <Button
                          variant={res.status === 'PENDING_VERIFICATION' ? 'primary' : 'outline'}
                          size="sm"
                          className="text-xs"
                          rightIcon={<FileCheck2 className="w-4 h-4" />}
                        >
                          {res.status === 'PENDING_VERIFICATION' ? 'Review & Sign-Off' : 'View Verification Audit'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              No results found for the selected status filter.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
