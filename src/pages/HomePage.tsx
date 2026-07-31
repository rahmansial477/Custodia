import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INITIAL_FEATURED_EVENTS } from '../data/mockEvents';
import { EventCard } from '../components/events/EventCard';
import { CheckInModal } from '../components/organizer/CheckInModal';
import { Shield, Sparkles, Lock, Ticket, ArrowRight, ChevronDown, CheckCircle2, UserCheck, Layers, ExternalLink, Zap } from 'lucide-react';

const ROADMAP_PHASES = [
  {
    phase: 'Phase 1',
    title: 'GIWA Sepolia Testnet Protocol Launch',
    status: 'Live on Testnet',
    statusColor: 'bg-emerald-500',
    description: 'Core smart contract deployment on GIWA Sepolia (0x62bb...892f). Support for capped resale basis points, tiered primary minting, waitlist modes, and on-chain check-in verification.'
  },
  {
    phase: 'Phase 2',
    title: 'Stablecoin & Dynamic Gas Abstraction',
    status: 'In Progress',
    statusColor: 'bg-amber-500',
    description: 'Integrating account abstraction (ERC-4337) and USDC/USDT payment options so fans can mint tickets seamlessly without pre-funding native ETH gas.'
  },
  {
    phase: 'Phase 3',
    title: 'Organizer Analytics & Batch Gate Scanner',
    status: 'Q1 2027',
    statusColor: 'bg-blue-500',
    description: 'Empowering festival organizers with real-time gate throughput telemetry, batch ticket refund execution, and offline-first QR scanner mobile apps.'
  },
  {
    phase: 'Phase 4',
    title: 'Mainnet Deployment & Zero-Knowledge Privacy',
    status: 'Q2 2027',
    statusColor: 'bg-purple-500',
    description: 'Deploying to GIWA Mainnet paired with ZK-SNARK identity proofs to prevent fan dox concerns while proving valid ticket ownership at entry.'
  },
  {
    phase: 'Phase 5',
    title: 'Cross-Event Loyalty & Fan Discovery Engine',
    status: 'Q3 2027',
    statusColor: 'bg-stone-500',
    description: 'Enabling recurring festival attendees to claim priority waitlist perks, collectible soulbound audio stubs, and cross-artist event access.'
  }
];

const FAQS = [
  {
    q: 'How does Custodia prevent ticket scalping and price gouging?',
    a: 'Custodia enforces immutable price caps at the smart contract level (`resaleCapBps`). When a ticket is listed or resold peer-to-peer, the contract calculates `getMaxResalePrice(ticketId)` and rejects any transaction exceeding that ceiling (e.g. 110% of face value). Scalper bots literally cannot inflate prices.'
  },
  {
    q: 'What happens if an event is cancelled by the organizer?',
    a: 'Organizers can invoke `cancelEvent(eventId)` and fund `refundAllTickets(eventId)`. The smart contract automatically opens direct refund claims or batch returns ticket funds directly to original holder wallets without intermediaries.'
  },
  {
    q: 'How does the on-chain Waitlist system function?',
    a: 'Events can configure Waitlist Mode to either Automatic Transfer or Time Window Offers. When a ticket tier sells out, fans join the queue (`joinWaitlist`). If a ticket becomes available, the contract either automatically transfers it or gives the top waitlist fan a timed window (`offerWindowSeconds`) to claim it.'
  },
  {
    q: 'Why is Custodia deployed on GIWA Sepolia testnet?',
    a: 'GIWA Sepolia (Chain ID 91342) offers sub-second block times and near-zero gas fees, enabling high-throughput ticket mints and rapid gate check-ins without latency or expensive network congestion.'
  },
  {
    q: 'Is my ticket transferable to a friend?',
    a: 'Yes! Tickets can be resold or transferred directly through the Custodia dApp or contract, as long as the transfer price complies with the event’s configured resale cap.'
  },
  {
    q: 'How does venue check-in work on event night?',
    a: 'The ticket holder presents their dynamic QR code or verification proof hash. Venue gate staff use the Custodia Check-In scanner to execute `checkIn(ticketId)` on-chain, preventing double-entry or duplicate ticket fraud.'
  }
];

