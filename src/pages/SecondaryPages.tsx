import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { InnerPageLayout } from '../components/InnerPageLayout';
import { SafeImage } from '../components/SafeImage';
import {
  INDUSTRY_EVENTS,
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  SUPPLIER_DIRECTORY,
  SUPPLIER_NEWS_ITEMS,
} from '../data/foodfocusData';
import { EditorialArticle, SupplierListing } from '../types';

interface SecondaryPageProps {
  subFilter?: string;
  onOpenArticle: (article: EditorialArticle) => void;
  onOpenSupplier: (supplier: SupplierListing) => void;
  onSponsorClick: (title: string, context: string) => void;
}

export const ContactPage: React.FC<{ onSponsorClick: (t: string, c: string) => void }> = ({
  onSponsorClick,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Editorial / Regulatory Query');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSent(true);
    }
  };

  return (
    <InnerPageLayout pageTitle="CONTACT US" onSponsorClick={onSponsorClick}>
      <div className="space-y-6 text-[15px] text-[#18221C] leading-[1.65]">
        <p>
          Get in touch with <strong>Food Risk Forum Pty Ltd</strong> regarding editorial
          submissions, regulatory topic requests, webinar partnerships, or Supplier Directory
          listings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F6F1] border border-[#E3E1D6] p-5 rounded-lg">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#8A948D]">
              Editorial &amp; Compliance Desk
            </div>
            <div className="font-bold text-[#0F1F17] mt-1">info@foodfocus.co.za</div>
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#8A948D]">
              Publisher
            </div>
            <div className="font-bold text-[#0F1F17] mt-1">
              Food Risk Forum Pty Ltd · Johannesburg, South Africa
            </div>
          </div>
        </div>

        {sent ? (
          <div className="border border-[#9BC53D] bg-[#F9FCF2] p-5 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#84AC2D] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#0F1F17]">Message sent to Food Focus</div>
              <p className="text-[13.5px] text-[#3F4A43] mt-1">
                Thank you, {name}. Our team will respond to {email} regarding &ldquo;{subject}
                &rdquo;.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#0F1F17] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#CFCCBE] px-3.5 py-2.5 text-[14px] rounded-lg focus:outline-2 focus:outline-[#9BC53D]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0F1F17] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#CFCCBE] px-3.5 py-2.5 text-[14px] rounded-lg focus:outline-2 focus:outline-[#9BC53D]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0F1F17] mb-1">Enquiry Type</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-[#CFCCBE] px-3.5 py-2.5 text-[14px] rounded-lg bg-white focus:outline-2 focus:outline-[#9BC53D]"
              >
                <option>Editorial / Regulatory Query</option>
                <option>Advertising &amp; Sponsored Webinars</option>
                <option>Supplier Directory Listing</option>
                <option>General Feedback</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0F1F17] mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-[#CFCCBE] px-3.5 py-2.5 text-[14px] rounded-lg focus:outline-2 focus:outline-[#9BC53D]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-extrabold text-[13px] uppercase tracking-wider px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </InnerPageLayout>
  );
};

export const ArticlesArchivePage: React.FC<
  SecondaryPageProps & { mode: 'articles' | 'news' }
> = ({ mode, subFilter, onOpenArticle, onSponsorClick }) => {
  const allItems =
    mode === 'articles'
      ? [...LATEST_ARTICLES, ...INDUSTRY_NEWS_ITEMS]
      : subFilter === 'supplier'
      ? SUPPLIER_NEWS_ITEMS
      : subFilter === 'industry'
      ? INDUSTRY_NEWS_ITEMS
      : [...INDUSTRY_NEWS_ITEMS, ...SUPPLIER_NEWS_ITEMS];

  const items =
    subFilter &&
    subFilter !== 'all' &&
    subFilter !== 'supplier' &&
    subFilter !== 'industry'
      ? allItems.filter((a) => a.category === subFilter)
      : allItems;

  const title =
    mode === 'articles'
      ? 'ARTICLES'
      : subFilter === 'supplier'
      ? 'SUPPLIER NEWS'
      : 'INDUSTRY & SUPPLIER NEWS';

  return (
    <InnerPageLayout pageTitle={title} onSponsorClick={onSponsorClick}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="border border-[#E3E1D6] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
          >
            <button
              type="button"
              onClick={() => onOpenArticle(item)}
              className="aspect-[16/10] w-full overflow-hidden bg-[#F7F6F1] cursor-pointer"
            >
              <SafeImage
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-[11.5px] text-[#8A948D] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[#4F7A0F]">
                  {item.category}
                </span>{' '}
                · {item.date}
              </div>
              <h3 className="text-[15.5px] font-bold text-[#0F1F17] leading-snug mb-2">
                <button
                  type="button"
                  onClick={() => onOpenArticle(item)}
                  className="text-left underline decoration-[#0F1F17]/40 underline-offset-3 hover:text-[#84AC2D] cursor-pointer"
                >
                  {item.title}
                </button>
              </h3>
              <p className="text-[13.5px] text-[#18221C] leading-relaxed line-clamp-3 mb-3 flex-1">
                {item.excerpt}
              </p>
              <button
                type="button"
                onClick={() => onOpenArticle(item)}
                className="text-left text-[13px] font-bold text-[#0F1F17] hover:text-[#9BC53D] cursor-pointer"
              >
                Read More »
              </button>
            </div>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  );
};

export const DirectoryPage: React.FC<{
  subFilter?: string;
  onOpenSupplier: (supplier: SupplierListing) => void;
  onSponsorClick: (title: string, context: string) => void;
}> = ({ subFilter, onOpenSupplier, onSponsorClick }) => {
  const [cat, setCat] = useState(subFilter || 'all');
  const categories = [
    'all',
    'Food Testing Laboratories',
    'Certification Bodies',
    'Instruments & Calibration',
    'Packaging & Hygiene',
  ];

  const list =
    cat === 'all'
      ? SUPPLIER_DIRECTORY
      : SUPPLIER_DIRECTORY.filter((s) => s.category === cat);

  return (
    <InnerPageLayout pageTitle="SUPPLIER DIRECTORY" onSponsorClick={onSponsorClick}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 text-[12.5px] font-bold rounded-lg border transition-colors cursor-pointer ${
                cat === c
                  ? 'bg-[#0F1F17] text-[#9BC53D] border-[#0F1F17]'
                  : 'bg-[#F7F6F1] text-[#18221C] border-[#E3E1D6] hover:border-[#9BC53D]'
              }`}
            >
              {c === 'all' ? 'All Suppliers' : c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {list.map((supplier) => (
            <div
              key={supplier.id}
              className="border border-[#E3E1D6] bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className="text-[16px] font-extrabold tracking-tight px-2.5 py-1 rounded-lg"
                    style={{
                      color: supplier.accentColor,
                      backgroundColor: `${supplier.accentColor}14`,
                    }}
                  >
                    {supplier.shortMark}
                  </span>
                  <span className="text-[11.5px] font-medium text-[#8A948D]">
                    {supplier.location}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-[#0F1F17]">{supplier.name}</h3>
                <div className="text-[12px] font-semibold text-[#4F7A0F] mt-0.5 mb-2">
                  {supplier.category} · {supplier.accreditation}
                </div>
                <p className="text-[13.5px] text-[#3F4A43] leading-relaxed mb-4">
                  {supplier.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenSupplier(supplier)}
                className="self-start text-[13px] font-bold text-[#0F1F17] hover:text-[#9BC53D] cursor-pointer"
              >
                View Supplier Profile »
              </button>
            </div>
          ))}
        </div>
      </div>
    </InnerPageLayout>
  );
};

export const EventsAndTrainingPage: React.FC<{
  mode: 'events' | 'training';
  subFilter?: string;
  onSponsorClick: (title: string, context: string) => void;
}> = ({ mode, subFilter, onSponsorClick }) => {
  return (
    <InnerPageLayout
      pageTitle={mode === 'events' ? 'INDUSTRY EVENTS' : 'FOOD SAFETY TRAINING'}
      onSponsorClick={onSponsorClick}
    >
      {mode === 'events' ? (
        <div className="space-y-4">
          {INDUSTRY_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="border border-[#E3E1D6] bg-white p-5 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#4F7A0F] mb-1">
                {evt.format}
              </div>
              <h3 className="text-[17px] font-bold text-[#0F1F17] mb-2">{evt.title}</h3>
              <div className="flex flex-wrap gap-4 text-[13px] text-[#183025] mb-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#9BC53D]" />
                  {evt.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#9BC53D]" />
                  {evt.location}
                </span>
              </div>
              <p className="text-[14px] text-[#18221C] leading-relaxed">{evt.summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {subFilter && (
            <p className="text-[14px] font-semibold text-[#183025]">
              Selected Track: <span className="text-[#0F1F17]">{subFilter}</span>
            </p>
          )}
          {[
            {
              title: 'HACCP Implementation & FSSC 22000 Version 6 Transition',
              provider: 'Accredited SA Training Partners',
              detail: '3-day live or virtual practitioner course covering hazard analysis, PRP verification, and food safety culture.',
            },
            {
              title: 'R638 Food Handler & Supervisor Hygiene Compliance',
              provider: 'Environmental Health Training Hub',
              detail: 'Essential statutory training for food premises persons in charge, kitchen supervisors, and cold-chain staff.',
            },
            {
              title: 'Internal Food Safety Auditing Skills (ISO 19011)',
              provider: 'Certification Body Trainers',
              detail: 'Practical audit sampling, non-conformance reporting, and root-cause corrective action verification.',
            },
          ].map((course) => (
            <div
              key={course.title}
              className="border border-[#E3E1D6] bg-white p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider text-[#4F7A0F]">
                  {course.provider}
                </div>
                <h3 className="text-[16px] font-bold text-[#0F1F17] mt-0.5">{course.title}</h3>
                <p className="text-[13.5px] text-[#3F4A43] mt-1">{course.detail}</p>
              </div>
              <button
                type="button"
                onClick={() => onSponsorClick(course.title, course.detail)}
                className="bg-[#9BC53D] hover:bg-[#84AC2D] text-[#0F1F17] font-semibold text-[12px] px-4 py-2.5 rounded-full whitespace-nowrap cursor-pointer shrink-0"
              >
                Enquire
              </button>
            </div>
          ))}
        </div>
      )}
    </InnerPageLayout>
  );
};
