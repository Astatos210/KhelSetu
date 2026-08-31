import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Award, CheckCircle, ExternalLink, QrCode, ShieldCheck, Trophy, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Achievement } from '../../types';
import { formatDate } from '../../lib/utils';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { QrModal } from './QrModal';

interface AchievementCardProps {
  achievement: Achievement;
  showActions?: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  showActions = true
}) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const getPositionStyles = (pos: number) => {
    switch (pos) {
      case 1:
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          icon: 'text-amber-600',
          label: 'Winner (1st Place)',
          accent: 'from-amber-500/10 to-amber-600/5 border-amber-200'
        };
      case 2:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: 'text-slate-500',
          label: 'Runner-up (2nd Place)',
          accent: 'from-slate-400/10 to-slate-500/5 border-slate-200'
        };
      case 3:
        return {
          badge: 'bg-orange-100 text-orange-900 border-orange-300',
          icon: 'text-orange-600',
          label: '3rd Place Finish',
          accent: 'from-orange-500/10 to-orange-600/5 border-orange-200'
        };
      default:
        return {
          badge: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: 'text-[#146C94]',
          label: `Position #${pos}`,
          accent: 'from-blue-500/10 to-blue-600/5 border-blue-100'
        };
    }
  };

  const posStyle = getPositionStyles(achievement.position);
  const verifyUrl = `${window.location.origin}/verify/${achievement.credential_id}`;

  return (
    <>
      <Card className="hover:shadow-md transition-all duration-200 border-slate-200 bg-gradient-to-br from-white to-slate-50/50">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#12355B]/10 flex items-center justify-center text-[#12355B] shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#146C94]">
                  {achievement.event_level} Championship
                </span>
                <h4 className="font-bold text-slate-900 text-base leading-snug">
                  {achievement.title}
                </h4>
              </div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${posStyle.badge}`}>
              #{achievement.position}
            </span>
          </div>

          {/* Event & Issuer details */}
          <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <Award className="w-4 h-4 text-[#12355B] shrink-0" />
              <span className="truncate">{achievement.event_name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Issued by: <strong className="text-slate-700">{achievement.issuer_name}</strong></span>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(achievement.issued_at)}
              </span>
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                ID: {achievement.credential_id}
              </span>
            </div>
          </div>

          {/* Footer & QR Trigger */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
              <span>Verified Grassroots Record</span>
            </div>

            {showActions && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                  title="View Credential QR"
                >
                  <QrCode className="w-4 h-4" />
                </button>
                <Link to={`/verify/${achievement.credential_id}`}>
                  <Button variant="outline" size="sm" className="text-xs h-8 px-2.5">
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* QR Modal */}
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        achievement={achievement}
      />
    </>
  );
};
