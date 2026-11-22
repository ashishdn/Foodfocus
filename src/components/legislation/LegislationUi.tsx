import React, { useState } from 'react';
import {
  ArrowRight,
  Bell,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Mail,
} from 'lucide-react';
import { COMPLIANCE_TOPICS } from '../../data/legislationData';
import {
  STATUS_META,
  daysUntil,
  formatIsoDate,
  useAlertSubscription,
} from '../../lib/legislation';
import { FaqItem, LegislationStatus, LegislationUpdate } from '../../types';

/* ------------------------------------------------------------------ */

export const StatusBadge: React.FC<{ status: LegislationStatus; size?: 'sm' | 'md' }> = ({
  status,
  size = 'sm',
}) => {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-bold uppercase tracking-[0.06em] whitespace-nowrap ${
        size === 'sm' ? 'text-[10.5px] px-2 py-0.5' : 'text-[11.5px] px-2.5 py-1'
      } ${meta.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
      {meta.label}
    </span>
  );
};

/* ------------------------------------------------------------------ */

export const BookmarkButton: React.FC<{
  saved: boolean;
  onToggle: () => void;
  variant?: 'icon' | 'full';
  tone?: 'light' | 'dark';
}> = ({ saved, onToggle, variant = 'icon', tone = 'light' }) => {
  const Icon = saved ? BookmarkCheck : Bookmark;
  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={saved}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[13px] font-bold border transition-colors cursor-pointer ${
          saved
            ? 'bg-[#9BC53D] border-[#9BC53D] text-[#111111]'
            : tone === 'dark'
            ? 'border-white/40 text-white hover:border-[#9BC53D] hover:text-[#9BC53D]'
            : 'border-[#CFCFCF] text-[#1C1C1C] hover:border-[#9BC53D]'
        }`}
      >
        <Icon className="w-4 h-4" />
        {saved ? 'Saved' : 'Save'}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved legislation' : 'Save legislation'}
      title={saved ? 'Saved' : 'Save for later'}
      className={`p-2 rounded-full transition-colors cursor-pointer shrink-0 ${
        saved ? 'text-[#6F9321] bg-[#EAF5D3]' : 'text-[#8A8A8A] hover:text-[#1C1C1C] hover:bg-[#F2F2F2]'
      }`}
    >
      <Icon className="w-[18px] h-[18px]" />
    </button>
  );
};

/* ------------------------------------------------------------------ */

export const CommentDeadline: React.FC<{ iso: string; compact?: boolean }> = ({ iso, compact }) => {
  const days = daysUntil(iso);
  const closed = days < 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold ${
        compact ? 'text-[12px]' : 'text-[13px]'
      } ${closed ? 'text-[#8A8A8A]' : days <= 14 ? 'text-[#B3261E]' : 'text-[#8A4B00]'}`}
    >
      <Clock className="w-3.5 h-3.5" />
      {closed
        ? `Comments closed ${formatIsoDate(iso)}`
        : `Comments close ${formatIsoDate(iso)}${days <= 60 ? ` · ${days} day${days === 1 ? '' : 's'} left` : ''}`}
    </span>
  );
};

/* ------------------------------------------------------------------ */

interface LegislationCardProps {
  item: LegislationUpdate;
  categoryLabel?: string;
  layout: 'grid' | 'list';
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
  highlightTerm?: string;
}

