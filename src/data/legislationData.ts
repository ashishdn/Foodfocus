import { ComplianceTopic, HelpfulLink, LegislationUpdate, RegulationType } from '../types';

/* ------------------------------------------------------------------ */
/* Shared reference links (official sources)                           */
/* ------------------------------------------------------------------ */

const REF = {
  doh: { label: 'Department of Health — Food Control', url: 'https://www.health.gov.za', source: 'health.gov.za' },
  gazette: { label: 'Government Gazette & official documents', url: 'https://www.gov.za/documents', source: 'gov.za' },
  ncc: { label: 'National Consumer Commission', url: 'https://thencc.org.za', source: 'thencc.org.za' },
  dalrrd: { label: 'Department of Agriculture — Food Safety & Quality Assurance', url: 'https://www.dalrrd.gov.za', source: 'dalrrd.gov.za' },
  codex: { label: 'Codex Alimentarius standards', url: 'https://www.fao.org/fao-who-codexalimentarius/en/', source: 'fao.org' },
  nrcs: { label: 'National Regulator for Compulsory Specifications', url: 'https://www.nrcs.org.za', source: 'nrcs.org.za' },
  saflii: { label: 'SAFLII — South African legislation database', url: 'https://www.saflii.org', source: 'saflii.org' },
  nicd: { label: 'NICD — Outbreak response & surveillance', url: 'https://www.nicd.ac.za', source: 'nicd.ac.za' },
  ppecb: { label: 'Perishable Products Export Control Board', url: 'https://ppecb.com', source: 'ppecb.com' },
  dsa: { label: 'Dairy Standard Agency', url: 'https://www.dairystandard.co.za', source: 'dairystandard.co.za' },
  cgcsa: { label: 'Consumer Goods Council of South Africa', url: 'https://www.cgcsa.co.za', source: 'cgcsa.co.za' },
};

/* ------------------------------------------------------------------ */
/* Filter vocabularies                                                 */
/* ------------------------------------------------------------------ */

export const COMPLIANCE_TOPICS: { id: ComplianceTopic; description: string }[] = [
  { id: 'Food Safety', description: 'Hygiene, contaminants, HACCP and safe handling from farm to fork.' },
  { id: 'Food Quality', description: 'Grading, composition, product standards and naming rules.' },
  { id: 'Public Health', description: 'Labelling for consumers, nutrition, outbreaks and recalls.' },
  { id: 'Regulatory', description: 'Acts, enforcement procedures, registrations and governance.' },
];

export const REGULATION_TYPES: RegulationType[] = [
  'Act',
  'Regulation',
  'Draft Regulation',
  'Notice',
  'Directive',
];

/* ------------------------------------------------------------------ */
/* Legislation updates                                                 */
/* ------------------------------------------------------------------ */

