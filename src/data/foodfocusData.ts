import {
  EditorialArticle,
  IndustryEvent,
  LegislationCategory,
  SupplierListing,
  WebinarItem,
} from '../types';

export const BRAND_ASSETS = {
  logoPath: '/assets/aistudio/foodfocus-logo-e1699540098108_d4733b4e.png',
  heroImage: '/src/assets/images/hero_supermarket_aisle_1795360200720.jpg',
  labImage: '/src/assets/images/food_safety_lab_1795360201772.jpg',
  dairyImage: '/src/assets/images/dairy_processing_line_1795360200921.jpg',
  factoryImage: '/src/assets/images/food_factory_inspection_1795360200882.jpg',
  packhouseImage: '/src/assets/images/farm_to_fork_packhouse_1795360201605.jpg',
};

export const LEGISLATION_NAV_ITEMS = [
  { id: 'fcda', label: 'Foodstuffs, Cosmetics & Disinfectants Act' },
  { id: 'labelling', label: 'Labelling & Advertising (R146 / draft R3337)' },
  { id: 'r638', label: 'Hygiene Regulations (R638)' },
  { id: 'apsa', label: 'Agricultural Product Standards Act' },
  { id: 'meat', label: 'Meat Safety Act' },
  { id: 'cpa', label: 'Consumer Protection Act' },
  { id: 'updates', label: 'All Legislation Updates' },
];

export const LATEST_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-digital-food-safety',
    title: 'The top 10 advantages of digital food safety procedures',
    date: '14 August 2025',
    category: 'Food Safety & Quality',
    author: 'Adele Kroon · Food Focus Editorial',
    readTime: '6 min read',
    image: BRAND_ASSETS.labImage,
    imageAlt: 'Microbiologist logging food safety inspection records on a digital tablet in an analytical lab',
    excerpt:
      'Paper-based checklists are rapidly giving way to cloud-verified HACCP logs across South African manufacturing plants. Discover how digital traceability lowers audit risk and closes corrective action loops faster.',
    section: 'articles',
    fullText: [
      'Across South African food processing plants, packhouses, and commercial kitchens, paper clipboards are increasingly recognised as an operational bottleneck during GFSI-benchmarked audits such as FSSC 22000 and BRCGS.',
      'Digitising prerequisite programmes (PRPs), CCP temperature monitoring, and sanitation sign-offs delivers immediate audit readiness. Deviations trigger real-time alerts to quality assurance managers rather than remaining buried in binder archives until the end of the month.',
      'Key operational gains include automated time-stamped verification, zero illegible handwriting disputes, standardised multi-site reporting, photographic non-conformance evidence, and faster root-cause trending ahead of third-party certification audits.',
    ],
  },
  {
    id: 'art-foodborne-epidemic',
    title: 'Enough to Make You Sick: Foodborne Illness Epidemic in South Africa spotlights Need for Change',
    date: '06 August 2025',
    category: 'Public Health & Compliance',
    author: 'Dr. Thabo Mokoena · Guest Regulatory Specialist',
    readTime: '7 min read',
    image: BRAND_ASSETS.factoryImage,
    imageAlt: 'Quality assurance specialist inspecting sealed ready-to-eat meals along a food processing line',
    excerpt:
      'Recent outbreaks have placed renewed scrutiny on cold-chain integrity, informal retail compliance, and municipal environmental health enforcement under R638 across all nine provinces.',
    section: 'articles',
    fullText: [
      'Preventable foodborne illness events continue to underscore the critical responsibility shared by primary producers, cold-chain distributors, formal manufacturers, and informal food premises.',
      'Compliance with Regulation R638 governing general hygiene requirements for food premises and the transport of food requires more than holding a Certificate of Acceptability (CoA) on a wall. Active microbiological verification, validated supplier approval, and trained food handlers form the first line of consumer defence.',
      'Industry associations and Environmental Health Practitioners (EHPs) are calling for stronger cross-sector collaboration, clearer allergen and chemical control training, and accessible guidance for SMME food businesses.',
    ],
  },
  {
    id: 'art-govt-register',
    title: 'Government calls on businesses to register',
    date: '29 July 2025',
    category: 'Legislation & Governance',
    author: 'Food Focus Regulatory Desk',
    readTime: '4 min read',
    image: BRAND_ASSETS.packhouseImage,
    imageAlt: 'Quality inspector verifying produce crate labelling and cold-chain temperature in a packhouse',
    excerpt:
      'National and provincial authorities have issued an urgent directive reminding food handlers, spaza operators, and food premises owners to complete statutory registration and CoA compliance.',
    section: 'articles',
    fullText: [
      'Following coordinated inter-departmental inspections across Gauteng, Western Cape, and KwaZulu-Natal, municipalities have reiterated that all premises handling, preparing, or storing food for public sale must hold a valid Certificate of Acceptability under R638.',
      'Business owners must submit updated site layouts, pest control service agreements, potable water test certificates, and proof of food safety training for persons in charge.',
      'Food Focus has compiled a practical checklist covering municipal registration steps, required documentation, and traceability expectations for food business operators.',
    ],
  },
];

