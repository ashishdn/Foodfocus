import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Link2,
  Loader2,
  Printer,
  Scale,
  Share2,
  Users,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import {
  BookmarkButton,
  CommentDeadline,
  FaqAccordion,
  LegislationCard,
  StatusBadge,
  SubscribeAlertsCard,
  faqJsonLd,
} from '../components/legislation/LegislationUi';
import {
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  LEGISLATION_CATEGORIES,
  SUPPLIER_NEWS_ITEMS,
} from '../data/foodfocusData';
import { HELPFUL_LINKS, LEGISLATION_UPDATES } from '../data/legislationData';
import {
  buildBriefText,
  downloadBrief,
  downloadDocument,
  formatFileSize,
  useBookmarks,
  useSeo,
} from '../lib/legislation';
import { EditorialArticle, LegislationDocument, LegislationUpdate, PageId } from '../types';

interface LegislationDetailPageProps {
  legislationId?: string;
  onNavigate: (page: PageId, filter?: string) => void;
  onOpenArticle: (article: EditorialArticle) => void;
}

const ALL_ARTICLES = [...LATEST_ARTICLES, ...SUPPLIER_NEWS_ITEMS, ...INDUSTRY_NEWS_ITEMS];

export const LegislationDetailPage: React.FC<LegislationDetailPageProps> = ({
  legislationId,
  onNavigate,
  onOpenArticle,
}) => {
  const item = LEGISLATION_UPDATES.find((u) => u.id === legislationId);
  if (!item) return <NotFound onNavigate={onNavigate} />;
  // key forces local UI state (previews, copy state) to reset between regulations
  return <DetailView key={item.id} item={item} onNavigate={onNavigate} onOpenArticle={onOpenArticle} />;
};

