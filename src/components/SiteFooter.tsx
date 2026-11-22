import React from 'react';
import { BRAND_ASSETS, POPULAR_POSTS } from '../data/foodfocusData';
import { PageId } from '../types';
import { SafeImage } from './SafeImage';
import { SocialIconRow } from './SocialIcons';

interface SiteFooterProps {
  onNavigate: (page: PageId) => void;
  onOpenArticleById: (articleId: string) => void;
  onSocialClick: (network: string) => void;
  onOpenLegalModal: (doc: 'privacy' | 'terms') => void;
}

const ENGAGE_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Our Services' },
  { id: 'advertise', label: 'Advertise with us' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'legislation', label: 'Legislation Hub' },
  { id: 'helpful-links', label: 'Helpful Links' },
];

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenArticleById,
  onSocialClick,
  onOpenLegalModal,
}) => {
  return (
    <footer className="bg-[#000000] text-white pt-12 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
          {/* Column 1: ABOUT */}
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-white mb-2">
              ABOUT
            </h3>
            <div className="w-10 h-[2px] bg-[#9BC53D] mb-5" />

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="mb-4 block cursor-pointer"
              aria-label="foodfocus home"
            >
              <img
                src={BRAND_ASSETS.logoPath}
                alt="foodfocus — THE RIGHT WAY"
                className="h-[52px] w-auto object-contain"
              />
            </button>

            <p className="text-[13.5px] text-white/80 leading-[1.65] mb-5">
              Food Focus was launched in 2016, with the objective to help you find answers to your
              compliance issues by creating a hub of information with recognized experts and service
              providers. We aim to inspire you to comply!
            </p>

            <SocialIconRow variant="footer-circle" onSelect={onSocialClick} />
          </div>

          {/* Column 2: POPULAR POSTS */}
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-white mb-2">
              POPULAR POSTS
            </h3>
            <div className="w-10 h-[2px] bg-[#9BC53D] mb-5" />

            <div className="space-y-4">
              {POPULAR_POSTS.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onOpenArticleById(post.id)}
                  className="w-full text-left flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-20 h-14 shrink-0 overflow-hidden rounded-[2px] bg-[#1C1C1C]">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-white underline decoration-white/60 underline-offset-2 group-hover:text-[#9BC53D] group-hover:decoration-[#9BC53D] leading-snug line-clamp-2 transition-colors">
                      {post.title}
                    </div>
                    <div className="text-[12px] text-[#8A8A8A] mt-1">{post.date}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: ENGAGE WITH US */}
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-white mb-2">
              ENGAGE WITH US
            </h3>
            <div className="w-10 h-[2px] bg-[#9BC53D] mb-5" />

            <ul className="divide-y divide-white/15 border-t border-b border-white/15">
              {ENGAGE_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="w-full text-left py-2.5 text-[14px] text-white/85 hover:text-[#9BC53D] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-white/65">
          <div>Copyright © 2025. All rights reserved. Food Risk Forum Pty Ltd.</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-[#9BC53D] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-[#9BC53D] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
