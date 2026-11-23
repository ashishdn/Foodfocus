import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Play, Scale, X } from 'lucide-react';
import { LEGISLATION_UPDATES } from '../data/legislationData';
import {
  EditorialArticle,
  LegislationUpdate,
  SupplierListing,
  WebinarItem,
} from '../types';
import { SafeImage } from './SafeImage';

export type ModalState =
  | { type: 'article'; data: EditorialArticle }
  | { type: 'webinar'; data: WebinarItem }
  | { type: 'legislation'; data: LegislationUpdate }
  | { type: 'supplier'; data: SupplierListing }
  | { type: 'sponsor'; title: string; context: string }
  | { type: 'social'; network: string }
  | { type: 'legal'; doc: 'privacy' | 'terms' }
  | null;

interface EditorialModalProps {
  modal: ModalState;
  onClose: () => void;
  onContactNavigate: () => void;
  onOpenLegislation: (id: string) => void;
}

export const EditorialModal: React.FC<EditorialModalProps> = ({
  modal,
  onClose,
  onContactNavigate,
  onOpenLegislation,
}) => {
  useEffect(() => {
    if (!modal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[740px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-[#E3E1D6] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-[#0F1F17] text-white px-5 py-3.5 flex items-center justify-between border-b-[3px] border-[#9BC53D]">
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#9BC53D]">
            {modal.type === 'article' && modal.data.category}
            {modal.type === 'webinar' && `Recorded Webinar · ${modal.data.partner}`}
            {modal.type === 'legislation' && `Legislation Brief · ${modal.data.gazetteRef}`}
            {modal.type === 'supplier' && `Supplier Directory · ${modal.data.category}`}
            {modal.type === 'sponsor' && 'Partner Feature'}
            {modal.type === 'social' && `foodfocus on ${modal.network}`}
            {modal.type === 'legal' &&
              (modal.doc === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-white/80 hover:text-[#9BC53D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-[#18221C]">
          {modal.type === 'article' && (
            <>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#F7F6F1]">
                <SafeImage
                  src={modal.data.image}
                  alt={modal.data.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[12.5px] text-[#8A948D]">
                {modal.data.date} · {modal.data.author} · {modal.data.readTime}
              </div>
              <h2 className="text-[22px] font-bold text-[#0F1F17] leading-snug">
                {modal.data.title}
              </h2>
              <div className="space-y-3 text-[15px] leading-[1.7]">
                {modal.data.fullText.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <RelatedLegislation articleId={modal.data.id} onOpen={onOpenLegislation} />
            </>
          )}

          {modal.type === 'webinar' && (
            <>
              <div className="bg-[#0F3D6E] text-white rounded-lg overflow-hidden border border-[#1E3A8A]">
                <div className="bg-[#C82027] px-4 py-2 text-[11.5px] font-extrabold uppercase tracking-wider">
                  ON-DEMAND RECORDING · {modal.data.duration}
                </div>
                <div className="p-8 flex flex-col items-center justify-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-[#9BC53D] text-[#0F1F17] flex items-center justify-center mb-3 shadow-lg">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </div>
                  <div className="text-[17px] font-bold max-w-lg">{modal.data.title}</div>
                  <div className="text-[13px] text-white/80 mt-1.5">
                    Presenter: {modal.data.presenter}
                  </div>
                </div>
              </div>
              <div className="text-[12.5px] text-[#8A948D]">
                Recorded: {modal.data.date} · Hosted by {modal.data.partner}
              </div>
              <p className="text-[15px] leading-[1.65]">{modal.data.excerpt}</p>
              <div className="bg-[#F7F6F1] border border-[#E3E1D6] p-4 rounded-lg">
                <h3 className="text-[13.5px] font-bold uppercase tracking-wider text-[#0F1F17] mb-2.5">
                  Session Key Takeaways
                </h3>
                <ul className="space-y-2 text-[14px]">
                  {modal.data.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#9BC53D] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {modal.type === 'legislation' && (
            <>
              <div className="text-[12.5px] text-[#8A948D]">
                <span className="font-bold uppercase text-[#4F7A0F]">{modal.data.tag}</span> ·{' '}
                {modal.data.date} · {modal.data.gazetteRef}
              </div>
              <h2 className="text-[21px] font-bold text-[#0F1F17] leading-snug">
                {modal.data.title}
              </h2>
              <div className="space-y-3 text-[15px] leading-[1.7]">
                {modal.data.fullBrief.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onOpenLegislation(modal.data.id)}
                className="inline-flex items-center gap-2 bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-semibold text-[14px] px-5 py-2.5 rounded-full cursor-pointer"
              >
                Read full brief <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {modal.type === 'supplier' && (
            <>
              <div className="flex items-center justify-between gap-4 border-b border-[#E3E1D6] pb-4">
                <div>
                  <h2 className="text-[22px] font-bold text-[#0F1F17]">{modal.data.name}</h2>
                  <div className="text-[13px] text-[#4F7A0F] font-semibold mt-0.5">
                    {modal.data.accreditation} · {modal.data.location}
                  </div>
                </div>
                <span
                  className="text-[18px] font-extrabold px-3 py-1.5 rounded-lg"
                  style={{
                    color: modal.data.accentColor,
                    backgroundColor: `${modal.data.accentColor}14`,
                  }}
                >
                  {modal.data.shortMark}
                </span>
              </div>
              <p className="text-[15px] font-semibold text-[#0F1F17]">{modal.data.tagline}</p>
              <p className="text-[15px] leading-[1.7]">{modal.data.description}</p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactNavigate();
                  }}
                  className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-semibold text-[14px] px-5 py-2.5 rounded-full cursor-pointer"
                >
                  Connect with Supplier via Food Focus
                </button>
              </div>
            </>
          )}

          {modal.type === 'sponsor' && (
            <>
              <h2 className="text-[21px] font-bold text-[#0F1F17]">{modal.title}</h2>
              <p className="text-[15px] leading-[1.7]">{modal.context}</p>
              <div className="bg-[#F7F6F1] border border-[#E3E1D6] p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[13.5px] text-[#3F4A43]">
                  Interested in connecting with this solution provider?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactNavigate();
                  }}
                  className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-bold text-[12.5px] uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  Enquire Now
                </button>
              </div>
            </>
          )}

          {modal.type === 'social' && (
            <>
              <h2 className="text-[20px] font-bold text-[#0F1F17]">
                Follow foodfocus on {modal.network}
              </h2>
              <p className="text-[15px] leading-[1.65]">
                Join <strong>32,000+</strong> South African food safety, quality assurance, and
                regulatory professionals following Food Focus updates on {modal.network} for daily
                R638, R3337, FSSC 22000, and webinar alerts.
              </p>
            </>
          )}

          {modal.type === 'legal' && (
            <>
              <h2 className="text-[20px] font-bold text-[#0F1F17]">
                {modal.doc === 'privacy' ? 'POPIA & Privacy Policy' : 'Terms & Conditions'}
              </h2>
              <p className="text-[14.5px] leading-[1.7]">
                {modal.doc === 'privacy'
                  ? 'Food Risk Forum Pty Ltd respects your privacy in accordance with South Africa’s Protection of Personal Information Act (POPIA, Act 4 of 2013). Subscriber and webinar registration details are used strictly to deliver food compliance updates and requested sector resources.'
                  : 'All editorial articles, regulatory summaries, and webinar recordings published on foodfocus.co.za are intended for industry compliance guidance and educational purposes. Food Risk Forum Pty Ltd makes every effort to reflect current South African legislation.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/** Internal linking: legislation updates that reference this article. */
const RelatedLegislation: React.FC<{ articleId: string; onOpen: (id: string) => void }> = ({
  articleId,
  onOpen,
}) => {
  const related = LEGISLATION_UPDATES.filter((u) => u.relatedArticleIds.includes(articleId)).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div className="mt-2 border-t border-[#E3E1D6] pt-4">
      <h3 className="text-[12.5px] font-bold uppercase tracking-wider text-[#183025] mb-2.5 inline-flex items-center gap-1.5">
        <Scale className="w-4 h-4 text-[#4F7A0F]" /> Related legislation
      </h3>
      <ul className="space-y-2">
        {related.map((u) => (
          <li key={u.id}>
            <button
              type="button"
              onClick={() => onOpen(u.id)}
              className="group w-full text-left flex items-start justify-between gap-3 border border-[#E3E1D6] hover:border-[#9BC53D] rounded-lg px-3.5 py-2.5 cursor-pointer"
            >
              <span>
                <span className="block text-[14px] font-semibold text-[#0F1F17] group-hover:text-[#4F7A0F] leading-snug">{u.title}</span>
                <span className="block text-[12px] text-[#8A948D] mt-0.5">{u.gazetteRef}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#8A948D] shrink-0 mt-0.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
