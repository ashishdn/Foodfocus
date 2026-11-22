import React, { useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { ADVERTISE_STATS } from '../data/foodfocusData';

interface AdvertisePageProps {
  onSponsorClick: (title: string, context: string) => void;
}

export const AdvertisePage: React.FC<AdvertisePageProps> = ({ onSponsorClick }) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Website ad banners');
  const [submitted, setSubmitted] = useState(false);

  const offerings = [
    {
      label: 'Brand awareness:',
      detail: 'website ad banners (728×90 leaderboard and 300px sidebar placements across high-intent compliance pages)',
    },
    {
      label: 'Thought leadership:',
      detail: 'targeted editorial features, technical guides, and live or on-demand hosted webinars',
    },
    {
      label: 'Access to our audience:',
      detail: 'sponsored social media amplification and direct email newsletter marketing to opted-in professionals',
    },
    {
      label: 'Leverage our reputation:',
      detail: 'comprehensive Supplier Directory listing or featured homepage directory tile placement',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <InnerPageLayout pageTitle="ADVERTISE WITH US" onSponsorClick={onSponsorClick}>
      <div className="space-y-8 text-[15px] text-[#333333] leading-[1.7]">
        <div>
          <p className="mb-5">
            Position your brand in front of South Africa&rsquo;s food safety managers, quality
            assurance directors, regulatory specialists, food technologists, and procurement
            decision-makers. Our targeted B2B opportunities include:
          </p>

          <ul className="space-y-3 bg-[#FAFAFA] border border-[#E5E5E5] p-5 rounded-[2px]">
            {offerings.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#9BC53D]/20 text-[#6F9321] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span>
                  <strong className="text-[#1C1C1C]">{item.label}</strong> {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* STATISTICS AS AT 31 AUGUST 2024 */}
        <section className="pt-2">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#1C1C1C] pb-2.5">
              STATISTICS AS AT 31 AUGUST 2024
            </h3>
            <div className="relative h-[3px] w-full">
              <div className="absolute inset-x-0 bottom-0 h-px bg-[#DCDCDC]" />
              <div className="relative h-[3px] w-10 bg-[#9BC53D]" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {ADVERTISE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#E5E5E5] rounded-[2px] p-4 text-center shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
              >
                <div className="text-[28px] sm:text-[30px] font-extrabold text-[#9BC53D] leading-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[12.5px] font-medium text-[#666666] leading-snug mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Kit Request Form */}
        <section className="bg-[#F2F2F2] border border-[#DCDCDC] p-6 rounded-[2px]">
          <h3 className="text-[16px] font-bold uppercase tracking-wide text-[#1C1C1C] mb-1">
            Request 2025 Media Kit &amp; Rate Card
          </h3>
          <p className="text-[13.5px] text-[#555555] mb-4">
            Receive banner specifications, webinar sponsorship slots, and annual directory package
            rates.
          </p>

          {submitted ? (
            <div className="bg-white border border-[#9BC53D] p-4 rounded-[2px] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#84AC2D] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#1C1C1C] text-[14px]">
                  Media kit request received for {company}
                </div>
                <p className="text-[13px] text-[#555555] mt-0.5">
                  Our commercial partnerships team will send our rate card for &ldquo;{interest}
                  &rdquo; to {email}.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company / Brand Name"
                className="bg-white border border-[#CCCCCC] px-3.5 py-2.5 text-[14px] rounded-[2px] focus:outline-2 focus:outline-[#9BC53D]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work Email Address"
                className="bg-white border border-[#CCCCCC] px-3.5 py-2.5 text-[14px] rounded-[2px] focus:outline-2 focus:outline-[#9BC53D]"
              />
              <div className="flex gap-2">
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="flex-1 bg-white border border-[#CCCCCC] px-3 py-2.5 text-[13.5px] rounded-[2px] focus:outline-2 focus:outline-[#9BC53D]"
                >
                  <option>Website ad banners</option>
                  <option>Hosted webinars</option>
                  <option>Sponsored editorial &amp; email</option>
                  <option>Supplier Directory feature</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[12.5px] uppercase tracking-wider px-4 py-2.5 rounded-[2px] whitespace-nowrap cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </InnerPageLayout>
  );
};
