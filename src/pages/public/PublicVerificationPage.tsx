import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck,
  Award,
  Trophy,
  Building2,
  Calendar,
  User,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Share2,
  Copy,
  Check,
  ArrowLeft
} from 'lucide-react';
import { store } from '../../data/store';
import { Achievement, Profile } from '../../types';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const PublicVerificationPage: React.FC = () => {
  const { credentialId } = useParams<{ credentialId: string }>();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [athlete, setAthlete] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!credentialId) {
      setLoading(false);
      return;
    }

    const ach = store.getAchievementByCredentialId(credentialId);
    if (ach) {
      setAchievement(ach);
      if (ach.athlete_id) {
        const ath = store.getProfileById(ach.athlete_id);
        setAthlete(ath || null);
      }
    } else {
      setAchievement(null);
    }
    setLoading(false);
  }, [credentialId]);

  const verifyUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white rounded-2xl border border-slate-200">
        <div className="w-10 h-10 border-4 border-[#12355B]/20 border-t-[#12355B] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-600">Querying decentralized grassroots verification database...</p>
      </div>
    );
  }

  // Not Found State
  if (!achievement) {
    return (
      <div className="max-w-lg mx-auto my-16 px-4">
        <div className="bg-white rounded-2xl p-8 border border-red-200 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Credential Not Found</h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            The credential ID <strong className="font-mono text-slate-800">"{credentialId}"</strong> could not be verified in the KhelSetu official repository. It may have been revoked or entered incorrectly.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link to="/">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home
              </Button>
            </Link>
            <Link to="/verify/KS-PUN-2026-0814">
              <Button variant="primary" size="sm">
                Try Sample Credential
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146C94] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to KhelSetu
        </Link>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg cursor-pointer shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Link Copied' : 'Copy Verification Link'}
        </button>
      </div>

      {/* Official Certificate Card */}
      <div className="bg-white rounded-2xl border-2 border-[#12355B]/20 shadow-xl overflow-hidden relative">
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-[#12355B] to-[#146C94] text-white p-6 sm:p-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Grassroots Digital Certificate
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            KhelSetu Verified Achievement
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Canonical Digital Record • Grassroots Badminton Verification
          </p>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <Badge variant="green" size="sm" dot>
              Status: Verified Active
            </Badge>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Athlete Info Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#12355B] shrink-0 bg-slate-200">
              <img
                src={athlete?.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={athlete?.full_name || 'Athlete'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#146C94]">
                Verified Competitor
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {athlete?.full_name || 'Aarav Joshi'}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 text-xs text-slate-600">
                <span>{athlete?.age_group || 'U-19'}</span>
                <span>•</span>
                <span>{athlete?.district || 'Pune'}, {athlete?.state || 'Maharashtra'}</span>
                <span>•</span>
                <span className="font-semibold text-slate-800">{athlete?.institution || 'Fergusson College'}</span>
              </div>
            </div>

            {athlete && (
              <Link to={`/athletes/${athlete.id}`} className="shrink-0">
                <Button variant="outline" size="sm" className="text-xs">
                  <span>View Public Profile</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            )}
          </div>

          {/* Achievement Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Achievement Placement</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {achievement.title}
              </h3>
              <div className="inline-block px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
                Official Position: #{achievement.position} {achievement.position === 1 ? '(Winner)' : achievement.position === 2 ? '(Runner-up)' : '(Podium Finish)'}
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Award className="w-4 h-4 text-[#146C94]" />
                <span>Sanctioned Event</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 truncate">
                {achievement.event_name}
              </h3>
              <div className="text-xs text-slate-600">
                Level: <strong className="text-slate-800">{achievement.event_level}</strong>
              </div>
            </div>
          </div>

          {/* Verification Audit & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">Issuer Organization</span>
              <strong className="text-slate-800 flex items-center gap-1 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {achievement.issuer_name}
              </strong>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Issue Date</span>
              <strong className="text-slate-800 flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(achievement.issued_at)}
              </strong>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Unique Credential ID</span>
              <strong className="text-slate-900 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-300 inline-block">
                {achievement.credential_id}
              </strong>
            </div>
          </div>

          {/* QR Code & Authority Attestation */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2E8B57]" />
                <span>Authorized Verifier Signature</span>
              </div>
              <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                "This record was verified by an authorized organizer and certified independent verifier against official signed tournament scorecards."
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Verification Protocol: KhelSetu Grassroots Standard v1.0
              </div>
            </div>

            {/* QR Thumbnail */}
            <div className="shrink-0 p-2 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
              <QRCodeSVG
                value={verifyUrl}
                size={88}
                level="M"
              />
              <span className="text-[9px] text-slate-400 font-mono block mt-1">Scan to Verify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
