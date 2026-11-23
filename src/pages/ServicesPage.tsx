import React from 'react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { PageId } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSponsorClick: (title: string, context: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSponsorClick }) => {
  const pillars = [
    {
      title: 'Technical Editorial & Thought Leadership',
      desc: 'Publish authoritative articles, case studies, and white papers reviewed alongside our editorial team to position your specialists as trusted compliance voices.',
    },
    {
      title: 'Sponsored Webinars & Knowledge Sharing',
      desc: 'End-to-end webinar hosting, registration management, live moderation, and permanent on-demand placement in the Food Focus Webinar Library.',
    },
    {
      title: 'Targeted B2B Digital Advertising',
      desc: 'High-visibility 728×90 leaderboard and 300px sidebar banner campaigns reaching QA managers, food technologists, and procurement leads across South Africa.',
    },
    {
      title: 'Supplier Directory & Lead Generation',
      desc: 'Dedicated company profile pages connecting your laboratory, certification body, sanitation brand, or equipment line with buyers seeking sector-specific solutions.',
    },
  ];

  return (
    <InnerPageLayout pageTitle="OUR SERVICES" onSponsorClick={onSponsorClick}>
      <div className="space-y-6 text-[15px] text-[#18221C] leading-[1.7]">
        <p>
          Food Focus operates as a specialised B2B digital marketing and industry information
          platform dedicated to food compliance from <strong>farm to fork</strong>. We bridge the
          gap between South African food business operators and the accredited laboratories,
          certification bodies, legal advisors, hygiene engineers, and technology providers who help
          them succeed.
        </p>

        {/* Italic editorial quote block */}
        <blockquote className="my-6 py-5 px-6 border-y border-[#E3E1D6] bg-[#F7F6F1]">
          <p className="font-serif italic text-[18px] sm:text-[20px] text-[#0F1F17] leading-relaxed">
            &ldquo;Whether your business needs to interpret new Department of Health labelling
            regulations, validate hygienic equipment design, or reach South Africa&rsquo;s food
            safety decision-makers, Food Focus connects you to the right expertise — the right
            way.&rdquo;
          </p>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="border border-[#E3E1D6] bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[16px] font-bold text-[#0F1F17] mb-2">{item.title}</h3>
              <p className="text-[13.5px] text-[#3F4A43] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E3E1D6] p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-[15px] font-bold text-[#0F1F17]">
              Ready to partner with Food Focus?
            </h4>
            <p className="text-[13px] text-[#5B675F] mt-0.5">
              View our audience metrics and campaign packages or speak directly with our team.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('advertise')}
            className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-semibold text-[14px] px-5 py-2.5 rounded-full whitespace-nowrap cursor-pointer"
          >
            View Advertising Packages
          </button>
        </div>
      </div>
    </InnerPageLayout>
  );
};
