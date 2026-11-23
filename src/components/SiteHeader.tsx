import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { BRAND_ASSETS, LEGISLATION_NAV_ITEMS, LEGISLATION_UPDATES } from '../data/foodfocusData';
import { daysUntil, formatIsoDate } from '../lib/legislation';
import { PageId } from '../types';

interface SiteHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subFilter?: string) => void;
  onOpenSearch: () => void;
  onSubscribe: () => void;
}

interface NavChild {
  label: string;
  hint?: string;
  page: PageId;
  filter?: string;
}

interface NavItem {
  id: string;
  label: string;
  page: PageId;
  filter?: string;
  activeOn: PageId[];
  children?: NavChild[];
}

const NAV: NavItem[] = [
  {
    id: 'legislation',
    label: 'Legislation',
    page: 'legislation',
    activeOn: ['legislation', 'legislation-detail', 'helpful-links'],
    children: [
      ...LEGISLATION_NAV_ITEMS.filter((i) => i.id !== 'updates').map((i) => ({
        label: i.label,
        page: 'legislation' as PageId,
        filter: i.id,
      })),
      { label: 'All legislation updates', hint: 'The full tracker', page: 'legislation', filter: 'updates' },
      { label: 'Helpful links', hint: 'Regulators & official sources', page: 'helpful-links' },
    ],
  },
  {
    id: 'articles',
    label: 'Insights',
    page: 'articles',
    activeOn: ['articles'],
    children: [
      { label: 'All articles', page: 'articles', filter: 'all' },
      { label: 'Food Safety & HACCP', page: 'articles', filter: 'Food Safety & Quality' },
      { label: 'Public Health & Compliance', page: 'articles', filter: 'Public Health & Compliance' },
      { label: 'Legislation & Governance', page: 'articles', filter: 'Legislation & Governance' },
    ],
  },
  {
    id: 'news',
    label: 'News',
    page: 'news',
    activeOn: ['news'],
    children: [
      { label: 'Industry news', page: 'news', filter: 'industry' },
      { label: 'Supplier news', page: 'news', filter: 'supplier' },
    ],
  },
  { id: 'webinars', label: 'Webinars', page: 'webinars', activeOn: ['webinars'] },
  {
    id: 'events',
    label: 'Events & Training',
    page: 'events',
    activeOn: ['events', 'training'],
    children: [
      { label: 'Industry events', hint: 'Conferences & workshops', page: 'events' },
      { label: 'HACCP & FSSC 22000 courses', page: 'training', filter: 'HACCP & FSSC 22000 Courses' },
      { label: 'R638 Food Handler Hygiene', page: 'training', filter: 'R638 Food Handler Hygiene' },
      { label: 'Internal Auditing Skills', page: 'training', filter: 'Internal Auditing Skills' },
    ],
  },
  {
    id: 'directory',
    label: 'Directory',
    page: 'directory',
    activeOn: ['directory'],
    children: [
      { label: 'All suppliers', page: 'directory', filter: 'all' },
      { label: 'Food testing laboratories', page: 'directory', filter: 'Food Testing Laboratories' },
      { label: 'Certification bodies', page: 'directory', filter: 'Certification Bodies' },
      { label: 'Instruments & calibration', page: 'directory', filter: 'Instruments & Calibration' },
      { label: 'Packaging & hygiene', page: 'directory', filter: 'Packaging & Hygiene' },
    ],
  },
];

