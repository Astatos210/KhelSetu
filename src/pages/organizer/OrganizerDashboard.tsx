import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  Trophy,
  Users,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event, Registration, Result } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const OrganizerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrationsCount, setRegistrationsCount] = useState(0);
  const [pendingResultsCount, setPendingResultsCount] = useState(0);
  const [verifiedResultsCount, setVerifiedResultsCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    const loadData = () => {
      const allEvents = store.getEvents().filter(e => e.organizer_id === currentUser.id);
      setEvents(allEvents);

      // Aggregate registrations for these events
      let totalRegs = 0;
      allEvents.forEach(e => {
        totalRegs += store.getRegistrations(e.id).length;
      });
      setRegistrationsCount(totalRegs);

      // Aggregate pending & verified results
      const allResults = store.getResults();
      const pending = allResults.filter(r => r.status === 'PENDING_VERIFICATION');
      const verified = allResults.filter(r => r.status === 'VERIFIED');
      setPendingResultsCount(pending.length);
      setVerifiedResultsCount(verified.length);
    };

    loadData();
    const unsub = store.subscribe(loadData);
    return () => unsub();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12355B] via-[#146C94] to-[#12355B] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Building2 className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Organizer Portal
              </span>
              <h1 className="text-2xl font-bold font-['Outfit']">
                {currentUser?.institution || currentUser?.full_name || 'Pune District Sports Academy'}
              </h1>
              <p className="text-xs text-slate-200">
                District: {currentUser?.district}, {currentUser?.state} • Sanctioned Tournament Host
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/organizer/events/new">
              <Button
                variant="primary"
                size="md"
                className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold border-none"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Create Tournament
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Managed Tournaments</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#12355B] font-['Outfit']">
              {events.length}
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#146C94] flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <Link to="/organizer/events" className="text-[11px] text-[#146C94] hover:underline block mt-2">
            View all tournaments →
          </Link>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Athlete Registrations</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-900 font-['Outfit']">
              {registrationsCount}
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00A6A6] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">Across all managed events</span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Pending Verifier Reviews</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-600 font-['Outfit']">
              {pendingResultsCount}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-amber-700 block mt-2">Awaiting referee sign-off</span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Verified Achievements Issued</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#2E8B57] font-['Outfit']">
              {verifiedResultsCount}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2E8B57] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-700 block mt-2">Minted QR credentials</span>
        </div>
      </div>

      {/* Tournaments List Card */}
      <Card className="border-slate-200">
        <CardHeader
          title="Active & Upcoming Tournaments"
          subtitle="Manage tournament rosters, check in players, and submit official match scorecards"
          action={
            <Link to="/organizer/events/new">
              <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                New Event
              </Button>
            </Link>
          }
        />
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {events.map((evt) => {
              const regCount = store.getRegistrations(evt.id).length;
              return (
                <div
                  key={evt.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="navy" size="sm">{evt.event_level}</Badge>
                      <StatusBadge status={evt.status} />
                      <span className="text-xs text-slate-500 font-mono">
                        {regCount} Players Registered
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">
                      {evt.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>Category: <strong>{evt.category}</strong></span>
                      <span>•</span>
                      <span>Venue: {evt.venue}</span>
                      <span>•</span>
                      <span>Dates: {formatDate(evt.start_date)} - {formatDate(evt.end_date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/organizer/events/${evt.id}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Roster & Check-In
                      </Button>
                    </Link>

                    <Link to={`/organizer/events/${evt.id}/results`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Record Results
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
