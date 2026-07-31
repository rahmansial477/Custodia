import { formatEther, parseEther } from 'viem';
import { CustodiaEvent, Ticket, PlatformStats } from '../types';
import { INITIAL_FEATURED_EVENTS } from '../data/mockEvents';

const LOCAL_EVENTS_KEY = 'custodia_local_events_v2';
const LOCAL_TICKETS_KEY = 'custodia_local_tickets_v2';

export const formatEth = (wei: bigint | string | number): string => {
  try {
    const weiBigInt = typeof wei === 'bigint' ? wei : BigInt(wei);
    const val = formatEther(weiBigInt);
    // Trim zeroes nicely
    return parseFloat(val).toString();
  } catch {
    return '0';
  }
};

export const parseEthToWei = (eth: string): bigint => {
  try {
    return parseEther(eth);
  } catch {
    return 0n;
  }
};

export const calculateMaxResalePrice = (originalPriceEth: string, resaleCapBps: number): { eth: string; wei: bigint } => {
  try {
    const originalWei = parseEther(originalPriceEth);
    const maxWei = (originalWei * BigInt(resaleCapBps)) / 10000n;
    return {
      eth: formatEth(maxWei),
      wei: maxWei
    };
  } catch {
    return { eth: originalPriceEth, wei: 0n };
  }
};

// Local storage helpers for seamless user state persistence
export const getStoredEvents = (): CustodiaEvent[] => {
  try {
    const stored = localStorage.getItem(LOCAL_EVENTS_KEY);
    if (stored) {
      const parsed: CustodiaEvent[] = JSON.parse(stored);
      // Re-hydrate BigInt or wei representations
      return parsed.map(evt => ({
        ...evt,
        tiers: evt.tiers.map(t => ({
          ...t,
          priceWei: BigInt(t.priceWei || parseEther(t.priceEth).toString())
        }))
      }));
    }
  } catch (e) {
    console.warn('Failed to load local events from storage', e);
  }
  return INITIAL_FEATURED_EVENTS;
};

export const saveEventToStorage = (newEvent: CustodiaEvent): CustodiaEvent[] => {
  const current = getStoredEvents();
  const existsIndex = current.findIndex(e => e.id === newEvent.id);
  let updated: CustodiaEvent[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = newEvent;
  } else {
    updated = [newEvent, ...current];
  }
  
  // Store plain JSON stringifiable version
  const serializable = updated.map(e => ({
    ...e,
    tiers: e.tiers.map(t => ({
      ...t,
      priceWei: t.priceWei.toString()
    }))
  }));
  localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(serializable));
  return updated;
};

export const getStoredUserTickets = (userAddress?: string): Ticket[] => {
  if (!userAddress) return [];
  try {
    const stored = localStorage.getItem(`${LOCAL_TICKETS_KEY}_${userAddress.toLowerCase()}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((t: any) => ({
        ...t,
        originalPriceWei: BigInt(t.originalPriceWei),
        resalePriceWei: BigInt(t.resalePriceWei || '0'),
        maxResalePriceWei: BigInt(t.maxResalePriceWei || '0')
      }));
    }
  } catch (e) {
    console.warn('Failed to load user tickets', e);
  }
  
  // Default mock user tickets for immediate evaluation
  return [
    {
      ticketId: 8821,
      eventId: 1,
      tierIndex: 0,
      owner: userAddress,
      originalPriceWei: parseEther('0.015'),
      originalPriceEth: '0.015',
      isCheckedIn: false,
      isForResale: false,
      resalePriceWei: 0n,
      resalePriceEth: '0',
      maxResalePriceWei: parseEther('0.0165'),
      maxResalePriceEth: '0.0165',
      eventName: 'Echoes of the Desert: Sunsets at Joshua Tree',
      tierName: 'Early Bird Oasis',
      eventDate: Math.floor(Date.now() / 1000) + 86400 * 5,
      location: 'Joshua Tree Amphitheater, CA',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      qrCodeUrl: `CUSTODIA-TICKET-8821-${userAddress}`
    }
  ];
};

export const saveUserTicket = (ticket: Ticket): void => {
  const addressKey = ticket.owner.toLowerCase();
  const current = getStoredUserTickets(ticket.owner);
  const existingIdx = current.findIndex(t => t.ticketId === ticket.ticketId);
  
  let updated: Ticket[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = ticket;
  } else {
    updated = [ticket, ...current];
  }
  
  const serializable = updated.map(t => ({
    ...t,
    originalPriceWei: t.originalPriceWei.toString(),
    resalePriceWei: t.resalePriceWei.toString(),
    maxResalePriceWei: t.maxResalePriceWei.toString()
  }));
  
  localStorage.setItem(`${LOCAL_TICKETS_KEY}_${addressKey}`, JSON.stringify(serializable));
};

export const getMockResaleListings = (eventId: number): Ticket[] => {
  return [
    {
      ticketId: 9102,
      eventId: 1,
      tierIndex: 0,
      owner: '0x1122334455667788990011223344556677889900',
      originalPriceWei: parseEther('0.015'),
      originalPriceEth: '0.015',
      isCheckedIn: false,
      isForResale: true,
      resalePriceWei: parseEther('0.016'),
      resalePriceEth: '0.016',
      maxResalePriceWei: parseEther('0.0165'),
      maxResalePriceEth: '0.0165',
      eventName: 'Echoes of the Desert: Sunsets at Joshua Tree',
      tierName: 'Early Bird Oasis',
      eventDate: Math.floor(Date.now() / 1000) + 86400 * 5,
      location: 'Joshua Tree Amphitheater, CA'
    },
    {
      ticketId: 9105,
      eventId: 1,
      tierIndex: 1,
      owner: '0x9988776655443322110099887766554433221100',
      originalPriceWei: parseEther('0.025'),
      originalPriceEth: '0.025',
      isCheckedIn: false,
      isForResale: true,
      resalePriceWei: parseEther('0.027'),
      resalePriceEth: '0.027',
      maxResalePriceWei: parseEther('0.0275'),
      maxResalePriceEth: '0.0275',
      eventName: 'Echoes of the Desert: Sunsets at Joshua Tree',
      tierName: 'General Twilight',
      eventDate: Math.floor(Date.now() / 1000) + 86400 * 5,
      location: 'Joshua Tree Amphitheater, CA'
    }
  ];
};

export const getPlatformStatsMock = (): PlatformStats => {
  return {
    totalEvents: 42,
    totalTicketsIssued: 1840,
    totalVolumeEth: '38.45',
    scalpingPreventedBps: 10000 // 100%
  };
};
