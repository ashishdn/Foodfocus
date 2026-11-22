import React, { useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { BRAND_ASSETS, LEGISLATION_NAV_ITEMS } from '../data/foodfocusData';
import { PageId } from '../types';
import { LeaderboardAdBanner } from './AdBanners';
import { SocialIconRow } from './SocialIcons';

interface SiteHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, subFilter?: string) => void;
  onSearchSubmit: (query: string) => void;
  onSocialClick: (network: string) => void;
  onSponsorClick: (title: string, context: string) => void;
  legislationDropdownPinned?: boolean;
  onToggleLegislationPin?: () => void;
}

const UTILITY_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Our Services' },
  { id: 'advertise', label: 'Advertise with us' },
  { id: 'contact', label: 'Contact Us' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentPage,
  onNavigate,
  onSearchSubmit,
  onSocialClick,
  onSponsorClick,
  legislationDropdownPinned = false,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    legislationDropdownPinned ? 'legislation' : null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('legislation');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleNavClick = (page: PageId, subFilter?: string) => {
    onNavigate(page, subFilter);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleSearchForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
      setSearchOpen(false);
    }
  };

  return (
    <header className="w-full relative z-40">
      {/* 1. Top Utility Bar (Black, ~40px) */}
      <div className="bg-[#000000] text-white border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[40px] py-1.5 flex flex-wrap items-center justify-between gap-2">
          <nav aria-label="Utility navigation" className="hidden sm:flex items-center flex-wrap gap-x-2 text-[13px]">
            {UTILITY_LINKS.map((link, idx) => {
              const isActive = currentPage === link.id;
              return (
                <React.Fragment key={link.id}>
                  {idx > 0 && (
                    <span className="text-white/40 select-none" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-[#9BC53D] font-semibold'
                        : 'text-white/90 hover:text-[#9BC53D]'
                    }`}
                  >
                    {link.label}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Compact mobile utility label */}
          <div className="flex sm:hidden items-center gap-3 text-[12px] text-white/85">
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`cursor-pointer ${currentPage === 'about' ? 'text-[#9BC53D] font-semibold' : ''}`}
            >
              About us
            </button>
            <span className="text-white/35">·</span>
            <button
              type="button"
              onClick={() => handleNavClick('advertise')}
              className={`cursor-pointer ${currentPage === 'advertise' ? 'text-[#9BC53D] font-semibold' : ''}`}
            >
              Advertise
            </button>
            <span className="text-white/35">·</span>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`cursor-pointer ${currentPage === 'contact' ? 'text-[#9BC53D] font-semibold' : ''}`}
            >
              Contact
            </button>
          </div>

          <SocialIconRow variant="utility" onSelect={onSocialClick} />
        </div>
      </div>

      {/* 2. Brand Header (Charcoal #1C1C1C, ~140px) */}
      <div className="bg-[#1C1C1C] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-0 lg:h-[140px] flex flex-col lg:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-[#9BC53D] rounded-[2px] cursor-pointer"
            aria-label="foodfocus — The Right Way Home"
          >
            <img
              src={BRAND_ASSETS.logoPath}
              alt="foodfocus — THE RIGHT WAY"
              className="h-[58px] sm:h-[68px] lg:h-[78px] w-auto object-contain"
            />
          </button>

          <LeaderboardAdBanner onSponsorClick={onSponsorClick} />
        </div>
      </div>

      {/* 3. Main Navigation Bar (Black, ~50px, 3px lime-green bottom border) */}
      <div className="bg-[#000000] text-white border-b-[3px] border-[#9BC53D]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[50px] flex items-center justify-between gap-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open full site index"
              className="p-1.5 -ml-1.5 text-white hover:text-[#9BC53D] transition-colors cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav aria-label="Main navigation" className="flex items-center gap-5 text-[15px] font-bold">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                  currentPage === 'home' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                }`}
              >
                Home
              </button>

              {/* Articles Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('articles')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'articles' ? null : 'articles'))
                  }
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                    currentPage === 'articles' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                  }`}
                >
                  <span>Articles</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'articles' && (
                  <div className="absolute left-0 top-full w-64 bg-[#1C1C1C] border border-white/15 border-t-2 border-t-[#9BC53D] shadow-xl py-1.5 z-50">
                    {[
                      { label: 'All Compliance Articles', filter: 'all' },
                      { label: 'Food Safety & HACCP', filter: 'Food Safety & Quality' },
                      { label: 'Public Health & Compliance', filter: 'Public Health & Compliance' },
                      { label: 'Legislation & Governance', filter: 'Legislation & Governance' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleNavClick('articles', item.filter)}
                        className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/90 hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Legislation Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('legislation')}
                onMouseLeave={() => {
                  if (!legislationDropdownPinned) setOpenDropdown(null);
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'legislation' ? null : 'legislation'))
                  }
                  aria-expanded={openDropdown === 'legislation'}
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                    currentPage === 'legislation' || currentPage === 'legislation-detail' || currentPage === 'helpful-links' || openDropdown === 'legislation'
                      ? 'text-[#9BC53D]'
                      : 'text-white hover:text-[#9BC53D]'
                  }`}
                >
                  <span>Legislation</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'legislation' && (
                  <div className="absolute left-0 top-full w-[330px] bg-[#1C1C1C] border border-white/15 border-t-2 border-t-[#9BC53D] shadow-xl py-1.5 z-50">
                    {LEGISLATION_NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick('legislation', item.id)}
                        className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/95 hover:bg-[#9BC53D] hover:text-black transition-colors border-b border-white/5 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleNavClick('helpful-links')}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-bold text-[#9BC53D] hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                    >
                      Helpful Links »
                    </button>
                  </div>
                )}
              </div>

              {/* News Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('news')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown((prev) => (prev === 'news' ? null : 'news'))}
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                    currentPage === 'news' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                  }`}
                >
                  <span>News</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'news' && (
                  <div className="absolute left-0 top-full w-56 bg-[#1C1C1C] border border-white/15 border-t-2 border-t-[#9BC53D] shadow-xl py-1.5 z-50">
                    <button
                      type="button"
                      onClick={() => handleNavClick('news', 'industry')}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/90 hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                    >
                      Latest Industry News
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('news', 'supplier')}
                      className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/90 hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                    >
                      Supplier News
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('webinars')}
                className={`whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                  currentPage === 'webinars' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                }`}
              >
                Webinars
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('events')}
                className={`whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                  currentPage === 'events' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                }`}
              >
                Industry Events
              </button>

              {/* Training Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('training')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'training' ? null : 'training'))
                  }
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                    currentPage === 'training' ? 'text-[#9BC53D]' : 'text-white hover:text-[#9BC53D]'
                  }`}
                >
                  <span>Training</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'training' && (
                  <div className="absolute left-0 top-full w-60 bg-[#1C1C1C] border border-white/15 border-t-2 border-t-[#9BC53D] shadow-xl py-1.5 z-50">
                    {[
                      'HACCP & FSSC 22000 Courses',
                      'R638 Food Handler Hygiene',
                      'Internal Auditing Skills',
                    ].map((course) => (
                      <button
                        key={course}
                        type="button"
                        onClick={() => handleNavClick('training', course)}
                        className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/90 hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Supplier Directory Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown('directory')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === 'directory' ? null : 'directory'))
                  }
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-3 transition-colors cursor-pointer ${
                    currentPage === 'directory'
                      ? 'text-[#9BC53D]'
                      : 'text-white hover:text-[#9BC53D]'
                  }`}
                >
                  <span>Supplier directory</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'directory' && (
                  <div className="absolute right-0 top-full w-64 bg-[#1C1C1C] border border-white/15 border-t-2 border-t-[#9BC53D] shadow-xl py-1.5 z-50">
                    {[
                      { label: 'All Directory Listings', cat: 'all' },
                      { label: 'Food Testing Laboratories', cat: 'Food Testing Laboratories' },
                      { label: 'Certification Bodies', cat: 'Certification Bodies' },
                      { label: 'Instruments & Calibration', cat: 'Instruments & Calibration' },
                      { label: 'Packaging & Hygiene', cat: 'Packaging & Hygiene' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleNavClick('directory', item.cat)}
                        className="w-full text-left px-4 py-2.5 text-[13.5px] font-medium text-white/90 hover:bg-[#9BC53D] hover:text-black transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex items-center gap-2 py-2 text-white hover:text-[#9BC53D] font-bold text-[14px] uppercase tracking-wider cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>

          {/* Far-Right Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search foodfocus"
            className="p-2 text-white hover:text-[#9BC53D] transition-colors cursor-pointer shrink-0"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* Inline Search Bar Drawer */}
        {searchOpen && (
          <div className="bg-[#1C1C1C] border-t border-white/10">
            <form
              onSubmit={handleSearchForm}
              className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2"
            >
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search food safety articles, R638, R3337, webinars, suppliers..."
                className="flex-1 bg-white text-[#1C1C1C] text-[14px] px-3.5 py-2 rounded-[2px] focus:outline-2 focus:outline-[#9BC53D]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#9BC53D] hover:bg-[#84AC2D] text-black font-bold text-[13px] uppercase tracking-wider px-5 py-2 rounded-[2px] cursor-pointer whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile / Full Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="bg-[#141414] border-t border-white/15 max-h-[80vh] overflow-y-auto">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1 text-[15px] font-semibold">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`w-full text-left py-2.5 px-2 border-b border-white/10 cursor-pointer ${
                  currentPage === 'home' ? 'text-[#9BC53D]' : 'text-white'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('articles')}
                className={`w-full text-left py-2.5 px-2 border-b border-white/10 cursor-pointer ${
                  currentPage === 'articles' ? 'text-[#9BC53D]' : 'text-white'
                }`}
              >
                Articles
              </button>

              <div className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpanded((prev) => (prev === 'legislation' ? null : 'legislation'))
                  }
                  className="w-full flex items-center justify-between py-2.5 px-2 text-white cursor-pointer"
                >
                  <span className={currentPage.startsWith('legislation') || currentPage === 'helpful-links' ? 'text-[#9BC53D]' : ''}>
                    Legislation
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpanded === 'legislation' ? 'rotate-180 text-[#9BC53D]' : ''
                    }`}
                  />
                </button>
                {mobileExpanded === 'legislation' && (
                  <div className="pl-4 pb-2 space-y-1 bg-[#1C1C1C]">
                    {LEGISLATION_NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick('legislation', item.id)}
                        className="w-full text-left py-2 px-2 text-[13.5px] font-normal text-white/85 hover:text-[#9BC53D] cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleNavClick('helpful-links')}
                      className="w-full text-left py-2 px-2 text-[13.5px] font-semibold text-[#9BC53D] cursor-pointer"
                    >
                      Helpful Links
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('news')}
                className="w-full text-left py-2.5 px-2 border-b border-white/10 text-white cursor-pointer"
              >
                News
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('webinars')}
                className={`w-full text-left py-2.5 px-2 border-b border-white/10 cursor-pointer ${
                  currentPage === 'webinars' ? 'text-[#9BC53D]' : 'text-white'
                }`}
              >
                Webinars
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('events')}
                className="w-full text-left py-2.5 px-2 border-b border-white/10 text-white cursor-pointer"
              >
                Industry Events
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('training')}
                className="w-full text-left py-2.5 px-2 border-b border-white/10 text-white cursor-pointer"
              >
                Training
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('directory')}
                className="w-full text-left py-2.5 px-2 border-b border-white/10 text-white cursor-pointer"
              >
                Supplier directory
              </button>

              <div className="pt-3 grid grid-cols-2 gap-2 text-[13px] font-normal">
                {UTILITY_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left py-1.5 px-2 rounded-[2px] cursor-pointer ${
                      currentPage === link.id ? 'text-[#9BC53D] font-semibold' : 'text-white/75'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
