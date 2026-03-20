export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  industry: string;
  salaryMin: number;
  salaryMax: number;
  postedDaysAgo: number;
  description: string;
  icon: string;
}

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Government',
  'Marketing',
  'Design',
  'Engineering',
] as const;

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const;

export const LOCATIONS = [
  'Central',
  'East',
  'West',
  'North',
  'North-East',
  'Remote',
] as const;

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior UX Designer',
    company: 'GovTech Singapore',
    location: 'Central',
    type: 'Full-time',
    industry: 'Government',
    salaryMin: 7000,
    salaryMax: 10000,
    postedDaysAgo: 1,
    description: 'Lead user experience design for citizen-facing digital services. Collaborate with product teams to create accessible and inclusive interfaces aligned with SGDS guidelines.',
    icon: 'building',
  },
  {
    id: '2',
    title: 'Design System Engineer',
    company: 'DBS Bank',
    location: 'Central',
    type: 'Full-time',
    industry: 'Finance',
    salaryMin: 8000,
    salaryMax: 12000,
    postedDaysAgo: 2,
    description: 'Build and maintain the DBS design system, developing reusable web components and ensuring consistent implementation across digital banking products.',
    icon: 'bank',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Synapxe',
    location: 'West',
    type: 'Full-time',
    industry: 'Healthcare',
    salaryMin: 5500,
    salaryMax: 8000,
    postedDaysAgo: 3,
    description: "Design intuitive interfaces for healthcare management systems used by clinicians and patients across Singapore's public health institutions.",
    icon: 'hospital',
  },
  {
    id: '4',
    title: 'Product Designer',
    company: 'Grab',
    location: 'North',
    type: 'Full-time',
    industry: 'Technology',
    salaryMin: 7500,
    salaryMax: 11000,
    postedDaysAgo: 5,
    description: "Shape the future of Southeast Asia's superapp. Design seamless experiences for mobility, food, and financial services used by millions of users.",
    icon: 'phone',
  },
  {
    id: '5',
    title: 'UX Research Intern',
    company: 'OCBC Bank',
    location: 'Central',
    type: 'Internship',
    industry: 'Finance',
    salaryMin: 1500,
    salaryMax: 2000,
    postedDaysAgo: 2,
    description: 'Support UX research initiatives including user interviews, usability testing, and data analysis to inform product design decisions at OCBC.',
    icon: 'currency-dollar',
  },
  {
    id: '6',
    title: 'Frontend Developer (Design Systems)',
    company: 'Sea Limited',
    location: 'Central',
    type: 'Full-time',
    industry: 'Technology',
    salaryMin: 9000,
    salaryMax: 14000,
    postedDaysAgo: 7,
    description: 'Build scalable component libraries and design tokens for Shopee and SeaMoney. Work closely with designers to translate Figma designs into production-ready code.',
    icon: 'code-slash',
  },
  {
    id: '7',
    title: 'Interaction Designer',
    company: 'Ministry of Education',
    location: 'West',
    type: 'Contract',
    industry: 'Government',
    salaryMin: 5000,
    salaryMax: 7500,
    postedDaysAgo: 4,
    description: "Design interactive learning experiences for students and educators on Singapore's national education platforms. 12-month contract with renewal option.",
    icon: 'mortarboard',
  },
  {
    id: '8',
    title: 'Visual Designer',
    company: 'Dentsu Singapore',
    location: 'Central',
    type: 'Full-time',
    industry: 'Marketing',
    salaryMin: 4500,
    salaryMax: 7000,
    postedDaysAgo: 6,
    description: 'Create compelling visual identities and digital campaigns for top brands. Collaborate with creative and strategy teams to deliver impactful design solutions.',
    icon: 'palette',
  },
  {
    id: '9',
    title: 'Design Ops Manager',
    company: 'Singtel',
    location: 'North',
    type: 'Full-time',
    industry: 'Technology',
    salaryMin: 9000,
    salaryMax: 13000,
    postedDaysAgo: 10,
    description: "Establish and scale design operations practices across Singtel's digital product portfolio. Drive tooling, processes, and design system adoption across teams.",
    icon: 'wifi',
  },
  {
    id: '10',
    title: 'UX Designer (Part-time)',
    company: 'National Library Board',
    location: 'Central',
    type: 'Part-time',
    industry: 'Government',
    salaryMin: 3000,
    salaryMax: 4500,
    postedDaysAgo: 3,
    description: 'Improve digital library services and e-resource platforms. Ideal for candidates with experience in information architecture and accessibility design.',
    icon: 'book',
  },
  {
    id: '11',
    title: 'Senior Product Designer',
    company: 'Carousell',
    location: 'East',
    type: 'Full-time',
    industry: 'Technology',
    salaryMin: 8000,
    salaryMax: 12000,
    postedDaysAgo: 8,
    description: "Own end-to-end design for key product areas on one of Southeast Asia's largest classifieds marketplaces. Drive design strategy and mentor junior designers.",
    icon: 'tag',
  },
  {
    id: '12',
    title: 'UX Engineer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Full-time',
    industry: 'Finance',
    salaryMin: 10000,
    salaryMax: 16000,
    postedDaysAgo: 1,
    description: "Bridge design and engineering to build Stripe's merchant dashboard and developer tools. Proficiency in React and design systems required.",
    icon: 'credit-card',
  },
];

export function formatSalary(min: number, max: number): string {
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
  return `${fmt(min)} – ${fmt(max)} / month`;
}

export function formatPostedDate(daysAgo: number): string {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return '1 day ago';
  return `${daysAgo} days ago`;
}

export function getBadgeVariant(type: Job['type']): string {
  switch (type) {
    case 'Full-time': return 'primary';
    case 'Part-time': return 'info';
    case 'Contract': return 'warning';
    case 'Internship': return 'success';
    default: return 'neutral';
  }
}
