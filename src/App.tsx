import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { EditorialModal, ModalState } from './components/EditorialModal';
import { SearchPalette } from './components/SearchPalette';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { INDUSTRY_NEWS_ITEMS, LATEST_ARTICLES, SUPPLIER_NEWS_ITEMS } from './data/foodfocusData';
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
import { EditorialArticle, PageId, SupplierListing, WebinarItem } from './types';

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
  const [search, setSearch] = useState<{ open: boolean; query: string }>({ open: false, query: '' });

  const allArticles = useMemo(
    () => [...LATEST_ARTICLES, ...SUPPLIER_NEWS_ITEMS, ...INDUSTRY_NEWS_ITEMS],
    []
  );

  useEffect(() => {
    const onPop = () => {
      const r = urlToRoute();
      setCurrentPage(r.page);
      setSubFilter(r.filter);
      setModal(null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((page: PageId, filter?: string) => {
    setCurrentPage(page);
    setSubFilter(filter);
    setModal(null);
    const url = routeToUrl(page, filter);
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState(null, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSearch = useCallback((query = '') => setSearch({ open: true, query }), []);
  const closeSearch = useCallback(() => setSearch((s) => ({ ...s, open: false })), []);

  // "/" or Ctrl/Cmd+K opens search anywhere on the site
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = !!el && (/INPUT|TEXTAREA|SELECT/.test(el.tagName) || el.isContentEditable);
      if (!typing && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch]);

  const scrollToSubscribe = useCallback(() => {
    const scroll = () => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (currentPage === 'home') {
      scroll();
    } else {
      navigate('home');
      setTimeout(scroll, 120);
    }
  }, [currentPage, navigate]);

  const openArticle = useCallback((article: EditorialArticle) => setModal({ type: 'article', data: article }), []);
  const openWebinar = useCallback((webinar: WebinarItem) => setModal({ type: 'webinar', data: webinar }), []);
  const openSupplier = useCallback((supplier: SupplierListing) => setModal({ type: 'supplier', data: supplier }), []);
  const openLegislation = useCallback((id: string) => navigate('legislation-detail', id), [navigate]);

  const handleOpenArticleById = (articleId: string) => {
    const found = allArticles.find((a) => a.id === articleId);
    if (found) openArticle(found);
  };

  const handleSponsorClick = (title: string, context: string) => {
    setModal({ type: 'sponsor', title, context });
  };

  const handleSocialClick = (network: string) => {
    setModal({ type: 'social', network });
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-text">
      <SiteHeader
        currentPage={currentPage}
        onNavigate={navigate}
        onOpenSearch={() => openSearch()}
        onSubscribe={scrollToSubscribe}
      />

      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onOpenArticle={openArticle}
            onOpenWebinar={openWebinar}
            onOpenSupplier={openSupplier}
            onOpenSearch={openSearch}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigate} onSponsorClick={handleSponsorClick} />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={navigate} onSponsorClick={handleSponsorClick} />
        )}

        {currentPage === 'advertise' && <AdvertisePage onSponsorClick={handleSponsorClick} />}

        {currentPage === 'webinars' && (
          <WebinarsPage onOpenWebinar={openWebinar} onSponsorClick={handleSponsorClick} />
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
            onOpenArticle={openArticle}
          />
        )}

        {currentPage === 'helpful-links' && <HelpfulLinksPage onNavigate={navigate} />}

        {currentPage === 'contact' && <ContactPage onSponsorClick={handleSponsorClick} />}

        {(currentPage === 'articles' || currentPage === 'news') && (
          <ArticlesArchivePage
            mode={currentPage}
            subFilter={subFilter}
            onOpenArticle={openArticle}
            onOpenSupplier={openSupplier}
            onSponsorClick={handleSponsorClick}
          />
        )}

        {currentPage === 'directory' && (
          <DirectoryPage
            subFilter={subFilter}
            onOpenSupplier={openSupplier}
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

      <SearchPalette
        open={search.open}
        initialQuery={search.query}
        onClose={closeSearch}
        onOpenArticle={openArticle}
        onOpenLegislation={openLegislation}
        onOpenWebinar={openWebinar}
        onOpenSupplier={openSupplier}
      />

      <EditorialModal
        modal={modal}
        onClose={() => setModal(null)}
        onContactNavigate={() => navigate('contact')}
        onOpenLegislation={openLegislation}
      />
    </div>
  );
}