const UTILITY_LINKS: { id: PageId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Our services' },
  { id: 'advertise', label: 'Advertise' },
  { id: 'contact', label: 'Contact' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPage, onNavigate, onOpenSearch, onSubscribe }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerExpanded, setDrawerExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Nearest open comment period drives the alert strip
  const alert = useMemo(
    () =>
      LEGISLATION_UPDATES.filter((u) => u.commentDeadline && daysUntil(u.commentDeadline) >= 0).sort(
        (a, b) => (a.commentDeadline! < b.commentDeadline! ? -1 : 1)
      )[0],
    []
  );
  const alertDays = alert?.commentDeadline ? daysUntil(alert.commentDeadline) : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const go = (page: PageId, filter?: string) => {
    onNavigate(page, filter);
    setOpenDropdown(null);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Alert + utility strip */}
      <div className="bg-[#0A1610] text-[#DFE8DF] text-[13.5px]">
        <div className="ff-container flex items-center justify-between gap-4 min-h-[40px] py-2">
          {alert ? (
            <button
              type="button"
              onClick={() => go('legislation-detail', alert.id)}
              className="flex items-center gap-2.5 text-left min-w-0 cursor-pointer group"
            >
              <span className="ff-live-dot shrink-0" aria-hidden="true" />
              <span className="truncate">
                <strong className="text-white font-semibold">Open for comment:</strong>{' '}
                <span className="hidden sm:inline">{alert.tag} — </span>
                {alert.gazetteRef.replace('Gov. Gazette Notice ', '')} closes{' '}
                {formatIsoDate(alert.commentDeadline!)}
                <span className="text-[#F5C878]"> · {alertDays} day{alertDays === 1 ? '' : 's'} left</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-lime font-semibold shrink-0 group-hover:gap-2 transition-all">
                Read brief <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ) : (
            <span>South Africa's food compliance platform</span>
          )}
          <nav aria-label="Company" className="hidden lg:flex items-center gap-5 shrink-0">
            {UTILITY_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={`cursor-pointer transition-colors ${
                  currentPage === l.id ? 'text-lime font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`site-header sticky top-0 z-40 bg-ink text-white transition-shadow ${
          scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,.25)]' : ''
        }`}
      >
        <div className="ff-container flex items-center gap-4 xl:gap-5 2xl:gap-8 h-[76px]">
          <button
            type="button"
            onClick={() => go('home')}
            className="shrink-0 cursor-pointer rounded-lg"
            aria-label="foodfocus — The Right Way, home"
          >
            <img src={BRAND_ASSETS.logoPath} alt="foodfocus — The Right Way" className="h-[44px] sm:h-[48px] w-auto object-contain" />
          </button>

          <nav aria-label="Main" className="hidden xl:flex items-center gap-0 2xl:gap-1 mr-auto min-w-0">
            {NAV.map((item) => {
              const active = item.activeOn.includes(currentPage);
              const open = openDropdown === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => (item.children ? setOpenDropdown(open ? null : item.id) : go(item.page, item.filter))}
                    aria-expanded={item.children ? open : undefined}
                    aria-haspopup={item.children ? 'menu' : undefined}
                    className={`relative inline-flex items-center gap-1 px-2.5 2xl:px-3 py-2.5 rounded-full text-[15px] whitespace-nowrap cursor-pointer transition-colors ${
                      active ? 'text-white font-semibold' : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {item.id === 'legislation' && (
                      <span className="ml-1 inline-grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-lime text-ink text-[11px] font-bold">
                        {LEGISLATION_UPDATES.filter((u) => u.status === 'new' || u.status === 'open-for-comment').length}
                      </span>
                    )}
                    {item.children && <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`} />}
                    {active && <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded bg-lime" />}
                  </button>

                  {item.children && open && (
                    <div className="absolute left-0 top-full pt-2 z-50">
                      <div role="menu" className="w-[320px] bg-white text-text rounded-2xl shadow-lift border border-line p-2 animate-rise">
                        {item.children.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            role="menuitem"
                            onClick={() => go(c.page, c.filter)}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-lime-soft transition-colors cursor-pointer group flex items-center justify-between gap-3"
                          >
                            <span>
                              <span className="block text-[14.5px] font-medium leading-snug">{c.label}</span>
                              {c.hint && <span className="block text-[12.5px] text-muted">{c.hint}</span>}
                            </span>
                            <ArrowRight className="w-4 h-4 text-lime-deep opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 ml-auto xl:ml-0 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search foodfocus"
              className="group inline-flex items-center gap-2.5 h-11 w-11 justify-center rounded-full border border-white/20 bg-white/[.04] text-white/60 hover:border-white/50 hover:bg-white/[.08] hover:text-white transition-colors cursor-pointer
                md:max-xl:w-[250px] md:max-xl:justify-start md:max-xl:pl-4 md:max-xl:pr-2
                min-[1480px]:w-[250px] min-[1480px]:justify-start min-[1480px]:pl-4 min-[1480px]:pr-2"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="hidden md:max-xl:inline min-[1480px]:inline flex-1 min-w-0 truncate text-left text-[14px]">
                Search regulations…
              </span>
              <kbd className="hidden md:max-xl:inline-flex min-[1480px]:inline-flex items-center h-7 px-2 rounded-full bg-white/10 font-sans text-[11px] font-semibold text-white/60 group-hover:text-white/80">
                Ctrl K
              </kbd>
            </button>
            <button type="button" onClick={onSubscribe} className="ff-btn ff-btn-lime hidden sm:inline-flex px-5">
              Subscribe
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="xl:hidden inline-grid place-items-center h-11 w-11 rounded-full border border-white/20 hover:border-white/60 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink/60 animate-fade" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-[400px] bg-paper flex flex-col animate-rise overflow-y-auto">
            <div className="flex items-center justify-between px-5 h-[76px] bg-ink shrink-0">
              <img src={BRAND_ASSETS.logoPath} alt="foodfocus" className="h-[40px] w-auto" />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="inline-grid place-items-center h-11 w-11 rounded-full border border-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-5 py-3">
              <button
                type="button"
                onClick={() => go('home')}
                className="w-full text-left py-4 border-b border-line font-display text-[24px] cursor-pointer"
              >
                Home
              </button>
              {NAV.map((item) => {
                const expanded = drawerExpanded === item.id;
                return (
                  <div key={item.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => (item.children ? setDrawerExpanded(expanded ? null : item.id) : go(item.page, item.filter))}
                      aria-expanded={item.children ? expanded : undefined}
                      className={`w-full flex items-center justify-between py-4 font-display text-[24px] cursor-pointer ${
                        item.activeOn.includes(currentPage) ? 'text-lime-deep' : ''
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />}
                    </button>
                    {item.children && expanded && (
                      <div className="pb-3 -mt-1 animate-rise">
                        {item.children.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            onClick={() => go(c.page, c.filter)}
                            className="w-full text-left py-2.5 pl-3 text-[15px] text-muted hover:text-text border-l-2 border-line hover:border-lime cursor-pointer"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto px-5 pb-8 pt-4 grid gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSearch();
                }}
                className="ff-btn ff-btn-ghost"
              >
                <Search className="w-4 h-4" /> Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onSubscribe();
                }}
                className="ff-btn ff-btn-ink"
              >
                Get the Monday Brief
              </button>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[14px] text-muted">
                {UTILITY_LINKS.map((l) => (
                  <button key={l.id} type="button" onClick={() => go(l.id)} className="cursor-pointer hover:text-text">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