export const LEGISLATION_UPDATES: LegislationUpdate[] = [
  {
    id: 'draft-r3337-front-of-pack-labelling',
    categoryId: 'labelling',
    title: 'Department of Health consolidates industry submissions on Draft R3337 Front-of-Pack Labelling',
    seoTitle: 'Draft R3337 Front-of-Pack Labelling Update | Food Focus',
    metaDescription:
      'Latest on Draft R3337: nutrient profiling cut-offs, sweetener disclosures, small-pack exemptions and what South African food manufacturers should prepare now.',
    keywords: ['R3337', 'front-of-pack labelling', 'food labelling regulations South Africa', 'nutrient profiling', 'warning labels'],
    date: '15 August 2025',
    isoDate: '2025-08-15',
    tag: 'Draft regulation',
    gazetteRef: 'Gov. Gazette Notice R3337',
    status: 'open-for-comment',
    regulationType: 'Draft Regulation',
    topic: 'Public Health',
    important: true,
    commentDeadline: '2026-12-15',
    authority: 'Department of Health — Directorate: Food Control',
    excerpt:
      'Updated timelines and technical clarifications on nutrient profiling cut-offs, sweetener disclosures, and small-package exemptions under review ahead of final promulgation.',
    keyPoints: [
      'Nutrient profiling thresholds for added sugar, sodium and saturated fat are being refined per 100 g / 100 ml.',
      'Transitional phase-in windows for existing packaging stock remain under discussion.',
      'Front-of-pack warning symbols will apply to products exceeding the final thresholds.',
      'Businesses should audit artwork claims and nutritional test methods now.',
    ],
    fullBrief: [
      'The Directorate: Food Control has completed technical review sessions with food manufacturers, legal advisors, and consumer advocacy groups following extensive public comments on Draft Regulation R3337.',
      'Key points under refinement include calculation rules for added sugar and sodium per 100g/100ml, transitional phase-in windows for existing packaging stock, and harmonisation with Agricultural Product Standards Act compositional rules.',
      'Food businesses are advised to audit existing artwork claims and nutritional panel test methods now rather than awaiting final publication.',
    ],
    whoIsAffected: ['Packaged food manufacturers', 'Importers and brand owners', 'Retailers with private label ranges', 'Label and artwork agencies'],
    relatedLegislationIds: ['r146-allergen-declaration-guidance', 'apsa-plant-based-dairy-naming', 'cpa-section-60-recall-protocol'],
    relatedArticleIds: ['art-govt-register', 'sup-coldchain-packaging'],
    references: [REF.doh, REF.gazette, REF.codex],
    documents: [
      { id: 'r3337-draft', title: 'Draft Regulation R3337 — Labelling and Advertising of Foodstuffs', format: 'PDF', sizeKb: 2480, pages: 64 },
      { id: 'r3337-checklist', title: 'Food Focus R3337 readiness checklist', format: 'PDF', sizeKb: 310, pages: 6 },
    ],
    faqs: [
      { question: 'Is R3337 already law?', answer: 'No. R3337 is a draft regulation. It becomes enforceable only once the final regulation is published in the Government Gazette, usually with a transition period.' },
      { question: 'What should manufacturers do now?', answer: 'Review nutritional analysis methods, map which products could exceed the proposed thresholds, and plan artwork changes so they can be phased in once the final rules are published.' },
    ],
  },
  {
    id: 'r638-coa-cold-chain-vehicles',
    categoryId: 'r638',
    title: 'Municipal EHP directive: Mandatory Certificate of Acceptability verification for cold-chain vehicles',
    seoTitle: 'R638 Certificate of Acceptability for Food Vehicles',
    metaDescription:
      'R638 directive: food transport vehicles need a valid Certificate of Acceptability and calibrated temperature records. What EHP inspectors check at roadside and depot.',
    keywords: ['R638', 'Certificate of Acceptability', 'cold chain', 'food transport hygiene', 'EHP inspection'],
    date: '08 August 2025',
    isoDate: '2025-08-08',
    tag: 'Hygiene',
    gazetteRef: 'GNR 638 · Section 3 & 13',
    status: 'new',
    regulationType: 'Directive',
    topic: 'Food Safety',
    important: true,
    authority: 'Municipal Environmental Health Services',
    excerpt:
      'Transport contractors carrying perishable chilled and frozen foodstuffs must carry valid CoAs linked to calibrated temperature-monitoring records.',
    keyPoints: [
      'Any vehicle transporting food for a food business is a food premises under R638.',
      'A valid Certificate of Acceptability must be carried and produced on request.',
      'Continuous temperature logs must come from calibrated equipment.',
      'Raw and ready-to-eat loads must be physically separated.',
    ],
    fullBrief: [
      'Under Regulation R638, any vehicle used to transport food on behalf of a food business constitutes a food premise requiring an active Certificate of Acceptability.',
      'Environmental Health Practitioners conducting roadside and depot inspections are verifying both vehicle cleanliness, separation of raw and ready-to-eat loads, and continuous core temperature logs.',
    ],
    whoIsAffected: ['Cold-chain logistics contractors', 'Food distributors', 'Retail distribution centres', 'Caterers with delivery fleets'],
    relatedLegislationIds: ['r638-food-handler-training', 'meat-safety-hms-checklist', 'fcda-mycotoxin-limits'],
    relatedArticleIds: ['ind-export-coldchain', 'art-foodborne-epidemic'],
    references: [REF.doh, REF.gazette, REF.ppecb],
    documents: [
      { id: 'r638-full', title: 'Regulation R638 — General Hygiene Requirements for Food Premises', format: 'PDF', sizeKb: 1120, pages: 38 },
      { id: 'r638-vehicle-checklist', title: 'Vehicle CoA inspection checklist', format: 'XLSX', sizeKb: 64 },
    ],
    faqs: [
      { question: 'Who issues a Certificate of Acceptability?', answer: 'The local authority (municipal Environmental Health Services) where the food premises — including a vehicle base — is located.' },
      { question: 'Does a subcontracted transporter need its own CoA?', answer: 'Yes. Each vehicle used to transport food must be covered, whether owned by the food business or by a contractor.' },
    ],
  },
  {
    id: 'fcda-mycotoxin-limits',
    categoryId: 'fcda',
    title: 'Updated maximum limits for mycotoxins and heavy metals in infant and cereal-based foodstuffs',
    seoTitle: 'Mycotoxin & Heavy Metal Limits Update — Foodstuffs Act',
    metaDescription:
      'Updated South African maximum limits for aflatoxin, ochratoxin A and DON in infant and cereal foods, aligned with Codex. Sampling and supplier testing guidance.',
    keywords: ['mycotoxin limits', 'aflatoxin', 'Foodstuffs Cosmetics and Disinfectants Act', 'contaminants regulations', 'Codex'],
    date: '30 July 2025',
    isoDate: '2025-07-30',
    tag: 'Foodstuffs Act',
    gazetteRef: 'Act 54 of 1972 · Contaminants',
    status: 'updated',
    regulationType: 'Regulation',
    topic: 'Food Safety',
    authority: 'Department of Health — Directorate: Food Control',
    excerpt:
      'Aligning South African maximum residue and mycotoxin limits (aflatoxin B1, ochratoxin A, deoxynivalenol) with recent Codex Alimentarius revisions.',
    keyPoints: [
      'Limits for aflatoxin B1, ochratoxin A and deoxynivalenol revised in line with Codex.',
      'Infant cereals and maize-based products are a priority focus.',
      'Supplier Certificates of Analysis must reflect the new tolerances.',
      'Statistically representative lot sampling is expected.',
    ],
    fullBrief: [
      'Producers of maize meal, infant cereals, nut butters, and dried fruit should review supplier Certificate of Analysis testing frequencies against updated tolerance thresholds.',
      'Sampling plans must follow statistically representative lot-testing procedures to prevent batch quarantine.',
    ],
    whoIsAffected: ['Millers and cereal processors', 'Infant food manufacturers', 'Nut and dried fruit packers', 'Testing laboratories'],
    relatedLegislationIds: ['fcda-food-additives-amendment', 'r638-coa-cold-chain-vehicles'],
    relatedArticleIds: ['sup-microchem', 'art-digital-food-safety'],
    references: [REF.doh, REF.codex, REF.saflii],
    documents: [
      { id: 'fcda-contaminants', title: 'Regulations governing tolerances for fungus-produced toxins', format: 'PDF', sizeKb: 860, pages: 14 },
    ],
    faqs: [
      { question: 'Do the new limits apply to imported products?', answer: 'Yes. Imported foodstuffs must comply with the same maximum limits as locally produced products.' },
    ],
  },
  {
    id: 'apsa-plant-based-dairy-naming',
    categoryId: 'apsa',
    title: 'DALRRD issues notice on plant-based dairy analogue naming and compositional enforcement',
    seoTitle: 'Plant-Based Dairy Naming Rules South Africa (APSA)',
    metaDescription:
      'DALRRD notice on plant-based milk, cheese and yoghurt naming under the Agricultural Product Standards Act. What brands and importers must change.',
    keywords: ['plant-based dairy labelling', 'APSA', 'dairy product regulations', 'DALRRD', 'R1510'],
    date: '18 July 2025',
    isoDate: '2025-07-18',
    tag: 'Labelling',
    gazetteRef: 'APSA Act 119 of 1990 · R1510',
    status: 'in-force',
    regulationType: 'Notice',
    topic: 'Food Quality',
    authority: 'Department of Agriculture, Land Reform and Rural Development',
    excerpt:
      'Clarifying prohibited use of protected dairy designations on plant-based beverages, spreads, and fermented alternatives sold in South African retail.',
    keyPoints: [
      'Terms such as "milk", "butter", "cheese" and "yoghurt" are reserved for dairy products.',
      'Plant-based products must clearly name their plant source.',
      'Misleading imagery implying dairy origin is not permitted.',
    ],
    fullBrief: [
      'Inspectors appointed under the Agricultural Product Standards Act have issued compliance reminders regarding the reservation of terms such as "milk", "butter", "cheese", and "yoghurt" for dairy products meeting specified milk-fat and protein criteria.',
      'Importers and local brands must ensure product descriptors clearly state the plant source without misleading visual cues.',
    ],
    whoIsAffected: ['Plant-based product brands', 'Importers', 'Retailers', 'Dairy processors'],
    relatedLegislationIds: ['draft-r3337-front-of-pack-labelling', 'dsa-dairy-listeria-directive'],
    relatedArticleIds: ['ind-dairy-listeria'],
    references: [REF.dalrrd, REF.gazette, REF.dsa],
    documents: [
      { id: 'r1510', title: 'Regulation R1510 — Classification, packing and marking of dairy products', format: 'PDF', sizeKb: 1340, pages: 42 },
    ],
    faqs: [
      { question: 'Can I call my product "oat drink"?', answer: 'Yes. Descriptive names that state the plant source and avoid reserved dairy terms are generally acceptable.' },
    ],
  },
  {
    id: 'meat-safety-hms-checklist',
    categoryId: 'meat',
    title: 'Meat Safety Act: Updated Hygiene Management System audit checklist for red meat and poultry abattoirs',
    seoTitle: 'Meat Safety Act HMS Audit Checklist Update 2025',
    metaDescription:
      'Updated Hygiene Management System audit criteria for abattoirs under the Meat Safety Act: carcass chilling, water potability and traceability requirements.',
    keywords: ['Meat Safety Act', 'abattoir audit', 'hygiene management system', 'carcass chilling', 'traceability'],
    date: '09 July 2025',
    isoDate: '2025-07-09',
    tag: 'Meat Safety',
    gazetteRef: 'Act 40 of 2000 · Notice 2025',
    status: 'updated',
    regulationType: 'Notice',
    topic: 'Food Safety',
    authority: 'Provincial Veterinary Public Health',
    excerpt:
      'Provincial veterinary public health teams introduce harmonised scoring criteria for carcass chilling curves, water potability, and traceability tagging.',
    keyPoints: [
      'Harmonised scoring across provinces for HMS audits.',
      'Carcass core temperature must drop below 7 °C within mandated timeframes.',
      'Water potability and traceability tagging are scored separately.',
    ],
    fullBrief: [
      'Abattoir operators must maintain verifiable pre-slaughter documentation, humane handling records, and rapid post-mortem chilling logs demonstrating core temperatures below 7°C within mandated timeframes.',
    ],
    whoIsAffected: ['Red meat abattoirs', 'Poultry abattoirs', 'Meat processors', 'Veterinary inspectors'],
    relatedLegislationIds: ['r638-coa-cold-chain-vehicles', 'cpa-section-60-recall-protocol'],
    relatedArticleIds: ['ind-export-coldchain'],
    references: [REF.dalrrd, REF.saflii],
    documents: [
      { id: 'hms-checklist', title: 'HMS audit scoring sheet — red meat & poultry', format: 'XLSX', sizeKb: 92 },
      { id: 'msa-act', title: 'Meat Safety Act 40 of 2000', format: 'PDF', sizeKb: 540, pages: 22 },
    ],
    faqs: [
      { question: 'Who conducts HMS audits?', answer: 'Provincial Veterinary Public Health officials or appointed assignees conduct audits under the Meat Safety Act.' },
    ],
  },
  {
    id: 'cpa-section-60-recall-protocol',
    categoryId: 'cpa',
    title: 'National Consumer Commission updates recall notification protocol under Section 60 of the CPA',
    seoTitle: 'CPA Section 60 Food Recall Protocol Update | NCC',
    metaDescription:
      'National Consumer Commission updates food recall notification timelines under Section 60 of the Consumer Protection Act for allergens, foreign objects and pathogens.',
    keywords: ['food recall South Africa', 'Consumer Protection Act Section 60', 'National Consumer Commission', 'product recall'],
    date: '01 July 2025',
    isoDate: '2025-07-01',
    tag: 'Consumer Protection',
    gazetteRef: 'Act 68 of 2008 · Section 60',
    status: 'in-force',
    regulationType: 'Act',
    topic: 'Public Health',
    important: true,
    authority: 'National Consumer Commission',
    excerpt:
      'Streamlined reporting timelines for urgent food safety recalls involving undeclared allergens, foreign object hazards, or microbiological contamination.',
    keyPoints: [
      'Notify the NCC and the Department of Health without delay.',
      'Provide batch codes, distribution footprint and consumer refund instructions.',
      'Applies to allergen, foreign-object and microbiological hazards.',
    ],
    fullBrief: [
      'Suppliers initiating a voluntary or mandatory food recall must notify the National Consumer Commission alongside the Department of Health Directorate: Food Control without delay, providing batch codes, distribution footprint, and consumer refund instructions.',
    ],
    whoIsAffected: ['All food suppliers and producers', 'Importers', 'Retailers', 'Distributors'],
    relatedLegislationIds: ['r146-allergen-declaration-guidance', 'draft-r3337-front-of-pack-labelling', 'nicd-listeriosis-reporting'],
    relatedArticleIds: ['art-foodborne-epidemic'],
    references: [REF.ncc, REF.doh, REF.cgcsa],
    documents: [
      { id: 'cpa-recall-guide', title: 'Consumer Goods Recall Guidelines', format: 'PDF', sizeKb: 720, pages: 18 },
    ],
    faqs: [
      { question: 'Is a voluntary recall also reportable?', answer: 'Yes. Both voluntary and mandatory recalls must be reported to the National Consumer Commission.' },
    ],
  },
  {
    id: 'r146-allergen-declaration-guidance',
    categoryId: 'labelling',
    title: 'Guidance note clarifies allergen declarations and precautionary "may contain" statements under R146',
    seoTitle: 'R146 Allergen Labelling Guidance South Africa',
    metaDescription:
      'Guidance on allergen declarations and "may contain" statements under R146 labelling regulations. Common errors and how to fix them before inspection.',
    keywords: ['R146', 'allergen labelling', 'may contain statements', 'food labelling South Africa'],
    date: '24 June 2025',
    isoDate: '2025-06-24',
    tag: 'Labelling',
    gazetteRef: 'GNR 146 of 2010',
    status: 'updated',
    regulationType: 'Regulation',
    topic: 'Public Health',
    authority: 'Department of Health — Directorate: Food Control',
    excerpt:
      'Precautionary allergen statements must be based on a documented risk assessment, not used as a blanket disclaimer.',
    keyPoints: [
      'Common allergens must be declared in the ingredient list.',
      'Precautionary statements require a documented cross-contact risk assessment.',
      'Allergen declarations must be legible and in plain language.',
    ],
    fullBrief: [
      'Inspectors report frequent misuse of "may contain" statements as a blanket disclaimer. The guidance reiterates that precautionary labelling must follow a documented allergen risk assessment.',
      'Manufacturers should align allergen management programmes, cleaning validation and label review sign-offs.',
    ],
    whoIsAffected: ['Food manufacturers', 'Bakeries', 'Importers', 'Label reviewers'],
    relatedLegislationIds: ['draft-r3337-front-of-pack-labelling', 'cpa-section-60-recall-protocol'],
    relatedArticleIds: ['art-govt-register'],
    references: [REF.doh, REF.gazette],
    documents: [
      { id: 'r146', title: 'Regulation R146 — Labelling and Advertising of Foodstuffs', format: 'PDF', sizeKb: 1650, pages: 52 },
    ],
    faqs: [
      { question: 'Can I use "may contain nuts" on every product?', answer: 'No. Precautionary statements should only be used where a documented risk assessment shows unavoidable cross-contact.' },
    ],
  },
  {
    id: 'r638-food-handler-training',
    categoryId: 'r638',
    title: 'R638 enforcement focus: Food handler training records and person-in-charge competence',
    seoTitle: 'R638 Food Handler Training Requirements',
    metaDescription:
      'What EHPs expect under R638 for food handler training, person-in-charge competence and training records at food premises in South Africa.',
    keywords: ['R638 training', 'food handler training', 'person in charge', 'food hygiene South Africa'],
    date: '12 June 2025',
    isoDate: '2025-06-12',
    tag: 'Hygiene',
    gazetteRef: 'GNR 638 · Section 10',
    status: 'in-force',
    regulationType: 'Regulation',
    topic: 'Food Safety',
    authority: 'Municipal Environmental Health Services',
    excerpt:
      'Environmental Health Practitioners are prioritising training evidence and the competence of the person in charge during routine inspections.',
    keyPoints: [
      'Each food premises needs a trained person in charge.',
      'Food handlers must be trained in hygiene and safe food handling.',
      'Training records must be available during inspection.',
    ],
    fullBrief: [
      'R638 requires the person in charge of food premises to be trained in food safety and to ensure that all food handlers receive appropriate hygiene training.',
      'EHPs are requesting dated training registers and evidence of refresher training during inspections.',
    ],
    whoIsAffected: ['Restaurants and caterers', 'Food manufacturers', 'Retailers', 'Training providers'],
    relatedLegislationIds: ['r638-coa-cold-chain-vehicles', 'meat-safety-hms-checklist'],
    relatedArticleIds: ['art-digital-food-safety', 'sup-hygiene-cip'],
    references: [REF.doh, REF.gazette],
    documents: [
      { id: 'r638-training-register', title: 'Food handler training register template', format: 'DOCX', sizeKb: 48 },
    ],
    faqs: [
      { question: 'Is there a prescribed training course?', answer: 'R638 does not prescribe a specific provider; training must be appropriate to the work and evidenced by records.' },
    ],
  },
  {
    id: 'fcda-food-additives-amendment',
    categoryId: 'fcda',
    title: 'Draft amendment to food additive regulations opens for public comment',
    seoTitle: 'Draft Food Additives Amendment — Comment Period Open',
    metaDescription:
      'Draft amendment to South African food additive regulations is open for public comment. Key changes to permitted additives, limits and submission process.',
    keywords: ['food additives regulations', 'public comment', 'Foodstuffs Act', 'permitted additives'],
    date: '03 September 2025',
    isoDate: '2025-09-03',
    tag: 'Draft regulation',
    gazetteRef: 'Act 54 of 1972 · Draft Notice',
    status: 'open-for-comment',
    regulationType: 'Draft Regulation',
    topic: 'Regulatory',
    commentDeadline: '2027-01-29',
    authority: 'Department of Health — Directorate: Food Control',
    excerpt:
      'Proposed updates to the list of permitted additives and maximum use levels, aligned with the Codex General Standard for Food Additives.',
    keyPoints: [
      'Positive list of permitted additives to be updated.',
      'Maximum use levels aligned with the Codex GSFA.',
      'Written comments accepted until the stated deadline.',
    ],
    fullBrief: [
      'The draft proposes aligning permitted additive lists and maximum use levels with the Codex General Standard for Food Additives, reducing barriers for exporters.',
      'Industry associations are coordinating consolidated submissions; individual businesses may also submit written comments.',
    ],
    whoIsAffected: ['Food manufacturers', 'Ingredient suppliers', 'Exporters', 'Industry associations'],
    relatedLegislationIds: ['fcda-mycotoxin-limits', 'draft-r3337-front-of-pack-labelling'],
    relatedArticleIds: ['art-govt-register'],
    references: [REF.doh, REF.codex, REF.gazette],
    documents: [
      { id: 'additives-draft', title: 'Draft amendment — Regulations relating to food additives', format: 'PDF', sizeKb: 1980, pages: 48 },
    ],
    faqs: [
      { question: 'How do I submit a comment?', answer: 'Follow the submission instructions in the Government Gazette notice; comments are usually sent in writing to the Directorate: Food Control before the deadline.' },
    ],
  },
  {
    id: 'nicd-listeriosis-reporting',
    categoryId: 'fcda',
    title: 'Listeriosis remains a notifiable medical condition: reporting duties for food businesses',
    seoTitle: 'Listeriosis Notification Duties for Food Businesses',
    metaDescription:
      'Listeriosis is a notifiable medical condition in South Africa. What food businesses need to know about outbreak investigations, sampling and traceability.',
    keywords: ['listeriosis', 'notifiable medical condition', 'NICD', 'outbreak investigation', 'ready-to-eat foods'],
    date: '20 May 2025',
    isoDate: '2025-05-20',
    tag: 'Public Health',
    gazetteRef: 'National Health Act · NMC Regulations',
    status: 'in-force',
    regulationType: 'Regulation',
    topic: 'Public Health',
    authority: 'National Department of Health / NICD',
    excerpt:
      'Ready-to-eat processors should keep environmental Listeria monitoring and traceability records ready for outbreak investigations.',
    keyPoints: [
      'Listeriosis cases are reported by clinicians and laboratories.',
      'Food businesses must cooperate with outbreak investigations.',
      'Environmental monitoring and traceability records are essential.',
    ],
    fullBrief: [
      'Following the 2017–2018 outbreak, listeriosis is a notifiable medical condition. During investigations, environmental health officials may request production records, sampling results and distribution lists.',
      'Ready-to-eat processors should maintain robust environmental monitoring programmes and corrective action records.',
    ],
    whoIsAffected: ['Ready-to-eat meat processors', 'Dairy processors', 'Fresh produce packhouses', 'Retailers'],
    relatedLegislationIds: ['dsa-dairy-listeria-directive', 'cpa-section-60-recall-protocol'],
    relatedArticleIds: ['art-foodborne-epidemic', 'ind-dairy-listeria'],
    references: [REF.nicd, REF.doh],
    documents: [
      { id: 'listeria-emp', title: 'Environmental Listeria monitoring plan template', format: 'DOCX', sizeKb: 72 },
    ],
    faqs: [
      { question: 'Do food businesses notify cases directly?', answer: 'Notification is made by health practitioners and laboratories, but food businesses must cooperate fully with investigations.' },
    ],
  },
  {
    id: 'dsa-dairy-listeria-directive',
    categoryId: 'apsa',
    title: 'Dairy processors urged to strengthen CIP validation and environmental Listeria control',
    seoTitle: 'Dairy CIP Validation & Listeria Control Guidance',
    metaDescription:
      'Guidance for South African dairy processors on CIP validation, environmental Listeria control and compliance with dairy product standards.',
    keywords: ['dairy compliance', 'CIP validation', 'Listeria control', 'Dairy Standard Agency'],
    date: '28 April 2025',
    isoDate: '2025-04-28',
    tag: 'Dairy',
    gazetteRef: 'APSA · Dairy product regulations',
    status: 'in-force',
    regulationType: 'Directive',
    topic: 'Food Quality',
    authority: 'Dairy Standard Agency',
    excerpt:
      'Compliance monitoring highlights gaps in CIP verification records and post-pasteurisation contamination controls.',
    keyPoints: [
      'CIP cycles must be validated and verified with records.',
      'Post-pasteurisation contamination is a key risk area.',
      'Environmental swabbing should target drains and filler zones.',
    ],
    fullBrief: [
      'Compliance monitoring across processing plants found recurring gaps in CIP verification and environmental swabbing frequency.',
      'Processors are encouraged to review sanitation programmes and validate cleaning chemicals and contact times.',
    ],
    whoIsAffected: ['Dairy processors', 'Cheese makers', 'Hygiene chemical suppliers'],
    relatedLegislationIds: ['nicd-listeriosis-reporting', 'apsa-plant-based-dairy-naming'],
    relatedArticleIds: ['ind-dairy-listeria', 'sup-hygiene-cip'],
    references: [REF.dsa, REF.dalrrd],
    documents: [
      { id: 'cip-validation', title: 'CIP validation record template', format: 'XLSX', sizeKb: 56 },
    ],
    faqs: [
      { question: 'How often should CIP be verified?', answer: 'Verification frequency should be based on risk and documented in the sanitation programme; many plants verify each cycle with conductivity and temperature records.' },
    ],
  },
  {
    id: 'nrcs-canned-meat-compulsory-specification',
    categoryId: 'meat',
    title: 'NRCS reminds manufacturers of compulsory specification requirements for canned meat products',
    seoTitle: 'NRCS Compulsory Specification for Canned Meat',
    metaDescription:
      'NRCS compulsory specification requirements for canned meat products in South Africa: letters of authority, sampling and labelling.',
    keywords: ['NRCS', 'compulsory specification', 'canned meat', 'letter of authority'],
    date: '10 April 2025',
    isoDate: '2025-04-10',
    tag: 'Regulatory',
    gazetteRef: 'VC 8019 · NRCS',
    status: 'in-force',
    regulationType: 'Notice',
    topic: 'Regulatory',
    authority: 'National Regulator for Compulsory Specifications',
    excerpt:
      'Manufacturers and importers must hold a valid letter of authority before canned meat products are sold in South Africa.',
    keyPoints: [
      'A letter of authority is required before sale.',
      'NRCS inspects factories and samples products.',
      'Imported consignments may be detained without approval.',
    ],
    fullBrief: [
      'Canned meat products fall under an NRCS compulsory specification. Manufacturers and importers must obtain approval before placing products on the market.',
      'Inspections cover processing controls, thermal process validation and product labelling.',
    ],
    whoIsAffected: ['Canned meat manufacturers', 'Importers', 'Retailers'],
    relatedLegislationIds: ['meat-safety-hms-checklist', 'cpa-section-60-recall-protocol'],
    relatedArticleIds: ['art-govt-register'],
    references: [REF.nrcs, REF.saflii],
    documents: [
      { id: 'vc8019', title: 'Compulsory specification for canned meat products', format: 'PDF', sizeKb: 410, pages: 12 },
    ],
    faqs: [
      { question: 'How long does a letter of authority take?', answer: 'Timelines vary; apply well before the planned launch and confirm current processing times with the NRCS.' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpful links                                                       */
/* ------------------------------------------------------------------ */

export const HELPFUL_LINKS: HelpfulLink[] = [
  { id: 'hl-doh', title: 'Food Control', organisation: 'National Department of Health', description: 'Foodstuffs Act regulations, draft notices and food control guidance.', url: REF.doh.url, topic: 'Regulatory', relatedCategoryIds: ['fcda', 'labelling', 'r638'] },
  { id: 'hl-gazette', title: 'Government Gazette & documents', organisation: 'South African Government', description: 'Search published Acts, regulations and gazette notices.', url: REF.gazette.url, topic: 'Regulatory', relatedCategoryIds: ['fcda', 'labelling', 'r638', 'apsa', 'meat', 'cpa'] },
  { id: 'hl-saflii', title: 'Legislation database', organisation: 'SAFLII', description: 'Free access to South African legislation and case law.', url: REF.saflii.url, topic: 'Regulatory', relatedCategoryIds: ['fcda', 'meat', 'cpa'] },
  { id: 'hl-nrcs', title: 'Compulsory specifications', organisation: 'NRCS', description: 'Requirements for canned fish, canned meat and frozen seafood.', url: REF.nrcs.url, topic: 'Regulatory', relatedCategoryIds: ['meat'] },
  { id: 'hl-nicd', title: 'Outbreak response', organisation: 'NICD', description: 'Foodborne disease surveillance, outbreak alerts and guidance.', url: REF.nicd.url, topic: 'Public Health', relatedCategoryIds: ['fcda'] },
  { id: 'hl-ncc', title: 'Product recalls', organisation: 'National Consumer Commission', description: 'Recall notifications and Consumer Protection Act guidance.', url: REF.ncc.url, topic: 'Public Health', relatedCategoryIds: ['cpa'] },
  { id: 'hl-cgcsa', title: 'Food safety initiative', organisation: 'Consumer Goods Council of SA', description: 'Industry guidelines, recall protocol and food safety resources.', url: REF.cgcsa.url, topic: 'Public Health', relatedCategoryIds: ['cpa', 'labelling'] },
  { id: 'hl-dalrrd', title: 'Food Safety & Quality Assurance', organisation: 'Department of Agriculture', description: 'Agricultural product standards, grading and export certification.', url: REF.dalrrd.url, topic: 'Food Quality', relatedCategoryIds: ['apsa', 'meat'] },
  { id: 'hl-dsa', title: 'Dairy compliance', organisation: 'Dairy Standard Agency', description: 'Dairy product compliance monitoring and guidance.', url: REF.dsa.url, topic: 'Food Quality', relatedCategoryIds: ['apsa'] },
  { id: 'hl-ppecb', title: 'Export cold chain', organisation: 'PPECB', description: 'Perishable product export inspection and cold chain services.', url: REF.ppecb.url, topic: 'Food Safety', relatedCategoryIds: ['r638', 'apsa'] },
  { id: 'hl-codex', title: 'International food standards', organisation: 'Codex Alimentarius', description: 'International standards, contaminant limits and hygiene codes.', url: REF.codex.url, topic: 'Food Safety', relatedCategoryIds: ['fcda', 'labelling'] },
];

/* ------------------------------------------------------------------ */
/* Page-level FAQs (also published as FAQPage structured data)         */
/* ------------------------------------------------------------------ */

export const LEGISLATION_FAQS = [
  {
    question: 'Which law governs food safety in South Africa?',
    answer:
      'The Foodstuffs, Cosmetics and Disinfectants Act 54 of 1972 is the primary statute, supported by regulations such as R638 (hygiene) and R146 (labelling). Agricultural products are also covered by the Agricultural Product Standards Act, and meat by the Meat Safety Act.',
  },
  {
    question: 'What is the difference between a draft regulation and a regulation?',
    answer:
      'A draft regulation is published for public comment and is not yet enforceable. Once finalised and published in the Government Gazette, it becomes a regulation with legal force, often with a transition period.',
  },
  {
    question: 'How do I get notified when new food regulations are published?',
    answer:
      'Subscribe to Food Focus legislation alerts on this page. Choose the topics you care about and we will email you when new or updated regulations are published.',
  },
  {
    question: 'Do I need a Certificate of Acceptability?',
    answer:
      'Yes. Under R638, every food premises — including food transport vehicles — must hold a valid Certificate of Acceptability issued by the local authority.',
  },
];
