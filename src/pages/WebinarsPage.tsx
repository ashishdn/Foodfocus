import React, { useMemo, useState } from 'react';
import { CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { WebinarThumbnail } from '../components/WebinarThumbnail';
import { WEBINAR_ITEMS } from '../data/foodfocusData';
import { WebinarItem } from '../types';

interface WebinarsPageProps {
  onOpenWebinar: (webinar: WebinarItem) => void;
  onSponsorClick: (title: string, context: string) => void;
}

const ITEMS_PER_PAGE = 4;

export const WebinarsPage: React.FC<WebinarsPageProps> = ({
  onOpenWebinar,
  onSponsorClick,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWebinars = useMemo(() => {
    const q = activeQuery.trim().toLowerCase();
    if (!q) return WEBINAR_ITEMS;
    return WEBINAR_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.partner.toLowerCase().includes(q)
    );
  }, [activeQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredWebinars.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageWebinars = filteredWebinars.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveQuery('');
    setCurrentPage(1);
  };

  const searchSidebarWidget = (
    <div className="bg-[#F2F2F2] border border-[#DCDCDC] rounded-[2px] p-5">
      <h3 className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#1C1C1C] pb-2">
        SEARCH WEBINARS LIBRARY
      </h3>
      <div className="w-10 h-[3px] bg-[#9BC53D] mb-4" />

      <form onSubmit={handleSearchSubmit} className="space-y-3">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search topic, e.g. dairy, R3337, R638..."
          className="w-full bg-white border border-[#CCCCCC] px-3.5 py-2.5 text-[14px] text-[#1C1C1C] rounded-[2px] focus:outline-2 focus:outline-[#9BC53D]"
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="flex-1 bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-extrabold text-[12.5px] uppercase tracking-[0.08em] py-2.5 px-4 rounded-[2px] transition-colors cursor-pointer"
          >
            SUBMIT
          </button>
          {activeQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-3 py-2.5 text-[12px] font-semibold text-[#555555] hover:text-[#1C1C1C] border border-[#CCCCCC] bg-white rounded-[2px] cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <InnerPageLayout
      pageTitle="WEBINARS"
      topSidebarWidget={searchSidebarWidget}
      onSponsorClick={onSponsorClick}
    >
      <div className="space-y-10">
        {/* UPCOMING WEBINARS (Empty-state message) */}
        <section>
          <div className="mb-4">
            <h3 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#1C1C1C] pb-2">
              UPCOMING WEBINARS
            </h3>
            <div className="relative h-[3px] w-full">
              <div className="absolute inset-x-0 bottom-0 h-px bg-[#DCDCDC]" />
              <div className="relative h-[3px] w-10 bg-[#9BC53D]" />
            </div>
          </div>

          <div className="bg-[#F7F7F7] border border-[#E2E2E2] rounded-[2px] p-5 flex items-start gap-3.5">
            <CalendarClock className="w-5 h-5 text-[#5B6067] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14.5px] font-semibold text-[#1C1C1C]">
                There are currently no upcoming live webinars scheduled.
              </p>
              <p className="text-[13.5px] text-[#555555] mt-1">
                New South African food safety and regulatory webinars are announced monthly. Browse
                our full on-demand recordings in the Webinar Library below.
              </p>
            </div>
          </div>
        </section>

        {/* WEBINAR LIBRARY (2-column grid + pagination) */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#1C1C1C] pb-2">
                WEBINAR LIBRARY
              </h3>
              <div className="relative h-[3px] w-full">
                <div className="absolute inset-x-0 bottom-0 h-px bg-[#DCDCDC]" />
                <div className="relative h-[3px] w-10 bg-[#9BC53D]" />
              </div>
            </div>
            {activeQuery && (
              <span className="text-[12.5px] text-[#5B6067] font-medium">
                Showing {filteredWebinars.length} result{filteredWebinars.length === 1 ? '' : 's'}{' '}
                for &ldquo;{activeQuery}&rdquo;
              </span>
            )}
          </div>

          {pageWebinars.length === 0 ? (
            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-8 text-center rounded-[2px]">
              <p className="text-[15px] font-semibold text-[#1C1C1C]">
                No recorded webinars matched &ldquo;{activeQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-3 bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[12.5px] uppercase tracking-wider px-4 py-2 rounded-[2px] cursor-pointer"
              >
                Show all webinars
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {pageWebinars.map((webinar) => (
                <article
                  key={webinar.id}
                  className="bg-white border border-[#E6E6E6] rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-4 flex flex-col"
                >
                  <div className="mb-3.5">
                    <WebinarThumbnail
                      webinar={webinar}
                      mode="library"
                      onClick={() => onOpenWebinar(webinar)}
                    />
                  </div>

                  <h4 className="text-[15.5px] font-bold text-[#1C1C1C] leading-[1.35] mb-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenWebinar(webinar)}
                      className="text-left underline decoration-[#1C1C1C]/45 underline-offset-3 hover:text-[#84AC2D] hover:decoration-[#9BC53D] transition-colors cursor-pointer"
                    >
                      {webinar.title}
                    </button>
                  </h4>

                  <div className="text-[12px] text-[#8A8A8A] mb-2">
                    {webinar.date} <span aria-hidden="true">·</span> {webinar.duration}
                  </div>

                  <p className="text-[13.5px] text-[#333333] leading-[1.58] line-clamp-3 mb-3 flex-1">
                    {webinar.excerpt}
                  </p>

                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenWebinar(webinar)}
                      className="text-[13px] font-bold text-[#84AC2D] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                    >
                      View now »
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Webinar library pagination"
              className="mt-8 pt-6 border-t border-[#E5E5E5] flex items-center justify-center gap-1.5"
            >
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 border border-[#DCDCDC] bg-white text-[13px] font-semibold text-[#333333] disabled:opacity-40 hover:border-[#9BC53D] rounded-[2px] inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 text-[13px] font-bold rounded-[2px] border transition-colors tabular-nums cursor-pointer ${
                    safePage === pageNum
                      ? 'bg-[#9BC53D] border-[#9BC53D] text-[#111111]'
                      : 'bg-white border-[#DCDCDC] text-[#333333] hover:border-[#9BC53D]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 border border-[#DCDCDC] bg-white text-[13px] font-semibold text-[#333333] disabled:opacity-40 hover:border-[#9BC53D] rounded-[2px] inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </InnerPageLayout>
  );
};
