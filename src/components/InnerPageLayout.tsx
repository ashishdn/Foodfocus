import React from 'react';
import {
  FoodStuffSidebarAd,
  HahnLawSidebarAd,
  InstrumentsSidebarAd,
} from './AdBanners';
import { SectionHeading } from './SectionHeading';

interface InnerPageLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
  topSidebarWidget?: React.ReactNode;
  onSponsorClick: (title: string, context: string) => void;
}

export const InnerPageLayout: React.FC<InnerPageLayoutProps> = ({
  pageTitle,
  children,
  topSidebarWidget,
  onSponsorClick,
}) => {
  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-9">
          {/* Main Content (~800px) */}
          <main className="w-full lg:flex-1 min-w-0">
            <SectionHeading title={pageTitle} variant="page" />
            {children}
          </main>

          {/* 300px Right Sidebar of Stacked Ads */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-6">
            {topSidebarWidget}
            <HahnLawSidebarAd onSponsorClick={onSponsorClick} />
            <FoodStuffSidebarAd onSponsorClick={onSponsorClick} />
            <InstrumentsSidebarAd onSponsorClick={onSponsorClick} />
          </aside>
        </div>
      </div>
    </div>
  );
};