export const SUPPLIER_NEWS_ITEMS: EditorialArticle[] = [
  {
    id: 'sup-microchem',
    title: 'SANAS-accredited rapid Listeria and Salmonella PCR turnaround cut to 24 hours',
    date: '11 August 2025',
    category: 'Testing Laboratories',
    author: 'MicroChem Lab Services',
    readTime: '3 min read',
    image: BRAND_ASSETS.labImage,
    imageAlt: 'Food microbiology technician analysing pathogen cultures in laboratory',
    excerpt:
      'High-throughput molecular screening now enables South African meat, dairy, and ready-to-eat processors to release cold-chain batches faster with full ISO/IEC 17025 accreditation.',
    section: 'supplier-news',
    fullText: [
      'Delays in microbiological clearance can immobilise chilled warehouse capacity and shorten shelf life at retail. By expanding automated nucleic acid extraction, accredited laboratories can deliver confirmed negative screening within 24 hours.',
      'Quality teams receive electronic Certificates of Analysis directly integrated into batch release workflows.',
    ],
  },
  {
    id: 'sup-hygiene-cip',
    title: 'Optimising Clean-in-Place (CIP) water and chemical usage in beverage plants',
    date: '04 August 2025',
    category: 'Sanitation & Hygiene',
    author: 'EnviroCare Industrial Hygiene',
    readTime: '4 min read',
    image: BRAND_ASSETS.dairyImage,
    imageAlt: 'Stainless steel CIP piping and sanitary milk tanks in a dairy facility',
    excerpt:
      'Inline conductivity sensors and low-temperature enzymatic detergents are helping local bottling and dairy operations reduce effluent load and steam consumption by up to 28%.',
    section: 'supplier-news',
    fullText: [
      'Rising municipal water tariffs and load-shedding contingency costs have prompted beverage and dairy engineers to re-evaluate legacy five-step CIP cycles.',
      'Validating turbulence, temperature, chemical concentration, and contact time via inline instrumentation protects biofilm control while conserving potable water.',
    ],
  },
  {
    id: 'sup-coldchain-packaging',
    title: 'Recyclable mono-material barrier trays gain ground in export fruit & meat lines',
    date: '25 July 2025',
    category: 'Packaging Compliance',
    author: 'Polyoak Food Packaging',
    readTime: '4 min read',
    image: BRAND_ASSETS.factoryImage,
    imageAlt: 'Sealed retail food packaging undergoing quality assurance checks on conveyor',
    excerpt:
      'Extended Producer Responsibility (EPR) targets are accelerating the shift toward mono-PP and rPET food-contact trays compliant with EU and UK retail migration limits.',
    section: 'supplier-news',
    fullText: [
      'South African exporters face dual compliance requirements: meeting local EPR recycling declarations while satisfying stringent food-contact migration rules in destination markets.',
      'New mono-material barrier structures maintain modified-atmosphere shelf life without multi-layer lamination.',
    ],
  },
];

