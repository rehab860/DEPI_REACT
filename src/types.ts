export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: 'Technology' | 'Design & Media' | 'Financial Services' | 'Healthcare' | string;
  city: string;
  rating: number;
  totalReviews: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  offerRate: number; // e.g. 15 for 15%
  wlb: number; // e.g. 4.0
  size: '1-50' | '51-200' | '201-1000' | '1000+';
  description: string;
  prosCount?: number;
  consCount?: number;
}

export interface Review {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  upvotes: number;
  author: string;
  wlbRating: number;
  transparencyRating: number;
  responsivenessRating: number;
  difficultyRating: number;
  pros: string;
  cons: string;
  isInterview: boolean;
  interviewOutcome?: 'Offer' | 'No Offer' | 'Withdrew';
}

export interface Question {
  id: string;
  companyId: string;
  companyName: string;
  text: string;
  author: string;
  date: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  department: 'Engineering' | 'Product' | 'Design' | 'Operations' | string;
  upvotes: number;
  repliesCount: number;
  communityAnswer?: string;
  replies?: Array<{
    author: string;
    text: string;
    role: string;
    date: string;
  }>;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timeSimple: string;
  category: 'Match' | 'Activity' | 'Alert' | 'System';
  read: boolean;
  isToday?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  joinedDate: string;
  reviewsCount: number;
  savedCount: number;
  helpfulVotes: number;
}
