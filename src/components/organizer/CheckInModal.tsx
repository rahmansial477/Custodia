import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, QrCode, Search, UserCheck } from 'lucide-react';

interface CheckInModalProps {
  onCheckInOnChain: (ticketId: number) => Promise<boolean>;
  onClose: () => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  onCheckInOnChain,
  onClose,
}) => {
  const [inputTicketId, setInputTicketId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resultStatus, setResultStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleVerifyAndCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(inputTicketId, 10);
    if (isNaN(id) || id <= 0) {
      setResultStatus('error');
      setStatusMsg('Please enter a valid numeric Ticket ID (e.g. 8821)');
      return;
    }

    setIsVerifying(true);
    setResultStatus('idle');
    try {
      const ok = await onCheckInOnChain(id);
      if (ok) {
        setResultStatus('success');
        setStatusMsg(`Ticket #${id} successfully verified & checked in on GIWA Sepolia!`);
      } else {
        setResultStatus('error');
        setStatusMsg(`Check-in failed for Ticket #${id}. It may already be checked in or invalid.`);
      }
    } catch (err: any) {
      setResultStatus('error');
      setStatusMsg(err?.message || 'Transaction error on GIWA Sepolia testnet');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f1b15]/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fff8f4] border border-[#d1c5b2] rounded-3xl max-w-md w-full p-6 space-y-6 shadow-rust-lg relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#ede1cd] text-[#1f1b15] hover:bg-[#eadeca] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15]">
            Gate Check-In Verifier
          </h3>
          <p className="text-xs text-[#8b716b]">
            Organizer tool to verify ticket authenticity and execute `checkIn()`
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerifyAndCheckIn} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15]">
              Ticket ID or Verification Code
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b716b]" />
              <input
                type="text"
                value={inputTicketId}
                onChange={(e) => {
                  setInputTicketId(e.target.value);
                  setResultStatus('idle');
                }}
                placeholder="Enter Ticket ID (e.g. 8821)..."
                className="w-full pl-11 pr-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-base font-mono font-bold text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
              />
            </div>
          </div>

          {/* Preset test IDs */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="text-[#8b716b]">Quick Test IDs:</span>
            <button
              type="button"
              onClick={() => setInputTicketId('8821')}
              className="px-2 py-1 rounded bg-[#ede1cd] hover:bg-[#eadeca] text-[#1f1b15] font-mono"
            >
              #8821
            </button>
            <button
              type="button"
              onClick={() => setInputTicketId('9102')}
              className="px-2 py-1 rounded bg-[#ede1cd] hover:bg-[#eadeca] text-[#1f1b15] font-mono"
            >
              #9102
            </button>
          </div>

          {/* Status Message Display */}
          {resultStatus === 'success' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ticket Verified & Checked In!</span>
              </div>
              <p>{statusMsg}</p>
            </div>
          )}

          {resultStatus === 'error' && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Check-In Failed</span>
              </div>
              <p>{statusMsg}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isVerifying || !inputTicketId.trim()}
            className="w-full btn-primary py-3 rounded-xl text-xs font-sans font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <span>Querying GIWA Sepolia State...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Complete Check-In</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
