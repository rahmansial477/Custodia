import React from 'react';
import { Link } from 'react-router-dom';
import { CustodiaEvent } from '../../types';
import { Calendar, MapPin, ShieldCheck, Ticket, ArrowRight, User } from 'lucide-react';

interface EventCardProps {
  event: CustodiaEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Find lowest tier price
  const lowestPriceEth = event.tiers && event.tiers.length > 0
    ? Math.min(...event.tiers.map(t => parseFloat(t.priceEth))).toString()
    : '0';

  // Total sold / total supply
  const totalSupply = event.tiers ? event.tiers.reduce((acc, t) => acc + t.supply, 0) : 100;
  const totalSold = event.tiers ? event.tiers.reduce((acc, t) => acc + t.sold, 0) : 0;
  const percentSold = Math.min(100, Math.round((totalSold / Math.max(1, totalSupply)) * 100));

  const capPercentage = (event.resaleCapBps - 10000) / 100; // e.g. 11000 -> 10%

  return (
    <div className="card-editorial rounded-2xl overflow-hidden flex flex-col h-full group relative">
      
      {/* Ribbon Tag */}
      {event.ribbonTag && (
        <div className={`ribbon ${
          event.ribbonTag === 'Selling Fast' ? 'selling-fast' :
          event.ribbonTag === 'Sold Out' ? 'sold-out' : 'open'
        }`}>
          {event.ribbonTag}
        </div>
      )}

      {/* Image & Category Overlay */}
      <div className="relative h-52 overflow-hidden bg-[#2a241e]">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b15]/90 via-[#1f1b15]/30 to-transparent"></div>
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1f1b15]/80 backdrop-blur-md border border-[#dec0b8]/30 text-xs font-sans font-medium text-[#eadeca]">
          {event.category}
        </div>

        {/* Resale Cap Badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#b94a2c]/90 text-white text-[11px] font-sans font-medium backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cap: +{capPercentage}% Max</span>
          </div>
          <span className="text-xs font-mono text-white/90">
            {totalSold} / {totalSupply} Tickets
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Organizer */}
          {event.organizerName && (
            <div className="flex items-center gap-2 text-xs text-[#8b716b] font-sans">
              <User className="w-3.5 h-3.5 text-[#b94a2c]" />
              <span>By {event.organizerName}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif font-bold text-xl text-[#1f1b15] group-hover:text-[#b94a2c] transition-colors line-clamp-2 leading-snug">
            {event.name}
          </h3>

          {/* Logistics */}
          <div className="space-y-1.5 pt-1 text-xs text-[#57423c] font-sans">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b94a2c] shrink-0" />
              <span>{event.formattedDate || 'Upcoming Date'} • {event.formattedTime || '19:00'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b94a2c] shrink-0" />
              <span className="truncate">{event.venueName}, {event.location}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar & Price */}
        <div className="pt-3 border-t border-[#d1c5b2]/50 space-y-3">
          
          {/* Ticket Claim Progress */}
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-[#ede1cd] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#b94a2c] rounded-full transition-all duration-500"
                style={{ width: `${percentSold}%` }}
              ></div>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <span className="block text-[10px] font-sans font-medium uppercase text-[#8b716b] tracking-wider">
                Starting Price
              </span>
              <span className="font-serif font-bold text-lg text-[#1f1b15]">
                {lowestPriceEth} ETH
              </span>
            </div>

            <Link
              to={`/events/${event.id}`}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 group-hover:bg-[#983316]"
            >
              <span>Get Ticket</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