const Highlight: React.FC<{ text: string; term?: string }> = ({ text, term }) => {
  if (!term || term.length < 2) return <>{text}</>;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'ig'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark key={i} className="bg-[#9BC53D]/30 text-inherit rounded-[2px] px-0.5">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export const LegislationCard: React.FC<LegislationCardProps> = ({
  item,
  categoryLabel,
  layout,
  saved,
  onToggleSave,
  onOpen,
  highlightTerm,
}) => {
  const isList = layout === 'list';
  return (
    <article
      className={`group relative bg-white border border-[#E4E4E4] rounded-[6px] transition-all duration-200 hover:border-[#9BC53D] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] flex flex-col ${
        item.important ? 'ring-1 ring-[#9BC53D]/40' : ''
      }`}
    >
      {item.important && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-[#9BC53D] rounded-r" aria-hidden="true" />
      )}

      <div className={`flex flex-col flex-1 ${isList ? 'p-5 sm:p-6' : 'p-5'}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={item.status} />
            <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#5B6067] bg-[#F4F4F4] rounded-full px-2 py-0.5">
              {item.regulationType}
            </span>
            {item.important && (
              <span className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#111111] bg-[#9BC53D] rounded-full px-2 py-0.5">
                Important
              </span>
            )}
          </div>
          <BookmarkButton saved={saved} onToggle={onToggleSave} />
        </div>

        <h3 className={`font-bold text-[#1C1C1C] leading-snug mb-2 ${isList ? 'text-[18px]' : 'text-[16.5px]'}`}>
          <button
            type="button"
            onClick={onOpen}
            className="text-left hover:text-[#5E7F1A] transition-colors cursor-pointer after:absolute after:inset-0 after:content-['']"
          >
            <Highlight text={item.title} term={highlightTerm} />
          </button>
        </h3>

        <p className={`text-[14px] text-[#4A4A4A] leading-[1.6] mb-4 ${isList ? '' : 'line-clamp-3'}`}>
          <Highlight text={item.excerpt} term={highlightTerm} />
        </p>

        {item.commentDeadline && item.status === 'open-for-comment' && (
          <div className="mb-3">
            <CommentDeadline iso={item.commentDeadline} compact />
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-[#EFEFEF] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[12.5px] text-[#6B6B6B]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              <time dateTime={item.isoDate}>{item.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {item.gazetteRef}
            </span>
            {categoryLabel && isList && (
              <span className="text-[#6F9321] font-semibold">{categoryLabel}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 font-bold text-[#1C1C1C] group-hover:text-[#5E7F1A] transition-colors">
            Read brief <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

/* ------------------------------------------------------------------ */

export const SubscribeAlertsCard: React.FC<{ tone?: 'light' | 'dark'; defaultTopics?: string[] }> = ({
  tone = 'dark',
  defaultTopics,
}) => {
  const [subscription, setSubscription] = useAlertSubscription();
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState<string[]>(defaultTopics ?? COMPLIANCE_TOPICS.map((t) => t.id));
  const [frequency, setFrequency] = useState<'instant' | 'weekly' | 'monthly'>('instant');
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState('');
  const dark = tone === 'dark';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (topics.length === 0) {
      setError('Choose at least one topic.');
      return;
    }
    setError('');
    setSubscription({
      email: email.trim(),
      topics,
      frequency,
      newsletter,
      subscribedAt: new Date().toISOString(),
    });
  };

  const shell = dark
    ? 'bg-[#1C1C1C] text-white border-[#2C2C2C]'
    : 'bg-[#F7FAF0] text-[#1C1C1C] border-[#DCEBB8]';

  if (subscription) {
    return (
      <div className={`rounded-[6px] border p-5 ${shell}`}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-5 h-5 text-[#9BC53D]" />
          <h3 className="text-[15px] font-bold">You&rsquo;re subscribed</h3>
        </div>
        <p className={`text-[13px] leading-relaxed ${dark ? 'text-white/75' : 'text-[#4A4A4A]'}`}>
          Alerts go to <strong className={dark ? 'text-white' : 'text-[#1C1C1C]'}>{subscription.email}</strong>{' '}
          ({subscription.frequency}) for: {subscription.topics.join(', ')}.
          {subscription.newsletter && ' You will also receive the Food Focus newsletter.'}
        </p>
        <button
          type="button"
          onClick={() => setSubscription(null)}
          className={`mt-3 text-[12.5px] font-bold underline underline-offset-2 cursor-pointer ${
            dark ? 'text-[#9BC53D]' : 'text-[#5E7F1A]'
          }`}
        >
          Change preferences or unsubscribe
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`rounded-[6px] border p-5 ${shell}`} noValidate>
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="w-8 h-8 rounded-full bg-[#9BC53D] text-[#111111] flex items-center justify-center">
          <Bell className="w-4 h-4" />
        </span>
        <h3 className="text-[16px] font-bold leading-tight">Legislation alerts</h3>
      </div>
      <p className={`text-[13px] leading-relaxed mb-4 ${dark ? 'text-white/70' : 'text-[#555555]'}`}>
        Get an email when new regulations, amendments or comment periods are published.
      </p>

      <label className="block">
        <span className="sr-only">Email address</span>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.co.za"
            autoComplete="email"
            className="w-full bg-white text-[#1C1C1C] text-[14px] pl-9 pr-3 py-2.5 rounded-[3px] border border-[#D5D5D5] focus:outline-none focus:ring-2 focus:ring-[#9BC53D]"
          />
        </div>
      </label>

      <fieldset className="mt-4">
        <legend className={`text-[11.5px] font-bold uppercase tracking-[0.08em] mb-2 ${dark ? 'text-white/60' : 'text-[#5B6067]'}`}>
          Topics
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {COMPLIANCE_TOPICS.map((t) => {
            const on = topics.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => setTopics((prev) => (on ? prev.filter((x) => x !== t.id) : [...prev, t.id]))}
                className={`text-[12px] font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                  on
                    ? 'bg-[#9BC53D] border-[#9BC53D] text-[#111111]'
                    : dark
                    ? 'border-white/25 text-white/80 hover:border-white/60'
                    : 'border-[#CFCFCF] text-[#4A4A4A] hover:border-[#9BC53D]'
                }`}
              >
                {t.id}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-3 gap-1 p-1 rounded-[4px] bg-black/10">
        {(['instant', 'weekly', 'monthly'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFrequency(f)}
            aria-pressed={frequency === f}
            className={`text-[12px] font-bold capitalize py-1.5 rounded-[3px] transition-colors cursor-pointer ${
              frequency === f
                ? 'bg-white text-[#1C1C1C] shadow-sm'
                : dark
                ? 'text-white/70 hover:text-white'
                : 'text-[#555555] hover:text-[#1C1C1C]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <label className={`mt-3 flex items-start gap-2 text-[12.5px] cursor-pointer ${dark ? 'text-white/75' : 'text-[#4A4A4A]'}`}>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-0.5 accent-[#9BC53D]"
        />
        Also send me the Food Focus newsletter
      </label>

      {error && <p className="mt-3 text-[12.5px] font-semibold text-[#F28B82]" role="alert">{error}</p>}

      <button
        type="submit"
        className="mt-4 w-full bg-[#9BC53D] hover:bg-[#84AC2D] text-[#111111] font-bold text-[13px] uppercase tracking-[0.06em] py-2.5 rounded-[3px] transition-colors cursor-pointer"
      >
        Subscribe to alerts
      </button>
      <p className={`mt-2 text-[11px] ${dark ? 'text-white/45' : 'text-[#8A8A8A]'}`}>
        POPIA compliant. Unsubscribe any time.
      </p>
    </form>
  );
};

/* ------------------------------------------------------------------ */

export const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5] rounded-[6px] bg-white">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 text-[15px] font-bold text-[#1C1C1C] hover:text-[#5E7F1A] cursor-pointer"
              >
                {faq.question}
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#6F9321]' : 'text-[#8A8A8A]'}`}
                />
              </button>
            </h3>
            {isOpen && (
              <p className="px-5 pb-5 -mt-1 text-[14px] leading-[1.7] text-[#4A4A4A]">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const faqJsonLd = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});
