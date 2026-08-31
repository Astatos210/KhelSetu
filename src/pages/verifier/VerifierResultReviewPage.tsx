import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FileText,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  User,
  XCircle,
  Building2,
  Calendar,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { store } from '../../data/store';
import { Achievement, Event, Profile, Result } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge, StatusBadge } from '../../components/common/Badge';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { QrModal } from '../../components/achievement/QrModal';

export const VerifierResultReviewPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = useState<Result | null>(null);
  const [comments, setComments] = useState('');
  const [createdAchievement, setCreatedAchievement] = useState<Achievement | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [actionDoneMessage, setActionDoneMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) return;
    const loadResult = () => {
      const res = store.getResultById(resultId);
      setResult(res || null);

      if (res && res.status === 'VERIFIED') {
        const achs = store.getAchievements(res.athlete_id);
        const matched = achs.find(a => a.result_id === res.id);
        if (matched) setCreatedAchievement(matched);
      }
    };

    loadResult();
    const unsub = store.subscribe(loadResult);
    return () => unsub();
  }, [resultId]);

  if (!result) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Result Record Not Found</h2>
        <Link to="/verifier/dashboard">
          <Button variant="primary" size="sm">Back to Review Queue</Button>
        </Link>
      </div>
    );
  }

  const ath = result.athlete;
  const evt = result.event;

  const handleAction = (action: 'APPROVED' | 'REJECTED' | 'CORRECTION_REQUESTED') => {
    if (!currentUser) return;

    const { achievement } = store.verifyResult({
      result_id: result.id,
      verifier_id: currentUser.id,
      action,
      comments: comments.trim() || undefined
    });

    if (action === 'APPROVED' && achievement) {
      setCreatedAchievement(achievement);
      setActionDoneMessage('Result officially verified! Achievement and tamper-proof QR credential issued.');
    } else if (action === 'REJECTED') {
      setActionDoneMessage('Result rejected. Status updated with audit trail.');
    } else if (action === 'CORRECTION_REQUESTED') {
      setActionDoneMessage('Correction requested. Returned to organizer queue.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          to="/verifier/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Verification Queue
        </Link>
        <StatusBadge status={result.status} />
      </div>

      {/* Header Summary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="green" size="sm" dot>Official Referee Sign-off Desk</Badge>
          <Badge variant="navy" size="sm">{evt?.event_level}</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Review Match Result #{result.position} ({result.position === 1 ? 'Winner' : result.position === 2 ? 'Runner-up' : 'Podium Finish'})
        </h1>
        <p className="text-xs text-slate-500">
          Tournament: <strong>{evt?.title}</strong> ({evt?.category})
        </p>
      </div>

      {actionDoneMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#2E8B57]" />
            <span>{actionDoneMessage}</span>
          </div>
          {createdAchievement && (
            <Button
              variant="primary"
              size="sm"
              className="text-xs"
              onClick={() => setShowQrModal(true)}
              leftIcon={<QrCode className="w-4 h-4" />}
            >
              View Minted QR
            </Button>
          )}
        </div>
      )}

      {/* Detailed Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Athlete Info */}
        <Card className="border-slate-200">
          <CardHeader title="Competitor Details" subtitle="Registered athlete profile" />
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={ath?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={ath?.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{ath?.full_name}</h3>
                <span className="text-xs text-slate-500">
                  {ath?.age_group} • {ath?.gender} • {ath?.district}, {ath?.state}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>Institution: <strong>{ath?.institution || 'Independent Athlete'}</strong></div>
              <div>Academy: <strong>{ath?.academy || 'Grassroots District'}</strong></div>
              <div>Discipline: <strong>{ath?.sport} ({ath?.position || 'Singles'})</strong></div>
            </div>
          </CardContent>
        </Card>

        {/* Match Scores & Claimed Position */}
        <Card className="border-slate-200">
          <CardHeader title="Submitted Match Result" subtitle="Recorded by tournament desk" />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-amber-950">Claimed Placement:</span>
              </div>
              <span className="text-base font-black text-amber-900">
                Position #{result.position}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Set Scores:</span>
                <strong className="text-slate-900">{result.score || 'N/A'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Submitted At:</span>
                <span>{formatDate(result.submitted_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Submitted By:</span>
                <span>{result.submitter?.full_name || 'Tournament Director'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Official Match Scoresheet Evidence Preview */}
      <Card className="border-slate-200">
        <CardHeader
          title="Attached Match Sheet & Referee Evidence"
          subtitle="Inspect the uploaded score sheet document to verify set scores and official signatures"
          action={
            result.evidence_file_url && (
              <a
                href={result.evidence_file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#146C94] hover:underline"
              >
                <span>Open High-Res Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )
          }
        />
        <CardContent>
          {result.evidence_file_url ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-96 flex items-center justify-center">
              <img
                src={result.evidence_file_url}
                alt="Scoresheet evidence"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
              No evidence file was attached by the organizer for this result.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Decision Desk */}
      <Card className="border-2 border-[#12355B]/30 bg-gradient-to-br from-white to-slate-50">
        <CardHeader
          title="Technical Official Sign-Off Decision"
          subtitle="Approving will instantly mint a canonical digital achievement and public QR verification link"
        />
        <CardContent className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Verifier Notes / Attestation Comments (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Verified against official match scoresheet signed by chief referee..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#12355B] bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                className="text-xs"
                onClick={() => handleAction('REJECTED')}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject Result
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="text-xs text-amber-700 border-amber-300 hover:bg-amber-50"
                onClick={() => handleAction('CORRECTION_REQUESTED')}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Request Correction
              </Button>
            </div>

            <Button
              variant="success"
              size="md"
              className="text-xs font-bold shadow-md"
              onClick={() => handleAction('APPROVED')}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              Approve & Mint Verified Achievement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Modal if achievement minted */}
      {createdAchievement && (
        <QrModal
          isOpen={showQrModal}
          onClose={() => setShowQrModal(false)}
          achievement={createdAchievement}
        />
      )}
    </div>
  );
};
