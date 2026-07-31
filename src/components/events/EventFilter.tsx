import React from 'react';
import { EventFilterState } from '../../types';
import { Search, Filter, X, SlidersHorizontal, Calendar, Tag } from 'lucide-react';

interface EventFilterProps {
  filters: EventFilterState;
  onChange: (filters: EventFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES = [
  'All Categories',
  'Music & Concerts',
  'Arts & Culture',
  'Food & Drink',
  'Web3 & Tech',
  'Nightlife'
];

export const EventFilter: React.FC<EventFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  return (
    <div className="bg-[#fcf2e8] border border-[#d1c5b2] rounded-2xl p-6 space-y-6 shadow-rust">
      
      {/* Top Search Bar & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b716b]" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by event title, venue, or artist..."
            className="w-full pl-11 pr-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] placeholder-[#8b716b] focus:outline-none focus:border-[#b94a2c] focus:ring-1 focus:ring-[#b94a2c] transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b716b] hover:text-[#1f1b15]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#8b716b] hidden sm:block" />
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
            className="px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
          >
            <option value="date_asc">Date: Soonest First</option>
            <option value="popular">Most Popular</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#8b716b]">
          Category
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = (cat === 'All Categories' && !filters.category) || filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onChange({
                  ...filters,
                  category: cat === 'All Categories' ? '' : cat
                })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                  isSelected
                    ? 'bg-[#b94a2c] text-white shadow-sm'
                    : 'bg-[#ede1cd] text-[#1f1b15] hover:bg-[#eadeca]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range & Date Range Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#d1c5b2]/40">
        
        {/* Max Price Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="font-bold uppercase tracking-wider text-[#8b716b]">Max Price</span>
            <span className="font-mono font-bold text-[#b94a2c]">{filters.maxPriceEth} ETH</span>
          </div>
          <input
            type="range"
            min="0.005"
            max="0.2"
            step="0.005"
            value={filters.maxPriceEth}
            onChange={(e) => onChange({ ...filters, maxPriceEth: parseFloat(e.target.value) })}
            className="w-full accent-[#b94a2c] cursor-pointer"
          />
        </div>

        {/* Date Filter Buttons */}
        <div className="space-y-2">
          <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#8b716b]">
            Timeframe
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All Dates' },
              { id: 'this_week', label: 'Next 7 Days' },
              { id: 'this_month', label: 'This Month' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => onChange({ ...filters, dateRange: d.id as any })}
                className={`px-2 py-2 rounded-xl text-xs font-sans font-medium text-center transition-all ${
                  filters.dateRange === d.id
                    ? 'bg-[#b94a2c] text-white'
                    : 'bg-[#ede1cd] text-[#1f1b15] hover:bg-[#eadeca]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between pt-2 text-xs text-[#8b716b] font-sans">
        <span>Showing <strong>{totalResults}</strong> events</span>
        <button
          onClick={onReset}
          className="text-[#b94a2c] hover:underline font-medium flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      </div>

    </div>
  );
};
