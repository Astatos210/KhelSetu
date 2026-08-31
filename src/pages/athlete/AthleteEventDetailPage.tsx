import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  QrCode,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event, Registration } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';

export const AthleteEventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [registrationsCount, setRegistrationsCount] = useState(0);

  useEffect(() => {
    if (!eventId) return;
    const loadEvent = () => {
      const e = store.getEventById(eventId);
      setEvent(e || null);

      if (currentUser && e) {
        const regs = store.getRegistrations(e.id, currentUser.id);
        setRegistration(regs.length > 0 ? regs[0] : null);
      }

      const allEventRegs = store.getRegistrations(eventId);
      setRegistrationsCount(allEventRegs.length);
    };

    loadEvent();
    const unsub = store.subscribe(loadEvent);
    return () => unsub();
  }, [eventId, currentUser]);

  if (!event) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Tournament Not Found</h2>
        <p className="text-xs text-slate-600 mb-6">The requested tournament record could not be found.</p>
        <Link to="/athlete/events">
          <Button variant="primary" size="sm">Browse Tournaments</Button>
        </Link>
      </div>
    );
  }

  const handleRegister = () => {
    if (!currentUser) return;
    const reg = store.registerAthleteForEvent(event.id, currentUser.id);
    setRegistration(reg);
  };

  const isDeadlinePassed = new Date(event.registration_deadline) < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        to="/athlete/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Tournaments
      </Link>

      {/* Main Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="sm">{event.event_level} Level</Badge>
              <StatusBadge status={event.status} />
              <Badge variant="teal" size="sm" dot>Badminton</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {event.title}
            </h1>
            <p className="text-sm font-semibold text-[#146C94]">
              Category: {event.category}
            </p>
          </div>

          <div className="shrink-0">
            {registration ? (
              <Badge variant="green" size="lg" dot>
                Registered & Confirmed
              </Badge>
            ) : (
              <Button
                variant="primary"
                size="md"
                disabled={isDeadlinePassed}
                onClick={handleRegister}
              >
                {isDeadlinePassed ? 'Registration Closed' : 'Register for Tournament'}
              </Button>
            )}
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Calendar className="w-4 h-4 text-[#146C94] shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block font-medium">Tournament Dates</span>
              <strong className="text-slate-800">{formatDate(event.start_date)} - {formatDate(event.end_date)}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <MapPin className="w-4 h-4 text-[#146C94] shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block font-medium">Venue & Location</span>
              <strong className="text-slate-800">{event.venue}, {event.district}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block font-medium">Registration Deadline</span>
              <strong className="text-slate-800">{formatDate(event.registration_deadline)}</strong>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Tournament Overview & Sanction Details</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {event.description || 'Official district-level tournament adhering to grassroots verification guidelines.'}
          </p>
        </div>

        {/* Officials & Authority Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Organizing Body</span>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="font-semibold text-slate-800">
                {event.organizer?.institution || event.organizer?.full_name || 'Pune District Sports Academy'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Assigned Technical Verifier</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
              <span className="font-semibold text-slate-800">
                {event.verifier?.full_name || 'Dr. Sunita Rao (Chief Technical Referee)'}
              </span>
            </div>
          </div>
        </div>

        {/* Registration QR Pass Section (If Registered) */}
        {registration && (
          <div className="p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                <span>Confirmed Digital Player Pass</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Player Pass: {registration.registration_number}
              </h3>
              <p className="text-xs text-slate-600 max-w-md">
                Present this digital QR pass at tournament check-in desk for match queue assignment.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Status: {registration.checked_in ? '✓ Checked-In On Site' : 'Pending On-Site Check-In'}
              </div>
            </div>

            <div className="shrink-0 p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <QRCodeSVG
                value={`KHELSETU-PASS:${registration.registration_number}`}
                size={110}
                level="M"
              />
              <span className="text-[10px] text-slate-400 font-mono block mt-1">Player Check-in QR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
