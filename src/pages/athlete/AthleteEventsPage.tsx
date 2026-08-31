import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

export const AthleteEventsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');

  // Quick Register Modal state
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = () => {
      // Filter only APPROVED or OPEN events for public/athlete discovery
      const allEvents = store.getEvents();
      const discoverable = allEvents.filter(e => e.status === 'APPROVED' || e.status === 'OPEN');
      setEvents(discoverable);
    };

    loadEvents();
    const unsub = store.subscribe(loadEvents);
    return () => unsub();
  }, []);

  // Filter logic
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'ALL' || evt.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesLevel = selectedLevel === 'ALL' || evt.event_level.toLowerCase() === selectedLevel.toLowerCase();

    return matchesSearch && matchesDistrict && matchesLevel;
  });

  const districts = ['ALL', 'Pune', 'Mumbai', 'Nagpur'];
  const eventLevels = ['ALL', 'District', 'Inter-College', 'Grassroots Academy', 'State Open'];

  const handleRegisterConfirm = () => {
    if (!registeringEvent || !currentUser) return;
    const reg = store.registerAthleteForEvent(registeringEvent.id, currentUser.id);
    setRegistrationSuccess(reg.registration_number);
  };

  const handleCloseModal = () => {
    setRegisteringEvent(null);
    setRegistrationSuccess(null);
  };

  // Check if athlete is registered for an event
  const isRegistered = (eventId: string) => {
    if (!currentUser) return false;
    const regs = store.getRegistrations(eventId, currentUser.id);
    return regs.length > 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            Discover Sanctioned Tournaments
          </h1>
          <p className="text-xs text-slate-500">
            Browse official grassroots badminton events with verified certificate issuance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" size="md" dot>
            Verified Organizers & Referees Only
          </Badge>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by event title, category, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            />
          </div>

          {/* District Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">All Districts</option>
              {districts.filter(d => d !== 'ALL').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Event Level Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
            >
              <option value="ALL">All Competition Levels</option>
              {eventLevels.filter(l => l !== 'ALL').map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const registered = isRegistered(evt.id);
          return (
            <Card key={evt.id} hoverable className="border-slate-200 flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="navy" size="sm">
                    {evt.event_level}
                  </Badge>
                  <StatusBadge status={evt.status} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-[#146C94] transition-colors">
                    <Link to={`/athlete/events/${evt.id}`}>{evt.title}</Link>
                  </h3>
                  <span className="text-xs font-semibold text-[#146C94] block mt-1">
                    Category: {evt.category}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {formatDate(evt.start_date)} - {formatDate(evt.end_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.venue}, {evt.district}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">Organizer: {evt.organizer?.institution || evt.organizer?.full_name}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link to={`/athlete/events/${evt.id}`} className="text-xs font-semibold text-[#146C94] hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                {registered ? (
                  <Badge variant="green" size="sm" dot>Registered</Badge>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setRegisteringEvent(evt)}
                  >
                    Register Now
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No tournaments match your filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the district or level filters.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('ALL');
              setSelectedLevel('ALL');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Registration Confirmation Modal */}
      <Modal
        isOpen={Boolean(registeringEvent)}
        onClose={handleCloseModal}
        title={registrationSuccess ? 'Registration Confirmed!' : 'Confirm Tournament Registration'}
      >
        {registrationSuccess ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#2E8B57] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{registeringEvent?.title}</h4>
              <p className="text-xs text-slate-500 mt-1">You are registered as <strong>{currentUser?.full_name}</strong></p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
              <span className="text-slate-500 block">Registration Pass Number:</span>
              <span className="text-base font-bold text-slate-900">{registrationSuccess}</span>
            </div>
            <Button variant="primary" size="sm" className="w-full" onClick={handleCloseModal}>
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <h4 className="font-bold text-sm text-slate-900">{registeringEvent?.title}</h4>
              <p>Category: <strong>{registeringEvent?.category}</strong></p>
              <p>Venue: {registeringEvent?.venue}, {registeringEvent?.district}</p>
              <p>Dates: {formatDate(registeringEvent?.start_date)} to {formatDate(registeringEvent?.end_date)}</p>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">Athlete Details:</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div>Name: <strong>{currentUser?.full_name}</strong></div>
                <div>Category: {currentUser?.age_group} • {currentUser?.gender}</div>
                <div>Institution: {currentUser?.institution || 'Independent Grassroots'}</div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" size="sm" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleRegisterConfirm}>
                Confirm Registration
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
