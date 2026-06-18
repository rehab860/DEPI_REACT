import { Company, Review, Question, AppNotification, UserProfile } from './types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'technova',
    name: 'TechNova Solutions',
    logo: 'TN',
    industry: 'Technology',
    city: 'Palo Alto, CA',
    rating: 4.3,
    totalReviews: 48,
    difficulty: 'Hard',
    offerRate: 15,
    wlb: 4.0,
    size: '1000+',
    description: 'An industry pioneer in advanced enterprise software and computational research systems powering global operations.'
  },
  {
    id: 'nexus',
    name: 'Nexus Tech Systems',
    logo: 'NT',
    industry: 'Technology',
    city: 'Austin, TX',
    rating: 4.5,
    totalReviews: 120,
    difficulty: 'Medium',
    offerRate: 18,
    wlb: 4.2,
    size: '201-1000',
    description: 'Specializing in secure cloud infrastructures, network design, and distributed ledger systems for modern conglomerates.'
  },
  {
    id: 'veridian',
    name: 'Veridian Creative',
    logo: 'VC',
    industry: 'Design & Media',
    city: 'Seattle, WA',
    rating: 3.8,
    totalReviews: 85,
    difficulty: 'Easy',
    offerRate: 42,
    wlb: 3.5,
    size: '51-200',
    description: 'A forward-thinking digital agency delivering custom editorial, visual branding, and interactive assets.'
  },
  {
    id: 'stark',
    name: 'Stark Global Logistics',
    logo: 'SL',
    industry: 'Financial Services',
    city: 'New York, NY',
    rating: 4.1,
    totalReviews: 94,
    difficulty: 'Hard',
    offerRate: 12,
    wlb: 3.8,
    size: '1000+',
    description: 'An international supply-chain operator combining financial risk calculations with predictive freight shipping models.'
  },
  {
    id: 'nebula',
    name: 'Nebula AI',
    logo: 'NA',
    industry: 'Technology',
    city: 'San Francisco, CA',
    rating: 4.8,
    totalReviews: 210,
    difficulty: 'Hard',
    offerRate: 8,
    wlb: 3.9,
    size: '201-1000',
    description: 'At the frontier of neural network scaling, deep learning models, and automated cognitive agents.'
  },
  {
    id: 'verdant',
    name: 'Verdant Grid',
    logo: 'VG',
    industry: 'Design & Media',
    city: 'Portland, OR',
    rating: 4.2,
    totalReviews: 32,
    difficulty: 'Medium',
    offerRate: 25,
    wlb: 4.5,
    size: '51-200',
    description: 'Sustainable product design company that designs ecofriendly packaging and digital consumer accessories.'
  },
  {
    id: 'zenith',
    name: 'Zenith Bank',
    logo: 'ZB',
    industry: 'Financial Services',
    city: 'Chicago, IL',
    rating: 3.9,
    totalReviews: 145,
    difficulty: 'Medium',
    offerRate: 20,
    wlb: 3.7,
    size: '1000+',
    description: 'A legacy consumer banking powerhouse standardizing remote fintech apps and financial advisory platforms.'
  },
  {
    id: 'helix',
    name: 'Helix Lab',
    logo: 'HL',
    industry: 'Healthcare',
    city: 'Boston, MA',
    rating: 4.4,
    totalReviews: 67,
    difficulty: 'Hard',
    offerRate: 14,
    wlb: 4.1,
    size: '201-1000',
    description: 'A premier molecular diagnostics, gene sequencing, and lab automation platform provider.'
  },
  {
    id: 'apex',
    name: 'Apex Arena',
    logo: 'AA',
    industry: 'Design & Media',
    city: 'Miami, FL',
    rating: 3.7,
    totalReviews: 54,
    difficulty: 'Easy',
    offerRate: 48,
    wlb: 3.2,
    size: '1-50',
    description: 'E-sports and live entertainment studio delivering premium visual broadcast feeds and spatial stage architecture.'
  },
  {
    id: 'luminary',
    name: 'Luminary Tech',
    logo: 'LT',
    industry: 'Technology',
    city: 'Cupertino, CA',
    rating: 4.6,
    totalReviews: 180,
    difficulty: 'Hard',
    offerRate: 11,
    wlb: 4.0,
    size: '1000+',
    description: 'Pioneers in high-resolution screen technology, micro-optics hardware development, and human-computer interactions.'
  },
  {
    id: 'vanguard',
    name: 'Vanguard Retail',
    logo: 'VR',
    industry: 'Financial Services',
    city: 'Minneapolis, MN',
    rating: 3.6,
    totalReviews: 78,
    difficulty: 'Medium',
    offerRate: 35,
    wlb: 3.4,
    size: '1000+',
    description: 'A mega-retailer transitioning into global web-based inventory management, API shipping, and store automations.'
  },
  {
    id: 'ecostream',
    name: 'EcoStream Systems',
    logo: 'ES',
    industry: 'Healthcare',
    city: 'Boulder, CO',
    rating: 4.5,
    totalReviews: 29,
    difficulty: 'Medium',
    offerRate: 30,
    wlb: 4.6,
    size: '1-50',
    description: 'Water filtration systems developer that implements biological monitors and real-time safe drinking water IoT APIs.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  // TechNova reviews
  {
    id: 'rev1',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    role: 'Senior Software Engineer',
    text: 'The scale of problems here is incredible. Each engineer represents serious computational impact, and the engineering culture emphasizes rigorous architectural standards which is fantastic for professional growth.',
    rating: 4.5,
    date: 'Jun 12, 2026',
    upvotes: 24,
    author: 'Alex D.',
    wlbRating: 4.0,
    transparencyRating: 4.5,
    responsivenessRating: 4.0,
    difficultyRating: 4.5,
    pros: 'High caliber of engineering talent, collaborative environment, strong technical ownership, and access to state-of-the-art computational infrastructure.',
    cons: 'Highly technical environment can feel demanding on timeline delivery; occasionally rigorous design review processes stall nimble deployments, requiring deep patience.',
    isInterview: false
  },
  {
    id: 'rev2',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    role: 'Product Designer',
    text: 'Great design culture but rapid pace. Strong collaboration with product management and engineering, though we must navigate complex technical constraints consistently.',
    rating: 4.0,
    date: 'May 28, 2026',
    upvotes: 18,
    author: 'DesignGuru',
    wlbRating: 3.8,
    transparencyRating: 4.0,
    responsivenessRating: 4.2,
    difficultyRating: 3.5,
    pros: 'True appreciation of aesthetic quality, rich design system foundation, direct access to executive stakeholders for presentation reviews.',
    cons: 'Engineering priorities can sometimes overshadow UX/UI revisions; quick sprint tempos don\'t leave immense room for deep generative research stages.',
    isInterview: false
  },
  {
    id: 'rev3',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    role: 'Staff Infrastructure Lead',
    text: 'The interview process was demanding but completely transparent. Four rounds, including a virtual write-up, architectural system design, and deep dive with the VP of Engineering.',
    rating: 4.6,
    date: 'Apr 15, 2026',
    upvotes: 42,
    author: 'ArchitectMax',
    wlbRating: 4.2,
    transparencyRating: 4.8,
    responsivenessRating: 4.5,
    difficultyRating: 5.0,
    pros: 'Highly professional recruiters, direct feedback at every stage, compensation details were outlined clear and fair from the very first screening.',
    cons: 'Architectural questions are very intense and require intimate knowledge of distributed database trade-offs.',
    isInterview: true,
    interviewOutcome: 'Offer'
  },
  // Nebula AI reviews
  {
    id: 'rev4',
    companyId: 'nebula',
    companyName: 'Nebula AI',
    role: 'Senior Deep Learning Researcher',
    text: 'Being at nebula artificial intelligence is like living in the future. We run the largest parameter training clusters and work with remarkable minds.',
    rating: 4.8,
    date: 'Jun 14, 2026',
    upvotes: 56,
    author: 'NeuralNetworker',
    wlbRating: 4.0,
    transparencyRating: 4.5,
    responsivenessRating: 4.0,
    difficultyRating: 4.8,
    pros: 'Limitless compute budgets, elite environment, work with pioneers who literally authored the models.',
    cons: 'Extremely high expectations; rapid project pivots as state-of-the-art benchmarks change overnight.',
    isInterview: false
  },
  // Apex Arena review
  {
    id: 'rev5',
    companyId: 'apex',
    companyName: 'Apex Arena',
    role: 'Operations Lead',
    text: 'Fast-paced, creative broadcast setting. Highly exciting events, but work/life balance is highly volatile during esports season.',
    rating: 3.7,
    date: 'Jun 09, 2026',
    upvotes: 12,
    author: 'ArenaManager',
    wlbRating: 2.8,
    transparencyRating: 3.5,
    responsivenessRating: 4.0,
    difficultyRating: 3.0,
    pros: 'Incredible energy, vibrant team of visual producers, VIP entry to major arena tournaments.',
    cons: 'Long weekend hours, irregular schedules, and low structural guidance for operational processes.',
    isInterview: false
  },
  // Zenith Bank review
  {
    id: 'rev6',
    companyId: 'zenith',
    companyName: 'Zenith Bank',
    role: 'Senior Product Manager',
    text: 'Standard corporate structure. Modernizing slowly. High compensation reliability but processes involve massive paperwork and compliance approvals.',
    rating: 3.9,
    date: 'May 10, 2026',
    upvotes: 9,
    author: 'FintechPM',
    wlbRating: 4.0,
    transparencyRating: 3.5,
    responsivenessRating: 3.8,
    difficultyRating: 3.5,
    pros: 'Excellent healthcare benefits, highly structured training programs, 401k matching is outstanding.',
    cons: 'Bureaucracy slows down modern updates, older code stack can be frustrating, several layers of middle managers.',
    isInterview: false
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    text: 'What was the technical design interview like?',
    author: 'Sr. Software Engineer (Candidate)',
    date: '2 days ago',
    difficulty: 'Hard',
    department: 'Engineering',
    upvotes: 18,
    repliesCount: 5,
    communityAnswer: 'Expect a deep-dive on distributed locks, transaction isolation levels, and system scale trade-offs. The interviewers will push you to fail-safe limits, so explain your reasoning out loud throughout the session.',
    replies: [
      { author: 'Jane S.', role: 'Current Lead Engineer', text: 'I interviewer here frequently. Focus heavily on database replication issues, read/write ratios, and eventual consistency trade-offs.', date: 'Yesterday' },
      { author: 'Tom R.', role: 'Interview Candidate', text: 'They also asked about rate limiting algorithms (Leaky Bucket, sliding window) and handling large peak-traffic workloads.', date: '3 days ago' },
      { author: 'Sarah L.', role: 'Senior Developer', text: 'Be sure to display humbleness regarding architectural options; they appreciate pragmatism over academic purity.', date: '4 days ago' }
    ]
  },
  {
    id: 'q2',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    text: 'How do they measure Product Success metrics during the case study?',
    author: 'Product Manager (Candidate)',
    date: '5 days ago',
    difficulty: 'Medium',
    department: 'Product',
    upvotes: 12,
    repliesCount: 2,
    communityAnswer: 'They focus intensely on North Star metrics, cohort retention curves, and monetization tradeoffs. Always structure your framework with user value, acquisition, retention, and monetization step-by-step.',
    replies: [
      { author: 'Alan K.', role: 'Senior Product Manager', text: 'We highly value candidates who look at primary qualitative data too, not just numbers. Do not forget user research loop iterations!', date: '4 days ago' },
      { author: 'Mia W.', role: 'Product Lead', text: 'They will give a real business scenario about TechNova enterprise suites. Practice B2B platform integration scenarios.', date: '3 days ago' }
    ]
  },
  {
    id: 'q3',
    companyId: 'technova',
    companyName: 'TechNova Solutions',
    text: 'What is the format of the Product Designer visual design critique?',
    author: 'UI/UX Designer (Candidate)',
    date: '1 week ago',
    difficulty: 'Medium',
    department: 'Design',
    upvotes: 7,
    repliesCount: 0,
    communityAnswer: 'You will present 1-2 major projects from your portfolio for 30 minutes, followed by a live critique of an app of your selection. They evaluate interactive detail over static aesthetics.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Review Upvoted',
    description: 'A community member noted your review on TechNova Solutions as "Highly Helpful". Keep sharing.',
    timeSimple: '10:42 AM',
    category: 'Activity',
    read: false,
    isToday: true
  },
  {
    id: 'n2',
    title: 'New High Core Match',
    description: 'Nebula AI released a new "Senior Machine Learning Engineer" alignment matching your stored skillset.',
    timeSimple: '8:15 AM',
    category: 'Match',
    read: false,
    isToday: true
  },
  {
    id: 'n3',
    title: 'Watchlist Update',
    description: 'Veridian Creative just had 3 new interview reviews added. Check recent salary markers.',
    timeSimple: 'Yesterday',
    category: 'Activity',
    read: true,
    isToday: false
  },
  {
    id: 'n4',
    title: 'Platform Maintenance Notice',
    description: 'ReeVue platform database migration complete. Session optimization and enhanced filtration are live.',
    timeSimple: '3 days ago',
    category: 'System',
    read: true,
    isToday: false
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Alex D.',
  role: 'Senior Software Engineer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  joinedDate: 'Joined March 2025',
  reviewsCount: 3,
  savedCount: 5,
  helpfulVotes: 32
};

export const INITIAL_WATCHLIST: string[] = ['luminary', 'veridian', 'ecostream'];
export const DISMISSED_WATCHLIST: string[] = [];
