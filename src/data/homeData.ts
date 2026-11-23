import { LEGISLATION_UPDATES } from './legislationData';

/** Farm-to-fork navigator stages shown on the homepage. */
export interface JourneyStage {
  id: string;
  label: string;
  title: string;
  intro: string;
  /** label + legislation category id (for the /legislation?act= filter) */
  laws: { label: string; categoryId: string }[];
  checks: string[];
  /** id of a legislation update shown as "latest" */
  latestLegislationId: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'farm',
    label: 'Farm',
    title: 'Primary production',
    intro:
      'Growers, packhouses and dairy farms. Focus on residue limits, water quality and lot traceability before produce leaves the farm gate.',
    laws: [
      { label: 'Agricultural Product Standards Act', categoryId: 'apsa' },
      { label: 'Foodstuffs Act — contaminant limits', categoryId: 'fcda' },
      { label: 'Dairy product regulations (R1510)', categoryId: 'apsa' },
    ],
    checks: [
      'Pesticide spray & MRL records',
      'Irrigation water test certificates',
      'Harvest hygiene & pre-cooling logs',
      'Lot codes linked to each block',
    ],
    latestLegislationId: 'apsa-plant-based-dairy-naming',
  },
  {
    id: 'processing',
    label: 'Processing',
    title: 'Manufacturing & processing',
    intro:
      'Factories, abattoirs and dairies. Auditors look hardest at HACCP validation, environmental monitoring and food safety culture.',
    laws: [
      { label: 'Foodstuffs, Cosmetics & Disinfectants Act', categoryId: 'fcda' },
      { label: 'Hygiene Regulations R638', categoryId: 'r638' },
      { label: 'Meat Safety Act 40 of 2000', categoryId: 'meat' },
    ],
    checks: [
      'Validated HACCP plan & CCP records',
      'Certificate of Acceptability on file',
      'Zone 1–4 Listeria swabbing',
      'CIP validation records',
    ],
    latestLegislationId: 'dsa-dairy-listeria-directive',
  },
  {
    id: 'packaging',
    label: 'Packaging',
    title: 'Packaging & labelling',
    intro:
      'Labels are the most-changed area of SA food law right now. Draft R3337 brings front-of-pack warnings and stricter claims.',
    laws: [
      { label: 'Labelling Regulations R146', categoryId: 'labelling' },
      { label: 'Draft R3337 (open for comment)', categoryId: 'labelling' },
      { label: 'Consumer Protection Act', categoryId: 'cpa' },
    ],
    checks: [
      'Allergens declared in bold',
      '"May contain" backed by a risk assessment',
      'Nutrition table & date marking',
      'Packaging migration test reports',
    ],
    latestLegislationId: 'draft-r3337-front-of-pack-labelling',
  },
  {
    id: 'coldchain',
    label: 'Cold chain',
    title: 'Transport & cold chain',
    intro:
      'Every food transport vehicle needs a valid Certificate of Acceptability — and the temperature records to prove control.',
    laws: [
      { label: 'R638 — transport of food', categoryId: 'r638' },
      { label: 'Municipal EHP vehicle directive', categoryId: 'r638' },
      { label: 'Agricultural Product Standards (export)', categoryId: 'apsa' },
    ],
    checks: [
      'Vehicle CoA displayed',
      'Continuous temperature logging',
      'Cleaning & sanitation schedule',
      'Driver hygiene training records',
    ],
    latestLegislationId: 'r638-coa-cold-chain-vehicles',
  },
  {
    id: 'retail',
    label: 'Retail',
    title: 'Retail & food service',
    intro:
      'Supermarkets, restaurants, caterers and spaza shops. Registration and a valid CoA are now being actively enforced.',
    laws: [
      { label: 'R638 — food premises', categoryId: 'r638' },
      { label: 'Consumer Protection Act', categoryId: 'cpa' },
      { label: 'Labelling Regulations R146', categoryId: 'labelling' },
    ],
    checks: [
      'Valid CoA on display',
      'Person-in-charge trained',
      'Pest control contract & reports',
      'Display temperatures recorded',
    ],
    latestLegislationId: 'r638-food-handler-training',
  },
  {
    id: 'consumer',
    label: 'Consumer',
    title: 'Consumer protection & recalls',
    intro:
      'When something goes wrong. Know your recall duties, reporting obligations and how to trace product one step up and down.',
    laws: [
      { label: 'CPA Section 60 — product recalls', categoryId: 'cpa' },
      { label: 'Listeriosis — notifiable condition', categoryId: 'fcda' },
      { label: 'Foodstuffs Act', categoryId: 'fcda' },
    ],
    checks: [
      'Recall plan tested in the last 12 months',
      'Complaint log with root cause',
      'One-up, one-down traceability',
      'NCC notification contacts ready',
    ],
    latestLegislationId: 'cpa-section-60-recall-protocol',
  },
];

/** Downloadable templates pulled from the legislation library (non-official documents). */
export const TOOLKIT_ITEMS = LEGISLATION_UPDATES.flatMap((u) =>
  u.documents
    .filter((d) => !d.url && (d.format !== 'PDF' || /checklist|template/i.test(d.title)))
    .map((d) => ({ doc: d, update: u }))
).slice(0, 6);

export const MOST_READ = [
  { legislationId: 'r638-food-handler-training', label: 'Hygiene', title: 'R638: what EHPs check during a hygiene inspection', mins: 5 },
  { articleId: 'ind-fssc-v6', label: 'Audits', title: 'FSSC 22000 v6 audits flag food safety culture gaps', mins: 5 },
  { legislationId: 'r146-allergen-declaration-guidance', label: 'Labelling', title: '"May contain" statements: allergen labelling under R146', mins: 4 },
  { legislationId: 'nicd-listeriosis-reporting', label: 'Public health', title: 'Listeriosis reporting duties every food business must know', mins: 6 },
];

export const TRAINING_COURSES = [
  { title: 'HACCP & FSSC 22000 Courses', short: 'HACCP & FSSC 22000', meta: '3 days · Online or on-site' },
  { title: 'R638 Food Handler Hygiene', short: 'R638 Food Handler Hygiene', meta: '1 day · Team bookings' },
  { title: 'Internal Auditing Skills', short: 'Internal Auditing Skills', meta: '2 days · Online' },
];

export const KNOWLEDGE_PARTNERS = ['Dairy Standard Agency', 'Hahn & Hahn', 'SAAFoST', 'FoodStuff SA', 'CGCSA'];
