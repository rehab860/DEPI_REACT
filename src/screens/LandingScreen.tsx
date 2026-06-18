import { useState, FormEvent } from 'react';
import { Search, Compass, ArrowRight, Star, MessageSquare } from 'lucide-react';
import { Company, Review } from '../types';

interface LandingScreenProps {
  companies: Company[];
  reviews: Review[];
  setActiveScreen: (screen: string, companyId?: string) => void;
  onSearch: (query: string) => void;
}

export default function LandingScreen({
  companies,
  reviews,
  setActiveScreen,
  onSearch,
}: LandingScreenProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
    setActiveScreen('results');
  };

  const handlePillClick = (val: string) => {
    onSearch(val);
    setActiveScreen('results');
  };

  // Get trending companies (e.g. Nebula AI, Zenith Bank, etc.)
  const trendingList = companies.slice(0, 5);

  // Get recent reviews
  const recentReviewsList = reviews.slice(0, 3);

  return (
    <div className="space-y-16 pb-16" id="landing-page">
      
      {/* Editorial Hero Section */}
      <section className="bg-slate-50 border-b border-gray-100 py-20 px-4 text-center relative overflow-hidden">
        {/* Subtle backdrop aesthetics */}
        <div className="absolute inset-0 bg-radial-gradient from-slate-100 to-transparent opacity-50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase font-mono block">
            REEVUE PLATFORM FOR THE MODERN PROFESSIONAL
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
            Your Experience.<br className="sm:hidden" /> Our Community.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
            The modern standard for company insights. Transparent, curated, and editorialized for the professional world. Authenticity unfiltered by design.
          </p>

          {/* Centered Search Console */}
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row gap-2" id="hero-search-form">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Company, industry, or city..."
                className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-white px-11 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 shadow-xs transition-all"
                id="hero-search-input"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-semibold px-6 py-3.5 rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Explore Insights
            </button>
          </form>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 text-[11px]" id="hero-quick-pills">
            <span className="text-slate-400 font-medium font-mono mr-1">Trending Tags:</span>
            {['Technology', 'Design & Media', 'Financial Services', 'Palo Alto', 'Austin'].map(pill => (
              <button
                key={pill}
                onClick={() => handlePillClick(pill)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-transparent font-sans"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Trending Companies (The Hotlist) */}
        <section className="space-y-6" id="trending-companies-section">
          <div className="flex items-end justify-between border-b border-slate-100 pb-3" id="trending-section-header">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">THE HOTLIST</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Trending Companies</h2>
            </div>
            <button 
              onClick={() => handlePillClick('')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer group"
              id="view-all-rankings-btn"
            >
              View All Rankings
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="trending-grid">
            {trendingList.map((company) => (
              <div 
                key={company.id}
                onClick={() => setActiveScreen('company', company.id)}
                className="group border border-gray-100 rounded-xl bg-white p-5 cursor-pointer hover:border-slate-200 hover:shadow-xs transition-all relative overflow-hidden"
              >
                {/* Score badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-0.5 bg-slate-50 border border-slate-100 rounded-lg px-2 py-0.5" id={`score-${company.id}`}>
                  <Star className="w-3 h-3 text-slate-700 fill-slate-700" />
                  <span className="text-[10px] font-bold font-mono text-slate-800">{company.rating.toFixed(1)}</span>
                </div>

                {/* Company Identifier */}
                <div className="flex flex-col space-y-4 pt-1">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 font-sans font-extrabold text-xs text-white">
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-tight group-hover:text-slate-700 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">{company.industry}</p>
                    <p className="text-[11px] text-slate-400 font-sans">{company.city}</p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{company.totalReviews} Reviews</span>
                  <span className="text-slate-700 font-semibold uppercase">{company.difficulty} Match</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Recent Reviews (Real-Time Feedback) */}
        <section className="space-y-6" id="recent-reviews-section">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">REAL TIME FEEDBACK</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Recent Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="recent-reviews-grid">
            {recentReviewsList.map((review) => (
              <div 
                key={review.id}
                onClick={() => setActiveScreen('company', review.companyId)}
                className="border border-gray-100 rounded-xl bg-white p-5 cursor-pointer hover:border-slate-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Review Header card */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{review.role}</h4>
                      <p className="text-[10px] text-slate-500 tracking-tight font-mono">at {review.companyName}</p>
                    </div>
                    {/* Stars */}
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(review.rating) 
                              ? 'text-slate-700 fill-slate-700' 
                              : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Core Content */}
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                    "{review.text}"
                  </p>
                </div>

                {/* Foot indicators */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>by {review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: How it Works (The Editorial Approach) */}
        <section className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-12 text-center space-y-8" id="how-it-works-section">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">OUR PARADIGM</span>
            <h2 className="text-2xl font-bold text-slate-900 font-display">The Editorial Approach</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Unlike legacy review boards, we require holistic scorecards, clear experience indicators, and balanced reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-4" id="steps-grid">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Filter & Search</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Query our catalog of vetted company insights across technology fields, capital markets, design sectors, and medical nodes.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Validate Difficulty</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Inspect high-fidelity timelines, interview questionnaires, offer rate stats, and granular metrics like HR responsiveness.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Anonymous Contribution</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Share details of your recruitment cycle or working experience through dynamic metric fields securely and anonymously.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Lead CTA Banner to Submit Review */}
        <section className="bg-slate-900 rounded-2xl relative overflow-hidden py-12 px-8 sm:px-12 flex flex-col md:flex-row items-center justify-between text-left gap-8 shadow-sm" id="banner-cta">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Join the community.</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Share your experience today and shape the future of work. Your insights are strictly private and post anonymously.
            </p>
          </div>
          <button 
            onClick={() => setActiveScreen('submit-review')}
            className="text-slate-900 bg-white hover:bg-slate-100 font-sans text-xs font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shadow-xs"
          >
            Submit Review
          </button>
        </section>

      </div>
    </div>
  );
}
