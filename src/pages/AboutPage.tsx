import React from 'react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { SafeImage } from '../components/SafeImage';
import { BRAND_ASSETS } from '../data/foodfocusData';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onSponsorClick: (title: string, context: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onSponsorClick }) => {
  return (
    <InnerPageLayout pageTitle="ABOUT US" onSponsorClick={onSponsorClick}>
      <div className="space-y-6 text-[15px] text-[#18221C] leading-[1.7]">
        <p className="text-[18px] font-semibold text-[#0F1F17] leading-snug">
          Welcome to Food Focus, where we believe in doing things &lsquo;the right way&rsquo;.
        </p>

        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#F7F6F1]">
          <SafeImage
            src={BRAND_ASSETS.packhouseImage}
            alt="Quality assurance inspection along a South African farm-to-fork food packhouse"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-[18px] font-bold text-[#0F1F17]">Who are we?</h3>
          <p>
            Owned and published by <strong>Food Risk Forum Pty Ltd</strong> and launched in 2016,
            Food Focus is South Africa&rsquo;s dedicated B2B digital media and compliance information
            hub for the entire food and beverage value chain. From primary agriculture and dairy
            production through food manufacturing, testing laboratories, cold-chain logistics, and
            retail, we equip industry professionals with accurate, practical guidance.
          </p>
          <p>
            Our editorial coverage spans every dimension of modern food compliance: food safety and
            HACCP systems, national legislation and municipal regulations, plant hygiene, quality
            assurance, employee safety, corporate social responsibility (CSR), and environmental
            sustainability.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-[18px] font-bold text-[#0F1F17]">How do we aim to help?</h3>
          <p>
            Navigating South African food legislation and global GFSI audit standards can be complex
            and time-consuming. Food Focus curates insights directly from recognised food scientists,
            food law attorneys, Environmental Health Practitioners, certification bodies, and
            specialist technical suppliers so that quality teams have reliable answers in one place.
          </p>
        </div>

        {/* Centered bold mission quote with hairline top/bottom dividers */}
        <blockquote className="my-8 py-6 px-4 border-y border-[#E3E1D6] bg-[#F7F6F1] text-center">
          <p className="text-[18px] sm:text-[20px] font-bold text-[#0F1F17] leading-snug max-w-[620px] mx-auto">
            &ldquo;We connect people to people, people to information, and problems to
            sector-specific solutions.&rdquo;
          </p>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="border border-[#E3E1D6] p-4 rounded-lg bg-white">
            <div className="text-[13px] font-bold uppercase tracking-wider text-[#9BC53D] mb-1">
              Farm to Fork
            </div>
            <p className="text-[13.5px] text-[#3F4A43] leading-relaxed">
              Practical compliance resources covering primary production, processing, packaging, and
              retail distribution.
            </p>
          </div>
          <div className="border border-[#E3E1D6] p-4 rounded-lg bg-white">
            <div className="text-[13px] font-bold uppercase tracking-wider text-[#9BC53D] mb-1">
              Expert Contributors
            </div>
            <p className="text-[13.5px] text-[#3F4A43] leading-relaxed">
              Independent insights authored by South African food lawyers, microbiologists, and
              industry standard bodies.
            </p>
          </div>
          <div className="border border-[#E3E1D6] p-4 rounded-lg bg-white">
            <div className="text-[13px] font-bold uppercase tracking-wider text-[#9BC53D] mb-1">
              Inspiring Compliance
            </div>
            <p className="text-[13.5px] text-[#3F4A43] leading-relaxed">
              Accessible webinars, regulatory updates, and supplier connections built to help your
              business comply.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-semibold text-[14px] px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Explore Our Services
          </button>
          <button
            type="button"
            onClick={() => onNavigate('advertise')}
            className="border border-[#0F1F17] hover:bg-[#0F1F17] hover:text-white text-[#0F1F17] font-semibold text-[14px] px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Advertise With Us
          </button>
        </div>
      </div>
    </InnerPageLayout>
  );
};
