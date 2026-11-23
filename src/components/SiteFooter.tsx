import React from 'react';
import { BRAND_ASSETS, LEGISLATION_NAV_ITEMS, POPULAR_POSTS } from '../data/foodfocusData';
import { PageId } from '../types';
import { SocialIconRow } from './SocialIcons';

interface SiteFooterProps {
  onNavigate: (page: PageId, subFilter?: string) => void;
  onOpenArticleById: (articleId: string) => void;
  onSocialClick: (network: string) => void;
  onOpenLegalModal: (doc: 'privacy' | 'terms') => void;
}

const COLUMNS: { title: string; links: { label: string; page: PageId; filter?: string }[] }[] = [
  {
    title: 'Legislation',
    links: [
      ...LEGISLATION_NAV_ITEMS.filter((i) => ['fcda', 'labelling', 'r638', 'meat'].includes(i.id)).map((i) => ({
        label: i.label.replace(/ \(.*\)/, ''),
        page: 'legislation' as PageId,
        filter: i.id,
      })),
      { label: 'Helpful links', page: 'helpful-links' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Articles', page: 'articles' },
      { label: 'Webinars', page: 'webinars' },
      { label: 'Training', page: 'training' },
      { label: 'Industry events', page: 'events' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', page: 'about' },
      { label: 'Our services', page: 'services' },
      { label: 'Advertise with us', page: 'advertise' },
      { label: 'Supplier directory', page: 'directory' },
      { label: 'Contact us', page: 'contact' },
    ],
  },
];

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenArticleById,
  onSocialClick,
  onOpenLegalModal,
}) => {
  return (
    <footer className="bg-ink text-white/70 pt-16 sm:pt-20 pb-7 text-[15px]">
      <div className="ff-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <button type="button" onClick={() => onNavigate('home')} className="cursor-pointer" aria-label="foodfocus home">
              <img src={BRAND_ASSETS.logoPath} alt="foodfocus — The Right Way" className="h-[52px] w-auto object-contain" />
            </button>
            <p className="mt-5 mb-6 max-w-[36ch] leading-relaxed">
              Since 2016 we've connected people to people, people to information, and problems to sector-specific
              solutions — helping the food industry comply, from farm to fork.
            </p>
            <SocialIconRow variant="footer-circle" onSelect={onSocialClick} />
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-[13px] font-semibold uppercase tracking-[0.1em] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onClick={() => onNavigate(l.page, l.filter)}
                      className="text-left hover:text-lime transition-colors cursor-pointer"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="text-white text-[13px] font-semibold uppercase tracking-[0.1em] mb-4">Popular reads</h4>
            <ul className="space-y-4">
              {POPULAR_POSTS.map((post, i) => (
                <li key={post.id}>
                  <button
                    type="button"
                    onClick={() => onOpenArticleById(post.id)}
                    className="flex gap-3 text-left group cursor-pointer"
                  >
                    <span className="font-display italic text-lime text-[22px] leading-none w-7 shrink-0">0{i + 1}</span>
                    <span>
                      <span className="block text-white/90 font-medium leading-snug group-hover:text-lime transition-colors line-clamp-2">
                        {post.title}
                      </span>
                      <span className="block text-[12.5px] text-white/45 mt-1">{post.date}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[13px] text-white/50">
          <span>© {new Date().getFullYear()} Food Risk Forum Pty Ltd. All rights reserved.</span>
          <nav aria-label="Legal" className="flex gap-5">
            <button type="button" onClick={() => onOpenLegalModal('privacy')} className="hover:text-white cursor-pointer">
              Privacy policy (POPIA)
            </button>
            <button type="button" onClick={() => onOpenLegalModal('terms')} className="hover:text-white cursor-pointer">
              Terms &amp; conditions
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};
