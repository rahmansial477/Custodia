import React from 'react';
import { Ticket } from '../../types';
import { QrCode, Tag, CheckCircle2, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
  onOpenQR: (ticket: Ticket) => void;
  onOpenResell: (ticket: Ticket) => void;
  onCheckIn?: (ticketId: number) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onOpenQR,
  onOpenResell,
  onCheckIn,
}) => {
  const formattedDate = ticket.eventDate
    ? new Date(ticket.eventDate * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'OCT 24, 2026';

  return (
    <div className="card-editorial rounded-3xl overflow-hidden relative shadow-rust flex flex-col md:flex-row border border-[#d1c5b2]">
      
      {/* Left Main Ticket Info */}
      <div className="p-6 flex-1 space-y-4 bg-[#fff8f4]">
        
        {/* Status Badge & Stub ID */}
        <div className="flex items-center justify-between border-b border-[#d1c5b2]/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-[#b94a2c] bg-[#b94a2c]/10 px-2.5 py-1 rounded-md">
              #CUST-{ticket.ticketId}
            </span>
            <span className="text-xs font-sans text-[#8b716b]">
              Tier: <strong className="text-[#1f1b15]">{ticket.tierName || 'General Admission'}</strong>
            </span>
          </div>

          {/* Status Pills */}
          {ticket.isCheckedIn ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Checked In
            </span>
          ) : ticket.isForResale ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-medium">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              Listed ({ticket.resalePriceEth} ETH)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Valid Entry
            </span>
          )}
        </div>

        {/* Event Title */}
        <div>
          <h3 className="font-serif font-bold text-xl text-[#1f1b15] line-clamp-2">
            {ticket.eventName || 'Echoes of the Desert: Sunsets at Joshua Tree'}
          </h3>
        </div>

        {/* Date & Location */}
        <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#57423c]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#b94a2c]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#b94a2c]" />
            <span className="truncate">{ticket.location || 'Joshua Tree, CA'}</span>
          </div>
        </div>

        {/* Pricing Specs */}
        <div className="pt-2 flex items-center justify-between text-xs font-sans text-[#8b716b] border-t border-[#d1c5b2]/40">
          <span>Original Price: <strong className="text-[#1f1b15]">{ticket.originalPriceEth} ETH</strong></span>
          <span>Max Allowed Resale: <strong className="text-[#b94a2c]">{ticket.maxResalePriceEth} ETH</strong></span>
        </div>

      </div>

      {/* Right Perforated Stub Section */}
      <div className="bg-[#fcf2e8] p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-dashed border-[#d1c5b2] space-y-3 min-w-[200px]">
        
        {/* QR Code Trigger Button */}
        <button
          onClick={() => onOpenQR(ticket)}
          className="p-3 bg-white border border-[#dec0b8] rounded-2xl hover:border-[#b94a2c] hover:shadow-md transition-all group flex flex-col items-center gap-1"
        >
          <QrCode className="w-12 h-12 text-[#1f1b15] group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#b94a2c]">
            Show Entry QR
          </span>
        </button>

        {/* Stub Actions */}
        <div className="w-full space-y-2">
          {!ticket.isCheckedIn && (
            <button
              onClick={() => onOpenResell(ticket)}
              className="w-full py-2 rounded-xl bg-[#ede1cd] text-xs font-sans font-medium text-[#1f1b15] hover:bg-[#eadeca] border border-[#dec0b8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-[#b94a2c]" />
              {ticket.isForResale ? 'Edit Resale' : 'Resell Ticket'}
            </button>
          )}

          {/* Quick Check-in simulation for demo testing */}
          {!ticket.isCheckedIn && onCheckIn && (
            <button
              onClick={() => onCheckIn(ticket.ticketId)}
              className="w-full py-1.5 rounded-xl bg-emerald-100 text-[11px] font-sans font-medium text-emerald-900 hover:bg-emerald-200 transition-colors flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Simulate Gate Check-In
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
