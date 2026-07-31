export interface TicketTier {
  index: number;
  tierName: string;
  priceWei: bigint;
  priceEth: string;
  supply: number;
  sold: number;
  isOpen: boolean;
  perks?: string[];
}

export enum WaitlistMode {
  AutomaticTransfer = 0,
  TimeWindowOffer = 1,
}

export interface CustodiaEvent {
  id: number;
  name: string;
  organizer: string;
  organizerName?: string;
  organizerAvatar?: string;
  eventDate: number; // Unix timestamp in seconds
  formattedDate?: string;
  formattedTime?: string;
  resaleCapBps: number; // e.g. 11000 = 110%
  waitlistMode: WaitlistMode;
  offerWindowSeconds: number;
  totalTiers: number;
  cancelled: boolean;
  active: boolean;
  
  // Presentation fields
  category: 'Music & Concerts' | 'Arts & Culture' | 'Food & Drink' | 'Web3 & Tech' | 'Nightlife';
  location: string;
  venueName: string;
  description: string;
  imageUrl: string;
  heroBannerUrl?: string;
  ribbonTag?: 'Selling Fast' | 'Sold Out' | 'Open' | 'New';
  tiers: TicketTier[];
  totalTicketsIssued?: number;
  resaleListingsCount?: number;
}

export interface Ticket {
  ticketId: number;
  eventId: number;
  tierIndex: number;
  owner: string;
  originalPriceWei: bigint;
  originalPriceEth: string;
  isCheckedIn: boolean;
  isForResale: boolean;
  resalePriceWei: bigint;
  resalePriceEth: string;
  maxResalePriceWei: bigint;
  maxResalePriceEth: string;
  
  // Hydrated references
  eventName?: string;
  tierName?: string;
  eventDate?: number;
  location?: string;
  imageUrl?: string;
  qrCodeUrl?: string;
}

export interface PlatformStats {
  totalEvents: number;
  totalTicketsIssued: number;
  totalVolumeEth: string;
  scalpingPreventedBps: number;
}

export interface EventFilterState {
  searchQuery: string;
  category: string;
  dateRange: 'all' | 'today' | 'this_week' | 'this_month';
  minPriceEth: number;
  maxPriceEth: number;
  sortBy: 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'popular';
}