export const INDUSTRY_NEWS_ITEMS: EditorialArticle[] = [
  {
    id: 'ind-fssc-v6',
    title: 'FSSC 22000 Version 6 transition audits highlight food fraud and culture metrics',
    date: '12 August 2025',
    category: 'Certification & Audits',
    author: 'Food Focus Audit Watch',
    readTime: '5 min read',
    image: BRAND_ASSETS.factoryImage,
    imageAlt: 'Auditor inspecting packaged products on a food manufacturing conveyor',
    excerpt:
      'Certification bodies report that documented food safety culture action plans and allergen management verification remain the top areas flagged during unannounced surveillance audits.',
    section: 'industry-news',
    fullText: [
      'Under FSSC 22000 Version 6, organisations must demonstrate measurable objectives across communication, training, employee feedback, and performance measurement for food safety and quality culture.',
      'Auditors are also probing equipment management specifications and food loss & waste reduction strategies.',
    ],
  },
  {
    id: 'ind-export-coldchain',
    title: 'Citrus and fresh produce packhouses strengthen phytosanitary & cold-chain logs',
    date: '05 August 2025',
    category: 'Export & Cold Chain',
    author: 'AgriCompliance Desk',
    readTime: '4 min read',
    image: BRAND_ASSETS.packhouseImage,
    imageAlt: 'Fresh produce cold-chain inspection inside an export packhouse',
    excerpt:
      'Continuous pulp-temperature telemetry from packhouse pre-cooling tunnels to port container terminals is reducing export rejections during peak winter shipping.',
    section: 'industry-news',
    fullText: [
      'Maintainable cold-chain evidence is indispensable when clearing phytosanitary checks at European and Middle Eastern ports.',
      'Packhouse QA teams are pairing wireless probe loggers with automated deviation escalation before pallets depart the farm gate.',
    ],
  },
  {
    id: 'ind-dairy-listeria',
    title: 'Dairy Standard Agency releases updated environmental swabbing guidance for cheese makers',
    date: '22 July 2025',
    category: 'Dairy Standards',
    author: 'Dairy Compliance Network',
    readTime: '5 min read',
    image: BRAND_ASSETS.dairyImage,
    imageAlt: 'Clean stainless steel dairy processing equipment and pasteuriser tanks',
    excerpt:
      'New zone-based environmental monitoring matrices help artisanal and commercial cheesemakers pinpoint moisture harborage sites in drains, cooling rooms, and brine tanks.',
    section: 'industry-news',
    fullText: [
      'Environmental monitoring programmes (EMPs) focused on Zones 1 through 4 provide early warning of Listeria spp. harborage long before finished product testing detects contamination.',
      'The updated guidance details swabbing frequencies, corrective sanitation teardowns, and vector swabbing protocols.',
    ],
  },
];

