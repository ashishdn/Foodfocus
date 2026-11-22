import React from 'react';
import { ArrowRight, CheckCircle2, Gauge, Newspaper, Thermometer } from 'lucide-react';

interface AdActionProps {
  onSponsorClick: (sponsorTitle: string, sponsorContext: string) => void;
}

export const LeaderboardAdBanner: React.FC<AdActionProps> = ({ onSponsorClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() =>
        onSponsorClick(
          'Food Safety Legends — Interactive Training Board Game',
          'Engage factory floor operators, HACCP teams, and food handlers with scenario-based food safety challenges designed for South African food facilities.'
        )
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSponsorClick(
            'Food Safety Legends — Interactive Training Board Game',
            'Engage factory floor operators, HACCP teams, and food handlers with scenario-based food safety challenges designed for South African food facilities.'
          );
        }
      }}
      className="w-full max-w-[728px] lg:h-[90px] bg-gradient-to-r from-[#0F2F4F] via-[#174A5A] to-[#216B3E] border border-white/20 rounded-[2px] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 cursor-pointer group overflow-hidden relative shadow-sm"
    >
      {/* Subtle geometric board-game grid motif */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <div className="w-14 h-14 rounded-[3px] bg-[#FACC15] text-[#0F2F4F] flex flex-col items-center justify-center font-extrabold leading-none shadow-inner rotate-[-3deg] group-hover:rotate-0 transition-transform">
          <span className="text-[9px] uppercase tracking-wider">BOARD</span>
          <span className="text-[13px] tracking-tight">GAME</span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left min-w-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-[#FACC15] font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-tight">
            Food Safety Legends
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/75 font-semibold">
            Sponsored Feature
          </span>
        </div>
        <p className="text-white/95 text-[12px] sm:text-[13px] font-medium truncate mt-0.5">
          The engaging board game that turns food safety into fun
        </p>
      </div>

      <div className="shrink-0">
        <span className="inline-flex items-center gap-1.5 bg-[#9BC53D] group-hover:bg-[#FACC15] text-[#111111] font-extrabold text-[12px] uppercase tracking-wider px-4 py-2 rounded-[2px] transition-colors whitespace-nowrap">
          BUY NOW
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

export const HahnLawSidebarAd: React.FC<AdActionProps> = ({ onSponsorClick }) => {
  return (
    <div className="bg-white border border-[#DCDCDC] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="bg-[#1C1C1C] px-5 py-4 text-white border-b-2 border-[#C82027]">
        <div className="text-[20px] font-bold tracking-tight lowercase leading-none">
          hahn &amp; hahn
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/75 mt-1.5">
          attorneys · notaries · conveyancers
        </div>
      </div>

      <div className="p-5 flex flex-col items-center text-center bg-gradient-to-b from-[#FAFAFA] to-white">
        {/* Crisp lightbulb vector illustration */}
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" aria-hidden="true">
            <circle cx="32" cy="24" r="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <path
              d="M24 38c0-3.5-4-6-4-14a12 12 0 1 1 24 0c0 8-4 10.5-4 14H24z"
              fill="#FDE68A"
              stroke="#1C1C1C"
              strokeWidth="2"
            />
            <path d="M27 25l3 3 7-7" stroke="#C82027" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="26" y="40" width="12" height="3.5" rx="1" fill="#4B5563" />
            <rect x="27.5" y="45" width="9" height="3.5" rx="1" fill="#6B7280" />
            <path d="M32 3v4M13 13l3 3M51 13l-3 3M7 26h4M53 26h4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <p className="text-[15px] font-semibold text-[#1C1C1C] leading-snug">
          Are your lawyers engineers? <span className="text-[#C82027] font-bold">We are.</span>
        </p>

        <div className="mt-3 mb-4 px-4 py-1.5 border border-[#1C1C1C]/20 bg-[#F2F2F2] text-[#1C1C1C] text-[13px] font-extrabold tracking-[0.16em] uppercase">
          FOOD LAW
        </div>

        <p className="text-[12px] text-[#666666] leading-relaxed mb-4">
          Regulatory compliance, R146/R3337 labelling opinions, product recalls &amp; IP counsel for South African food businesses.
        </p>

        <button
          type="button"
          onClick={() =>
            onSponsorClick(
              'Hahn & Hahn Attorneys — Food Law & Engineering Counsel',
              'Specialist legal advice on the Foodstuffs, Cosmetics & Disinfectants Act, R146/R3337 labelling, Agricultural Product Standards Act, and food recalls.'
            )
          }
          className="w-full bg-[#C82027] hover:bg-[#A6181E] text-white font-bold text-[12px] uppercase tracking-[0.1em] py-2.5 px-4 rounded-[2px] transition-colors cursor-pointer"
        >
          CONTACT US
        </button>
      </div>
    </div>
  );
};

export const FoodStuffSidebarAd: React.FC<AdActionProps> = ({ onSponsorClick }) => {
  return (
    <div className="bg-[#1C1C1C] text-white border border-[#333333] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="h-1.5 bg-[#9BC53D]" />
      <div className="p-5">
        <div className="flex items-center gap-2 text-[#9BC53D] text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
          <Newspaper className="w-4 h-4" />
          <span>FMCG Trade Partner</span>
        </div>
        <h3 className="text-[20px] font-bold tracking-tight text-white leading-tight">
          FoodStuff <span className="text-[#9BC53D]">South Africa</span>
        </h3>
        <p className="text-[13px] text-white/80 leading-relaxed mt-2.5">
          Latest news on the South African FMCG food industry — retail trends, ingredient innovation, manufacturing investments, and supply-chain insights.
        </p>
        <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between">
          <span className="text-[11px] text-white/60 uppercase tracking-wider">Daily Briefing</span>
          <button
            type="button"
            onClick={() =>
              onSponsorClick(
                'FoodStuff South Africa — FMCG Industry Intelligence',
                'Daily editorial coverage of South African food & beverage manufacturing, packaging, retail launches, and executive updates.'
              )
            }
            className="text-[12px] font-bold text-[#9BC53D] hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            Read FoodStuff SA
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const InstrumentsSidebarAd: React.FC<AdActionProps> = ({ onSponsorClick }) => {
  return (
    <div className="bg-white border border-[#DCDCDC] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
      <div className="bg-[#0F4C81] text-white p-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-white/75 font-semibold mb-1">
          Precision Food Compliance
        </div>
        <h3 className="text-[19px] font-bold leading-snug">
          Food Measuring &amp; Testing Instruments
        </h3>
      </div>

      <div className="p-5 space-y-4 bg-white flex-1">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#F4F6F8] border border-[#E2E6EA] p-3 rounded-[2px] flex flex-col items-center text-center">
            <Thermometer className="w-7 h-7 text-[#0F4C81] mb-1.5" />
            <span className="text-[11px] font-bold text-[#1C1C1C]">Core Probes</span>
            <span className="text-[10px] text-[#666666]">HACCP -50 to +300°C</span>
          </div>
          <div className="bg-[#F4F6F8] border border-[#E2E6EA] p-3 rounded-[2px] flex flex-col items-center text-center">
            <Gauge className="w-7 h-7 text-[#9BC53D] mb-1.5" />
            <span className="text-[11px] font-bold text-[#1C1C1C]">pH &amp; Water Activity</span>
            <span className="text-[10px] text-[#666666]">SANAS Traceable</span>
          </div>
        </div>

        <ul className="space-y-2 text-[12.5px] text-[#333333]">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9BC53D] shrink-0 mt-0.5" />
            <span>Wireless cold-chain temperature &amp; humidity data loggers</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9BC53D] shrink-0 mt-0.5" />
            <span>Cooking oil quality testers &amp; rapid ATP hygiene luminometers</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#9BC53D] shrink-0 mt-0.5" />
            <span>Annual ISO 17025 calibration certificates for GFSI audits</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={() =>
            onSponsorClick(
              'Food Measuring & Testing Instruments — Catalogue & Calibration',
              'Request technical specifications and SANAS-traceable calibration pricing for HACCP thermometers, pH meters, ATP swabs, and wireless cold-chain loggers.'
            )
          }
          className="w-full bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[12px] uppercase tracking-[0.08em] py-2.5 px-4 rounded-[2px] transition-colors cursor-pointer"
        >
          Request Instrument Quote
        </button>
      </div>
    </div>
  );
};
