import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Calendar,
  Check,
  Clock,
  Download,
  Factory,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  MapPin,
  Play,
  Scale,
  Search,
  Sprout,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import {
  ADVERTISE_STATS,
  INDUSTRY_EVENTS,
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  LEGISLATION_UPDATES,
  SUPPLIER_DIRECTORY,
  SUPPLIER_NEWS_ITEMS,
  WEBINAR_ITEMS,
} from '../data/foodfocusData';
import { JOURNEY_STAGES, KNOWLEDGE_PARTNERS, MOST_READ, TOOLKIT_ITEMS, TRAINING_COURSES } from '../data/homeData';
import { STATUS_META, daysUntil, downloadDocument, formatIsoDate, useAlertSubscription } from '../lib/legislation';
import { EditorialArticle, LegislationStatus, PageId, SupplierListing, WebinarItem } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId, subFilter?: string) => void;
  onOpenArticle: (article: EditorialArticle) => void;
  onOpenWebinar: (webinar: WebinarItem) => void;
  onOpenSupplier: (supplier: SupplierListing) => void;
  onOpenSearch: (query?: string) => void;
  onSponsorClick: (title: string, context: string) => void;
}

const STAGE_ICONS = [Sprout, Factory, Box, Truck, Store, UtensilsCrossed];

const ALL_ARTICLES = [...LATEST_ARTICLES, ...INDUSTRY_NEWS_ITEMS, ...SUPPLIER_NEWS_ITEMS];

const PULSE_PILL: Record<LegislationStatus, string> = {
  new: 'bg-lime/20 text-lime-bright',
  updated: 'bg-[#78AAE6]/15 text-[#A9CBF2]',
  'open-for-comment': 'bg-[#F0A830]/20 text-[#F5C878]',
  'in-force': 'bg-white/10 text-white/75',
};

