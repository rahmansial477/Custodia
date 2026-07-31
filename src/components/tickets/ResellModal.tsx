import React, { useState } from 'react';
import { Ticket } from '../../types';
import { X, ShieldCheck, AlertCircle, ArrowRight, Tag, Lock } from 'lucide-react';

interface ResellModalProps {
  ticket: Ticket;
  onConfirmResell: (ticketId: number, resalePriceEth: string) => void;
  onClose: () => void;
  isPending?: boolean;
}

export const ResellModal: React.FC<ResellModalProps> = ({
  ticket,
  onConfirmResell,
  onClose,
  isPending = false,
}) => {
  const originalEth = parseFloat(ticket.originalPriceEth || '0.015');
  const maxEth = parseFloat(ticket.maxResalePriceEth || (originalEth * 1.1).toString());

  const [inputPriceEth, setInputPriceEth] = useState<string>(ticket.maxResalePriceEth || maxEth.toFixed(4));
  const [errorMsg, setErrorMsg] = useState<string>('');

  const numInput = parseFloat(inputPriceEth) || 0;
  const isOverCap = numInput > maxEth + 0.000001;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverCap) {
      setErrorMsg(`Price exceeds contract ceiling of ${maxEth} ETH`);
      return;
    }
    if (numInput <= 0) {
      setErrorMsg('Price must be greater than 0 ETH');
      return;
    }
    setErrorMsg('');
    onConfirmResell(ticket.ticketId, inputPriceEth);
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

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="w-10 h-10 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15]">
            Resell Ticket #{ticket.ticketId}
          </h3>
          <p className="text-xs text-[#8b716b]">
            List your ticket on the Custodia peer-to-peer anti-scalping marketplace
          </p>
        </div>

        {/* Ticket Summary Box */}
        <div className="p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-2 text-xs font-sans">
          <div className="font-serif font-bold text-sm text-[#1f1b15]">
            {ticket.eventName || 'Echoes of the Desert'}
          </div>
          <div className="flex items-center justify-between text-[#57423c]">
            <span>Tier: <strong>{ticket.tierName || 'General Admission'}</strong></span>
            <span>Original Mint: <strong>{ticket.originalPriceEth} ETH</strong></span>
          </div>
        </div>

        {/* Capped Price Calculator */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <label className="font-bold uppercase tracking-wider text-[#1f1b15]">
                Asking Price (ETH)
              </label>
              <span className="text-[#b94a2c] font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Max Ceiling: {maxEth} ETH
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0.001"
                max={maxEth}
                value={inputPriceEth}
                onChange={(e) => {
                  setInputPriceEth(e.target.value);
                  setErrorMsg('');
                }}
                className={`w-full pl-4 pr-16 py-3 bg-[#fff8f4] border rounded-xl text-base font-serif font-bold text-[#1f1b15] focus:outline-none transition-all ${
                  isOverCap
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-[#dec0b8] focus:border-[#b94a2c]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[#8b716b]">
                ETH
              </span>
            </div>

            {/* Price cap warning / note */}
            {isOverCap ? (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-sans">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Cannot list above on-chain cap of {maxEth} ETH!
              </p>
            ) : (
              <p className="text-[11px] text-[#8b716b] font-sans">
                Smart contract enforces maximum resale price to guarantee fair fan access.
              </p>
            )}
          </div>

          {/* Preset quick buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setInputPriceEth(originalEth.toFixed(4))}
              className="py-2 rounded-xl bg-[#ede1cd] text-xs font-medium text-[#1f1b15] hover:bg-[#eadeca]"
            >
              Face Value ({originalEth} ETH)
            </button>
            <button
              type="button"
              onClick={() => setInputPriceEth((originalEth * 1.05).toFixed(4))}
              className="py-2 rounded-xl bg-[#ede1cd] text-xs font-medium text-[#1f1b15] hover:bg-[#eadeca]"
            >
              +5% ({ (originalEth * 1.05).toFixed(4) } ETH)
            </button>
            <button
              type="button"
              onClick={() => setInputPriceEth(maxEth.toFixed(4))}
              className="py-2 rounded-xl bg-[#b94a2c]/10 text-xs font-medium text-[#b94a2c] hover:bg-[#b94a2c]/20"
            >
              Max Cap ({maxEth} ETH)
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
              {errorMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#ede1cd] text-xs font-sans font-medium text-[#1f1b15] hover:bg-[#eadeca]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isOverCap}
              className="flex-1 btn-primary py-3 rounded-xl text-xs font-sans font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending ? 'Confirming on GIWA...' : 'Publish Resale Listing'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
