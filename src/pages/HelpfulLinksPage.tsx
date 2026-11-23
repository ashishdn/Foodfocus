import React, { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Globe, Search } from 'lucide-react';
import { LEGISLATION_CATEGORIES } from '../data/foodfocusData';
import { COMPLIANCE_TOPICS, HELPFUL_LINKS, LEGISLATION_UPDATES } from '../data/legislationData';
import { useSeo } from '../lib/legislation';
import { ComplianceTopic, PageId } from '../types';

interface HelpfulLinksPageProps {
  onNavigate: (page: PageId, filter?: string) => void;
}

export const HelpfulLinksPage: React.FC<HelpfulLinksPageProps> = ({ onNavigate }) => {
  const [topic, setTopic] = useState<ComplianceTopic | 'all'>('all');
  const [query, setQuery] = useState('');

  useSeo({
    title: 'Helpful Links — SA Food Regulators & Resources | Food Focus',
    description:
      'Official South African food safety, food quality, public health and regulatory resources: Department of Health, NCC, NRCS, NICD, DALRRD, Codex and more.',
    keywords: ['food regulators South Africa', 'food safety resources', 'Department of Health food control', 'NRCS', 'NICD'],
    path: '/helpful-links',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELPFUL_LINKS.filter(
      (l) =>
        (topic === 'all' || l.topic === topic) &&
        (!q || `${l.title} ${l.organisation} ${l.description}`.toLowerCase().includes(q))
    );
  }, [topic, query]);

  const grouped = COMPLIANCE_TOPICS.map((t) => ({
    ...t,
    links: filtered.filter((l) => l.topic === t.id),
  })).filter((g) => g.links.length > 0);

  return (
    <div className="bg-[#F7F6F1]">
      <section className="bg-[#0F1F17] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/55 mb-5">
            <ol className="flex items-center gap-1.5">
              <li><button type="button" onClick={() => onNavigate('home')} className="hover:text-[#9BC53D] cursor-pointer">Home</button></li>
              <li aria-hidden="true">/</li>
              <li><button type="button" onClick={() => onNavigate('legislation')} className="hover:text-[#9BC53D] cursor-pointer">Legislation</button></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90 font-semibold" aria-current="page">Helpful links</li>
            </ol>
          </nav>
          <div className="max-w-[760px]">
            <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#9BC53D] mb-3">
              <Globe className="w-4 h-4" /> Resources
            </span>
            <h1 className="text-[30px] sm:text-[40px] font-bold leading-[1.1]">Helpful links</h1>
            <p className="mt-4 text-[15.5px] sm:text-[17px] text-white/75 leading-[1.6]">
              Official regulators, standards bodies and industry resources for South African food
              compliance — organised by food safety, food quality, public health and regulatory area.
            </p>
            <div className="mt-6 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8A948D]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search organisations and resources"
                aria-label="Search helpful links"
                className="w-full bg-white text-[#0F1F17] text-[15px] pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#9BC53D]/50"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Compliance area">
          {(['all', ...COMPLIANCE_TOPICS.map((t) => t.id)] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={topic === t}
              onClick={() => setTopic(t)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-bold border transition-colors cursor-pointer ${
                topic === t ? 'bg-[#0F1F17] border-[#0F1F17] text-white' : 'bg-white border-[#CFCCBE] text-[#0F1F17] hover:border-[#9BC53D]'
              }`}
            >
              {t === 'all' ? 'All areas' : t}
            </button>
          ))}
        </div>

        {grouped.length === 0 && (
          <p className="text-[15px] text-[#5B675F] py-10 text-center">No resources match your search.</p>
        )}

        <div className="space-y-12">
          {grouped.map((g) => (
            <section key={g.id} aria-labelledby={`topic-${g.id}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
                <div>
                  <h2 id={`topic-${g.id}`} className="text-[22px] font-bold text-[#0F1F17]">{g.id}</h2>
                  <p className="text-[14px] text-[#5B675F] mt-1">{g.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('legislation')}
                  className="text-[13px] font-bold text-[#4F7A0F] hover:text-black inline-flex items-center gap-1 cursor-pointer"
                >
                  {LEGISLATION_UPDATES.filter((u) => u.topic === g.id).length} related legislation updates
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {g.links.map((l) => (
                  <div key={l.id} className="bg-white border border-[#E3E1D6] rounded-xl p-5 flex flex-col hover:border-[#9BC53D] transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#4F7A0F]">{l.organisation}</span>
                    <h3 className="text-[16px] font-bold text-[#0F1F17] mt-1">{l.title}</h3>
                    <p className="text-[13.5px] text-[#5B675F] leading-[1.6] mt-1.5 mb-4">{l.description}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E3E1D6]">
                      <div className="flex flex-wrap gap-1.5">
                        {l.relatedCategoryIds.slice(0, 2).map((cid) => {
                          const c = LEGISLATION_CATEGORIES.find((x) => x.id === cid);
                          return c ? (
                            <button
                              key={cid}
                              type="button"
                              onClick={() => onNavigate('legislation', cid)}
                              className="text-[11.5px] font-semibold text-[#3F4A43] bg-[#F7F6F1] hover:bg-[#EAF5D3] rounded-full px-2 py-0.5 cursor-pointer"
                            >
                              {c.actCode}
                            </button>
                          ) : null;
                        })}
                      </div>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0F1F17] hover:text-[#4F7A0F]"
                      >
                        Visit site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
