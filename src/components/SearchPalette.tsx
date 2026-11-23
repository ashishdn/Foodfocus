import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BadgeCheck, FileText, Scale, Search, Video } from 'lucide-react';
import {
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  LEGISLATION_UPDATES,
  SUPPLIER_DIRECTORY,
  SUPPLIER_NEWS_ITEMS,
  WEBINAR_ITEMS,
} from '../data/foodfocusData';
import { STATUS_META } from '../lib/legislation';
import { EditorialArticle, SupplierListing, WebinarItem } from '../types';

interface SearchPaletteProps {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
  onOpenArticle: (a: EditorialArticle) => void;
  onOpenLegislation: (id: string) => void;
  onOpenWebinar: (w: WebinarItem) => void;
  onOpenSupplier: (s: SupplierListing) => void;
}

type Group = 'Legislation' | 'Articles & news' | 'Webinars' | 'Suppliers';

interface Result {
  key: string;
  group: Group;
  title: string;
  sub: string;
  haystack: string;
  run: () => void;
}

const ICONS: Record<Group, React.ElementType> = {
  Legislation: Scale,
  'Articles & news': FileText,
  Webinars: Video,
  Suppliers: BadgeCheck,
};

const Highlight: React.FC<{ text: string; q: string }> = ({ text, q }) => {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-lime/40 text-inherit rounded px-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

export const SearchPalette: React.FC<SearchPaletteProps> = ({
  open,
  initialQuery = '',
  onClose,
  onOpenArticle,
  onOpenLegislation,
  onOpenWebinar,
  onOpenSupplier,
}) => {
  const [q, setQ] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ(initialQuery);
    setActive(0);
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, initialQuery]);

  const index = useMemo<Result[]>(() => {
    const close = (fn: () => void) => () => {
      onClose();
      fn();
    };
    return [
      ...LEGISLATION_UPDATES.map((l) => ({
        key: 'l-' + l.id,
        group: 'Legislation' as Group,
        title: l.title,
        sub: `${STATUS_META[l.status].label} · ${l.gazetteRef}`,
        haystack: [l.title, l.tag, l.gazetteRef, l.excerpt, ...l.keywords].join(' '),
        run: close(() => onOpenLegislation(l.id)),
      })),
      ...[...LATEST_ARTICLES, ...INDUSTRY_NEWS_ITEMS, ...SUPPLIER_NEWS_ITEMS].map((a) => ({
        key: 'a-' + a.id,
        group: 'Articles & news' as Group,
        title: a.title,
        sub: `${a.category} · ${a.date}`,
        haystack: [a.title, a.category, a.excerpt].join(' '),
        run: close(() => onOpenArticle(a)),
      })),
      ...WEBINAR_ITEMS.map((w) => ({
        key: 'w-' + w.id,
        group: 'Webinars' as Group,
        title: w.title.replace(/^Webinar \| /, ''),
        sub: `${w.partner} · ${w.duration}`,
        haystack: [w.title, w.partner, w.excerpt].join(' '),
        run: close(() => onOpenWebinar(w)),
      })),
      ...SUPPLIER_DIRECTORY.map((s) => ({
        key: 's-' + s.id,
        group: 'Suppliers' as Group,
        title: s.name,
        sub: `${s.category} · ${s.tagline}`,
        haystack: [s.name, s.category, s.tagline, s.description].join(' '),
        run: close(() => onOpenSupplier(s)),
      })),
    ];
  }, [onClose, onOpenArticle, onOpenLegislation, onOpenWebinar, onOpenSupplier]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.filter((r) => r.group === 'Legislation').slice(0, 5);
    return index.filter((r) => r.haystack.toLowerCase().includes(term)).slice(0, 24);
  }, [q, index]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      results[active]?.run();
    }
  };

  let lastGroup = '';
  const term = q.trim();

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[10vh] pb-4" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade" onClick={onClose} />
      <div className="relative w-full max-w-[680px] max-h-[76vh] flex flex-col bg-white rounded-3xl shadow-lift overflow-hidden animate-rise">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <Search className="w-5 h-5 text-faint shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search regulations, articles, webinars, suppliers…"
            aria-label="Search"
            className="flex-1 min-w-0 bg-transparent outline-none text-[18px] text-text placeholder:text-faint"
          />
          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-line text-faint">Esc</kbd>
        </div>

        <div ref={listRef} className="overflow-y-auto p-2">
          {!results.length && (
            <p className="py-10 px-4 text-center text-muted">
              No results for “{term}”.
              <br />
              Try R638, labelling, Listeria or audit.
            </p>
          )}
          {!term && results.length > 0 && (
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-faint">Latest regulations</div>
          )}
          {results.map((r, i) => {
            const Icon = ICONS[r.group];
            const header = term && r.group !== lastGroup;
            lastGroup = r.group;
            return (
              <React.Fragment key={r.key}>
                {header && (
                  <div className="px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-faint">{r.group}</div>
                )}
                <button
                  type="button"
                  data-idx={i}
                  onClick={r.run}
                  onMouseMove={() => setActive(i)}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-xl text-left cursor-pointer ${
                    i === active ? 'bg-lime-soft' : ''
                  }`}
                >
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-paper text-lime-deep shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-[15px] leading-snug text-text line-clamp-1">
                      <Highlight text={r.title} q={term} />
                    </span>
                    <span className="block text-[13px] text-muted line-clamp-1">{r.sub}</span>
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
