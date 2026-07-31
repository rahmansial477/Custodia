import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu, X, Shield, PlusCircle, Ticket as TicketIcon, Compass, HelpCircle, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f4]/90 backdrop-blur-md border-b border-[#d1c5b2]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#b94a2c] text-white flex items-center justify-center font-serif font-bold text-xl shadow-rust group-hover:scale-105 transition-transform">
            C
          </div>
          <div>
            <span className="font-serif font-bold text-2xl tracking-tight text-[#1f1b15] group-hover:text-[#b94a2c] transition-colors">
              Custodia
            </span>
            <span className="block text-[10px] font-sans font-medium tracking-widest text-[#8b716b] uppercase -mt-1">
              Anti-Scalping Protocol
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ede1cd]/50 p-1.5 rounded-full border border-[#d1c5b2]/40">
          <Link
            to="/events"
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all flex items-center gap-2 ${
              isActive('/events')
                ? 'bg-[#b94a2c] text-white shadow-sm'
                : 'text-[#1f1b15] hover:text-[#b94a2c] hover:bg-[#ede1cd]'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore
          </Link>

          <Link
            to="/create"
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all flex items-center gap-2 ${
              isActive('/create')
                ? 'bg-[#b94a2c] text-white shadow-sm'
                : 'text-[#1f1b15] hover:text-[#b94a2c] hover:bg-[#ede1cd]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Create Event
          </Link>

          <Link
            to="/tickets"
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all flex items-center gap-2 ${
              isActive('/tickets')
                ? 'bg-[#b94a2c] text-white shadow-sm'
                : 'text-[#1f1b15] hover:text-[#b94a2c] hover:bg-[#ede1cd]'
            }`}
          >
            <TicketIcon className="w-4 h-4" />
            My Tickets
          </Link>

          <a
            href="/#how-it-works"
            className="px-4 py-2 rounded-full text-sm font-sans font-medium text-[#1f1b15] hover:text-[#b94a2c] hover:bg-[#ede1cd] transition-all flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            How It Works
          </a>

          <a
            href="/#faq"
            className="px-4 py-2 rounded-full text-sm font-sans font-medium text-[#1f1b15] hover:text-[#b94a2c] hover:bg-[#ede1cd] transition-all flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </a>
        </nav>

        {/* Network Pill & Connect Wallet */}
        <div className="hidden lg:flex items-center gap-3">
          {/* GIWA Sepolia Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fcf2e8] border border-[#dec0b8] text-xs font-mono font-medium text-[#57423c]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>GIWA Sepolia (91342)</span>
          </div>

          <ConnectButton
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            chainStatus="icon"
          />
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="scale-90">
            <ConnectButton
              showBalance={false}
              accountStatus="avatar"
              chainStatus="none"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#ede1cd] text-[#1f1b15] hover:bg-[#eadeca] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f4] border-b border-[#d1c5b2] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#fcf2e8] border border-[#dec0b8] mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#57423c]">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>GIWA Sepolia Testnet</span>
            </div>
            <span className="text-[11px] font-sans font-bold text-[#b94a2c]">Chain 91342</span>
          </div>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base ${
              isActive('/events') ? 'bg-[#b94a2c] text-white' : 'text-[#1f1b15] bg-[#ede1cd]/40'
            }`}
          >
            <Compass className="w-5 h-5" />
            Explore Events
          </Link>

          <Link
            to="/create"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base ${
              isActive('/create') ? 'bg-[#b94a2c] text-white' : 'text-[#1f1b15] bg-[#ede1cd]/40'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            Create Event
          </Link>

          <Link
            to="/tickets"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base ${
              isActive('/tickets') ? 'bg-[#b94a2c] text-white' : 'text-[#1f1b15] bg-[#ede1cd]/40'
            }`}
          >
            <TicketIcon className="w-5 h-5" />
            My Tickets
          </Link>

          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base text-[#1f1b15] bg-[#ede1cd]/40"
          >
            <Shield className="w-5 h-5" />
            How It Works
          </a>

          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base text-[#1f1b15] bg-[#ede1cd]/40"
          >
            <HelpCircle className="w-5 h-5" />
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