const DetailView: React.FC<{
  item: LegislationUpdate;
  onNavigate: (page: PageId, filter?: string) => void;
  onOpenArticle: (article: EditorialArticle) => void;
}> = ({ item, onNavigate, onOpenArticle }) => {
  const { isSaved, toggle } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const category = LEGISLATION_CATEGORIES.find((c) => c.id === item.categoryId);
  const path = `/legislation/${item.id}`;

  const related = useMemo(() => {
    const explicit = item.relatedLegislationIds
      .map((id) => LEGISLATION_UPDATES.find((u) => u.id === id))
      .filter((u): u is LegislationUpdate => Boolean(u));
    const sameAct = LEGISLATION_UPDATES.filter(
      (u) => u.categoryId === item.categoryId && u.id !== item.id && !explicit.includes(u)
    );
    return [...explicit, ...sameAct].slice(0, 4);
  }, [item]);

  const relatedArticles = item.relatedArticleIds
    .map((id) => ALL_ARTICLES.find((a) => a.id === id))
    .filter((a): a is EditorialArticle => Boolean(a));

  const links = HELPFUL_LINKS.filter((l) => l.relatedCategoryIds.includes(item.categoryId)).slice(0, 4);

  const sorted = [...LEGISLATION_UPDATES].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  const idx = sorted.findIndex((u) => u.id === item.id);
  const newer = sorted[idx - 1];
  const older = sorted[idx + 1];

  useSeo({
    title: item.seoTitle,
    description: item.metaDescription,
    keywords: item.keywords,
    path,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Legislation',
        name: item.title,
        legislationIdentifier: item.gazetteRef,
        legislationType: item.regulationType,
        legislationJurisdiction: 'ZA',
        legislationPassedBy: { '@type': 'GovernmentOrganization', name: item.authority },
        datePublished: item.isoDate,
        description: item.metaDescription,
        keywords: item.keywords.join(', '),
        inLanguage: 'en-ZA',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Legislation', item: '/legislation' },
          { '@type': 'ListItem', position: 3, name: item.title, item: path },
        ],
      },
      ...(item.faqs.length ? [faqJsonLd(item.faqs)] : []),
    ],
  });

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, text: item.excerpt, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <article className="bg-[#F6F7F5]" itemScope itemType="https://schema.org/Legislation">
      {/* ================= HEADER ================= */}
      <header className="bg-[#141414] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-10 sm:pb-12">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/55 mb-6 overflow-hidden">
            <ol className="flex items-center gap-1.5 min-w-0">
              <li className="shrink-0">
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#9BC53D] cursor-pointer">Home</button>
              </li>
              <li aria-hidden="true">/</li>
              <li className="shrink-0">
                <button type="button" onClick={() => onNavigate('legislation')} className="hover:text-[#9BC53D] cursor-pointer">Legislation</button>
              </li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li className="min-w-0 truncate">
                    <button type="button" onClick={() => onNavigate('legislation', category.id)} className="hover:text-[#9BC53D] cursor-pointer">
                      {category.title}
                    </button>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="max-w-[980px]">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatusBadge status={item.status} size="md" />
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-white/80 bg-white/10 rounded-full px-2.5 py-1">
                {item.regulationType}
              </span>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#9BC53D] bg-[#9BC53D]/10 rounded-full px-2.5 py-1">
                {item.topic}
              </span>
            </div>

            <h1 itemProp="name" className="text-[26px] sm:text-[34px] lg:text-[40px] font-bold leading-[1.15] tracking-[-0.01em]">
              {item.title}
            </h1>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-white/75 leading-[1.6] max-w-[820px]">{item.excerpt}</p>

            <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[13.5px]">
              <Meta icon={CalendarDays} label="Published">
                <time itemProp="datePublished" dateTime={item.isoDate}>{item.date}</time>
              </Meta>
              <Meta icon={FileText} label="Reference">
                <span itemProp="legislationIdentifier">{item.gazetteRef}</span>
              </Meta>
              <Meta icon={Building2} label="Authority">{item.authority}</Meta>
            </dl>

            {item.commentDeadline && item.status === 'open-for-comment' && (
              <div className="mt-6 inline-flex flex-wrap items-center gap-3 bg-[#FFF2DC] rounded-[6px] px-4 py-3">
                <CommentDeadline iso={item.commentDeadline} />
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-2.5">
              <BookmarkButton saved={isSaved(item.id)} onToggle={() => toggle(item.id)} variant="full" tone="dark" />
              <ActionButton icon={Download} onClick={() => downloadBrief(item)}>Download brief</ActionButton>
              <ActionButton icon={Printer} onClick={() => window.print()}>Print / PDF</ActionButton>
              <ActionButton icon={copied ? Check : Share2} onClick={share}>{copied ? 'Link copied' : 'Share'}</ActionButton>
            </div>
          </div>
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          <div className="min-w-0 space-y-8">
            {/* Key points */}
            <section className="bg-white border border-[#E4E4E4] border-l-4 border-l-[#9BC53D] rounded-[8px] p-6 sm:p-7">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#5E7F1A] mb-4">Key points at a glance</h2>
              <ul className="space-y-3">
                {item.keyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#1C1C1C]">
                    <CheckCircle2 className="w-5 h-5 text-[#6F9321] shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {/* Summary */}
            <section className="bg-white border border-[#E4E4E4] rounded-[8px] p-6 sm:p-8">
              <h2 className="text-[22px] font-bold text-[#1C1C1C] mb-4">What this means for your business</h2>
              <div itemProp="description" className="space-y-4 text-[16px] leading-[1.75] text-[#333333] max-w-[72ch]">
                {item.fullBrief.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h3 className="mt-8 text-[16px] font-bold text-[#1C1C1C] mb-3 inline-flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6F9321]" /> Who is affected
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.whoIsAffected.map((w) => (
                  <span key={w} className="text-[13px] font-semibold text-[#1C1C1C] bg-[#F2F7E6] border border-[#DCEBB8] rounded-full px-3 py-1">
                    {w}
                  </span>
                ))}
              </div>
            </section>

            {/* Documents */}
            {item.documents.length > 0 && (
              <section className="bg-white border border-[#E4E4E4] rounded-[8px] p-6 sm:p-7">
                <h2 className="text-[20px] font-bold text-[#1C1C1C] mb-1">Documents</h2>
                <p className="text-[13.5px] text-[#6B6B6B] mb-5">
                  Previews load only when you open them, so the page stays fast.
                </p>
                <div className="space-y-3">
                  {item.documents.map((d) => (
                    <DocumentRow key={d.id} item={item} doc={d} />
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            <section className="bg-white border border-[#E4E4E4] rounded-[8px] p-6 sm:p-7">
              <h2 className="text-[20px] font-bold text-[#1C1C1C] mb-4">Official sources & references</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {item.references.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-full flex items-start justify-between gap-3 border border-[#E4E4E4] rounded-[6px] p-4 hover:border-[#9BC53D] transition-colors"
                    >
                      <span>
                        <span className="block text-[14px] font-semibold text-[#1C1C1C] group-hover:text-[#5E7F1A]">{r.label}</span>
                        <span className="block text-[12px] text-[#8A8A8A] mt-0.5">{r.source}</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#8A8A8A] shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            {item.faqs.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold text-[#1C1C1C] mb-4">Frequently asked questions</h2>
                <FaqAccordion items={item.faqs} />
              </section>
            )}

            <p className="text-[12.5px] text-[#8A8A8A] leading-relaxed">
              This brief is for guidance only and does not constitute legal advice. Always refer to the
              official text published in the Government Gazette.
            </p>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            <div className="bg-white border border-[#E4E4E4] rounded-[8px] p-5">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B] mb-4">At a glance</h2>
              <dl className="divide-y divide-[#EFEFEF] text-[13.5px]">
                {[
                  ['Act / area', category?.title ?? '—'],
                  ['Act code', category?.actCode ?? '—'],
                  ['Type', item.regulationType],
                  ['Compliance area', item.topic],
                  ['Published', item.date],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-[#6B6B6B]">{k}</dt>
                    <dd className="font-semibold text-[#1C1C1C] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              {category && (
                <button
                  type="button"
                  onClick={() => onNavigate('legislation', category.id)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-[#D5D5D5] hover:border-[#9BC53D] rounded-[4px] py-2.5 text-[13px] font-bold text-[#1C1C1C] cursor-pointer"
                >
                  <Scale className="w-4 h-4" /> All {category.actCode} updates
                </button>
              )}
            </div>

            <SubscribeAlertsCard defaultTopics={[item.topic]} />

            {relatedArticles.length > 0 && (
              <div className="bg-white border border-[#E4E4E4] rounded-[8px] p-5">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B] mb-4">Related articles</h2>
                <ul className="space-y-4">
                  {relatedArticles.map((a) => (
                    <li key={a.id}>
                      <button type="button" onClick={() => onOpenArticle(a)} className="group w-full text-left flex gap-3 cursor-pointer">
                        <span className="w-20 h-14 shrink-0 overflow-hidden rounded-[4px] bg-[#EFEFEF]">
                          <SafeImage src={a.image} alt={a.imageAlt} className="w-full h-full object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-[#1C1C1C] leading-snug line-clamp-2 group-hover:text-[#5E7F1A]">
                            {a.title}
                          </span>
                          <span className="block text-[12px] text-[#8A8A8A] mt-1">{a.date}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {links.length > 0 && (
              <div className="bg-white border border-[#E4E4E4] rounded-[8px] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B]">Helpful links</h2>
                  <button type="button" onClick={() => onNavigate('helpful-links')} className="text-[12px] font-bold text-[#5E7F1A] hover:text-black cursor-pointer">
                    View all
                  </button>
                </div>
                <ul className="divide-y divide-[#EFEFEF]">
                  {links.map((l) => (
                    <li key={l.id}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-3 py-2.5">
                        <span className="text-[13.5px] font-semibold text-[#1C1C1C] group-hover:text-[#5E7F1A]">{l.organisation}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#8A8A8A] shrink-0 mt-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* ================= RELATED LEGISLATION ================= */}
        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <span className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#6F9321] mb-1.5">Keep reading</span>
            <h2 id="related-heading" className="text-[22px] sm:text-[26px] font-bold text-[#1C1C1C] mb-6">Related legislation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {related.map((u) => (
                <LegislationCard
                  key={u.id}
                  item={u}
                  layout="grid"
                  saved={isSaved(u.id)}
                  onToggleSave={() => toggle(u.id)}
                  onOpen={() => onNavigate('legislation-detail', u.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ================= PREV / NEXT ================= */}
        <nav aria-label="More legislation" className="mt-12 grid sm:grid-cols-2 gap-4">
          {older ? (
            <PrevNext dir="prev" item={older} onClick={() => onNavigate('legislation-detail', older.id)} />
          ) : <span />}
          {newer && <PrevNext dir="next" item={newer} onClick={() => onNavigate('legislation-detail', newer.id)} />}
        </nav>
      </div>
    </article>
  );
};

/* ------------------------------------------------------------------ */

const DocumentRow: React.FC<{ item: LegislationUpdate; doc: LegislationDocument }> = ({ item, doc }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const canEmbed = Boolean(doc.url) && doc.format === 'PDF';

  return (
    <div className="border border-[#E4E4E4] rounded-[6px] overflow-hidden">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-4">
        <span className="w-10 h-12 shrink-0 rounded-[3px] bg-[#FBEAEA] text-[#B3261E] text-[10px] font-extrabold flex items-center justify-center">
          {doc.format}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#1C1C1C] leading-snug">{doc.title}</div>
          <div className="text-[12px] text-[#8A8A8A] mt-0.5">
            {doc.format} · {formatFileSize(doc.sizeKb)}
            {doc.pages ? ` · ${doc.pages} pages` : ''}
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setLoading(true);
            }}
            aria-expanded={open}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-[#D5D5D5] hover:border-[#9BC53D] rounded-[4px] px-3 py-2 text-[12.5px] font-bold cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> {open ? 'Hide' : 'Preview'}
          </button>
          <button
            type="button"
            onClick={() => downloadDocument(item, doc)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#1C1C1C] hover:bg-black text-white rounded-[4px] px-3 py-2 text-[12.5px] font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E4E4E4] bg-[#FAFAFA]">
          {canEmbed ? (
            <div className="relative h-[520px]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 text-[13px] text-[#6B6B6B]">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading document…
                </div>
              )}
              <iframe
                src={`${doc.url}#view=FitH`}
                title={doc.title}
                loading="lazy"
                onLoad={() => setLoading(false)}
                className="w-full h-full bg-white"
              />
            </div>
          ) : (
            <pre className="max-h-[420px] overflow-auto p-5 text-[12.5px] leading-[1.6] text-[#333333] whitespace-pre-wrap font-sans">
              {buildBriefText(item)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

const Meta: React.FC<{ icon: React.ElementType; label: string; children: React.ReactNode }> = ({
  icon: Icon,
  label,
  children,
}) => (
  <div className="flex items-start gap-2">
    <Icon className="w-4 h-4 text-[#9BC53D] mt-0.5 shrink-0" />
    <div>
      <dt className="text-[11px] uppercase tracking-[0.08em] text-white/50 font-semibold">{label}</dt>
      <dd className="text-white/90 font-medium">{children}</dd>
    </div>
  </div>
);

const ActionButton: React.FC<{ icon: React.ElementType; onClick: () => void; children: React.ReactNode }> = ({
  icon: Icon,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[13px] font-bold border border-white/40 text-white hover:border-[#9BC53D] hover:text-[#9BC53D] transition-colors cursor-pointer"
  >
    <Icon className="w-4 h-4" />
    {children}
  </button>
);

const PrevNext: React.FC<{ dir: 'prev' | 'next'; item: LegislationUpdate; onClick: () => void }> = ({ dir, item, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group bg-white border border-[#E4E4E4] hover:border-[#9BC53D] rounded-[8px] p-5 transition-colors cursor-pointer ${
      dir === 'next' ? 'text-right' : 'text-left'
    }`}
  >
    <span className={`flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6B6B6B] mb-1.5 ${dir === 'next' ? 'justify-end' : ''}`}>
      {dir === 'prev' ? <><ArrowLeft className="w-3.5 h-3.5" /> Older</> : <>Newer <ArrowRight className="w-3.5 h-3.5" /></>}
    </span>
    <span className="block text-[14.5px] font-bold text-[#1C1C1C] leading-snug group-hover:text-[#5E7F1A] line-clamp-2">{item.title}</span>
  </button>
);

const NotFound: React.FC<{ onNavigate: (page: PageId, filter?: string) => void }> = ({ onNavigate }) => (
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <Link2 className="w-10 h-10 text-[#BDBDBD] mx-auto mb-4" />
    <h1 className="text-[26px] font-bold text-[#1C1C1C]">Legislation not found</h1>
    <p className="text-[15px] text-[#6B6B6B] mt-2">This update may have moved or been archived.</p>
    <button
      type="button"
      onClick={() => onNavigate('legislation')}
      className="mt-6 bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[13px] uppercase tracking-[0.06em] px-5 py-3 rounded-[4px] cursor-pointer"
    >
      Browse all legislation
    </button>
  </div>
);
