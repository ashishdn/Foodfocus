import React from 'react';

interface SectionHeadingProps {
  title: string;
  variant?: 'light' | 'dark' | 'page';
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  variant = 'light',
  actionLabel,
  onAction,
}) => {
  const isDark = variant === 'dark';
  const isPage = variant === 'page';

  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3">
        <h2
          className={`font-bold uppercase tracking-[0.04em] ${
            isPage
              ? 'text-[22px] sm:text-[26px] text-[#1C1C1C]'
              : isDark
              ? 'text-[15px] sm:text-[16px] text-white'
              : 'text-[15px] sm:text-[16px] text-[#1C1C1C]'
          }`}
        >
          {title}
        </h2>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={`px-4 py-1.5 text-[12px] font-semibold rounded-full border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isDark
                ? 'border-white/70 text-white hover:bg-white hover:text-[#1C1C1C]'
                : 'border-[#333333]/60 text-[#333333] hover:border-[#9BC53D] hover:bg-[#9BC53D] hover:text-white'
            }`}
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="relative h-[3px] w-full">
        <div
          className={`absolute inset-x-0 bottom-0 h-px ${
            isDark ? 'bg-white/25' : 'bg-[#DCDCDC]'
          }`}
        />
        <div className="relative h-[3px] w-10 bg-[#9BC53D]" />
      </div>
    </div>
  );
};
