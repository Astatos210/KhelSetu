import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Trophy,
  User,
  Users,
  Award,
  Clock,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event, Registration } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const OrganizerEventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    if (!eventId) return;
    const loadData = () => {
      const e = store.getEventById(eventId);
      setEvent(e || null);
      const regs = store.getRegistrations(eventId);
      setRegistrations(regs);
    };

    loadData();
    const unsub = store.subscribe(loadData);
    return () => unsub();
  }, [eventId]);

  if (!event) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Tournament Not Found</h2>
        <Link to="/organizer/events">
          <Button variant="primary" size="sm">Back to Tournaments</Button>
        </Link>
      </div>
    );
  }

  const checkedInCount = registrations.filter(r => r.checked_in).length;

  const handleToggleCheckIn = (regId: string) => {
    store.toggleCheckIn(regId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to="/organizer/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tournaments
      </Link>

      {/* Event Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="navy" size="sm">{event.event_level}</Badge>
            <StatusBadge status={event.status} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span>Category: <strong>{event.category}</strong></span>
            <span>•</span>
            <span>Venue: {event.venue}, {event.district}</span>
            <span>•</span>
            <span>Dates: {formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
          </div>
        </div>

        <Link to={`/organizer/events/${event.id}/results`}>
          <Button variant="primary" size="md" leftIcon={<Trophy className="w-4 h-4" />}>
            Record & Submit Results
          </Button>
        </Link>
      </div>

      {/* Quick Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 block">Total Registered Athletes</span>
          <span className="text-2xl font-bold text-slate-900">{registrations.length}</span>
        </div>
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 text-center">
          <span className="text-xs text-[#2E8B57] block">Checked-In on Site</span>
          <span className="text-2xl font-bold text-[#2E8B57]">{checkedInCount}</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 block">Assigned Technical Verifier</span>
          <span className="text-sm font-bold text-slate-800">{event.verifier?.full_name || 'Dr. Sunita Rao'}</span>
        </div>
      </div>

      {/* Registered Athletes Roster */}
      <Card className="border-slate-200">
        <CardHeader
          title={`Registered Athlete Roster (${registrations.length})`}
          subtitle="Mark on-site attendance or jump to record match scores"
        />
        <CardContent className="p-0">
          {registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Athlete</th>
                    <th className="px-6 py-3.5">Category & District</th>
                    <th className="px-6 py-3.5">Pass / Reg ID</th>
                    <th className="px-6 py-3.5 text-center">Attendance</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations.map((reg) => {
                    const ath = reg.athlete;
                    return (
                      <tr key={reg.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                              <img
                                src={ath?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                                alt={ath?.full_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <strong className="text-slate-900 block">{ath?.full_name}</strong>
                              <span className="text-[11px] text-slate-500">{ath?.institution || 'Independent Athlete'}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          <div>{ath?.age_group} • {ath?.gender}</div>
                          <div className="text-[11px] text-slate-400">{ath?.district}, {ath?.state}</div>
                        </td>

                        <td className="px-6 py-4 font-mono text-slate-700">
                          {reg.registration_number}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleCheckIn(reg.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                              reg.checked_in
                                ? 'bg-emerald-100 text-[#2E8B57] hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {reg.checked_in ? <Check className="w-3.5 h-3.5" /> : null}
                            {reg.checked_in ? 'Checked In' : 'Mark Attendance'}
                          </button>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Link to={`/organizer/events/${event.id}/results`}>
                            <Button variant="outline" size="sm" className="text-xs h-7">
                              Record Score
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No athletes registered for this tournament yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
