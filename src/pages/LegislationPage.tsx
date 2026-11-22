import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  List,
  Scale,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { FoodStuffSidebarAd, HahnLawSidebarAd } from '../components/AdBanners';
import {
  FaqAccordion,
  LegislationCard,
  StatusBadge,
  SubscribeAlertsCard,
  faqJsonLd,
} from '../components/legislation/LegislationUi';
import { LEGISLATION_CATEGORIES } from '../data/foodfocusData';
import {
  COMPLIANCE_TOPICS,
  HELPFUL_LINKS,
  LEGISLATION_FAQS,
  LEGISLATION_UPDATES,
  REGULATION_TYPES,
} from '../data/legislationData';
import {
  STATUS_META,
  downloadDocument,
  downloadLibraryCsv,
  formatFileSize,
  useBookmarks,
  useNewSinceLastVisit,
  useSeo,
} from '../lib/legislation';
import {
  ComplianceTopic,
  LegislationStatus,
  LegislationUpdate,
  PageId,
  RegulationType,
} from '../types';

interface LegislationPageProps {
  initialCategory?: string;
  onNavigate: (page: PageId, filter?: string) => void;
  onSponsorClick: (title: string, context: string) => void;
}

type SortKey = 'relevance' | 'newest' | 'oldest' | 'title' | 'deadline';

const QUICK_SEARCHES = ['R638', 'R3337', 'Allergens', 'Listeria', 'Recall', 'Certificate of Acceptability'];
const ALL_STATUSES = Object.keys(STATUS_META) as LegislationStatus[];
const CATEGORY_LABEL = Object.fromEntries(LEGISLATION_CATEGORIES.map((c) => [c.id, c.title]));
const YEARS = Array.from(new Set(LEGISLATION_UPDATES.map((u) => u.isoDate.slice(0, 4)))).sort().reverse();

const scoreItem = (u: LegislationUpdate, q: string) => {
  if (!q) return 1;
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  for (const t of terms) {
    let hit = 0;
    if (u.title.toLowerCase().includes(t)) hit += 6;
    if (u.gazetteRef.toLowerCase().includes(t)) hit += 5;
    if (u.keywords.some((k) => k.toLowerCase().includes(t))) hit += 4;
    if (u.tag.toLowerCase().includes(t) || u.authority.toLowerCase().includes(t)) hit += 3;
    if (u.excerpt.toLowerCase().includes(t)) hit += 2;
    if ([...u.fullBrief, ...u.keyPoints].some((p) => p.toLowerCase().includes(t))) hit += 1;
    if (hit === 0) return 0; // every term must match somewhere
    score += hit;
  }
  return score;
};