export const HomePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Mock checkin handler for demo
  const handleCheckInDemo = async (ticketId: number) => {
    await new Promise(r => setTimeout(r, 800));
    return true;
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede1cd] border border-[#dec0b8] text-xs font-sans font-semibold text-[#b94a2c]">
                <Shield className="w-4 h-4 fill-[#b94a2c]" />
                <span>GIWA Sepolia Testnet Protocol • Anti-Scalping Guaranteed</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1f1b15] leading-[1.1] tracking-tight">
                Tickets That <br className="hidden sm:block" />
                <span className="text-[#b94a2c] underline decoration-[#dec0b8] decoration-4 underline-offset-8">
                  Can't Be Scalped.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-base sm:text-lg text-[#57423c] leading-relaxed max-w-xl">
                Custodia locks secondary ticket prices on-chain with immutable smart contract caps. Experience fair live music, tech summits, and cultural events without predatory bot markups.
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/events"
                  className="btn-primary px-8 py-4 rounded-2xl text-sm font-sans font-semibold flex items-center gap-3 shadow-rust-lg"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/create"
                  className="btn-secondary px-6 py-4 rounded-2xl text-sm font-sans font-semibold flex items-center gap-2"
                >
                  <span>Create an Event</span>
                </Link>

                <button
                  onClick={() => setShowCheckInModal(true)}
                  className="px-4 py-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] text-xs font-sans font-medium text-[#1f1b15] hover:border-[#b94a2c] transition-colors flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#b94a2c]" />
                  <span>Gate Verifier</span>
                </button>
              </div>

              {/* Micro Trust Specs */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-sans text-[#8b716b] border-t border-[#d1c5b2]/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Contract 0x62bb...892f</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Native ETH Gas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Automated Waitlists</span>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#d1c5b2] bg-[#2a241e] shadow-rust-lg group">
                <img
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
                  alt="Echoes of the Desert"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b15] via-[#1f1b15]/40 to-transparent"></div>

                {/* Floating Ticket Stub Badge on Hero Image */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#fff8f4]/95 backdrop-blur-md border border-[#d1c5b2] space-y-3 shadow-rust">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#b94a2c]">
                      Featured Live Event
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#b94a2c] text-white text-[10px] font-bold">
                      Resale Cap: +10%
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1f1b15]">
                    Echoes of the Desert: Sunsets at Joshua Tree
                  </h3>
                  <div className="flex items-center justify-between text-xs font-sans text-[#57423c]">
                    <span>OCT 24, 2026 • 17:00 PST</span>
                    <span className="font-serif font-bold text-[#1f1b15]">From 0.015 ETH</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Live Platform Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1f1b15] text-[#ede1cd] rounded-3xl p-8 shadow-rust-lg border border-[#353029]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#353029]">
            
            <div className="p-2 space-y-1">
              <span className="block font-serif font-bold text-3xl sm:text-4xl text-white">
                100%
              </span>
              <span className="block text-xs font-sans text-[#a89c8a] uppercase tracking-wider">
                Price Cap Enforcement
              </span>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <span className="block font-serif font-bold text-3xl sm:text-4xl text-[#b94a2c]">
                1,840+
              </span>
              <span className="block text-xs font-sans text-[#a89c8a] uppercase tracking-wider">
                On-Chain Tickets Issued
              </span>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <span className="block font-serif font-bold text-3xl sm:text-4xl text-white">
                38.45 ETH
              </span>
              <span className="block text-xs font-sans text-[#a89c8a] uppercase tracking-wider">
                Primary Mint Volume
              </span>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <span className="block font-serif font-bold text-3xl sm:text-4xl text-emerald-400">
                0 Scalped
              </span>
              <span className="block text-xs font-sans text-[#a89c8a] uppercase tracking-wider">
                Zero Bot Markup
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
              Curated Experiences
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
              Featured Anti-Scalp Events
            </h2>
          </div>
          <Link
            to="/events"
            className="text-sm font-sans font-semibold text-[#b94a2c] hover:underline flex items-center gap-1.5"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid of 4 Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_FEATURED_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* How Custodia Works Section */}
      <section id="how-it-works" className="bg-[#fcf2e8] py-20 border-y border-[#d1c5b2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
              Protocol Architecture
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
              How Custodia Solves Ticketing
            </h2>
            <p className="font-sans text-sm text-[#57423c]">
              A non-custodial, smart-contract-first architecture designed to protect true fans and give event organizers full price sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="card-editorial p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center font-serif font-bold text-xl">
                01
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1f1b15]">
                On-Chain Resale Caps
              </h3>
              <p className="text-xs text-[#57423c] leading-relaxed font-sans">
                Organizers set `resaleCapBps` (e.g. 110% = 11000). The contract rejects secondary transfers above this ceiling, eliminating scalper profit margins.
              </p>
            </div>

            <div className="card-editorial p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center font-serif font-bold text-xl">
                02
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1f1b15]">
                Tiered Primary Mints
              </h3>
              <p className="text-xs text-[#57423c] leading-relaxed font-sans">
                Create multiple price tiers (Early Bird, General, VIP) with custom supplies and open/close toggles, ensuring structured primary distribution.
              </p>
            </div>

            <div className="card-editorial p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center font-serif font-bold text-xl">
                03
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1f1b15]">
                Smart Waitlist Queues
              </h3>
              <p className="text-xs text-[#57423c] leading-relaxed font-sans">
                When tiers sell out, fans join the on-chain queue (`joinWaitlist`). Released tickets trigger automatic transfers or timed offer windows (`offerWindowSeconds`).
              </p>
            </div>

            <div className="card-editorial p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#b94a2c]/10 text-[#b94a2c] flex items-center justify-center font-serif font-bold text-xl">
                04
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1f1b15]">
                On-Chain Gate Check-In
              </h3>
              <p className="text-xs text-[#57423c] leading-relaxed font-sans">
                Organizers verify and consume tickets at the venue door (`checkIn(ticketId)`), invalidating reused or duplicate QR codes instantly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* About & Roadmap Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* About Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
              About Custodia
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
              Restoring Integrity to Live Event Ticketing
            </h2>
            <p className="font-sans text-sm text-[#57423c] leading-relaxed">
              Custodia was created to dismantle the secondary ticket scalping industry. By embedding price boundaries directly inside EVM smart contracts on GIWA Sepolia, we guarantee that artists, venue operators, and real fans retain control over ticket pricing.
            </p>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#fff8f4] border border-[#d1c5b2] space-y-4 shadow-rust">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b94a2c] text-white flex items-center justify-center font-serif font-bold text-lg">
                C
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#1f1b15]">Verified Contract Address</h4>
                <p className="text-xs font-mono text-[#8b716b]">GIWA Sepolia Network</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#fcf2e8] border border-[#dec0b8] font-mono text-xs text-[#b94a2c] break-all">
              0x62bb24bF96b52783146591398e783E5CA30e892f
            </div>
            <a
              href="https://sepolia-explorer.giwa.io/address/0x62bb24bF96b52783146591398e783E5CA30e892f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#b94a2c] hover:underline"
            >
              <span>Inspect Contract Source Code on GIWA Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Roadmap Accordion Timeline */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
              Protocol Evolution
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1f1b15]">
              Custodia Development Roadmap
            </h3>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {ROADMAP_PHASES.map((p, idx) => (
              <div
                key={p.phase}
                className="card-editorial p-6 rounded-2xl space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d1c5b2]/40 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs text-[#b94a2c] px-2.5 py-1 rounded-md bg-[#b94a2c]/10">
                      {p.phase}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#1f1b15]">
                      {p.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans font-semibold">
                    <span className={`h-2.5 w-2.5 rounded-full ${p.statusColor}`}></span>
                    <span className="text-[#57423c]">{p.status}</span>
                  </div>
                </div>
                <p className="text-xs text-[#57423c] font-sans leading-relaxed pt-1">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="bg-[#fcf2e8] py-20 border-t border-[#d1c5b2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
              Got Questions?
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#fff8f4] border border-[#d1c5b2] rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-serif font-bold text-lg text-[#1f1b15] flex items-center justify-between gap-4 hover:text-[#b94a2c] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#b94a2c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 font-sans text-xs sm:text-sm text-[#57423c] leading-relaxed border-t border-[#d1c5b2]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Gate Verifier Check-In Modal */}
      {showCheckInModal && (
        <CheckInModal
          onCheckInOnChain={handleCheckInDemo}
          onClose={() => setShowCheckInModal(false)}
        />
      )}

    </div>
  );
};
