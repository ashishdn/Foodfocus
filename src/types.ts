export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'advertise'
  | 'contact'
  | 'legislation'
  | 'webinars'
  | 'articles'
  | 'news'
  | 'events'
  | 'training'
  | 'directory'
  | 'legislation-detail'
  | 'helpful-links';

export interface EditorialArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  fullText: string[];
  section: 'articles' | 'supplier-news' | 'industry-news';
}

export interface WebinarItem {
  id: string;
  title: string;
  shortBannerTitle: string;
  partner: string;
  date: string;
  duration: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  presenter: string;
  keyTakeaways: string[];
}

export interface SupplierListing {
  id: string;
  name: string;
  shortMark: string;
  tagline: string;
  category: 'Food Testing Laboratories' | 'Certification Bodies' | 'Instruments & Calibration' | 'Packaging & Hygiene';
  location: string;
  accreditation: string;
  description: string;
  accentColor: string;
}

export interface LegislationCategory {
  id: string;
  title: string;
  actCode: string;
  summary: string;
}

export type LegislationStatus = 'new' | 'updated' | 'open-for-comment' | 'in-force';

export type RegulationType = 'Act' | 'Regulation' | 'Draft Regulation' | 'Notice' | 'Directive';

export type ComplianceTopic = 'Food Safety' | 'Food Quality' | 'Public Health' | 'Regulatory';

export interface ReferenceLink {
  label: string;
  url: string;
  source: string;
}

export interface LegislationDocument {
  id: string;
  title: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
  sizeKb: number;
  pages?: number;
  /** Official document URL. When absent, a Food Focus summary is generated on download. */
  url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegislationUpdate {
  id: string;
  categoryId: string;
  title: string;
  /** Short SEO title (about 60 characters). */
  seoTitle: string;
  /** SEO meta description (about 155 characters). */
  metaDescription: string;
  keywords: string[];
  date: string;
  /** ISO date (YYYY-MM-DD) used for sorting and date filters. */
  isoDate: string;
  tag: string;
  gazetteRef: string;
  status: LegislationStatus;
  regulationType: RegulationType;
  topic: ComplianceTopic;
  /** Highlighted as an important regulatory update. */
  important?: boolean;
  /** ISO date by which public comments must be submitted. */
  commentDeadline?: string;
  authority: string;
  excerpt: string;
  keyPoints: string[];
  fullBrief: string[];
  whoIsAffected: string[];
  relatedLegislationIds: string[];
  relatedArticleIds: string[];
  references: ReferenceLink[];
  documents: LegislationDocument[];
  faqs: FaqItem[];
}

export interface HelpfulLink {
  id: string;
  title: string;
  organisation: string;
  description: string;
  url: string;
  topic: ComplianceTopic;
  relatedCategoryIds: string[];
}

export interface IndustryEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  format: string;
  summary: string;
}