export const WEBINAR_ITEMS: WebinarItem[] = [
  {
    id: 'web-somatic-cell',
    title: 'Webinar | DSA – Practical solutions to high somatic cell count in dairy herds',
    shortBannerTitle: 'PRACTICAL SOLUTIONS TO HIGH SOMATIC CELL COUNT',
    partner: 'Dairy Standard Agency (DSA)',
    date: '07 August 2025',
    duration: '58 min',
    image: BRAND_ASSETS.dairyImage,
    imageAlt: 'Dairy facility processing tanks and sanitary stainless piping',
    excerpt:
      'Explore actionable herd health, parlour hygiene, and milking-machine calibration strategies with Dairy Standard Agency specialists to keep raw milk somatic cell counts well within statutory limits.',
    presenter: 'Dr. Japie van der Merwe & DSA Technical Team',
    keyTakeaways: [
      'Interpreting bulk-tank SCC trends and seasonal mastitis risk factors',
      'Teat-dipping protocols, dry-cow therapy, and milking cluster sanitisation',
      'Regulatory thresholds under R1555 relating to milk and dairy products',
    ],
  },
  {
    id: 'web-hygienic-design',
    title: 'Webinar | DSA – A practical approach to hygienic design of dairy equipment',
    shortBannerTitle: 'HYGIENIC DESIGN OF DAIRY EQUIPMENT',
    partner: 'Dairy Standard Agency (DSA)',
    date: '24 July 2025',
    duration: '64 min',
    image: BRAND_ASSETS.dairyImage,
    imageAlt: 'Hygienic stainless steel valves and pasteurisation pipes in a dairy plant',
    excerpt:
      'Learn how EHEDG and 3-A sanitary principles prevent dead legs, crevice corrosion, and persistent biofilms in pasteurisers, silos, and filling lines.',
    presenter: 'Johanita Pretorius · Food Engineering Advisor',
    keyTakeaways: [
      'Surface finish roughness (Ra values) and drainability criteria',
      'Eliminating dead ends in valve manifolds and weld seams',
      'Aligning equipment procurement with FSSC 22000 Prerequisite Programmes',
    ],
  },
  {
    id: 'web-r3337-labelling',
    title: 'Webinar | Draft R3337 Food Labelling Regulations – What Food Businesses Must Prepare Now',
    shortBannerTitle: 'DRAFT R3337 FOOD LABELLING PREPARATIONS',
    partner: 'Hahn & Hahn Food Law',
    date: '10 July 2025',
    duration: '72 min',
    image: BRAND_ASSETS.heroImage,
    imageAlt: 'Consumer reading packaged food nutrition label in supermarket aisle',
    excerpt:
      'A legal and technical breakdown of front-of-pack warning icons, nutrient profiling thresholds, allergen declarations, and claim substantiation under draft R3337.',
    presenter: 'Janusz Luterek · Food Law Specialist',
    keyTakeaways: [
      'Transition timelines between R146 and proposed R3337',
      'Mandatory front-of-pack warning logos for sugar, sodium, and saturated fat',
      'Permitted vs. restricted nutrition and health claims on packaging',
    ],
  },
  {
    id: 'web-r638-inspection',
    title: 'Webinar | Preparing Your Facility for Municipal R638 Hygiene Inspections',
    shortBannerTitle: 'R638 HYGIENE INSPECTION READINESS',
    partner: 'Food Focus Compliance Hub',
    date: '26 June 2025',
    duration: '52 min',
    image: BRAND_ASSETS.factoryImage,
    imageAlt: 'Quality assurance specialist inspecting sealed food trays in plant',
    excerpt:
      'Environmental Health Practitioners share the top non-conformances found during food premises audits and how to maintain continuous Certificate of Acceptability readiness.',
    presenter: 'Nomsa Dlamini · Senior EHP & Auditor',
    keyTakeaways: [
      'Documentation pack required on-site for every R638 inspection',
      'Pest control, handwashing stations, and temperature log verification',
      'Addressing structural defects and ventilation compliance',
    ],
  },
  {
    id: 'web-allergen-control',
    title: 'Webinar | Allergen Cross-Contact Validation & VITAL Risk Assessment',
    shortBannerTitle: 'ALLERGEN CROSS-CONTACT & VALIDATION',
    partner: 'MicroChem & Food Focus',
    date: '12 June 2025',
    duration: '60 min',
    image: BRAND_ASSETS.labImage,
    imageAlt: 'Laboratory scientist validating allergen swab samples',
    excerpt:
      'Practical guidance on scheduling allergen changeovers, validating wet vs. dry cleaning protocols, and avoiding precautionary "may contain" overuse.',
    presenter: 'Dr. Annelize Botha · Analytical Chemist',
    keyTakeaways: [
      'Selecting lateral-flow vs. ELISA allergen swab kits',
      'Quantitative risk assessment using VITAL 4.0 reference doses',
      'Common South African allergen recall triggers',
    ],
  },
  {
    id: 'web-pest-audit',
    title: 'Webinar | Integrated Pest Management (IPM) for GFSI & Export Packhouses',
    shortBannerTitle: 'INTEGRATED PEST MANAGEMENT FOR PACKHOUSES',
    partner: 'SAFMA & Pest Compliance SA',
    date: '29 May 2025',
    duration: '55 min',
    image: BRAND_ASSETS.packhouseImage,
    imageAlt: 'Modern export produce packhouse sorting and cold-chain line',
    excerpt:
      'Strengthen perimeter rodent exclusion, flying insect light-trap mapping, and pesticide residue avoidance in export packhouses and grain mills.',
    presenter: 'Pieter Vermeulen · Technical Entomologist',
    keyTakeaways: [
      'Trend analysis expectations during BRCGS and FSSC audits',
      'Non-toxic trapping zones inside high-care food production areas',
      'Avoiding chemical contamination near open food surfaces',
    ],
  },
];