const initials = (name: string) =>
  name
    .split('·')[0]
    .replace(/^Dr\.?\s*/, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const shortDate = (d: string) => d.replace(/(\d{2}) (\w{3})\w* (\d{4})/, '$1 $2 $3');

const eventDate = (d: string) => {
  const m = d.match(/(\d{1,2}).*?([A-Za-z]{3})[a-z]*/);
  return m ? { day: m[1].padStart(2, '0'), month: m[2] } : { day: '—', month: '' };
};

const monogram = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenWebinar,
  onOpenSupplier,
  onOpenSearch,
  onSponsorClick,
}) => {
  /* ---------------- derived data ---------------- */
  const byDate = useMemo(() => [...LEGISLATION_UPDATES].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1)), []);
  const deadline = useMemo(
    () =>
      LEGISLATION_UPDATES.filter((u) => u.commentDeadline && daysUntil(u.commentDeadline) >= 0).sort((a, b) =>
        a.commentDeadline! < b.commentDeadline! ? -1 : 1
      )[0],
    []
  );
  const pulseItems = byDate.filter((u) => u.id !== deadline?.id).slice(0, 3);
  const deadlineDays = deadline?.commentDeadline ? daysUntil(deadline.commentDeadline) : 0;
  const deadlineProgress = deadline?.commentDeadline
    ? Math.min(
        100,
        Math.max(
          4,
          ((Date.now() - new Date(deadline.isoDate).getTime()) /
            (new Date(deadline.commentDeadline).getTime() - new Date(deadline.isoDate).getTime())) *
            100
        )
      )
    : 0;

  /* ---------------- state ---------------- */
  const [heroQuery, setHeroQuery] = useState('');
  const [stageIdx, setStageIdx] = useState(1);
  const [newsTab, setNewsTab] = useState<'industry' | 'supplier'>('industry');
  const [dirQuery, setDirQuery] = useState('');
  const [dirCat, setDirCat] = useState<string>('All');
  const [subscription, setSubscription] = useAlertSubscription();
  const [nlEmail, setNlEmail] = useState('');
  const [nlTopics, setNlTopics] = useState<string[]>(['Legislation alerts', 'Webinars']);

  const stage = JOURNEY_STAGES[stageIdx];
  const stageLatest = LEGISLATION_UPDATES.find((u) => u.id === stage.latestLegislationId);

  const [lead, ...sideStories] = LATEST_ARTICLES;
  const [featuredWebinar, ...moreWebinars] = WEBINAR_ITEMS;

  const dirCats = ['All', ...Array.from(new Set(SUPPLIER_DIRECTORY.map((s) => s.category)))];
  const suppliers = SUPPLIER_DIRECTORY.filter(
    (s) =>
      (dirCat === 'All' || s.category === dirCat) &&
      (!dirQuery.trim() ||
        `${s.name} ${s.tagline} ${s.category}`.toLowerCase().includes(dirQuery.trim().toLowerCase()))
  );

  const stats = [
    ADVERTISE_STATS.find((s) => s.label.startsWith('Website users')),
    ADVERTISE_STATS.find((s) => s.label.startsWith('Email')),
    ADVERTISE_STATS.find((s) => s.label.startsWith('Social')),
  ].filter(Boolean) as { value: string; label: string }[];

  const onStageKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (stageIdx + (e.key === 'ArrowRight' ? 1 : -1) + JOURNEY_STAGES.length) % JOURNEY_STAGES.length;
    setStageIdx(next);
    document.getElementById(`stage-${JOURNEY_STAGES[next].id}`)?.focus();
  };

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscription({
      email: nlEmail.trim(),
      topics: nlTopics,
      frequency: 'weekly',
      newsletter: true,
      subscribedAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      {/* =============== HERO =============== */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="ff-container grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-12 lg:gap-16 items-center">
          <div className="animate-rise">
            <span className="ff-eyebrow">South Africa's food compliance platform</span>
            <h1 className="mt-5 mb-6 font-display font-normal text-[44px] sm:text-[64px] xl:text-[80px] leading-[1] tracking-[-0.035em] text-text">
              Food compliance, <em className="italic text-lime-deep">made&nbsp;clear.</em>
            </h1>
            <p className="text-[18px] sm:text-[20px] text-muted max-w-[42ch] leading-relaxed">
              Legislation, food safety, hygiene and quality guidance for the South African food industry — from farm
              to fork, in plain language.
            </p>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                onOpenSearch(heroQuery.trim());
              }}
              className="mt-8 max-w-[580px] flex items-center gap-2 p-2 pl-5 bg-white border border-line-strong rounded-full shadow-soft focus-within:border-ink focus-within:ring-4 focus-within:ring-lime/30 transition"
            >
              <Search className="w-5 h-5 text-faint shrink-0" />
              <input
                type="search"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search a regulation, topic or supplier…"
                aria-label="Search regulations, articles and suppliers"
                className="flex-1 min-w-0 h-11 bg-transparent outline-none text-[16px] placeholder:text-faint"
              />
              <button type="submit" className="ff-btn ff-btn-ink px-4 sm:px-5" aria-label="Search">
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <span>Popular:</span>
              {['R638', 'R3337', 'Listeria', 'FSSC 22000', 'Allergen'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onOpenSearch(t)}
                  className="px-3 py-1 rounded-full bg-ink/5 hover:bg-lime-soft text-text font-medium transition-colors cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>

            <dl className="mt-10 pt-7 border-t border-line flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[30px] sm:text-[34px] font-medium tracking-[-0.02em] leading-none">{s.value}</dd>
                  <dd className="text-[13px] text-muted mt-1.5">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Regulatory Pulse */}
          <aside
            aria-labelledby="pulse-title"
            className="relative bg-ink text-[#E9EFE9] rounded-[22px] p-6 sm:p-7 shadow-lift overflow-hidden animate-rise"
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_100%_0%,rgba(155,197,61,.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-center justify-between gap-3 mb-5">
              <h2 id="pulse-title" className="font-sans text-[15px] font-semibold text-white flex items-center gap-2.5 tracking-normal">
                <span className="w-2.5 h-2.5 rounded-full bg-lime shadow-[0_0_0_4px_rgba(155,197,61,.22)]" />
                Regulatory Pulse
              </h2>
              <span className="text-[13px] text-white/50">Updated weekly</span>
            </div>

            {deadline && (
              <button
                type="button"
                onClick={() => onNavigate('legislation-detail', deadline.id)}
                className="relative block w-full text-left rounded-2xl p-5 mb-3 bg-gradient-to-br from-[#F7D58A] to-[#F2B64A] text-[#2C1A00] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-start gap-3">
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Comment deadline</span>
                  <span className="text-right leading-none">
                    <span className="block font-display text-[40px] font-medium tracking-[-0.03em]">{deadlineDays}</span>
                    <span className="text-[12px] font-semibold">day{deadlineDays === 1 ? '' : 's'} left</span>
                  </span>
                </div>
                <span className="block mt-2 text-[16px] font-semibold leading-snug max-w-[32ch]">
                  {(deadline.seoTitle || deadline.title).split(' | ')[0]} — closes{' '}
                  {formatIsoDate(deadline.commentDeadline!)}
                </span>
                <span className="block h-[5px] rounded bg-[#2C1A00]/15 mt-4 overflow-hidden" aria-hidden="true">
                  <span className="block h-full rounded bg-[#2C1A00]" style={{ width: `${deadlineProgress}%` }} />
                </span>
              </button>
            )}

            <ul className="relative">
              {pulseItems.map((u) => (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('legislation-detail', u.id)}
                    className="w-full grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-3.5 px-1 border-t border-white/10 text-left hover:bg-white/[.04] rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-[14.5px] font-medium leading-snug text-white line-clamp-2">{u.title}</span>
                    <span className={`ff-pill row-span-2 self-center ${PULSE_PILL[u.status]}`}>{STATUS_META[u.status].label}</span>
                    <span className="font-mono text-[12px] text-white/50">{u.gazetteRef}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="relative flex items-center justify-between mt-2 pt-4 border-t border-white/10">
              <span className="text-[13px] text-white/50">{LEGISLATION_UPDATES.length} tracked updates</span>
              <button
                type="button"
                onClick={() => onNavigate('legislation', 'updates')}
                className="inline-flex items-center gap-1.5 font-semibold text-lime hover:gap-2.5 transition-all cursor-pointer"
              >
                Open tracker <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* =============== FARM TO FORK NAVIGATOR =============== */}
      <section className="bg-white border-y border-line py-16 sm:py-24" aria-labelledby="journey-title">
        <div className="ff-container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="ff-eyebrow">Farm to fork navigator</span>
              <h2 id="journey-title" className="mt-3 font-display font-medium text-[30px] sm:text-[44px] leading-[1.1] max-w-[18ch]">
                Where are you in the food chain?
              </h2>
            </div>
            <p className="text-muted max-w-[46ch]">
              Pick your stage to see the laws that apply, what auditors look for and the latest guidance — no legal
              jargon.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Food chain stage"
            onKeyDown={onStageKey}
            className="relative flex sm:grid sm:grid-cols-6 gap-1 sm:gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 mb-9"
          >
            <span
              aria-hidden="true"
              className="hidden sm:block absolute left-[8%] right-[8%] top-8 h-[2px] bg-[repeating-linear-gradient(90deg,#CFCCBE_0_8px,transparent_8px_14px)]"
            />
            <span
              aria-hidden="true"
              className="hidden sm:block absolute left-[8%] top-8 h-[2px] bg-lime transition-[width] duration-500"
              style={{ width: `${(stageIdx / (JOURNEY_STAGES.length - 1)) * 84}%` }}
            />
            {JOURNEY_STAGES.map((s, i) => {
              const Icon = STAGE_ICONS[i];
              const selected = i === stageIdx;
              const done = i < stageIdx;
              return (
                <button
                  key={s.id}
                  id={`stage-${s.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="journey-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setStageIdx(i)}
                  className="relative shrink-0 w-[96px] sm:w-auto flex flex-col items-center gap-3 pb-1 cursor-pointer group"
                >
                  <span
                    className={`grid place-items-center w-16 h-16 rounded-full border-2 transition-all duration-300 ${
                      selected
                        ? 'bg-ink border-ink text-lime scale-110 shadow-[0_0_0_6px_#EDF5D9]'
                        : done
                        ? 'bg-lime-soft border-lime text-lime-deep'
                        : 'bg-paper border-line-strong text-muted group-hover:border-ink group-hover:text-ink'
                    }`}
                  >
                    <Icon className="w-[26px] h-[26px]" strokeWidth={1.7} />
                  </span>
                  <span className={`text-[14px] font-semibold ${selected ? 'text-ink' : 'text-muted'}`}>{s.label}</span>
                  <span className="font-mono text-[11px] text-faint -mt-2">0{i + 1}</span>
                </button>
              );
            })}
          </div>

          <div
            key={stage.id}
            id="journey-panel"
            role="tabpanel"
            aria-labelledby={`stage-${stage.id}`}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-rise"
          >
            <div className="md:col-span-2 lg:col-span-1">
              <span className="ff-eyebrow">Stage 0{stageIdx + 1}</span>
              <h3 className="mt-3 mb-3 font-display font-medium text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.02em]">
                {stage.title}
              </h3>
              <p className="text-muted">{stage.intro}</p>
              <button
                type="button"
                onClick={() => onNavigate('legislation', stage.laws[0].categoryId)}
                className="ff-btn ff-btn-ink mt-6"
              >
                See {stage.label.toLowerCase()} legislation <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <h4 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted mb-3">
                <Scale className="w-4 h-4" /> Laws that apply
              </h4>
              <ul>
                {stage.laws.map((l) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onClick={() => onNavigate('legislation', l.categoryId)}
                      className="w-full flex items-center justify-between gap-3 py-3 border-b border-line last:border-b-0 text-left font-medium hover:text-lime-deep transition-colors cursor-pointer"
                    >
                      {l.label}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <h4 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted mb-3">
                <BadgeCheck className="w-4 h-4" /> What auditors check
              </h4>
              <ul className="space-y-2.5">
                {stage.checks.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span className="grid place-items-center w-[18px] h-[18px] mt-[3px] rounded-[5px] border-[1.5px] border-lime-deep bg-white text-lime-deep shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              {stageLatest && (
                <p className="mt-4 pt-4 border-t border-line text-[13.5px] text-faint">
                  Latest:{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('legislation-detail', stageLatest.id)}
                    className="text-text font-semibold text-left hover:text-lime-deep cursor-pointer"
                  >
                    {stageLatest.title}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =============== INSIGHTS =============== */}
      <section className="py-16 sm:py-24" aria-labelledby="insights-title">
        <div className="ff-container">
          <SectionHeading
            eyebrow="Insights"
            title="Expert analysis for QA teams"
            actionLabel="All articles"
            onAction={() => onNavigate('articles')}
          />

          <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-10">
            <article>
              <button
                type="button"
                onClick={() => onOpenArticle(lead)}
                className="ff-zoom block w-full aspect-[16/10] rounded-2xl overflow-hidden bg-line mb-5 cursor-pointer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <SafeImage src={lead.image} alt={lead.imageAlt} className="w-full h-full object-cover" />
              </button>
              <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-lime-deep">{lead.category}</span>
              <h3 className="mt-2.5 mb-3 font-display font-medium text-[28px] sm:text-[38px] leading-[1.12] tracking-[-0.02em]">
                <button
                  type="button"
                  onClick={() => onOpenArticle(lead)}
                  className="text-left hover:underline decoration-lime decoration-2 underline-offset-4 cursor-pointer"
                >
                  {lead.title}
                </button>
              </h3>
              <p className="text-[17px] text-muted max-w-[60ch]">{lead.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[14px] text-muted">
                <span className="grid place-items-center w-8 h-8 rounded-full bg-lime-soft text-lime-deep text-[12px] font-bold">
                  {initials(lead.author)}
                </span>
                {lead.author.split('·')[0].trim()} <span aria-hidden="true">·</span> {shortDate(lead.date)}{' '}
                <span aria-hidden="true">·</span> {lead.readTime}
              </div>
            </article>

            <div className="flex flex-col gap-5">
              {sideStories.map((a) => (
                <article key={a.id} className="grid grid-cols-[96px_1fr] sm:grid-cols-[132px_1fr] gap-4 sm:gap-5 pb-5 border-b border-line">
                  <button
                    type="button"
                    onClick={() => onOpenArticle(a)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="ff-zoom block aspect-square rounded-xl overflow-hidden bg-line cursor-pointer"
                  >
                    <SafeImage src={a.image} alt={a.imageAlt} className="w-full h-full object-cover" />
                  </button>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-lime-deep">{a.category}</span>
                    <h3 className="mt-1.5 mb-2 text-[17px] font-semibold leading-snug">
                      <button
                        type="button"
                        onClick={() => onOpenArticle(a)}
                        className="text-left hover:underline decoration-lime decoration-2 underline-offset-4 cursor-pointer"
                      >
                        {a.title}
                      </button>
                    </h3>
                    <span className="text-[13px] text-faint">
                      {a.author.split('·')[0].trim()} · {a.readTime}
                    </span>
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-dashed border-line-strong bg-white p-5 grid gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">Partner insight</span>
                <h4 className="text-[17px] font-semibold">Draft R3337: what changes on your label?</h4>
                <p className="text-[14px] text-muted">
                  A practical walk-through from Hahn &amp; Hahn Food Law — sponsored content, clearly labelled.
                </p>
                <button
                  type="button"
                  onClick={() => onSponsorClick('Hahn & Hahn Food Law', 'Homepage partner insight — Draft R3337')}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-lime-deep cursor-pointer w-fit"
                >
                  Read the guide <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t-2 border-ink">
            <h3 className="pt-3.5 text-[12px] font-bold uppercase tracking-[0.12em]">Most read this month</h3>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
              {MOST_READ.map((m, i) => {
                const open = () => {
                  if (m.articleId) {
                    const a = ALL_ARTICLES.find((x) => x.id === m.articleId);
                    if (a) onOpenArticle(a);
                  } else if (m.legislationId) onNavigate('legislation-detail', m.legislationId);
                };
                return (
                  <li
                    key={m.title}
                    className={`py-5 sm:pr-5 border-b lg:border-b-0 border-line ${i > 0 ? 'lg:pl-5 lg:border-l' : ''} ${
                      i % 2 === 1 ? 'sm:pl-5 sm:border-l' : ''
                    }`}
                  >
                    <button type="button" onClick={open} className="text-left group cursor-pointer">
                      <span className="font-display italic text-[36px] leading-none text-lime-deep">0{i + 1}</span>
                      <span className="block mt-2.5 mb-1.5 text-[15.5px] font-semibold leading-snug group-hover:underline decoration-lime decoration-2 underline-offset-4">
                        {m.title}
                      </span>
                      <span className="text-[13px] text-faint">
                        {m.label} · {m.mins} min
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* =============== TOOLKIT =============== */}
      <section className="bg-lime-soft py-16 sm:py-24" aria-labelledby="toolkit-title">
        <div className="ff-container">
          <SectionHeading
            eyebrow="Compliance toolkit"
            title="Free templates, ready for audit day"
            description="Checklists and registers written by our regulatory desk — new ones added every month."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLKIT_ITEMS.map(({ doc, update }) => {
              const FileIcon = doc.format === 'XLSX' ? FileSpreadsheet : FileText;
              const badge =
                doc.format === 'PDF'
                  ? 'bg-rose-soft text-rose'
                  : doc.format === 'XLSX'
                  ? 'bg-lime-soft text-lime-deep'
                  : 'bg-blue-soft text-blue';
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => downloadDocument(update, doc)}
                  className="group text-left flex flex-col gap-3.5 bg-white rounded-2xl p-6 border border-lime-deep/15 hover:-translate-y-1 hover:shadow-soft transition-all cursor-pointer"
                >
                  <span className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] font-semibold px-2 py-1 rounded-md ${badge}`}>
                      {doc.format}
                      {doc.pages ? ` · ${doc.pages} pages` : ''}
                    </span>
                    <FileIcon className="w-5 h-5 text-lime-deep" />
                  </span>
                  <span className="text-[17px] font-semibold leading-snug">{doc.title}</span>
                  <span className="text-[14px] text-muted line-clamp-2">{update.title}</span>
                  <span className="mt-auto pt-3.5 border-t border-line flex items-center justify-between text-[14px]">
                    <span className="text-faint">{update.tag}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-lime-deep">
                      Download <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== WEBINARS =============== */}
      <section className="bg-ink text-[#E9EFE9] py-16 sm:py-24" aria-labelledby="web-title">
        <div className="ff-container">
          <SectionHeading
            variant="dark"
            eyebrow="Webinars on demand"
            title="Learn from the people who write the standards"
            actionLabel="All webinars"
            onAction={() => onNavigate('webinars')}
          />
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 lg:gap-10">
            <button
              type="button"
              onClick={() => onOpenWebinar(featuredWebinar)}
              className="ff-zoom group relative rounded-[22px] overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-end text-left text-white cursor-pointer"
            >
              <SafeImage src={featuredWebinar.image} alt={featuredWebinar.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-b from-ink/5 via-ink/40 to-ink/95" />
              <span className="absolute top-6 right-6 grid place-items-center w-16 h-16 rounded-full bg-lime text-ink group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1 fill-current" />
              </span>
              <span className="relative p-6 sm:p-9">
                <span className="ff-eyebrow ff-eyebrow-light">{featuredWebinar.partner}</span>
                <span className="block mt-3 mb-3 font-display font-medium text-[24px] sm:text-[34px] leading-[1.12] tracking-[-0.02em] max-w-[22ch]">
                  {featuredWebinar.title.replace(/^Webinar \| (DSA – )?/, '')}
                </span>
                <span className="flex flex-wrap gap-4 text-[14px] text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {featuredWebinar.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {shortDate(featuredWebinar.date)}
                  </span>
                </span>
              </span>
            </button>

            <ul>
              {moreWebinars.slice(0, 4).map((w, i) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => onOpenWebinar(w)}
                    className={`group w-full grid grid-cols-[54px_1fr] gap-4 items-start text-left py-[18px] border-b border-white/10 cursor-pointer ${
                      i === 0 ? 'pt-1' : ''
                    }`}
                  >
                    <span className="grid place-items-center w-[54px] h-[54px] rounded-xl border border-white/15 text-lime group-hover:bg-lime group-hover:text-ink group-hover:border-lime transition-colors">
                      <Play className="w-5 h-5 fill-current" />
                    </span>
                    <span>
                      <span className="block text-[16px] font-medium leading-snug text-white">
                        {w.title.replace(/^Webinar \| /, '')}
                      </span>
                      <span className="block mt-1 text-[13px] text-white/50">
                        {w.partner} · {shortDate(w.date)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =============== NEWS =============== */}
      <section className="py-16 sm:py-24" aria-labelledby="news-title">
        <div className="ff-container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span className="ff-eyebrow">News</span>
              <h2 id="news-title" className="mt-3 font-display font-medium text-[30px] sm:text-[40px] leading-[1.1]">
                What's moving in the industry
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div role="tablist" aria-label="News type" className="inline-flex gap-1 p-1 rounded-full bg-white border border-line">
                {(['industry', 'supplier'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={newsTab === t}
                    onClick={() => setNewsTab(t)}
                    className={`px-4 min-h-[38px] rounded-full text-[14px] font-semibold capitalize cursor-pointer transition-colors ${
                      newsTab === t ? 'bg-ink text-white' : 'text-muted hover:text-text'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('news', newsTab)}
                className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-[15px] hover:text-lime-deep cursor-pointer"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div key={newsTab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-rise">
            {(newsTab === 'industry' ? INDUSTRY_NEWS_ITEMS : SUPPLIER_NEWS_ITEMS).map((n) => (
              <article
                key={n.id}
                className="ff-zoom flex flex-col bg-white border border-line rounded-2xl overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all"
              >
                <button type="button" onClick={() => onOpenArticle(n)} tabIndex={-1} aria-hidden="true" className="block aspect-[16/10] overflow-hidden bg-line cursor-pointer">
                  <SafeImage src={n.image} alt={n.imageAlt} className="w-full h-full object-cover" />
                </button>
                <div className="flex flex-col gap-2.5 p-5 flex-1">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-lime-deep">{n.category}</span>
                  <h3 className="text-[17px] font-semibold leading-snug">
                    <button type="button" onClick={() => onOpenArticle(n)} className="text-left hover:text-lime-deep cursor-pointer">
                      {n.title}
                    </button>
                  </h3>
                  <p className="text-[14.5px] text-muted line-clamp-3">{n.excerpt}</p>
                  <div className="mt-auto pt-3 border-t border-line flex items-center justify-between gap-3 text-[13px]">
                    <span className="font-semibold truncate">{n.author.split('·')[0].trim()}</span>
                    <span className="text-faint shrink-0">{shortDate(n.date)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== EVENTS & TRAINING =============== */}
      <section className="pb-16 sm:pb-24" aria-labelledby="events-title">
        <div className="ff-container">
          <SectionHeading
            eyebrow="Events & training"
            title="Meet the industry. Upskill your team."
            actionLabel="Full calendar"
            onAction={() => onNavigate('events')}
          />
          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 lg:gap-10">
            <div>
              {INDUSTRY_EVENTS.map((ev, i) => {
                const d = eventDate(ev.date);
                return (
                  <article
                    key={ev.id}
                    className={`grid grid-cols-[64px_1fr] sm:grid-cols-[84px_1fr_auto] gap-x-5 gap-y-3 items-center py-5 border-b border-line ${
                      i === 0 ? 'border-t' : ''
                    }`}
                  >
                    <div className="text-center rounded-xl bg-white border border-line py-2.5">
                      <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-lime-deep">{d.month}</div>
                      <div className="font-display text-[30px] font-medium leading-tight">{d.day}</div>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold leading-snug mb-1.5">{ev.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" /> {ev.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="w-4 h-4" /> {ev.format}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('events', ev.id)}
                      className="ff-btn ff-btn-ghost min-h-10 px-4 text-[14px] col-start-2 sm:col-start-auto justify-self-start"
                    >
                      Details
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="bg-ink text-[#E9EFE9] rounded-[22px] p-7 sm:p-8 flex flex-col">
              <span className="ff-eyebrow ff-eyebrow-light">Accredited training</span>
              <h3 className="mt-3 mb-2 font-display font-medium text-[28px] text-white tracking-[-0.02em]">Courses for food teams</h3>
              <p className="text-white/65 text-[15px]">
                Short, practical courses — on-site or online — with certificates your auditor will recognise.
              </p>
              <div className="mt-4">
                {TRAINING_COURSES.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => onNavigate('training', c.title)}
                    className="group w-full flex items-center justify-between gap-3 py-4 border-b border-white/10 text-left cursor-pointer"
                  >
                    <span>
                      <span className="block text-white font-semibold text-[15.5px] group-hover:text-lime transition-colors">{c.short}</span>
                      <span className="block text-[13px] text-white/55">{c.meta}</span>
                    </span>
                    <GraduationCap className="w-5 h-5 text-lime shrink-0" />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => onNavigate('training')} className="ff-btn ff-btn-lime mt-6 self-start">
                Enquire about training
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* =============== DIRECTORY =============== */}
      <section className="bg-white border-t border-line py-16 sm:py-24" aria-labelledby="dir-title">
        <div className="ff-container">
          <SectionHeading
            eyebrow="Supplier directory"
            title="Find a trusted compliance partner"
            description="Accredited labs, certification bodies, instruments and hygiene specialists serving South African food businesses."
          />

          <div className="flex flex-wrap items-center gap-3 mb-7">
            <label className="flex items-center gap-2.5 flex-[1_1_260px] max-w-[360px] min-h-11 px-4 rounded-full border border-line-strong bg-paper focus-within:border-ink">
              <Search className="w-4 h-4 text-faint" />
              <span className="sr-only">Search suppliers</span>
              <input
                type="search"
                value={dirQuery}
                onChange={(e) => setDirQuery(e.target.value)}
                placeholder="Search suppliers or services…"
                className="w-full bg-transparent outline-none text-[15px]"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {dirCats.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={dirCat === c}
                  onClick={() => setDirCat(c)}
                  className={`min-h-9 px-3.5 rounded-full border text-[14px] font-medium cursor-pointer transition-colors ${
                    dirCat === c ? 'bg-ink border-ink text-white' : 'bg-white border-line-strong hover:border-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suppliers.length ? (
              suppliers.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onOpenSupplier(s)}
                  className="flex flex-col gap-3 p-5 text-left rounded-2xl border border-line bg-paper hover:border-lime hover:shadow-soft hover:-translate-y-0.5 transition-all cursor-pointer animate-rise"
                >
                  <span className="flex items-start justify-between gap-2">
                    <span
                      className="grid place-items-center w-[52px] h-[52px] rounded-xl text-white font-extrabold text-[14px] tracking-tight"
                      style={{ backgroundColor: s.accentColor }}
                    >
                      {monogram(s.name)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-lime-deep">
                      <BadgeCheck className="w-4 h-4" /> Verified
                    </span>
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold leading-snug">{s.name}</span>
                    <span className="block mt-1 text-[13.5px] text-muted leading-normal">{s.tagline}</span>
                  </span>
                  <span className="mt-auto flex items-center gap-1.5 text-[13px] text-faint">
                    <MapPin className="w-3.5 h-3.5" /> {s.location}
                  </span>
                </button>
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-muted border border-dashed border-line-strong rounded-2xl">
                No suppliers match “{dirQuery}”. Try “lab”, “audit” or “hygiene”.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-paper border border-line">
            <p className="font-medium">
              Supply the food industry?{' '}
              <span className="text-muted font-normal">Get listed in front of 4,000+ QA and compliance decision-makers.</span>
            </p>
            <button type="button" onClick={() => onNavigate('advertise')} className="ff-btn ff-btn-ink">
              List your company
            </button>
          </div>
        </div>
      </section>

      {/* =============== PARTNERS =============== */}
      <section aria-label="Knowledge partners" className="border-t border-line py-10">
        <div className="ff-container flex flex-wrap items-center justify-between gap-6">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">Knowledge partners</span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {KNOWLEDGE_PARTNERS.map((p) => (
              <span key={p} className="text-[18px] font-bold tracking-[-0.02em] text-[#9AA39C] hover:text-ink transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== NEWSLETTER =============== */}
      <section id="subscribe" className="pb-16 sm:pb-24 scroll-mt-28" aria-labelledby="nl-title">
        <div className="ff-container">
          <div className="relative overflow-hidden grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 items-center bg-lime text-ink rounded-[22px] p-7 sm:p-14">
            <span className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-[50px] border-white/20 pointer-events-none" />
            <div className="relative">
              <span className="ff-eyebrow text-ink">The Monday Brief</span>
              <h2 id="nl-title" className="mt-3.5 mb-3 font-display font-medium text-[30px] sm:text-[46px] leading-[1.08] tracking-[-0.025em]">
                Every regulatory change, in your inbox before Monday's meeting.
              </h2>
              <p className="max-w-[44ch] text-ink/75">
                One short email a week: new gazette notices, comment deadlines, recalls and the articles your QA team
                should read.
              </p>
            </div>

            {subscription?.newsletter ? (
              <div role="status" className="relative font-semibold bg-white/60 px-5 py-4 rounded-xl">
                You're subscribed as {subscription.email}. Your next Monday Brief is on its way.
              </div>
            ) : (
              <form onSubmit={submitNewsletter} className="relative grid gap-3">
                <div className="flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-2xl sm:rounded-full">
                  <label htmlFor="nl-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    required
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="Your work email"
                    autoComplete="email"
                    className="flex-1 min-w-0 min-h-12 px-4 bg-transparent outline-none text-[16px] text-text"
                  />
                  <button type="submit" className="ff-btn ff-btn-ink">
                    Subscribe free
                  </button>
                </div>
                <fieldset className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
                  <legend className="sr-only">Topics</legend>
                  {['Legislation alerts', 'Webinars', 'Supplier news'].map((t) => (
                    <label key={t} className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={nlTopics.includes(t)}
                        onChange={(e) =>
                          setNlTopics((prev) => (e.target.checked ? [...prev, t] : prev.filter((x) => x !== t)))
                        }
                        className="w-[18px] h-[18px] accent-ink"
                      />
                      {t}
                    </label>
                  ))}
                </fieldset>
                <span className="text-[13px] text-ink/70">Join 4,000+ food professionals. Unsubscribe anytime.</span>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
