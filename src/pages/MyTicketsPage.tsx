import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { Ticket } from '../types';
import { getStoredUserTickets, saveUserTicket } from '../services/contractService';
import { TicketCard } from '../components/tickets/TicketCard';
import { QRModal } from '../components/tickets/QRModal';
import { ResellModal } from '../components/tickets/ResellModal';
import { CUSTODIA_CONTRACT_ADDRESS } from '../constants/network';
import { CUSTODIA_ABI } from '../constants/abi';
import { Ticket as TicketIcon, QrCode, Tag, ShieldCheck, Compass, PlusCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyTicketsPage: React.FC = () => {
  const { address, isConnected } = useAccount();

  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'resale' | 'checked_in'>('all');
  const [selectedQR, setSelectedQR] = useState<Ticket | null>(null);
  const [selectedResell, setSelectedResell] = useState<Ticket | null>(null);
  const [isSubmittingResell, setIsSubmittingResell] = useState(false);

  const { writeContractAsync } = useWriteContract();

  // Load tickets on mount / address change
  useEffect(() => {
    const loaded = getStoredUserTickets(address || '0xUserWallet');
    setUserTickets(loaded);
  }, [address]);

  // Handle confirming resell listing on-chain
  const handleConfirmResell = async (ticketId: number, resalePriceEth: string) => {
    setIsSubmittingResell(true);
    try {
      // Execute on-chain contract write for resell listing
      const targetTicket = userTickets.find(t => t.ticketId === ticketId);
      if (targetTicket) {
        // Attempt contract call
        try {
          await writeContractAsync({
            address: CUSTODIA_CONTRACT_ADDRESS,
            abi: CUSTODIA_ABI,
            functionName: 'resellTicket',
            args: [BigInt(ticketId), address || CUSTODIA_CONTRACT_ADDRESS],
          });
        } catch (e) {
          console.warn('Wagmi resellTicket fallback', e);
        }

        const updated: Ticket = {
          ...targetTicket,
          isForResale: true,
          resalePriceEth,
        };

        saveUserTicket(updated);
        setUserTickets(getStoredUserTickets(address || '0xUserWallet'));
      }
    } finally {
      setIsSubmittingResell(false);
      setSelectedResell(null);
    }
  };

  // Handle gate check-in demo simulation
  const handleSimulateCheckIn = (ticketId: number) => {
    const target = userTickets.find(t => t.ticketId === ticketId);
    if (target) {
      const updated: Ticket = {
        ...target,
        isCheckedIn: true,
        isForResale: false,
      };
      saveUserTicket(updated);
      setUserTickets(getStoredUserTickets(address || '0xUserWallet'));
    }
  };

  // Filter tabs logic
  const filteredTickets = userTickets.filter((t) => {
    if (activeTab === 'upcoming') return !t.isCheckedIn && !t.isForResale;
    if (activeTab === 'resale') return t.isForResale;
    if (activeTab === 'checked_in') return t.isCheckedIn;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede1cd] text-xs font-sans font-bold text-[#b94a2c]">
            <TicketIcon className="w-3.5 h-3.5" />
            <span>My On-Chain Ticket Stubs</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
            My Tickets
          </h1>
        </div>

        <Link
          to="/events"
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-2 self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Browse More Events</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#d1c5b2] pb-3 overflow-x-auto">
        {[
          { id: 'all', label: `All Tickets (${userTickets.length})` },
          { id: 'upcoming', label: `Active Entry (${userTickets.filter(t => !t.isCheckedIn && !t.isForResale).length})` },
          { id: 'resale', label: `Listed for Resale (${userTickets.filter(t => t.isForResale).length})` },
          { id: 'checked_in', label: `Checked In (${userTickets.filter(t => t.isCheckedIn).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#b94a2c] text-white shadow-sm'
                : 'bg-[#fcf2e8] text-[#1f1b15] hover:bg-[#ede1cd]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              ticket={ticket}
              onOpenQR={(t) => setSelectedQR(t)}
              onOpenResell={(t) => setSelectedResell(t)}
              onCheckIn={handleSimulateCheckIn}
            />
          ))}
        </div>
      ) : (
        <div className="card-editorial p-12 text-center rounded-3xl space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center mx-auto">
            <TicketIcon className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15]">
            No Tickets In Category
          </h3>
          <p className="text-xs text-[#8b716b] font-sans">
            You don't have any tickets matching this tab. Explore upcoming live events on GIWA Sepolia to mint your first ticket stub!
          </p>
          <div className="pt-2">
            <Link
              to="/events"
              className="btn-primary px-6 py-3 rounded-xl text-xs font-sans font-medium inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Live Events</span>
            </Link>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {selectedQR && (
        <QRModal
          ticket={selectedQR}
          onClose={() => setSelectedQR(null)}
        />
      )}

      {/* Resell Modal */}
      {selectedResell && (
        <ResellModal
          ticket={selectedResell}
          onConfirmResell={handleConfirmResell}
          onClose={() => setSelectedResell(null)}
          isPending={isSubmittingResell}
        />
      )}

    </div>
  );
};
