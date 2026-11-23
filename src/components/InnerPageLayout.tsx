import React from 'react';
import { FoodStuffSidebarAd, HahnLawSidebarAd } from './AdBanners';

interface InnerPageLayoutProps {
  pageTitle: string;
  /** optional short intro under the page title */
  intro?: string;
  eyebrow?: string;
  children: React.ReactNode;
  topSidebarWidget?: React.ReactNode;
  onSponsorClick: (title: string, context: string) => void;
}

const toSentence = (t: string) => (t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t);

export const InnerPageLayout: React.FC<InnerPageLayoutProps> = ({
  pageTitle,
  intro,
  eyebrow = 'foodfocus',
  children,
  topSidebarWidget,
  onSponsorClick,
}) => {
  return (
    <div className="bg-paper">
      {/* Page header band */}
      <div className="border-b border-line bg-[radial-gradient(90%_120%_at_100%_0%,rgba(155,197,61,.16),transparent_60%)]">
        <div className="ff-container py-12 sm:py-16">
          <span className="ff-eyebrow">{eyebrow}</span>
          <h1 className="mt-4 font-display font-normal text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.03em] text-text max-w-[18ch]">
            {toSentence(pageTitle)}
          </h1>
          {intro && <p className="mt-4 text-[18px] text-muted max-w-[56ch]">{intro}</p>}
        </div>
      </div>

      <div className="ff-container py-12 sm:py-14">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <main className="w-full lg:flex-1 min-w-0">{children}</main>

          <aside className="w-full lg:w-[300px] shrink-0 space-y-6 lg:sticky lg:top-[100px]">
            {topSidebarWidget}
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Partners</span>
            <HahnLawSidebarAd onSponsorClick={onSponsorClick} />
            <FoodStuffSidebarAd onSponsorClick={onSponsorClick} />
          </aside>
        </div>
      </div>
    </div>
  );
};