export const SUPPLIER_DIRECTORY: SupplierListing[] = [
  {
    id: 'dir-microchem',
    name: 'MicroChem Lab Services',
    shortMark: 'MICROCHEM',
    tagline: 'SANAS ISO/IEC 17025 Food & Water Testing',
    category: 'Food Testing Laboratories',
    location: 'Cape Town · Johannesburg',
    accreditation: 'SANAS T0412 Accredited',
    description:
      'Full-spectrum microbiological, chemical, nutritional, and allergen testing for South African food manufacturers, retailers, and exporters.',
    accentColor: '#0F4C81',
  },
  {
    id: 'dir-sgs',
    name: 'SGS South Africa',
    shortMark: 'SGS',
    tagline: 'FSSC 22000 · BRCGS · GLOBALG.A.P. Audits',
    category: 'Certification Bodies',
    location: 'Johannesburg · Durban · Cape Town',
    accreditation: 'SANAS & IAF Accredited CB',
    description:
      'Global certification, second-party supplier audits, food label verification, and food safety training across the agricultural and FMCG supply chain.',
    accentColor: '#E06D1B',
  },
  {
    id: 'dir-testo',
    name: 'Testo Measuring Instruments',
    shortMark: 'testo',
    tagline: 'HACCP Thermometers, pH & Data Loggers',
    category: 'Instruments & Calibration',
    location: 'Midrand · National Distribution',
    accreditation: 'ISO 9001 & Traceable Calibration',
    description:
      'Precision infrared and penetration thermometers, cooking oil testers, and automated cold-chain monitoring loggers engineered for food compliance.',
    accentColor: '#C8102E',
  },
  {
    id: 'dir-nsf',
    name: 'NSF International SA',
    shortMark: 'NSF',
    tagline: 'Food Safety Auditing & Supply Chain Assurance',
    category: 'Certification Bodies',
    location: 'Centurion · Western Cape',
    accreditation: 'GFSI Benchmarked Auditing',
    description:
      'Independent certification, retailer compliance programmes, and technical consulting supporting farm-to-fork food safety systems.',
    accentColor: '#1B5E20',
  },
  {
    id: 'dir-envirocare',
    name: 'EnviroCare Hygiene Solutions',
    shortMark: 'ENVIROCARE',
    tagline: 'CIP Detergents & Food-Grade Sanitisers',
    category: 'Packaging & Hygiene',
    location: 'Gauteng · KwaZulu-Natal',
    accreditation: 'SANS 1853 & NRCS Registered',
    description:
      'Specialised food plant cleaning chemicals, foam sanitation equipment, ATP hygiene verification, and operator sanitation training.',
    accentColor: '#00796B',
  },
  {
    id: 'dir-polyoak',
    name: 'Polyoak Food Packaging',
    shortMark: 'POLYOAK',
    tagline: 'Food-Contact Rigid & Barrier Packaging',
    category: 'Packaging & Hygiene',
    location: 'Cape Town · Johannesburg · Durban',
    accreditation: 'FSSC 22000 Packaging Certified',
    description:
      'Tamper-evident dairy tubs, PET bottles, and recyclable mono-material food trays manufactured under strict hygiene controls.',
    accentColor: '#1E3A8A',
  },
  {
    id: 'dir-intertek',
    name: 'Intertek Food Services',
    shortMark: 'Intertek',
    tagline: 'Assurance, Testing & Export Inspection',
    category: 'Food Testing Laboratories',
    location: 'Johannesburg · Port Elizabeth',
    accreditation: 'ISO 17025 & PPECB Aligned',
    description:
      'Pesticide residue MRL screening, mycotoxin quantification, and pre-shipment quality inspection for South African food exports.',
    accentColor: '#B45309',
  },
  {
    id: 'dir-diversey',
    name: 'Diversey Food & Beverage',
    shortMark: 'Diversey',
    tagline: 'Hygiene Engineering & Biofilm Control',
    category: 'Packaging & Hygiene',
    location: 'Johannesburg · Cape Town',
    accreditation: 'ISO 14001 & Halal / Kosher Certified',
    description:
      'Integrated hygiene programmes, automated chemical dosing, and water-saving CIP auditing for breweries, dairies, and meat processors.',
    accentColor: '#0369A1',
  },
];