const toggleIn = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export const LegislationPage: React.FC<LegislationPageProps> = ({
  initialCategory,
  onNavigate,
  onSponsorClick,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(
    initialCategory && initialCategory !== 'updates' ? initialCategory : 'all'
  );
  const [topic, setTopic] = useState<ComplianceTopic | 'all'>('all');
  const [types, setTypes] = useState<RegulationType[]>([]);
  const [statuses, setStatuses] = useState<LegislationStatus[]>([]);
  const [year, setYear] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { ids: savedIds, isSaved, toggle } = useBookmarks();
  const { fresh, dismiss } = useNewSinceLastVisit(LEGISLATION_UPDATES);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory === 'updates' ? 'all' : initialCategory);
  }, [initialCategory]);

  // Relevance becomes the natural sort while searching.
  useEffect(() => {
    if (query && sort === 'newest') setSort('relevance');
    if (!query && sort === 'relevance') setSort('newest');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => setPage(1), [query, category, topic, types, statuses, year, dateFrom, dateTo, savedOnly, sort, pageSize]);

  useSeo({
    title: 'South African Food Legislation & Regulatory Updates | Food Focus',
    description:
      'Search South African food legislation: R638 hygiene, R146 and draft R3337 labelling, Foodstuffs Act, APSA, Meat Safety Act and CPA recall updates. Filter by topic, type and date.',
    keywords: ['South African food legislation', 'food regulations', 'R638', 'R3337', 'food safety law', 'food labelling regulations'],
    path: '/legislation',
    jsonLd: [
      faqJsonLd(LEGISLATION_FAQS),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'South African Food Legislation',
        hasPart: LEGISLATION_UPDATES.map((u) => ({
          '@type': 'Legislation',
          name: u.title,
          legislationIdentifier: u.gazetteRef,
          datePublished: u.isoDate,
          url: `/legislation/${u.id}`,
        })),
      },
    ],
  });

  const results = useMemo(() => {
    const q = query.trim();
    const list = LEGISLATION_UPDATES.map((u) => ({ u, score: scoreItem(u, q) }))
      .filter(({ u, score }) => {
        if (score === 0) return false;
        if (category !== 'all' && u.categoryId !== category) return false;
        if (topic !== 'all' && u.topic !== topic) return false;
        if (types.length && !types.includes(u.regulationType)) return false;
        if (statuses.length && !statuses.includes(u.status)) return false;
        if (year !== 'all' && !u.isoDate.startsWith(year)) return false;
        if (dateFrom && u.isoDate < dateFrom) return false;
        if (dateTo && u.isoDate > dateTo) return false;
        if (savedOnly && !savedIds.includes(u.id)) return false;
        return true;
      });

    list.sort((a, b) => {
      switch (sort) {
        case 'relevance':
          return b.score - a.score || b.u.isoDate.localeCompare(a.u.isoDate);
        case 'oldest':
          return a.u.isoDate.localeCompare(b.u.isoDate);
        case 'title':
          return a.u.title.localeCompare(b.u.title);
        case 'deadline':
          return (a.u.commentDeadline ?? '9999').localeCompare(b.u.commentDeadline ?? '9999');
        default:
          return b.u.isoDate.localeCompare(a.u.isoDate);
      }
    });
    return list.map((x) => x.u);
  }, [query, category, topic, types, statuses, year, dateFrom, dateTo, savedOnly, savedIds, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const current = results.slice((page - 1) * pageSize, page * pageSize);
  const important = LEGISLATION_UPDATES.filter((u) => u.important).sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  const openCount = LEGISLATION_UPDATES.filter((u) => u.status === 'open-for-comment').length;

  const activeChips: { label: string; clear: () => void }[] = [
    ...(category !== 'all' ? [{ label: CATEGORY_LABEL[category] ?? category, clear: () => setCategory('all') }] : []),
    ...(topic !== 'all' ? [{ label: topic, clear: () => setTopic('all') }] : []),
    ...types.map((t) => ({ label: t, clear: () => setTypes((p) => p.filter((x) => x !== t)) })),
    ...statuses.map((s) => ({ label: STATUS_META[s].label, clear: () => setStatuses((p) => p.filter((x) => x !== s)) })),
    ...(year !== 'all' ? [{ label: year, clear: () => setYear('all') }] : []),
    ...(dateFrom ? [{ label: `From ${dateFrom}`, clear: () => setDateFrom('') }] : []),
    ...(dateTo ? [{ label: `To ${dateTo}`, clear: () => setDateTo('') }] : []),
    ...(savedOnly ? [{ label: 'Saved only', clear: () => setSavedOnly(false) }] : []),
  ];

  const clearAll = () => {
    setQuery('');
    setCategory('all');
    setTopic('all');
    setTypes([]);
    setStatuses([]);
    setYear('all');
    setDateFrom('');
    setDateTo('');
    setSavedOnly(false);
  };

  const goToPage = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openDetail = (u: LegislationUpdate) => onNavigate('legislation-detail', u.id);

  const countBy = (pred: (u: LegislationUpdate) => boolean) => LEGISLATION_UPDATES.filter(pred).length;

  /* ---------------- Filter panel (shared by desktop sidebar + mobile drawer) -------------- */
  const filterPanel = (
    <div className="space-y-6">
      <FilterGroup title="Act / regulation">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white border border-[#D5D5D5] rounded-[3px] px-3 py-2.5 text-[13.5px] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#9BC53D]"
        >
          <option value="all">All Acts & regulations</option>
          {LEGISLATION_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({countBy((u) => u.categoryId === c.id)})
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Status">
        {ALL_STATUSES.map((s) => (
          <CheckRow
            key={s}
            checked={statuses.includes(s)}
            onChange={() => setStatuses((p) => toggleIn(p, s))}
            count={countBy((u) => u.status === s)}
          >
            <StatusBadge status={s} />
          </CheckRow>
        ))}
      </FilterGroup>

      <FilterGroup title="Regulation type">
        {REGULATION_TYPES.map((t) => (
          <CheckRow
            key={t}
            checked={types.includes(t)}
            onChange={() => setTypes((p) => toggleIn(p, t))}
            count={countBy((u) => u.regulationType === t)}
          >
            {t}
          </CheckRow>
        ))}
      </FilterGroup>

      <FilterGroup title="Publication date">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {['all', ...YEARS].map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={`text-[12.5px] font-semibold px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                year === y
                  ? 'bg-[#1C1C1C] border-[#1C1C1C] text-white'
                  : 'border-[#D5D5D5] text-[#4A4A4A] hover:border-[#9BC53D]'
              }`}
            >
              {y === 'all' ? 'Any time' : y}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-[11.5px] font-semibold text-[#6B6B6B]">
            From
            <input
              type="date"
              value={dateFrom}
              max={dateTo || undefined}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-1 w-full bg-white border border-[#D5D5D5] rounded-[3px] px-2 py-1.5 text-[12.5px] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#9BC53D]"
            />
          </label>
          <label className="text-[11.5px] font-semibold text-[#6B6B6B]">
            To
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-1 w-full bg-white border border-[#D5D5D5] rounded-[3px] px-2 py-1.5 text-[12.5px] text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#9BC53D]"
            />
          </label>
        </div>
      </FilterGroup>

      <FilterGroup title="My library">
        <CheckRow checked={savedOnly} onChange={() => setSavedOnly((v) => !v)} count={savedIds.length}>
          <span className="inline-flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> Saved legislation only
          </span>
        </CheckRow>
      </FilterGroup>
    </div>
  );

  return (
    <div className="bg-[#F6F7F5]">
      {/* ================= HERO ================= */}
      <section className="relative bg-[#141414] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #9BC53D 0, transparent 40%), radial-gradient(circle at 85% 70%, #9BC53D 0, transparent 35%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/55 mb-5">
            <ol className="flex items-center gap-1.5">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#9BC53D] cursor-pointer">
                  Home
                </button>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90 font-semibold" aria-current="page">
                Legislation
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-14 items-end">
            <div className="max-w-[760px]">
              <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#9BC53D] mb-3">
                <Scale className="w-4 h-4" /> Regulatory Hub
              </span>
              <h1 className="text-[30px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.08] tracking-[-0.01em]">
                South African Food Legislation
              </h1>
              <p className="mt-4 text-[15.5px] sm:text-[17px] text-white/75 leading-[1.6]">
                Track Acts, regulations, draft notices and enforcement directives from farm to fork.
                Search plain-language briefs, see what&rsquo;s open for comment, and get alerted when
                the rules change.
              </p>

              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-7 relative"
              >
                <label htmlFor="legislation-search" className="sr-only">
                  Search legislation
                </label>
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
                <input
                  id="legislation-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, gazette number or keyword — e.g. R638, allergens, recall"
                  className="w-full bg-white text-[#1C1C1C] text-[15px] pl-12 pr-32 py-4 rounded-[6px] shadow-lg focus:outline-none focus:ring-4 focus:ring-[#9BC53D]/50"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[13px] uppercase tracking-[0.06em] px-4 sm:px-5 py-2.5 rounded-[4px] cursor-pointer transition-colors"
                >
                  Search
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px]">
                <span className="text-white/50">Popular:</span>
                {QUICK_SEARCHES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuery(q)}
                    className="px-2.5 py-1 rounded-full border border-white/20 text-white/80 hover:border-[#9BC53D] hover:text-[#9BC53D] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:w-[240px]">
              {[
                { label: 'Tracked updates', value: LEGISLATION_UPDATES.length },
                { label: 'Open for comment', value: openCount },
                { label: 'Saved by you', value: savedIds.length },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.06] border border-white/10 rounded-[6px] px-4 py-3">
                  <dd className="text-[24px] sm:text-[28px] font-bold text-white tabular-nums leading-none">{s.value}</dd>
                  <dt className="mt-1.5 text-[11.5px] uppercase tracking-[0.08em] text-white/55 font-semibold">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ================= NOTIFICATION ================= */}
      {fresh.length > 0 && (
        <div className="bg-[#EAF5D3] border-b border-[#C9E39A]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start sm:items-center gap-3">
            <BellRing className="w-5 h-5 text-[#3F5A0F] shrink-0 mt-0.5 sm:mt-0" />
            <p className="flex-1 text-[13.5px] text-[#2E420A]">
              <strong>{fresh.length} update{fresh.length === 1 ? '' : 's'} need your attention:</strong>{' '}
              {fresh.slice(0, 2).map((u, i) => (
                <React.Fragment key={u.id}>
                  {i > 0 && ' · '}
                  <button type="button" onClick={() => openDetail(u)} className="text-left underline underline-offset-2 hover:text-black cursor-pointer">
                    {u.title.length > 70 ? `${u.title.slice(0, 70)}…` : u.title}
                  </button>
                </React.Fragment>
              ))}
              {fresh.length > 2 && ` and ${fresh.length - 2} more`}
            </p>
            <button type="button" onClick={dismiss} aria-label="Dismiss notification" className="p-1 text-[#3F5A0F] hover:text-black cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* ================= IMPORTANT UPDATES ================= */}
        <section aria-labelledby="important-heading">
          <SectionTitle id="important-heading" eyebrow="Priority" title="Important regulatory updates" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {important.slice(0, 3).map((u, i) => (
              <button
                key={u.id}
                type="button"
                onClick={() => openDetail(u)}
                className={`group text-left rounded-[8px] p-6 flex flex-col transition-all cursor-pointer border ${
                  i === 0
                    ? 'bg-[#1C1C1C] text-white border-[#1C1C1C] hover:border-[#9BC53D] md:col-span-2 xl:col-span-1'
                    : 'bg-white border-[#E4E4E4] hover:border-[#9BC53D] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className={`w-4 h-4 ${i === 0 ? 'text-[#9BC53D]' : 'text-[#D97F06]'}`} />
                  <StatusBadge status={u.status} />
                </div>
                <h3 className={`text-[18px] font-bold leading-snug mb-3 ${i === 0 ? 'text-white' : 'text-[#1C1C1C]'}`}>{u.title}</h3>
                <p className={`text-[13.5px] leading-[1.6] line-clamp-3 mb-5 ${i === 0 ? 'text-white/70' : 'text-[#555555]'}`}>{u.excerpt}</p>
                <div className={`mt-auto flex items-center justify-between text-[12.5px] ${i === 0 ? 'text-white/60' : 'text-[#6B6B6B]'}`}>
                  <span>{u.date} · {u.gazetteRef}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${i === 0 ? 'text-[#9BC53D]' : 'text-[#1C1C1C]'}`} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ================= TOPICS ================= */}
        <section aria-labelledby="topics-heading">
          <SectionTitle id="topics-heading" eyebrow="Browse" title="Legislation by compliance area" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {COMPLIANCE_TOPICS.map((t) => {
              const active = topic === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTopic(active ? 'all' : t.id);
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-pressed={active}
                  className={`text-left rounded-[8px] border p-4 sm:p-5 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#9BC53D] border-[#9BC53D] text-[#111111]'
                      : 'bg-white border-[#E4E4E4] hover:border-[#9BC53D]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[15px] sm:text-[16px] font-bold">{t.id}</h3>
                    <span className={`text-[20px] font-bold tabular-nums ${active ? 'text-[#111111]' : 'text-[#6F9321]'}`}>
                      {countBy((u) => u.topic === t.id)}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-[12.5px] leading-[1.5] hidden sm:block ${active ? 'text-[#1C1C1C]/80' : 'text-[#6B6B6B]'}`}>
                    {t.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= SEARCH RESULTS ================= */}
        <section ref={resultsRef} aria-labelledby="results-heading" className="scroll-mt-6">
          <div className="grid lg:grid-cols-[290px_1fr] gap-8 items-start">
            {/* Desktop filters */}
            <aside className="hidden lg:block space-y-6 lg:sticky lg:top-6">
              <div className="bg-white border border-[#E4E4E4] rounded-[8px] p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#1C1C1C] inline-flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h2>
                  {activeChips.length > 0 && (
                    <button type="button" onClick={clearAll} className="text-[12px] font-bold text-[#5E7F1A] hover:text-black cursor-pointer">
                      Clear all
                    </button>
                  )}
                </div>
                {filterPanel}
              </div>
              <SubscribeAlertsCard />
            </aside>

            <div className="min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 id="results-heading" className="text-[20px] sm:text-[22px] font-bold text-[#1C1C1C]">
                    {query ? <>Results for &ldquo;{query}&rdquo;</> : 'Legislation updates'}
                  </h2>
                  <p className="text-[13px] text-[#6B6B6B] mt-0.5" aria-live="polite">
                    {results.length === 0
                      ? 'No matching legislation'
                      : `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, results.length)} of ${results.length}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 bg-white border border-[#D5D5D5] rounded-[4px] px-3 py-2 text-[13px] font-bold cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                    {activeChips.length > 0 && (
                      <span className="bg-[#9BC53D] text-[#111111] text-[11px] rounded-full w-5 h-5 inline-flex items-center justify-center">
                        {activeChips.length}
                      </span>
                    )}
                  </button>
                  <label className="sr-only" htmlFor="sort">Sort by</label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="bg-white border border-[#D5D5D5] rounded-[4px] px-3 py-2 text-[13px] font-semibold text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#9BC53D] cursor-pointer"
                  >
                    {query && <option value="relevance">Most relevant</option>}
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="deadline">Comment deadline</option>
                    <option value="title">Title A–Z</option>
                  </select>
                  <div className="hidden sm:flex bg-white border border-[#D5D5D5] rounded-[4px] p-0.5" role="group" aria-label="Layout">
                    {(['grid', 'list'] as const).map((l) => {
                      const Icon = l === 'grid' ? LayoutGrid : List;
                      return (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLayout(l)}
                          aria-pressed={layout === l}
                          aria-label={`${l} view`}
                          className={`p-1.5 rounded-[3px] cursor-pointer ${layout === l ? 'bg-[#1C1C1C] text-white' : 'text-[#6B6B6B] hover:text-[#1C1C1C]'}`}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {activeChips.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={c.clear}
                      className="inline-flex items-center gap-1.5 bg-white border border-[#D5D5D5] rounded-full pl-3 pr-2 py-1 text-[12.5px] font-semibold text-[#1C1C1C] hover:border-[#9BC53D] cursor-pointer"
                    >
                      {c.label}
                      <X className="w-3.5 h-3.5 text-[#8A8A8A]" />
                    </button>
                  ))}
                  <button type="button" onClick={clearAll} className="text-[12.5px] font-bold text-[#5E7F1A] hover:text-black ml-1 cursor-pointer">
                    Clear all
                  </button>
                </div>
              )}

              {current.length === 0 ? (
                <div className="bg-white border border-dashed border-[#CFCFCF] rounded-[8px] p-10 text-center">
                  <Search className="w-8 h-8 text-[#BDBDBD] mx-auto mb-3" />
                  <h3 className="text-[17px] font-bold text-[#1C1C1C]">No legislation matches your search</h3>
                  <p className="text-[14px] text-[#6B6B6B] mt-1.5 max-w-[420px] mx-auto">
                    {savedOnly && savedIds.length === 0
                      ? 'You have not saved any legislation yet. Use the bookmark icon on any update to save it here.'
                      : 'Try a broader keyword, a gazette number such as R638, or remove some filters.'}
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-5 bg-[#1C1C1C] hover:bg-black text-white text-[13px] font-bold px-5 py-2.5 rounded-[4px] cursor-pointer"
                  >
                    Reset search & filters
                  </button>
                </div>
              ) : (
                <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'space-y-4'}>
                  {current.map((u) => (
                    <LegislationCard
                      key={u.id}
                      item={u}
                      layout={layout}
                      categoryLabel={CATEGORY_LABEL[u.categoryId]}
                      saved={isSaved(u.id)}
                      onToggleSave={() => toggle(u.id)}
                      onOpen={() => openDetail(u)}
                      highlightTerm={query.trim().split(/\s+/)[0]}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {results.length > 0 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <label className="text-[13px] text-[#6B6B6B] inline-flex items-center gap-2">
                    Per page
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="bg-white border border-[#D5D5D5] rounded-[4px] px-2 py-1.5 text-[13px] font-semibold text-[#1C1C1C] cursor-pointer"
                    >
                      {[6, 12, 24].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>

                  {totalPages > 1 && (
                    <nav aria-label="Pagination" className="flex items-center gap-1">
                      <PageButton disabled={page === 1} onClick={() => goToPage(page - 1)} label="Previous page">
                        <ChevronLeft className="w-4 h-4" />
                      </PageButton>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <PageButton key={p} active={p === page} onClick={() => goToPage(p)} label={`Page ${p}`}>
                          {p}
                        </PageButton>
                      ))}
                      <PageButton disabled={page === totalPages} onClick={() => goToPage(page + 1)} label="Next page">
                        <ChevronRight className="w-4 h-4" />
                      </PageButton>
                    </nav>
                  )}
                </div>
              )}

              <div className="lg:hidden mt-10">
                <SubscribeAlertsCard />
              </div>
            </div>
          </div>
        </section>

        {/* ================= BROWSE BY ACT ================= */}
        <section aria-labelledby="acts-heading">
          <SectionTitle id="acts-heading" eyebrow="Statutes" title="Browse by Act & regulation" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {LEGISLATION_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategory(c.id);
                  resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group text-left bg-white border border-[#E4E4E4] rounded-[8px] p-5 hover:border-[#9BC53D] transition-colors cursor-pointer flex gap-4"
              >
                <span className="w-10 h-10 rounded-[6px] bg-[#F2F7E6] text-[#5E7F1A] flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B]">{c.actCode}</span>
                  <span className="block text-[15px] font-bold text-[#1C1C1C] mt-0.5 group-hover:text-[#5E7F1A]">{c.title}</span>
                  <span className="block text-[13px] text-[#6B6B6B] mt-1.5 leading-[1.55] line-clamp-2">{c.summary}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-[#1C1C1C]">
                    {countBy((u) => u.categoryId === c.id)} updates <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ================= DOWNLOAD LIBRARY ================= */}
        <section aria-labelledby="library-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <SectionTitle id="library-heading" eyebrow="Resources" title="Downloadable legislation library" noMargin />
            <button
              type="button"
              onClick={() => downloadLibraryCsv(results.length ? results : LEGISLATION_UPDATES)}
              className="inline-flex items-center gap-2 bg-[#1C1C1C] hover:bg-black text-white text-[13px] font-bold px-4 py-2.5 rounded-[4px] cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export register (CSV)
            </button>
          </div>
          <div className="bg-white border border-[#E4E4E4] rounded-[8px] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_160px_110px_120px] gap-4 px-5 py-3 bg-[#FAFAFA] border-b border-[#E4E4E4] text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B]">
              <span>Document</span>
              <span>Related update</span>
              <span>Format</span>
              <span className="text-right">Download</span>
            </div>
            <ul className="divide-y divide-[#EFEFEF]">
              {LEGISLATION_UPDATES.flatMap((u) => u.documents.map((d) => ({ u, d })))
                .slice(0, 8)
                .map(({ u, d }) => (
                  <li key={d.id} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_160px_110px_120px] gap-x-4 gap-y-1 px-5 py-4 items-center">
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-[#B3261E] shrink-0 mt-0.5" />
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold text-[#1C1C1C] leading-snug">{d.title}</span>
                        <span className="md:hidden block text-[12px] text-[#8A8A8A] mt-0.5">
                          {d.format} · {formatFileSize(d.sizeKb)}
                        </span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openDetail(u)}
                      className="hidden md:block text-left text-[12.5px] text-[#5E7F1A] font-semibold hover:underline truncate cursor-pointer"
                      title={u.title}
                    >
                      {u.gazetteRef}
                    </button>
                    <span className="hidden md:block text-[12.5px] text-[#6B6B6B]">
                      {d.format} · {formatFileSize(d.sizeKb)}
                    </span>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => downloadDocument(u, d)}
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#1C1C1C] border border-[#D5D5D5] hover:border-[#9BC53D] hover:bg-[#F2F7E6] rounded-[4px] px-3 py-1.5 cursor-pointer"
                        aria-label={`Download ${d.title}`}
                      >
                        <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* ================= FAQ + HELPFUL LINKS ================= */}
        <section className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          <div>
            <SectionTitle eyebrow="FAQ" title="Food legislation questions" />
            <FaqAccordion items={LEGISLATION_FAQS} />
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-[#E4E4E4] rounded-[8px] p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-bold text-[#1C1C1C]">Helpful links</h2>
                <button
                  type="button"
                  onClick={() => onNavigate('helpful-links')}
                  className="text-[12.5px] font-bold text-[#5E7F1A] hover:text-black inline-flex items-center gap-1 cursor-pointer"
                >
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="divide-y divide-[#EFEFEF]">
                {HELPFUL_LINKS.slice(0, 5).map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 py-3"
                    >
                      <span>
                        <span className="block text-[13.5px] font-semibold text-[#1C1C1C] group-hover:text-[#5E7F1A]">{l.organisation}</span>
                        <span className="block text-[12px] text-[#6B6B6B]">{l.title}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#8A8A8A] shrink-0 mt-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <HahnLawSidebarAd onSponsorClick={onSponsorClick} />
            <FoodStuffSidebarAd onSponsorClick={onSponsorClick} />
          </div>
        </section>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-[380px] bg-[#F6F7F5] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#E4E4E4]">
              <h2 className="text-[15px] font-bold">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filterPanel}</div>
            <div className="p-4 bg-white border-t border-[#E4E4E4] grid grid-cols-2 gap-3">
              <button type="button" onClick={clearAll} className="border border-[#D5D5D5] rounded-[4px] py-2.5 text-[13px] font-bold cursor-pointer">
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="bg-[#9BC53D] rounded-[4px] py-2.5 text-[13px] font-bold text-[#111111] cursor-pointer"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const SectionTitle: React.FC<{ eyebrow: string; title: string; id?: string; noMargin?: boolean }> = ({
  eyebrow,
  title,
  id,
  noMargin,
}) => (
  <div className={noMargin ? '' : 'mb-6'}>
    <span className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#6F9321] mb-1.5">{eyebrow}</span>
    <h2 id={id} className="text-[22px] sm:text-[26px] font-bold text-[#1C1C1C] leading-tight">
      {title}
    </h2>
  </div>
);

const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <fieldset>
    <legend className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B] mb-2.5">{title}</legend>
    <div className="space-y-1">{children}</div>
  </fieldset>
);

const CheckRow: React.FC<{ checked: boolean; onChange: () => void; count: number; children: React.ReactNode }> = ({
  checked,
  onChange,
  count,
  children,
}) => (
  <label className="flex items-center gap-2.5 py-1 cursor-pointer text-[13.5px] text-[#1C1C1C]">
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-[#6F9321] cursor-pointer" />
    <span className="flex-1">{children}</span>
    <span className="text-[12px] text-[#8A8A8A] tabular-nums">{count}</span>
  </label>
);

const PageButton: React.FC<{
  onClick: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, label, active, disabled, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    aria-current={active ? 'page' : undefined}
    className={`min-w-9 h-9 px-2 inline-flex items-center justify-center rounded-[4px] text-[13px] font-bold border transition-colors ${
      active
        ? 'bg-[#1C1C1C] border-[#1C1C1C] text-white'
        : disabled
        ? 'border-[#E4E4E4] text-[#C4C4C4] cursor-not-allowed'
        : 'bg-white border-[#D5D5D5] text-[#1C1C1C] hover:border-[#9BC53D] cursor-pointer'
    }`}
  >
    {children}
  </button>
);
