import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Achievement } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, achievement }) => {
  const [copied, setCopied] = useState(false);
  const verifyUrl = `${window.location.origin}/verify/${achievement.credential_id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digital Credential QR Code" maxWidth="md">
      <div className="text-center">
        {/* QR Code Container */}
        <div className="inline-block p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner mb-4">
          <QRCodeSVG
            value={verifyUrl}
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2312355B'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>

        {/* Verification Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
            Official Grassroots Verification
          </div>
          <h4 className="font-bold text-slate-900 text-base">{achievement.title}</h4>
          <p className="text-xs text-slate-500">{achievement.event_name}</p>
        </div>

        {/* Credential ID info */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-left text-xs mb-5 space-y-1.5 font-mono">
          <div className="flex justify-between text-slate-600">
            <span>Credential ID:</span>
            <strong className="text-slate-900 font-bold">{achievement.credential_id}</strong>
          </div>
          <div className="flex justify-between text-slate-600 truncate">
            <span>Verification URL:</span>
            <span className="text-slate-700 truncate max-w-[200px]">{verifyUrl}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="flex-1 text-xs"
            leftIcon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            onClick={handleCopy}
          >
            {copied ? 'Link Copied!' : 'Copy Verification URL'}
          </Button>

          <Link to={`/verify/${achievement.credential_id}`} className="flex-1" onClick={onClose}>
            <Button
              variant="primary"
              className="w-full text-xs"
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              Open Public Page
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
