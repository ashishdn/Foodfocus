import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  /** small uppercase label above the title */
  eyebrow?: string;
  description?: string;
  variant?: 'light' | 'dark' | 'page';
  actionLabel?: string;
  onAction?: () => void;
}

/** Converts legacy ALL-CAPS headings ("LATEST ARTICLES") into sentence case. */
const toSentence = (t: string) => (t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t);

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  description,
  variant = 'light',
  actionLabel,
  onAction,
}) => {
  const isDark = variant === 'dark';
  const isPage = variant === 'page';

  return (
    <div className="mb-8 sm:mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="min-w-0">
        {eyebrow && <span className={`ff-eyebrow ${isDark ? 'ff-eyebrow-light' : ''}`}>{eyebrow}</span>}
        <h2
          className={`font-display font-medium tracking-[-0.02em] leading-[1.1] ${eyebrow ? 'mt-3' : ''} ${
            isPage ? 'text-[34px] sm:text-[44px]' : 'text-[30px] sm:text-[40px]'
          } ${isDark ? 'text-white' : 'text-text'}`}
        >
          {toSentence(title)}
        </h2>
        {description && (
          <p className={`mt-3 max-w-[56ch] ${isDark ? 'text-white/60' : 'text-muted'}`}>{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={`inline-flex items-center gap-1.5 font-semibold text-[15px] cursor-pointer group ${
            isDark ? 'text-lime' : 'text-text hover:text-lime-deep'
          }`}
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
};
