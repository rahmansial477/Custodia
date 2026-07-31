import React from 'react';
import { Ticket } from '../../types';
import { X, ShieldCheck, QrCode, Lock, Copy, Check } from 'lucide-react';

interface QRModalProps {
  ticket: Ticket;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ ticket, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const verificationHash = `0x91342_${ticket.ticketId}_${ticket.owner}_${ticket.eventId}`;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(verificationHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f1b15]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fff8f4] border border-[#d1c5b2] rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-rust-lg relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#ede1cd] text-[#1f1b15] hover:bg-[#eadeca] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center mx-auto">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1f1b15]">
            Ticket Verification QR
          </h3>
          <p className="text-xs text-[#8b716b]">
            Present this code at the venue gate for check-in
          </p>
        </div>

        {/* Simulated Dynamic QR Box */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#b94a2c]/40 flex flex-col items-center justify-center space-y-3 shadow-inner">
          
          <div className="p-3 bg-[#1f1b15] rounded-xl text-white">
            <svg
              className="w-48 h-48"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Pattern SVG simulating high-density verification QR */}
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Outer corners */}
              <rect x="5" y="5" width="25" height="25" fill="#1f1b15" />
              <rect x="10" y="10" width="15" height="15" fill="white" />
              <rect x="13" y="13" width="9" height="9" fill="#b94a2c" />

              <rect x="70" y="5" width="25" height="25" fill="#1f1b15" />
              <rect x="75" y="10" width="15" height="15" fill="white" />
              <rect x="78" y="13" width="9" height="9" fill="#b94a2c" />

              <rect x="5" y="70" width="25" height="25" fill="#1f1b15" />
              <rect x="10" y="75" width="15" height="15" fill="white" />
              <rect x="13" y="78" width="9" height="9" fill="#b94a2c" />

              {/* Data matrix dots */}
              <rect x="35" y="10" width="6" height="6" fill="#1f1b15" />
              <rect x="45" y="10" width="6" height="6" fill="#1f1b15" />
              <rect x="55" y="10" width="6" height="6" fill="#1f1b15" />
              
              <rect x="35" y="25" width="6" height="6" fill="#b94a2c" />
              <rect x="45" y="25" width="6" height="6" fill="#1f1b15" />
              <rect x="55" y="25" width="6" height="6" fill="#b94a2c" />

              <rect x="10" y="35" width="6" height="6" fill="#1f1b15" />
              <rect x="25" y="35" width="6" height="6" fill="#1f1b15" />
              <rect x="40" y="35" width="20" height="20" fill="#1f1b15" />
              <rect x="45" y="40" width="10" height="10" fill="white" />
              <rect x="48" y="43" width="4" height="4" fill="#b94a2c" />

              <rect x="70" y="35" width="6" height="6" fill="#1f1b15" />
              <rect x="85" y="35" width="6" height="6" fill="#1f1b15" />

              <rect x="10" y="55" width="6" height="6" fill="#1f1b15" />
              <rect x="25" y="55" width="6" height="6" fill="#b94a2c" />
              <rect x="70" y="55" width="6" height="6" fill="#1f1b15" />
              <rect x="85" y="55" width="6" height="6" fill="#1f1b15" />

              <rect x="35" y="70" width="6" height="6" fill="#1f1b15" />
              <rect x="45" y="70" width="6" height="6" fill="#1f1b15" />
              <rect x="55" y="70" width="6" height="6" fill="#b94a2c" />

              <rect x="35" y="85" width="6" height="6" fill="#b94a2c" />
              <rect x="45" y="85" width="6" height="6" fill="#1f1b15" />
              <rect x="55" y="85" width="6" height="6" fill="#1f1b15" />
              <rect x="70" y="85" width="20" height="10" fill="#1f1b15" />
            </svg>
          </div>

          <span className="font-mono text-xs font-bold text-[#b94a2c]">
            Ticket #{ticket.ticketId}
          </span>
        </div>

        {/* Verification Proof Hash */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans text-[#8b716b]">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              On-Chain Cryptographic Proof
            </span>
            <button
              onClick={handleCopyHash}
              className="text-[#b94a2c] hover:underline flex items-center gap-1 font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Proof'}
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-[#fcf2e8] border border-[#dec0b8] font-mono text-[11px] text-[#57423c] truncate">
            {verificationHash}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Valid GIWA Sepolia Ticket • Anti-Scalp Verified</span>
        </div>

      </div>
    </div>
  );
};