export const LEGISLATION_CATEGORIES: LegislationCategory[] = [
  {
    id: 'fcda',
    title: 'Foodstuffs, Cosmetics & Disinfectants Act',
    actCode: 'Act 54 of 1972',
    summary:
      'Primary national statute administered by the Department of Health governing safety, composition, additives, contaminants, and labelling of foodstuffs.',
  },
  {
    id: 'labelling',
    title: 'Labelling & Advertising (R146 / draft R3337)',
    actCode: 'GNR 146 & Draft R3337',
    summary:
      'Mandatory ingredient declarations, allergen warnings, date marking, nutritional tables, claims, and proposed front-of-pack warning symbols.',
  },
  {
    id: 'r638',
    title: 'Hygiene Regulations (R638)',
    actCode: 'GNR 638 of 2018',
    summary:
      'General hygiene requirements for food premises, transport of food, Certificate of Acceptability (CoA) issuance, and food handler standards.',
  },
  {
    id: 'apsa',
    title: 'Agricultural Product Standards Act',
    actCode: 'Act 119 of 1990',
    summary:
      'DALRRD quality, grading, packing, and compositional standards for dairy, meat, poultry, fresh produce, and processed agricultural products.',
  },
  {
    id: 'meat',
    title: 'Meat Safety Act',
    actCode: 'Act 40 of 2000',
    summary:
      'Abattoir registration, ante- and post-mortem meat inspection, hygiene management systems (HMS), and import/export meat safety controls.',
  },
  {
    id: 'cpa',
    title: 'Consumer Protection Act',
    actCode: 'Act 68 of 2008',
    summary:
      'Product liability, plain-language labelling, recall obligations, GMO disclosure rules, and fair marketing protections for consumers.',
  },
];

export { LEGISLATION_UPDATES, HELPFUL_LINKS, COMPLIANCE_TOPICS, REGULATION_TYPES, LEGISLATION_FAQS } from './legislationData';

export const INDUSTRY_EVENTS: IndustryEvent[] = [
  {
    id: 'evt-1',
    title: 'SA Food Safety & Quality Compliance Summit 2025',
    date: '17–18 September 2025',
    location: 'Gallagher Convention Centre, Midrand',
    format: 'In-person Conference & Expo',
    summary: 'Two-day technical symposium covering R3337 labelling readiness, FSSC 22000 v6 case studies, and cold-chain automation.',
  },
  {
    id: 'evt-2',
    title: 'SAAFoST Biennial Congress & Trade Exhibition',
    date: '08–10 October 2025',
    location: 'CTICC, Cape Town',
    format: 'Scientific Congress',
    summary: 'South African Association for Food Science and Technology gathering researchers, QA directors, and ingredient innovators.',
  },
  {
    id: 'evt-3',
    title: 'Dairy Standard Agency Regional Hygiene Workshop',
    date: '23 October 2025',
    location: 'Pietermaritzburg, KwaZulu-Natal',
    format: 'Technical Workshop',
    summary: 'Hands-on training for dairy processors and parlour managers on CIP validation and environmental Listeria control.',
  },
];

export const POPULAR_POSTS = [
  {
    id: 'art-digital-food-safety',
    title: 'The top 10 advantages of digital food safety procedures',
    date: '14 August 2025',
    image: BRAND_ASSETS.labImage,
  },
  {
    id: 'art-foodborne-epidemic',
    title: 'Enough to Make You Sick: Foodborne Illness Epidemic in South Africa spotlights Need for Change',
    date: '06 August 2025',
    image: BRAND_ASSETS.factoryImage,
  },
  {
    id: 'art-govt-register',
    title: 'Government calls on businesses to register',
    date: '29 July 2025',
    image: BRAND_ASSETS.packhouseImage,
  },
];

export const ADVERTISE_STATS = [
  { value: '4,000+', label: 'Email subscribers' },
  { value: '32,000+', label: 'Social followers' },
  { value: '203,000+', label: 'Website users' },
  { value: '160,000+', label: 'Website sessions' },
  { value: '258,000', label: 'Page views (past 12 months)' },
];
