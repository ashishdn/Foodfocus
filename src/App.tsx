import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { EditorialModal, ModalState } from './components/EditorialModal';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import {
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  LEGISLATION_UPDATES,
  SUPPLIER_NEWS_ITEMS,
  WEBINAR_ITEMS,
} from './data/foodfocusData';
import { AboutPage } from './pages/AboutPage';
import { AdvertisePage } from './pages/AdvertisePage';
import { HomePage } from './pages/HomePage';
import { HelpfulLinksPage } from './pages/HelpfulLinksPage';
import { LegislationDetailPage } from './pages/LegislationDetailPage';
import { LegislationPage } from './pages/LegislationPage';
import {
  ArticlesArchivePage,
  ContactPage,
  DirectoryPage,
  EventsAndTrainingPage,
} from './pages/SecondaryPages';
import { ServicesPage } from './pages/ServicesPage';
import { WebinarsPage } from './pages/WebinarsPage';
import { PageId } from './types';

const PAGE_IDS: PageId[] = [
  'home', 'about', 'services', 'advertise', 'contact', 'legislation', 'webinars',
  'articles', 'news', 'events', 'training', 'directory', 'legislation-detail', 'helpful-links',
];

/** Shareable, SEO-friendly URLs: /legislation, /legislation/<id>, /helpful-links, /<page>?filter=… */
const routeToUrl = (page: PageId, filter?: string) => {
  if (page === 'home') return '/';
  if (page === 'legislation-detail') return `/legislation/${encodeURIComponent(filter ?? '')}`;
  if (page === 'legislation') {
    return filter && filter !== 'updates' ? `/legislation?act=${encodeURIComponent(filter)}` : '/legislation';
  }
  return filter ? `/${page}?filter=${encodeURIComponent(filter)}` : `/${page}`;
};

const urlToRoute = (): { page: PageId; filter?: string } => {
  const { pathname, search } = window.location;
  const params = new URLSearchParams(search);
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'legislation' && parts[1]) {
    return { page: 'legislation-detail', filter: decodeURIComponent(parts[1]) };
  }
  if (parts[0] === 'legislation') return { page: 'legislation', filter: params.get('act') ?? undefined };
  const page = (parts[0] ?? 'home') as PageId;
  return PAGE_IDS.includes(page) ? { page, filter: params.get('filter') ?? undefined } : { page: 'home' };
};

