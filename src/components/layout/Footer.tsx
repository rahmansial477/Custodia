import React from 'react';
import { Link } from 'react-router-dom';
import { CUSTODIA_CONTRACT_ADDRESS } from '../../constants/network';
import { Shield, ExternalLink, Github, Twitter, Heart } from 'lucide-react';
import { CustodiaLogo } from '../common/CustodiaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f1b15] text-[#ede1cd] pt-16 pb-12 border-t-4 border-[#b94a2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#353029]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <CustodiaLogo size={44} showText={true} variant="dark" />
            </Link>
            <p className="text-sm font-sans text-[#a89c8a] leading-relaxed max-w-md">
              An on-chain anti-scalping event ticketing platform built on GIWA Sepolia testnet. Enforcing immutable price caps, tiered primary minting, and smart waitlists directly inside smart contracts.
            </p>
            
            {/* GIWA Sepolia Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#353029] border border-[#57423c] text-xs font-mono text-[#eadeca]">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>GIWA Sepolia Network (Chain ID: 91342)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-sans text-[#a89c8a]">
              <li>
                <Link to="/events" className="hover:text-[#b94a2c] transition-colors">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-[#b94a2c] transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="hover:text-[#b94a2c] transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-[#b94a2c] transition-colors">
                  How Anti-Scalping Works
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-[#b94a2c] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Smart Contract & On-Chain Explorer */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide">
              Verified Smart Contract
            </h4>
            <p className="text-xs font-sans text-[#a89c8a]">
              Deployed on GIWA Sepolia Testnet at:
            </p>
            <div className="p-3 rounded-xl bg-[#2a241e] border border-[#353029] font-mono text-xs text-[#dec0b8] break-all">
              {CUSTODIA_CONTRACT_ADDRESS}
            </div>
            <a
              href={`https://sepolia-explorer.giwa.io/address/${CUSTODIA_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#b94a2c] hover:text-[#eadeca] transition-colors"
            >
              <span>View Verified Contract on GIWA Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/rahmansial477"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#353029] text-[#eadeca] hover:text-white hover:bg-[#b94a2c] transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/rahmansial477"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#353029] text-[#eadeca] hover:text-white hover:bg-[#b94a2c] transition-all"
                aria-label="Twitter X Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Attribution & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8b716b]">
          
          {/* Creator Attribution with Shine Effect */}
          <div className="flex items-center gap-2">
            <span>Built with passion by</span>
            <a
              href="https://github.com/rahmansial477"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-serif font-bold text-sm text-[#eadeca] hover:text-white transition-colors"
            >
              <span className="relative z-10 underline decoration-[#b94a2c] decoration-2 underline-offset-4 group-hover:text-white">
                Rahman
              </span>
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
              {/* Subtle hover shine gradient */}
              <span className="absolute -inset-1 rounded-md bg-gradient-to-r from-[#b94a2c]/0 via-[#b94a2c]/30 to-[#b94a2c]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xs"></span>
            </a>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-center md:text-right max-w-xl text-[11px] leading-tight text-[#8b716b]">
            Custodia is an independent project built on GIWA Sepolia. Not an official GIWA product and not affiliated with Upbit or Dunamu.
          </p>
        </div>
      </div>
    </footer>
  );
};
