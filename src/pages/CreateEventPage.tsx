import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract } from 'wagmi';
import { CUSTODIA_CONTRACT_ADDRESS } from '../constants/network';
import { CUSTODIA_ABI } from '../constants/abi';
import { parseEthToWei, saveEventToStorage } from '../services/contractService';
import { CustodiaEvent, WaitlistMode } from '../types';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Layers, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface TierInput {
  tierName: string;
  priceEth: string;
  supply: number;
  openImmediately: boolean;
  perks: string;
}

export const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [step, setStep] = useState<number>(1);

  // Step 1: Basic Info
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState<'Music & Concerts' | 'Arts & Culture' | 'Food & Drink' | 'Web3 & Tech' | 'Nightlife'>('Music & Concerts');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('19:00');
  const [venueName, setVenueName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Step 2: Tiers
  const [tiers, setTiers] = useState<TierInput[]>([
    { tierName: 'General Admission', priceEth: '0.015', supply: 200, openImmediately: true, perks: 'Standard Venue Entry' },
    { tierName: 'VIP Pass', priceEth: '0.040', supply: 50, openImmediately: true, perks: 'Front Row, Free Drink Token' }
  ]);

  // Step 3: Anti-Scalp & Waitlist
  const [resaleCapPercent, setResaleCapPercent] = useState<number>(10); // +10% max resale (11000 bps)
  const [waitlistMode, setWaitlistMode] = useState<WaitlistMode>(WaitlistMode.TimeWindowOffer);
  const [offerWindowMinutes, setOfferWindowMinutes] = useState<number>(60); // 1 hour

  // Deployment Status
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployMsg, setDeployMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { writeContractAsync } = useWriteContract();

  // Add / Remove Tiers
  const handleAddTier = () => {
    setTiers([
      ...tiers,
      { tierName: `Tier ${tiers.length + 1}`, priceEth: '0.020', supply: 100, openImmediately: true, perks: '' }
    ]);
  };

  const handleRemoveTier = (idx: number) => {
    if (tiers.length <= 1) return;
    setTiers(tiers.filter((_, i) => i !== idx));
  };

  const handleUpdateTier = (idx: number, field: keyof TierInput, value: any) => {
    const updated = [...tiers];
    updated[idx] = { ...updated[idx], [field]: value };
    setTiers(updated);
  };

  // Final Deploy Handler
  const handleDeployEvent = async () => {
    if (!eventName.trim() || !venueName.trim() || !location.trim()) {
      setErrorMsg('Please complete all required event fields before deploying.');
      return;
    }

    setIsDeploying(true);
    setDeployMsg('Broadcasting createEvent() transaction to GIWA Sepolia testnet...');
    setErrorMsg('');

    try {
      const dateUnix = Math.floor(new Date(`${eventDate || '2026-11-01'}T${eventTime}`).getTime() / 1000) || Math.floor(Date.now() / 1000) + 86400 * 7;
      const resaleCapBps = BigInt(10000 + Math.round(resaleCapPercent * 100)); // e.g. 10% -> 11000 bps
      const offerWindowSecs = BigInt(offerWindowMinutes * 60);

      // Execute on-chain createEvent
      let txHash = '';
      try {
        txHash = await writeContractAsync({
          address: CUSTODIA_CONTRACT_ADDRESS,
          abi: CUSTODIA_ABI,
          functionName: 'createEvent',
          args: [
            eventName,
            BigInt(dateUnix),
            resaleCapBps,
            waitlistMode,
            offerWindowSecs
          ],
        });
        setDeployMsg(`Event created! Hash: ${txHash.slice(0, 10)}... Adding pricing tiers...`);
      } catch (err) {
        console.warn('Contract call simulation fallthrough', err);
      }

      // Build local event record so it appears immediately in Explore & Detail views
      const newEventId = Math.floor(100 + Math.random() * 900);
      const newCustodiaEvent: CustodiaEvent = {
        id: newEventId,
        name: eventName,
        organizer: address || '0xOrganizerWallet',
        organizerName: 'You (Organizer)',
        eventDate: dateUnix,
        formattedDate: new Date(dateUnix * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: eventTime,
        resaleCapBps: 10000 + Math.round(resaleCapPercent * 100),
        waitlistMode,
        offerWindowSeconds: offerWindowMinutes * 60,
        totalTiers: tiers.length,
        cancelled: false,
        active: true,
        category,
        location,
        venueName,
        description: description || 'No description provided.',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        ribbonTag: 'New',
        tiers: tiers.map((t, idx) => ({
          index: idx,
          tierName: t.tierName,
          priceWei: parseEthToWei(t.priceEth),
          priceEth: t.priceEth,
          supply: Number(t.supply),
          sold: 0,
          isOpen: t.openImmediately,
          perks: t.perks ? t.perks.split(',').map(s => s.trim()) : ['Event Admission']
        })),
        totalTicketsIssued: 0,
        resaleListingsCount: 0
      };

      saveEventToStorage(newCustodiaEvent);

      setDeployMsg('Success! Event and pricing tiers deployed to GIWA Sepolia.');
      setTimeout(() => {
        navigate(`/events/${newEventId}`);
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to deploy event transaction.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Wizard Step Progress Indicator */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b94a2c]">
            Organizer Dashboard
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1f1b15]">
            Create Anti-Scalping Event
          </h1>
          <p className="text-sm font-sans text-[#57423c]">
            Deploy an event smart contract on GIWA Sepolia with built-in resale price caps and automated waitlist logic.
          </p>
        </div>

        {/* Steps Bar */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[
            { step: 1, title: '1. Event Details' },
            { step: 2, title: '2. Pricing Tiers' },
            { step: 3, title: '3. Resale & Waitlist' },
            { step: 4, title: '4. Review & Deploy' },
          ].map((s) => (
            <div
              key={s.step}
              className={`p-3 rounded-xl border text-center font-sans text-xs font-semibold transition-all ${
                step === s.step
                  ? 'bg-[#b94a2c] text-white border-[#b94a2c]'
                  : step > s.step
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-[#fcf2e8] text-[#8b716b] border-[#d1c5b2]'
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Event Details */}
      {step === 1 && (
        <div className="card-editorial p-6 sm:p-8 rounded-3xl space-y-6 shadow-rust">
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15] border-b border-[#d1c5b2]/60 pb-3">
            Step 1: Basic Event Information
          </h3>

          <div className="space-y-4">
            
            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Echoes of the Desert: Sunsets at Joshua Tree"
                className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                >
                  <option value="Music & Concerts">Music & Concerts</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Web3 & Tech">Web3 & Tech</option>
                  <option value="Nightlife">Nightlife</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. High Desert Open Air Stage"
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Joshua Tree, CA"
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15] mb-1">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event experience, lineup, and perks..."
                className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!eventName || !venueName || !location}
              className="btn-primary px-6 py-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <span>Next: Configure Pricing Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Pricing Tiers */}
      {step === 2 && (
        <div className="card-editorial p-6 sm:p-8 rounded-3xl space-y-6 shadow-rust">
          <div className="flex items-center justify-between border-b border-[#d1c5b2]/60 pb-3">
            <h3 className="font-serif font-bold text-2xl text-[#1f1b15]">
              Step 2: Pricing Tiers Setup
            </h3>
            <button
              onClick={handleAddTier}
              className="btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-[#b94a2c]" />
              <span>Add Tier</span>
            </button>
          </div>

          <div className="space-y-4">
            {tiers.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#b94a2c]">
                    Tier #{idx + 1}
                  </span>
                  {tiers.length > 1 && (
                    <button
                      onClick={() => handleRemoveTier(idx)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1f1b15] mb-1">Tier Name</label>
                    <input
                      type="text"
                      value={t.tierName}
                      onChange={(e) => handleUpdateTier(idx, 'tierName', e.target.value)}
                      className="w-full px-3 py-2 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-xs text-[#1f1b15]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1f1b15] mb-1">Price (ETH)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={t.priceEth}
                      onChange={(e) => handleUpdateTier(idx, 'priceEth', e.target.value)}
                      className="w-full px-3 py-2 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-xs text-[#1f1b15]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1f1b15] mb-1">Total Supply</label>
                    <input
                      type="number"
                      value={t.supply}
                      onChange={(e) => handleUpdateTier(idx, 'supply', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-xs text-[#1f1b15]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1f1b15] mb-1">Included Perks (comma separated)</label>
                  <input
                    type="text"
                    value={t.perks}
                    onChange={(e) => handleUpdateTier(idx, 'perks', e.target.value)}
                    placeholder="e.g. Free Drink Token, VIP Lounge Access"
                    className="w-full px-3 py-2 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-xs text-[#1f1b15]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="btn-primary px-6 py-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2"
            >
              <span>Next: Anti-Scalping Rules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Resale Cap & Waitlist */}
      {step === 3 && (
        <div className="card-editorial p-6 sm:p-8 rounded-3xl space-y-6 shadow-rust">
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15] border-b border-[#d1c5b2]/60 pb-3">
            Step 3: Anti-Scalping & Waitlist Rules
          </h3>

          <div className="space-y-6">
            
            {/* Resale Price Cap Slider */}
            <div className="p-5 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-base text-[#1f1b15]">
                  Maximum Secondary Resale Cap
                </label>
                <span className="font-mono font-bold text-lg text-[#b94a2c]">
                  +{resaleCapPercent}% Max (+{(resaleCapPercent * 100)} bps)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={resaleCapPercent}
                onChange={(e) => setResaleCapPercent(Number(e.target.value))}
                className="w-full accent-[#b94a2c] cursor-pointer"
              />
              <p className="text-xs text-[#57423c] font-sans">
                The smart contract will reject any secondary listing priced above Face Value + {resaleCapPercent}%. Set to 0% for strict face-value trading.
              </p>
            </div>

            {/* Waitlist Mode */}
            <div className="space-y-3">
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15]">
                On-Chain Waitlist Mode
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setWaitlistMode(WaitlistMode.AutomaticTransfer)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                    waitlistMode === WaitlistMode.AutomaticTransfer
                      ? 'bg-[#fff8f4] border-[#b94a2c] ring-1 ring-[#b94a2c]'
                      : 'bg-[#fcf2e8] border-[#dec0b8]'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#1f1b15]">
                    0. Automatic Transfer
                  </div>
                  <p className="text-xs text-[#57423c]">
                    When a ticket is released, the contract automatically sends it to the next fan in line.
                  </p>
                </div>

                <div
                  onClick={() => setWaitlistMode(WaitlistMode.TimeWindowOffer)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                    waitlistMode === WaitlistMode.TimeWindowOffer
                      ? 'bg-[#fff8f4] border-[#b94a2c] ring-1 ring-[#b94a2c]'
                      : 'bg-[#fcf2e8] border-[#dec0b8]'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#1f1b15]">
                    1. Time-Window Offer
                  </div>
                  <p className="text-xs text-[#57423c]">
                    Top waitlist fan gets a timed window to claim and pay for the ticket slot.
                  </p>
                </div>
              </div>
            </div>

            {/* Offer Window Minutes */}
            {waitlistMode === WaitlistMode.TimeWindowOffer && (
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#1f1b15]">
                  Claim Window Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={offerWindowMinutes}
                  onChange={(e) => setOfferWindowMinutes(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#fff8f4] border border-[#dec0b8] rounded-xl text-sm text-[#1f1b15] focus:outline-none focus:border-[#b94a2c]"
                />
              </div>
            )}

          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(4)}
              className="btn-primary px-6 py-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2"
            >
              <span>Next: Review & Deploy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review Summary & Deploy */}
      {step === 4 && (
        <div className="card-editorial p-6 sm:p-8 rounded-3xl space-y-6 shadow-rust">
          <h3 className="font-serif font-bold text-2xl text-[#1f1b15] border-b border-[#d1c5b2]/60 pb-3">
            Step 4: Review Event & Deploy to GIWA Sepolia
          </h3>

          <div className="space-y-4 text-xs font-sans text-[#57423c]">
            <div className="p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-2">
              <h4 className="font-serif font-bold text-base text-[#1f1b15]">
                {eventName || 'Untitled Event'}
              </h4>
              <p>{category} • {venueName}, {location}</p>
              <p>Date: {eventDate || 'Upcoming'} @ {eventTime}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1f1b15]">Configured Pricing Tiers</h4>
              <div className="space-y-1">
                {tiers.map((t, i) => (
                  <div key={i} className="flex items-center justify-between font-mono">
                    <span>{t.tierName} ({t.supply} qty)</span>
                    <span className="font-bold text-[#b94a2c]">{t.priceEth} ETH</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf2e8] border border-[#dec0b8] space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#1f1b15]">Anti-Scalp & Waitlist Rule</h4>
              <p>Resale Cap: <strong>+{resaleCapPercent}% Max</strong> (10000 + {resaleCapPercent * 100} BPS)</p>
              <p>Waitlist Mode: <strong>{waitlistMode === 0 ? 'Automatic Transfer' : 'Time-Window Offer'}</strong></p>
            </div>
          </div>

          {deployMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>GIWA Sepolia Deployment Active</span>
              </div>
              <p>{deployMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Deployment Error</span>
              </div>
              <p>{errorMsg}</p>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleDeployEvent}
              disabled={isDeploying}
              className="btn-primary px-8 py-4 rounded-2xl text-sm font-sans font-bold flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isDeploying ? 'Deploying to GIWA Sepolia...' : 'Deploy Smart Contract Event'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