export default function App() {
  const [initialRoute] = useState(urlToRoute);
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [subFilter, setSubFilter] = useState<string | undefined>(initialRoute.filter);
  const [modal, setModal] = useState<ModalState>(null);
  const [globalSearch, setGlobalSearch] = useState<string | null>(null);

  const allArticles = useMemo(
    () => [...LATEST_ARTICLES, ...SUPPLIER_NEWS_ITEMS, ...INDUSTRY_NEWS_ITEMS],
    []
  );

  useEffect(() => {
    const onPop = () => {
      const r = urlToRoute();
      setCurrentPage(r.page);
      setSubFilter(r.filter);
      setGlobalSearch(null);
      setModal(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (page: PageId, filter?: string) => {
    setCurrentPage(page);
    setSubFilter(filter);
    setGlobalSearch(null);
    setModal(null);
    const url = routeToUrl(page, filter);
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState(null, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticleById = (articleId: string) => {
    const found = allArticles.find((a) => a.id === articleId);
    if (found) {
      setModal({ type: 'article', data: found });
    }
  };

  const handleSponsorClick = (title: string, context: string) => {
    setModal({ type: 'sponsor', title, context });
  };

  const handleSocialClick = (network: string) => {
    setModal({ type: 'social', network });
  };

  const searchResults = useMemo(() => {
    if (!globalSearch) return null;
    const q = globalSearch.toLowerCase();
    return {
      articles: allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      ),
      legislation: LEGISLATION_UPDATES.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.excerpt.toLowerCase().includes(q) ||
          l.tag.toLowerCase().includes(q)
      ),
      webinars: WEBINAR_ITEMS.filter(
        (w) =>
          w.title.toLowerCase().includes(q) || w.excerpt.toLowerCase().includes(q)
      ),
    };
  }, [globalSearch, allArticles]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <SiteHeader
        currentPage={currentPage}
        onNavigate={navigate}
        onSearchSubmit={(query) => setGlobalSearch(query)}
        onSocialClick={handleSocialClick}
        onSponsorClick={handleSponsorClick}
      />

      {/* Global Search Results Banner */}
      {globalSearch && searchResults && (
        <section className="bg-[#F7F7F7] border-b border-[#DCDCDC] py-6">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-[15px] font-bold uppercase tracking-wider text-[#1C1C1C]">
                Search Results for &ldquo;{globalSearch}&rdquo; (
                {searchResults.articles.length +
                  searchResults.legislation.length +
                  searchResults.webinars.length}
                )
              </h2>
              <button
                type="button"
                onClick={() => setGlobalSearch(null)}
                className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#5B6067] hover:text-[#1C1C1C] cursor-pointer"
              >
                <X className="w-4 h-4" />
                Clear Search
              </button>
            </div>

            {searchResults.articles.length +
              searchResults.legislation.length +
              searchResults.webinars.length ===
            0 ? (
              <p className="text-[14px] text-[#555555]">
                No matches found. Try terms like &ldquo;R638&rdquo;, &ldquo;R3337&rdquo;,
                &ldquo;dairy&rdquo;, or &ldquo;digital&rdquo;.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.articles.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setModal({ type: 'article', data: a })}
                    className="text-left bg-white border border-[#E2E2E2] p-4 rounded-[2px] hover:border-[#9BC53D] cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase text-[#6F9321]">
                      Article · {a.date}
                    </div>
                    <div className="font-bold text-[14px] text-[#1C1C1C] mt-1 underline decoration-[#1C1C1C]/35">
                      {a.title}
                    </div>
                  </button>
                ))}
                {searchResults.legislation.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => navigate('legislation-detail', l.id)}
                    className="text-left bg-white border border-[#E2E2E2] p-4 rounded-[2px] hover:border-[#9BC53D] cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase text-[#6F9321]">
                      Legislation · {l.tag}
                    </div>
                    <div className="font-bold text-[14px] text-[#1C1C1C] mt-1 underline decoration-[#1C1C1C]/35">
                      {l.title}
                    </div>
                  </button>
                ))}
                {searchResults.webinars.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setModal({ type: 'webinar', data: w })}
                    className="text-left bg-white border border-[#E2E2E2] p-4 rounded-[2px] hover:border-[#9BC53D] cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase text-[#6F9321]">
                      Webinar · {w.duration}
                    </div>
                    <div className="font-bold text-[14px] text-[#1C1C1C] mt-1 underline decoration-[#1C1C1C]/35">
                      {w.title}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Active Page Content */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onOpenArticle={(article) => setModal({ type: 'article', data: article })}
            onOpenWebinar={(webinar) => setModal({ type: 'webinar', data: webinar })}
            onOpenSupplier={(supplier) => setModal({ type: 'supplier', data: supplier })}
            onSocialClick={handleSocialClick}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigate} onSponsorClick={handleSponsorClick} />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={navigate} onSponsorClick={handleSponsorClick} />
        )}

        {currentPage === 'advertise' && (
          <AdvertisePage onSponsorClick={handleSponsorClick} />
        )}

        {currentPage === 'webinars' && (
          <WebinarsPage
            onOpenWebinar={(webinar) => setModal({ type: 'webinar', data: webinar })}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'legislation' && (
          <LegislationPage
            initialCategory={subFilter}
            onNavigate={navigate}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'legislation-detail' && (
          <LegislationDetailPage
            legislationId={subFilter}
            onNavigate={navigate}
            onOpenArticle={(article) => setModal({ type: 'article', data: article })}
          />
        )}

        {currentPage === 'helpful-links' && <HelpfulLinksPage onNavigate={navigate} />}

        {currentPage === 'contact' && <ContactPage onSponsorClick={handleSponsorClick} />}

        {(currentPage === 'articles' || currentPage === 'news') && (
          <ArticlesArchivePage
            mode={currentPage}
            subFilter={subFilter}
            onOpenArticle={(article) => setModal({ type: 'article', data: article })}
            onOpenSupplier={(supplier) => setModal({ type: 'supplier', data: supplier })}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'directory' && (
          <DirectoryPage
            subFilter={subFilter}
            onOpenSupplier={(supplier) => setModal({ type: 'supplier', data: supplier })}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {(currentPage === 'events' || currentPage === 'training') && (
          <EventsAndTrainingPage
            mode={currentPage}
            subFilter={subFilter}
            onSponsorClick={handleSponsorClick}
          />
        )}
      </div>

      <SiteFooter
        onNavigate={navigate}
        onOpenArticleById={handleOpenArticleById}
        onSocialClick={handleSocialClick}
        onOpenLegalModal={(doc) => setModal({ type: 'legal', doc })}
      />

      <EditorialModal
        modal={modal}
        onClose={() => setModal(null)}
        onContactNavigate={() => navigate('contact')}
        onOpenLegislation={(id) => navigate('legislation-detail', id)}
      />
    </div>
  );
}
