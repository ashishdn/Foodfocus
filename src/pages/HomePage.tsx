import React from 'react';
import {
  FoodStuffSidebarAd,
  HahnLawSidebarAd,
  InstrumentsSidebarAd,
} from '../components/AdBanners';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { SocialIconRow } from '../components/SocialIcons';
import { WebinarThumbnail } from '../components/WebinarThumbnail';
import {
  BRAND_ASSETS,
  INDUSTRY_NEWS_ITEMS,
  LATEST_ARTICLES,
  SUPPLIER_DIRECTORY,
  SUPPLIER_NEWS_ITEMS,
  WEBINAR_ITEMS,
} from '../data/foodfocusData';
import { EditorialArticle, PageId, SupplierListing, WebinarItem } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId, subFilter?: string) => void;
  onOpenArticle: (article: EditorialArticle) => void;
  onOpenWebinar: (webinar: WebinarItem) => void;
  onOpenSupplier: (supplier: SupplierListing) => void;
  onSocialClick: (network: string) => void;
  onSponsorClick: (title: string, context: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenWebinar,
  onOpenSupplier,
  onSocialClick,
  onSponsorClick,
}) => {
  const featuredWebinars = WEBINAR_ITEMS.slice(0, 2);

  return (
    <div>
      {/* 1. HERO: Full-width supermarket shopper photo with dark scrim */}
      <section className="relative w-full h-[320px] sm:h-[380px] lg:h-[430px] overflow-hidden bg-[#1C1C1C]">
        <SafeImage
          src={BRAND_ASSETS.heroImage}
          alt="Woman shopping in a South African supermarket aisle reading food packaging nutrition labels"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/65" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-[920px] w-full flex flex-col items-center text-center">
            <div className="w-48 sm:w-80 h-px bg-white/80 mb-5" />
            <p className="text-white/95 text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.26em] mb-2">
              PROVIDING GUIDANCE &amp; INFORMATION FOR
            </p>
            <h1 className="text-white font-extrabold text-[32px] sm:text-[48px] lg:text-[58px] leading-[1.08] tracking-[0.04em] uppercase">
              THE FOOD INDUSTRY
            </h1>
            <div className="w-48 sm:w-80 h-px bg-white/80 mt-5" />
          </div>
        </div>
      </section>

      {/* 2. "Connect with us on social" band (light grey) */}
      <section className="bg-[#E9E9E9] border-b border-[#DCDCDC]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <span className="text-[14px] sm:text-[15px] font-bold text-[#5B6067] tracking-tight">
            Connect with us on social
          </span>
          <SocialIconRow variant="lime-circle" onSelect={onSocialClick} />
        </div>
      </section>

      {/* 3. LATEST ARTICLES (White background, 3-col cards + 300px sidebar) */}
      <section className="bg-white py-11 sm:py-13">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:flex-1 min-w-0">
              <SectionHeading
                title="LATEST ARTICLES"
                actionLabel="Read more articles"
                onAction={() => onNavigate('articles')}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LATEST_ARTICLES.map((article) => (
                  <article key={article.id} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="block w-full aspect-[4/3] overflow-hidden rounded-[2px] bg-[#F2F2F2] mb-3.5 group cursor-pointer"
                    >
                      <SafeImage
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    <h3 className="text-[15px] font-bold text-[#1C1C1C] leading-[1.35] mb-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenArticle(article)}
                        className="text-left underline decoration-[#1C1C1C]/45 underline-offset-3 hover:text-[#84AC2D] hover:decoration-[#9BC53D] transition-colors cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h3>

                    <div className="text-[12px] text-[#8A8A8A] mb-2.5">{article.date}</div>

                    <p className="text-[13.5px] text-[#333333] leading-[1.58] line-clamp-3 mb-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div>
                      <button
                        type="button"
                        onClick={() => onOpenArticle(article)}
                        className="text-[13px] font-bold text-[#1C1C1C] hover:text-[#9BC53D] transition-colors cursor-pointer"
                      >
                        Read More »
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="w-full lg:w-[300px] shrink-0">
              <HahnLawSidebarAd onSponsorClick={onSponsorClick} />
            </aside>
          </div>
        </div>
      </section>

      {/* 4. LATEST WEBINARS (Slate grey background #5B6067, white text) */}
      <section className="bg-[#5B6067] text-white py-12 sm:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="LATEST WEBINARS"
            variant="dark"
            actionLabel="View more"
            onAction={() => onNavigate('webinars')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredWebinars.map((webinar) => (
              <article key={webinar.id} className="flex flex-col">
                <div className="mb-4">
                  <WebinarThumbnail
                    webinar={webinar}
                    mode="homepage"
                    onClick={() => onOpenWebinar(webinar)}
                  />
                </div>

                <h3 className="text-[17px] font-bold text-white leading-[1.35] mb-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenWebinar(webinar)}
                    className="text-left underline decoration-white/60 underline-offset-3 hover:text-[#9BC53D] hover:decoration-[#9BC53D] transition-colors cursor-pointer"
                  >
                    {webinar.title}
                  </button>
                </h3>

                <div className="text-[12.5px] text-white/70 mb-2.5">{webinar.date}</div>

                <p className="text-[14px] text-white/90 leading-[1.6] mb-3.5 flex-1">
                  {webinar.excerpt}
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => onOpenWebinar(webinar)}
                    className="text-[13.5px] font-bold text-[#9BC53D] hover:text-white transition-colors cursor-pointer"
                  >
                    Read More »
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUPPLIER NEWS (White background, 3 shadowed cards + FoodStuff SA sidebar) */}
      <section className="bg-white py-12 sm:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:flex-1 min-w-0">
              <SectionHeading
                title="SUPPLIER NEWS"
                actionLabel="All supplier news"
                onAction={() => onNavigate('news', 'supplier')}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SUPPLIER_NEWS_ITEMS.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-[2px] border border-[#EAEAEA] shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenArticle(item)}
                      className="block w-full aspect-[4/3] overflow-hidden bg-[#F2F2F2] group cursor-pointer"
                    >
                      <SafeImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[14.5px] font-bold text-[#1C1C1C] leading-[1.38] mb-2">
                        <button
                          type="button"
                          onClick={() => onOpenArticle(item)}
                          className="text-left underline decoration-[#1C1C1C]/45 underline-offset-3 hover:text-[#84AC2D] hover:decoration-[#9BC53D] transition-colors cursor-pointer"
                        >
                          {item.title}
                        </button>
                      </h3>

                      <p className="text-[13px] text-[#333333] leading-[1.55] line-clamp-3 mb-4 flex-1">
                        {item.excerpt}
                      </p>

                      <div className="pt-2 border-t border-[#F0F0F0] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenArticle(item)}
                          className="text-[12px] font-extrabold uppercase tracking-wider text-[#9BC53D] hover:text-[#1C1C1C] transition-colors cursor-pointer"
                        >
                          READ MORE »
                        </button>
                        <span className="text-[11.5px] text-[#8A8A8A]">{item.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="w-full lg:w-[300px] shrink-0">
              <FoodStuffSidebarAd onSponsorClick={onSponsorClick} />
            </aside>
          </div>
        </div>
      </section>

      {/* 6. FEATURED DIRECTORY LISTINGS (4x2 square white tiles with soft shadows) */}
      <section className="bg-[#FAFAFA] border-t border-[#EAEAEA] py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="FEATURED DIRECTORY LISTINGS"
            actionLabel="View full directory"
            onAction={() => onNavigate('directory')}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {SUPPLIER_DIRECTORY.map((supplier) => (
              <button
                key={supplier.id}
                type="button"
                onClick={() => onOpenSupplier(supplier)}
                className="bg-white rounded-[3px] border border-[#E8E8E8] shadow-[0_3px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] hover:border-[#9BC53D] transition-all p-5 aspect-[4/3] sm:aspect-square flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div
                  className="w-full py-2.5 px-3 rounded-[2px] mb-2.5 flex items-center justify-center"
                  style={{ backgroundColor: `${supplier.accentColor}12` }}
                >
                  <span
                    className="text-[17px] sm:text-[19px] font-extrabold tracking-tight leading-none"
                    style={{ color: supplier.accentColor }}
                  >
                    {supplier.shortMark}
                  </span>
                </div>
                <div className="text-[12.5px] font-bold text-[#1C1C1C] group-hover:text-[#84AC2D] transition-colors line-clamp-1">
                  {supplier.name}
                </div>
                <div className="text-[11px] text-[#8A8A8A] mt-1 line-clamp-1">
                  {supplier.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LATEST INDUSTRY NEWS (Light grey band #F2F2F2 + tall Instruments sidebar ad) */}
      <section className="bg-[#F2F2F2] border-t border-[#E2E2E2] py-12 sm:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            <div className="w-full lg:flex-1 min-w-0">
              <SectionHeading
                title="LATEST INDUSTRY NEWS"
                actionLabel="More industry news"
                onAction={() => onNavigate('news', 'industry')}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INDUSTRY_NEWS_ITEMS.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-[2px] border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenArticle(item)}
                      className="block w-full aspect-[4/3] overflow-hidden bg-[#E9E9E9] group cursor-pointer"
                    >
                      <SafeImage
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[14.5px] font-bold text-[#1C1C1C] leading-[1.38] mb-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenArticle(item)}
                          className="text-left underline decoration-[#1C1C1C]/45 underline-offset-3 hover:text-[#84AC2D] hover:decoration-[#9BC53D] transition-colors cursor-pointer"
                        >
                          {item.title}
                        </button>
                      </h3>

                      <div className="text-[12px] text-[#8A8A8A] mb-2">{item.date}</div>

                      <p className="text-[13px] text-[#333333] leading-[1.55] line-clamp-3 mb-3 flex-1">
                        {item.excerpt}
                      </p>

                      <div>
                        <button
                          type="button"
                          onClick={() => onOpenArticle(item)}
                          className="text-[12.5px] font-bold text-[#1C1C1C] hover:text-[#9BC53D] transition-colors cursor-pointer"
                        >
                          Read More »
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="w-full lg:w-[300px] shrink-0 flex">
              <div className="w-full flex flex-col">
                <InstrumentsSidebarAd onSponsorClick={onSponsorClick} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
