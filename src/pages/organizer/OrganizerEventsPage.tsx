import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Trophy, Users, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const OrganizerEventsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    const loadEvents = () => {
      const orgEvents = store.getEvents().filter(e => e.organizer_id === currentUser.id);
      setEvents(orgEvents);
    };

    loadEvents();
    const unsub = store.subscribe(loadEvents);
    return () => unsub();
  }, [currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            Tournament Management
          </h1>
          <p className="text-xs text-slate-500">
            View active, draft, and completed tournaments hosted by your organization
          </p>
        </div>

        <Link to="/organizer/events/new">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Tournament
          </Button>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => {
          const regCount = store.getRegistrations(evt.id).length;
          const resCount = store.getResults({ eventId: evt.id }).length;

          return (
            <Card key={evt.id} hoverable className="border-slate-200 flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="navy" size="sm">{evt.event_level}</Badge>
                  <StatusBadge status={evt.status} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {evt.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#146C94] block mt-0.5">
                    Category: {evt.category}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{formatDate(evt.start_date)} - {formatDate(evt.end_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{evt.venue}, {evt.district}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2E8B57] shrink-0" />
                    <span>Assigned Verifier: <strong>{evt.verifier?.full_name || 'Dr. Sunita Rao'}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                    <span className="text-slate-500 block text-[11px]">Athletes Registered</span>
                    <strong className="text-base font-bold text-slate-900">{regCount}</strong>
                  </div>
                  <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                    <span className="text-slate-500 block text-[11px]">Recorded Results</span>
                    <strong className="text-base font-bold text-slate-900">{resCount}</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link to={`/organizer/events/${evt.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Roster & Attendance
                  </Button>
                </Link>

                <Link to={`/organizer/events/${evt.id}/results`}>
                  <Button variant="primary" size="sm" className="text-xs">
                    Submit Results
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
