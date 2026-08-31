import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Upload,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Event, Registration, Result } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Alert } from '../../components/common/EmptyState';

export const OrganizerResultsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  // Submission Form State
  const [selectedAthleteId, setSelectedAthleteId] = useState('');
  const [position, setPosition] = useState(1);
  const [score, setScore] = useState('21-18, 21-16');
  const [performanceValue, setPerformanceValue] = useState('8');
  const [evidenceUrl, setEvidenceUrl] = useState('https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&fit=crop&q=80');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    const loadData = () => {
      const e = store.getEventById(eventId);
      setEvent(e || null);

      const regs = store.getRegistrations(eventId);
      setRegistrations(regs);
      if (regs.length > 0 && !selectedAthleteId) {
        setSelectedAthleteId(regs[0].athlete_id);
      }

      const resList = store.getResults({ eventId });
      setResults(resList);
    };

    loadData();
    const unsub = store.subscribe(loadData);
    return () => unsub();
  }, [eventId]);

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !currentUser || !selectedAthleteId) return;

    store.submitResult({
      event_id: event.id,
      athlete_id: selectedAthleteId,
      position: Number(position),
      score: score.trim(),
      performance_value: Number(performanceValue) || undefined,
      evidence_file_url: evidenceUrl.trim(),
      submitted_by: currentUser.id
    });

    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to={`/organizer/events/${event.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Event Roster
      </Link>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="navy" size="sm">{event.event_level}</Badge>
          <Badge variant="teal" size="sm" dot>Result Submission Desk</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Match Scores & Evidence Entry: {event.title}
        </h1>
        <p className="text-xs text-slate-500">
          Submit verified match scores and attach official scoresheets. All submissions enter the independent verifier review queue with audit logs.
        </p>
      </div>

      {/* Security notice alert */}
      <Alert type="info">
        <div className="font-semibold text-slate-900">Decentralized Two-Step Integrity Protocol:</div>
        <p className="text-slate-600 text-xs mt-0.5">
          As an organizer, your submissions are marked <strong>PENDING_VERIFICATION</strong>. The platform strictly prohibits organizers from self-approving results. <strong>{event.verifier?.full_name || 'Assigned Technical Verifier'}</strong> will perform independent audit before official digital credentials and QR codes are minted.
        </p>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Result Submission Form */}
        <div className="lg:col-span-5">
          <Card className="border-slate-200">
            <CardHeader
              title="Record Athlete Position"
              subtitle="Enter match scores and upload signed scoresheet"
            />
            <CardContent>
              <form onSubmit={handleSubmitResult} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Athlete *
                  </label>
                  <select
                    value={selectedAthleteId}
                    onChange={(e) => setSelectedAthleteId(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                  >
                    {registrations.length === 0 ? (
                      <option value="">No registered athletes available</option>
                    ) : (
                      registrations.map((reg) => (
                        <option key={reg.athlete_id} value={reg.athlete_id}>
                          {reg.athlete?.full_name} ({reg.registration_number}) - {reg.athlete?.institution || 'Club'}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Finish Position / Standing *
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                  >
                    <option value={1}>Position #1 (Gold / Winner - 8 pts)</option>
                    <option value={2}>Position #2 (Silver / Runner-up - 5 pts)</option>
                    <option value={3}>Position #3 (Bronze / 3rd Place - 3 pts)</option>
                    <option value={4}>Position #4 (Semi-Finalist - 3 pts)</option>
                    <option value={5}>Position #5 (Quarter-Finalist - 1 pt)</option>
                    <option value={6}>Participation (Round of 16 - 1 pt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Match Score / Set Breakdown *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 21-18, 19-21, 21-16"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Performance Metric / Points
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 8.0"
                    value={performanceValue}
                    onChange={(e) => setPerformanceValue(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Match Scoresheet Evidence URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://... signed match sheet image/PDF"
                    value={evidenceUrl}
                    onChange={(e) => setEvidenceUrl(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B]"
                  />
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Attach link to scanned referee scoresheet or match log.
                  </span>
                </div>

                {evidenceUrl && (
                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2">
                    <span className="text-[10px] text-slate-400 block mb-1">Evidence Preview:</span>
                    <img
                      src={evidenceUrl}
                      alt="Scoresheet evidence"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    leftIcon={<FileCheck2 className="w-4 h-4" />}
                  >
                    Submit for Independent Verification
                  </Button>
                </div>

                {successMessage && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium animate-in fade-in duration-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    <span>Result submitted! Queued for technical verifier review.</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Recorded Results for this Event */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="border-slate-200">
            <CardHeader
              title={`Submitted Event Results (${results.length})`}
              subtitle="Current status of all submitted scores for this tournament"
            />
            <CardContent className="p-0">
              {results.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {results.map((res) => {
                    const ath = res.athlete;
                    return (
                      <div key={res.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                              <img
                                src={ath?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                                alt={ath?.full_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">
                                  {ath?.full_name}
                                </span>
                                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Position #{res.position}
                                </span>
                              </div>
                              <span className="text-xs text-slate-500">
                                {ath?.district}, {ath?.state} • {ath?.institution || 'Club'}
                              </span>
                            </div>
                          </div>

                          <StatusBadge status={res.status} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                          <div>
                            <span className="text-slate-400 block text-[10px]">MATCH SCORE:</span>
                            <span className="text-slate-800 font-bold">{res.score || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">SUBMISSION DATE:</span>
                            <span className="text-slate-700">{formatDate(res.submitted_at)}</span>
                          </div>
                        </div>

                        {res.evidence_file_url && (
                          <div className="flex items-center justify-between text-xs pt-1">
                            <a
                              href={res.evidence_file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#146C94] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View Attached Scoresheet Evidence
                            </a>

                            <span className="text-slate-400 text-[11px]">
                              Audit: {res.id}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500">
                  No results recorded for this tournament yet. Use the form on the left to submit match positions.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
