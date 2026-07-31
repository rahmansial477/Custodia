import { CustodiaEvent, WaitlistMode } from '../types';

export const INITIAL_FEATURED_EVENTS: CustodiaEvent[] = [
  {
    id: 1,
    name: 'Echoes of the Desert: Sunsets at Joshua Tree',
    organizer: '0x32A7dE8e289891823C8299890f9196324A328902',
    organizerName: 'Aura Soundscapes',
    organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    eventDate: Math.floor(Date.now() / 1000) + 86400 * 5, // 5 days from now
    formattedDate: 'OCT 24, 2026',
    formattedTime: '17:00 PST',
    resaleCapBps: 11000, // 110% cap
    waitlistMode: WaitlistMode.TimeWindowOffer,
    offerWindowSeconds: 3600, // 1 hour window
    totalTiers: 3,
    cancelled: false,
    active: true,
    category: 'Music & Concerts',
    location: 'Joshua Tree Amphitheater, CA',
    venueName: 'High Desert Open Air Stage',
    description: 'An immersive twilight acoustic experience amidst ancient Joshua trees. Featuring ambient electronic synths, live cello, and sunset stargazing under anti-scalping smart contract protection.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    heroBannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    ribbonTag: 'Selling Fast',
    tiers: [
      {
        index: 0,
        tierName: 'Early Bird Oasis',
        priceWei: 15000000000000000n, // 0.015 ETH
        priceEth: '0.015',
        supply: 150,
        sold: 142,
        isOpen: true,
        perks: ['General Admission', 'Sunset Welcome Drink', 'Commemorative On-chain NFT Stub']
      },
      {
        index: 1,
        tierName: 'General Twilight',
        priceWei: 25000000000000000n, // 0.025 ETH
        priceEth: '0.025',
        supply: 300,
        sold: 180,
        isOpen: true,
        perks: ['Standard Amphitheater Seating', 'Free Shuttle from Town', 'Digital Audio Master Recording']
      },
      {
        index: 2,
        tierName: 'Stargazer VIP Lounge',
        priceWei: 60000000000000000n, // 0.060 ETH
        priceEth: '0.060',
        supply: 50,
        sold: 45,
        isOpen: true,
        perks: ['Front-row Cushion Seating', 'Telescope Guided Stargazing Session', 'Private Organic Wine Bar Access']
      }
    ],
    totalTicketsIssued: 367,
    resaleListingsCount: 4
  },
  {
    id: 2,
    name: 'Velvet Lounge: Midnight Jazz & Speakeasy',
    organizer: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    organizerName: 'Nocturne Collective',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    eventDate: Math.floor(Date.now() / 1000) + 86400 * 12,
    formattedDate: 'NOV 02, 2026',
    formattedTime: '21:30 EST',
    resaleCapBps: 10500, // 105% cap
    waitlistMode: WaitlistMode.AutomaticTransfer,
    offerWindowSeconds: 1800,
    totalTiers: 2,
    cancelled: false,
    active: true,
    category: 'Nightlife',
    location: 'The Velvet Room, Underground NYC',
    venueName: 'Lower East Side Vault',
    description: 'An intimate candlelit evening of live hard-bop jazz, artisan craft cocktails, and neo-soul improvisations in a secret underground Manhattan vault.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    heroBannerUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1600&q=80',
    ribbonTag: 'Selling Fast',
    tiers: [
      {
        index: 0,
        tierName: 'Mezzanine Pass',
        priceWei: 20000000000000000n, // 0.020 ETH
        priceEth: '0.020',
        supply: 80,
        sold: 76,
        isOpen: true,
        perks: ['Standing Mezzanine Access', '1 Artisanal Welcome Cocktail']
      },
      {
        index: 1,
        tierName: 'Candlelight Booth (Table for 2)',
        priceWei: 50000000000000000n, // 0.050 ETH
        priceEth: '0.050',
        supply: 20,
        sold: 18,
        isOpen: true,
        perks: ['Reserved Leather Booth', 'Cocktail Flight Tasting', 'Meet & Greet with Quintet']
      }
    ],
    totalTicketsIssued: 94,
    resaleListingsCount: 2
  },
  {
    id: 3,
    name: 'GIWA Sepolia Builder Summit & Hackathon',
    organizer: '0x88fA92398511d7168A48439e6d787943A1b31a31',
    organizerName: 'GIWA Ecosystem Foundation',
    organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    eventDate: Math.floor(Date.now() / 1000) + 86400 * 20,
    formattedDate: 'NOV 10, 2026',
    formattedTime: '09:00 KST',
    resaleCapBps: 10000, // 100% cap (Strict Face Value Zero Scalping)
    waitlistMode: WaitlistMode.AutomaticTransfer,
    offerWindowSeconds: 7200,
    totalTiers: 2,
    cancelled: false,
    active: true,
    category: 'Web3 & Tech',
    location: 'Gangnam Tech Tower, Seoul',
    venueName: 'GIWA Innovation Center 12F',
    description: 'The premier technical developer gathering on GIWA Sepolia testnet. Keynotes on state-channel anti-scalping, zero-knowledge ticket privacy, and $50k in hackathon bounties.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    heroBannerUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
    ribbonTag: 'Open',
    tiers: [
      {
        index: 0,
        tierName: 'Developer Hacker Pass',
        priceWei: 5000000000000000n, // 0.005 ETH
        priceEth: '0.005',
        supply: 400,
        sold: 210,
        isOpen: true,
        perks: ['Full 3-Day Summit Access', 'Hackathon Participation', 'Dev Swag Bag & On-Chain Badge']
      },
      {
        index: 1,
        tierName: 'VIP Builder & Investor Dinner',
        priceWei: 35000000000000000n, // 0.035 ETH
        priceEth: '0.035',
        supply: 60,
        sold: 48,
        isOpen: true,
        perks: ['Exclusive Rooftop Dinner', '1-on-1 VC Pitch Sessions', 'Early Access API Keys']
      }
    ],
    totalTicketsIssued: 258,
    resaleListingsCount: 1
  },
  {
    id: 4,
    name: 'Sunset Vinyl & Artisan Gastronomy Fair',
    organizer: '0x994a32001A832A11bc029312d8a01124C03a1103',
    organizerName: 'Prism Guild',
    organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    eventDate: Math.floor(Date.now() / 1000) + 86400 * 28,
    formattedDate: 'NOV 18, 2026',
    formattedTime: '12:00 CET',
    resaleCapBps: 11000,
    waitlistMode: WaitlistMode.TimeWindowOffer,
    offerWindowSeconds: 3600,
    totalTiers: 1,
    cancelled: false,
    active: true,
    category: 'Food & Drink',
    location: 'Metropolitan Art Pavilion, Berlin',
    venueName: 'Spree Waterfront Garden',
    description: 'A weekend celebration of rare vinyl record trading, wood-fired culinary pop-ups, natural wines, and outdoor synth sessions along the Spree river.',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    heroBannerUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    ribbonTag: 'Open',
    tiers: [
      {
        index: 0,
        tierName: 'Day Pass & Tasting Glass',
        priceWei: 10000000000000000n, // 0.010 ETH
        priceEth: '0.010',
        supply: 500,
        sold: 220,
        isOpen: true,
        perks: ['Full Day Fair Access', 'Custom Engraved Glass', '5 Natural Wine Tasting Tokens']
      }
    ],
    totalTicketsIssued: 220,
    resaleListingsCount: 3
  }
];
