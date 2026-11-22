import React from 'react';
import { Play } from 'lucide-react';
import { WebinarItem } from '../types';
import { SafeImage } from './SafeImage';

interface WebinarThumbnailProps {
  webinar: WebinarItem;
  mode?: 'homepage' | 'library';
  onClick: () => void;
}

export const WebinarThumbnail: React.FC<WebinarThumbnailProps> = ({
  webinar,
  mode = 'library',
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left block rounded-[2px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.18)] group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9BC53D]"
    >
      {/* Red title strip */}
      <div className="bg-[#C82027] text-white px-3.5 py-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.06em] truncate">
          {webinar.shortBannerTitle}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 shrink-0">
          {webinar.duration}
        </span>
      </div>

      {/* Blue background recording visual with subtle food-industry photo */}
      <div className="relative aspect-[16/9] bg-[#0F3D6E] overflow-hidden">
        <SafeImage
          src={webinar.image}
          alt={webinar.imageAlt}
          className="w-full h-full object-cover opacity-35 mix-blend-luminosity group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0B2D52]/95 via-[#154A8A]/80 to-[#1B5EA8]/70" />

        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9BC53D]">
              {webinar.partner}
            </span>
            <span className="text-[11px] text-white/75 font-medium">{webinar.date}</span>
          </div>

          <div className="flex items-center gap-3.5 my-auto">
            <div className="w-12 h-12 rounded-full bg-[#9BC53D] group-hover:bg-white text-[#111111] flex items-center justify-center shrink-0 shadow-md transition-colors">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <div className="inline-block bg-[#C82027] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] px-2.5 py-1 rounded-[2px] mb-1.5">
                WATCH THIS RECORDING
              </div>
              <div className="text-white font-bold text-[14px] sm:text-[15px] leading-snug line-clamp-2">
                {webinar.title}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/80 font-medium truncate">
            {mode === 'homepage' ? 'On-Demand Food Compliance Session' : webinar.presenter}
          </div>
        </div>
      </div>
    </button>
  );
};
