import { useCallback, useEffect, useState } from 'react';
import { LegislationDocument, LegislationStatus, LegislationUpdate } from '../types';

/* ------------------------------------------------------------------ */
/* Status badges                                                       */
/* ------------------------------------------------------------------ */

export const STATUS_META: Record<
  LegislationStatus,
  { label: string; className: string; dot: string }
> = {
  new: { label: 'New', className: 'bg-[#EAF5D3] text-[#3F5A0F] border-[#C9E39A]', dot: 'bg-[#6F9321]' },
  updated: { label: 'Updated', className: 'bg-[#E3EEFB] text-[#1D4E89] border-[#B9D3F2]', dot: 'bg-[#2F6FB8]' },
  'open-for-comment': { label: 'Open for Comment', className: 'bg-[#FFF2DC] text-[#8A4B00] border-[#F5D29A]', dot: 'bg-[#D97F06]' },
  'in-force': { label: 'In Force', className: 'bg-[#F0F0F0] text-[#3A3A3A] border-[#DADADA]', dot: 'bg-[#7A7A7A]' },
};

export const formatIsoDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

export const daysUntil = (iso: string) => {
  const ms = new Date(`${iso}T23:59:59`).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
};

export const formatFileSize = (kb: number) =>
  kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;

/* ------------------------------------------------------------------ */
/* Safe localStorage with cross-component sync                         */
/* ------------------------------------------------------------------ */

const STORAGE_EVENT = 'foodfocus-storage';

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — keep in-memory state only */
  }
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: key }));
};

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));

  useEffect(() => {
    const sync = (e: Event) => {
      const changedKey = e instanceof StorageEvent ? e.key : (e as CustomEvent<string>).detail;
      if (changedKey === key) setValue(readStorage(key, fallback));
    };
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
    // fallback is a literal at call sites; key identifies the slot
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update] as const;
}

/* ------------------------------------------------------------------ */
/* Bookmarks                                                           */
/* ------------------------------------------------------------------ */

export function useBookmarks() {
  const [ids, setIds] = usePersistentState<string[]>('ff-legislation-bookmarks', []);
  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
    [setIds]
  );
  return { ids, isSaved, toggle };
}

/* ------------------------------------------------------------------ */
/* Alerts subscription + "new since last visit" notifications          */
/* ------------------------------------------------------------------ */

export interface AlertSubscription {
  email: string;
  topics: string[];
  frequency: 'instant' | 'weekly' | 'monthly';
  newsletter: boolean;
  subscribedAt: string;
}

export function useAlertSubscription() {
  return usePersistentState<AlertSubscription | null>('ff-legislation-alerts', null);
}

/**
 * Returns updates published after the visitor's previous visit, then
 * records the current visit so the count resets next time.
 */
export function useNewSinceLastVisit(updates: LegislationUpdate[]) {
  const [lastVisit] = useState<string | null>(() => readStorage<string | null>('ff-legislation-last-visit', null));
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const latest = updates.reduce((max, u) => (u.isoDate > max ? u.isoDate : max), '');
    writeStorage('ff-legislation-last-visit', latest);
  }, [updates]);

  // First-time visitors see the newest items flagged "New".
  const fresh = lastVisit
    ? updates.filter((u) => u.isoDate > lastVisit)
    : updates.filter((u) => u.status === 'new' || u.status === 'open-for-comment');

  return { fresh: dismissed ? [] : fresh, dismiss: () => setDismissed(true), isFirstVisit: !lastVisit };
}

/* ------------------------------------------------------------------ */
/* SEO: title, meta description, canonical, JSON-LD                    */
/* ------------------------------------------------------------------ */

const DEFAULT_TITLE = 'foodfocus — The Right Way | South African Food Industry Compliance';
const DEFAULT_DESCRIPTION =
  'South African B2B digital media and information platform for the food industry, focused on food compliance from farm to fork.';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export function useSeo(opts: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  jsonLd?: object[];
}) {
  const { title, description, keywords, path, jsonLd } = opts;
  const jsonKey = JSON.stringify(jsonLd ?? []);
  const keywordsKey = (keywords ?? []).join(', ');
  const hasJsonLd = (jsonLd?.length ?? 0) > 0;

  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    if (keywordsKey) setMeta('name', 'keywords', keywordsKey);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (path) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `${window.location.origin}${path}`;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    script.textContent = jsonKey;
    if (hasJsonLd) document.head.appendChild(script);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('name', 'description', DEFAULT_DESCRIPTION);
      setMeta('property', 'og:title', DEFAULT_TITLE);
      setMeta('property', 'og:description', DEFAULT_DESCRIPTION);
      script.remove();
      canonical?.remove();
    };
  }, [title, description, keywordsKey, path, jsonKey, hasJsonLd]);
}

/* ------------------------------------------------------------------ */
/* Downloads                                                           */
/* ------------------------------------------------------------------ */

const triggerDownload = (filename: string, content: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** Plain-text compliance brief for one update. */
export const buildBriefText = (u: LegislationUpdate) =>
  [
    `FOOD FOCUS LEGISLATION BRIEF`,
    `${u.title}`,
    ``,
    `Reference: ${u.gazetteRef}`,
    `Authority: ${u.authority}`,
    `Published: ${u.date}`,
    `Status: ${STATUS_META[u.status].label}`,
    u.commentDeadline ? `Comment deadline: ${formatIsoDate(u.commentDeadline)}` : '',
    ``,
    `KEY POINTS`,
    ...u.keyPoints.map((p) => `- ${p}`),
    ``,
    `SUMMARY`,
    ...u.fullBrief,
    ``,
    `WHO IS AFFECTED`,
    ...u.whoIsAffected.map((p) => `- ${p}`),
    ``,
    `OFFICIAL SOURCES`,
    ...u.references.map((r) => `- ${r.label}: ${r.url}`),
    ``,
    `This summary is for guidance only. Always refer to the official Government Gazette text.`,
    `Source: foodfocus.co.za`,
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n');

export const downloadBrief = (u: LegislationUpdate) =>
  triggerDownload(`foodfocus-${u.id}.txt`, buildBriefText(u), 'text/plain;charset=utf-8');

export const downloadDocument = (u: LegislationUpdate, doc: LegislationDocument) => {
  if (doc.url) {
    window.open(doc.url, '_blank', 'noopener,noreferrer');
    return;
  }
  downloadBrief(u);
};

export const downloadLibraryCsv = (updates: LegislationUpdate[]) => {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = [
    ['Title', 'Reference', 'Type', 'Topic', 'Status', 'Published', 'Comment deadline', 'Authority'],
    ...updates.map((u) => [
      u.title,
      u.gazetteRef,
      u.regulationType,
      u.topic,
      STATUS_META[u.status].label,
      u.isoDate,
      u.commentDeadline ?? '',
      u.authority,
    ]),
  ];
  triggerDownload(
    'foodfocus-legislation-library.csv',
    rows.map((r) => r.map(esc).join(',')).join('\n'),
    'text/csv;charset=utf-8'
  );
};
