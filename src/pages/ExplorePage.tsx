import React, { useState, useMemo } from 'react';
import { INITIAL_FEATURED_EVENTS } from '../data/mockEvents';
import { CustodiaEvent, EventFilterState } from '../types';
import { EventCard } from '../components/events/EventCard';
import { EventFilter } from '../components/events/EventFilter';
import { SearchX, Compass, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_FILTERS: EventFilterState = {
  searchQuery: '',
  category: '',
  dateRange: 'all',
  minPriceEth: 0,
  maxPriceEth: 0.2,
  sortBy: 'date_asc',
};

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<EventFilterState>(DEFAULT_FILTERS);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return INITIAL_FEATURED_EVENTS.filter((evt) => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = evt.name.toLowerCase().includes(q);
        const matchVenue = evt.venueName.toLowerCase().includes(q);
        const matchLocation = evt.location.toLowerCase().includes(q);
        const matchOrganizer = (evt.organizerName || '').toLowerCase().includes(q);
        if (!matchTitle && !matchVenue && !matchLocation && !matchOrganizer) {
          return false;
        }
      }

      // Category
      if (filters.category && evt.category !== filters.category) {
        return false;
      }

      // Price limit
      const lowestEth = evt.tiers && evt.tiers.length > 0
        ? Math.min(...evt.tiers.map(t => parseFloat(t.priceEth)))
        : 0;
      if (lowestEth > filters.maxPriceEth) {
        return false;
      }

      // Date Range
      if (filters.dateRange === 'this_week') {
        const weekFromNow = Math.floor(Date.now() / 1000) + 86400 * 7;
        if (evt.eventDate > weekFromNow) return false;
      } else if (filters.dateRange === 'this_month') {
        const monthFromNow = Math.floor(Date.now() / 1000) + 86400 * 30;
        if (evt.eventDate > monthFromNow) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'date_asc') return a.eventDate - b.eventDate;
      if (filters.sortBy === 'date_desc') return b.eventDate - a.eventDate;
      if (filters.sortBy === 'price_asc') {
        const minA = Math.min(...a.tiers.map(t => parseFloat(t.priceEth)));
        const minB = Math.min(...b.tiers.map(t => parseFloat(t.priceEth)));
        return minA - minB;
      }
      if (filters.sortBy === 'price_desc') {
        const minA = Math.min(...a.tiers.map(t => parseFloat(t.priceEth)));
        const minB = Math.min(...b.tiers.map(t => parseFloat(t.priceEth)));
        return minB - minA;
      }
      return 0;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede1cd] text-xs font-sans font-bold text-[#b94a2c]">
          <Compass className="w-3.5 h-3.5" />
          <span>Anti-Scalp Marketplace</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
          Explore Live Events
        </h1>
        <p className="text-sm font-sans text-[#57423c]">
          Discover upcoming music concerts, web3 summits, speakeasies, and art pop-ups backed by on-chain price caps.
        </p>
      </div>

      {/* Filter Component */}
      <EventFilter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        totalResults={filteredEvents.length}
      />

      {/* Events Grid or Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="card-editorial p-12 text-center rounded-3xl space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15]">
            No Events Found
          </h3>
          <p className="text-xs text-[#8b716b] font-sans">
            Try adjusting your search query, price limit slider, or date filters to discover more events.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="px-4 py-2 rounded-xl bg-[#ede1cd] text-xs font-sans font-medium text-[#1f1b15] hover:bg-[#eadeca]"
            >
              Reset Filters
            </button>
            <Link
              to="/create"
              className="btn-primary px-4 py-2 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create An Event</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
