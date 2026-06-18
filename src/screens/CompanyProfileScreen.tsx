import { useState, FormEvent } from 'react';
import { ArrowLeft, Star, MapPin, Building2, HelpCircle, Briefcase, ThumbsUp, Mail, TrendingUp } from 'lucide-react';
import { Company, Review } from '../types';

interface CompanyProfileScreenProps {
  company: Company;
  reviews: Review[];
  watchlist: string[];
  toggleWatchlist: (companyId: string) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
  onUpvoteReview: (reviewId: string) => void;
}

export default function CompanyProfileScreen({
  company,
  reviews,
  watchlist,
  toggleWatchlist,
  setActiveScreen,
  onUpvoteReview
}: CompanyProfileScreenProps) {
  
  const [activeTab, setActiveTab] = useState<'Overview' | 'Reviews' | 'Salaries'>('Overview');
  const [emailInput, setEmailInput] = useState('');
  const [newsSigned, setNewsSigned] = useState(false);

  // Filter reviews for this company
  const companyReviews = reviews.filter(r => r.companyId === company.id);
  const isWatched = watchlist.includes(company.id);

  const handleNewsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsSigned(true);
      setEmailInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="company-profile-page">
      
      {/* Back to search navigation */}
      <button
        onClick={() => setActiveScreen('results')}
        className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        id="back-to-results"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Search Results</span>
      </button>

      {/* Profile Header Block */}
      <div className="border border-slate-100 rounded-2xl bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8" id="profile-header-card">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-900 flex items-center justify-center font-display font-black text-xl sm:text-2xl text-white">
            {company.logo}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              {company.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-600 font-mono px-2 py-0.5 rounded-md bg-slate-100 uppercase">
                {company.industry}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {company.city}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {company.size} employees
              </span>
            </div>
          </div>
        </div>

        {/* Header Action Button */}
        <button
          onClick={() => toggleWatchlist(company.id)}
          className={`px-5 py-2.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
            isWatched
              ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
          }`}
          id="follow-company-btn"
        >
          {isWatched ? 'Following Company' : 'Follow Company'}
        </button>
      </div>

      {/* Aggregate Score Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" id="metrics-overview-grid">
        {/* Metric 1 */}
        <div className="border border-slate-100 rounded-xl bg-white p-5 flex flex-col justify-between">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">Overall Rating</span>
          <div className="flex items-end space-x-1.5 mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{company.rating.toFixed(1)}</span>
            <div className="flex space-x-0.5 mb-1">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < Math.floor(company.rating)
                      ? 'text-slate-800 fill-slate-800'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-sans mt-1">Based on {company.totalReviews} peer submission checklists</span>
        </div>

        {/* Metric 2 */}
        <div className="border border-slate-100 rounded-xl bg-white p-5 flex flex-col justify-between">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">Interview level</span>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-black text-slate-950 font-display">{company.difficulty}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans mt-1">3.8 / 5.0 difficulty difficulty rating</span>
        </div>

        {/* Metric 3 */}
        <div className="border border-slate-100 rounded-xl bg-white p-5 flex flex-col justify-between">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">Offer Rate</span>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{company.offerRate}%</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans mt-1">Recruitment timeline of 4.2 weeks average</span>
        </div>

        {/* Metric 4 */}
        <div className="border border-slate-100 rounded-xl bg-white p-5 flex flex-col justify-between">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">Work-Life Balance</span>
          <div className="flex items-baseline space-x-1 mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">{company.wlb.toFixed(1)}</span>
            <span className="text-xs text-slate-400 font-mono">/ 5.0</span>
          </div>
          <span className="text-[10px] text-slate-400 font-sans mt-1">Exceptional flexibility rating mark</span>
        </div>
      </div>

      {/* Inner Navigation Tabs */}
      <div className="border-b border-slate-100 flex items-center space-x-8 mb-8" id="profile-tabs">
        {(['Overview', 'Reviews', 'Salaries'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-4 text-xs font-bold tracking-widest uppercase font-mono transition-all ${
              activeTab === tab
                ? 'text-slate-900'
                : 'text-slate-400 hover:text-slate-900'
            }`}
            id={`profile-tab-${tab.toLowerCase()}`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
            )}
          </button>
        ))}

        <button
          onClick={() => setActiveScreen('interview', company.id)}
          className="relative py-4 text-xs font-bold tracking-widest uppercase font-mono text-slate-400 hover:text-slate-900 transition-all flex items-center gap-1.5"
          id="profile-tab-qa"
        >
          Interview Q&A
          <span className="text-[9px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.2 rounded-full border border-indigo-100">Hot</span>
        </button>
      </div>

      {/* Screen Body Structural Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Content details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active sub-tab conditional render */}
          {activeTab === 'Overview' && (
            <div className="space-y-8" id="tab-overview-content">
              {/* Application offer timeline visual map */}
              <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">Application to Offer Timeline</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Average recruitment process timeline map: 4.2 weeks total length.</p>
                </div>

                <div className="grid grid-cols-4 gap-2 relative mt-4">
                  {/* Progress Line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100 z-0 sm:block hidden" />

                  {/* Step 1 */}
                  <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
                    <div className="h-8.5 w-8.5 bg-slate-900 border border-slate-950 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
                      1
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">Applied</p>
                    <p className="text-[9px] text-slate-400 font-mono">Day 1</p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
                    <div className="h-8.5 w-8.5 bg-slate-900 border border-slate-950 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
                      2
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">Phone Screen</p>
                    <p className="text-[9px] text-slate-400 font-mono">7 Days Avg</p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
                    <div className="h-8.5 w-8.5 bg-slate-900 border border-slate-950 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
                      3
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">On-site Interview</p>
                    <p className="text-[9px] text-slate-400 font-mono">18 Days Avg</p>
                  </div>

                  {/* Step 4 */}
                  <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
                    <div className="h-8.5 w-8.5 bg-slate-900 border border-slate-950 text-white rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-2xs animate-pulse">
                      4
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">Decision Offer</p>
                    <p className="text-[9px] text-slate-400 font-mono">29 Days Avg</p>
                  </div>
                </div>
              </div>

              {/* Brief Reviews list under Overview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Featured Employee Feed</h3>
                  <button 
                    onClick={() => setActiveTab('Reviews')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900"
                  >
                    Read All {companyReviews.length} Reviews
                  </button>
                </div>

                <div className="space-y-4">
                  {companyReviews.map((rev) => (
                    <div key={rev.id} className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 font-display">{rev.role}</h4>
                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-0.5">
                            <span className="font-semibold text-slate-600">{rev.author}</span>
                            <span>•</span>
                            <span>{rev.date}</span>
                            <span>•</span>
                            {rev.isInterview ? (
                              <span className="text-indigo-600 font-bold uppercase font-mono">Interview Review</span>
                            ) : (
                              <span className="text-emerald-600 font-bold uppercase font-mono">Work Review</span>
                            )}
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(rev.rating) 
                                  ? 'text-slate-800 fill-slate-800' 
                                  : 'text-slate-200'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        "{rev.text}"
                      </p>

                      {/* Pros & Cons detailed block */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Growth Opportunities / Pros</p>
                          <p className="text-xs text-slate-600 font-sans mt-1">{rev.pros}</p>
                        </div>
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono">Friction points / Cons</p>
                          <p className="text-xs text-slate-600 font-sans mt-1">{rev.cons}</p>
                        </div>
                      </div>

                      {/* Helpful counters */}
                      <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                        <button
                          onClick={() => onUpvoteReview(rev.id)}
                          className="flex items-center space-x-1.5 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                          id={`upvote-review-${rev.id}`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-mono">{rev.upvotes} Helpful Votes</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="space-y-4" id="tab-reviews-content">
              <h3 className="text-sm font-bold text-slate-900 font-display border-b border-slate-100 pb-3 uppercase tracking-wider">
                Full Vetted Peer Reviews ({companyReviews.length})
              </h3>
              {companyReviews.map((rev) => (
                <div key={rev.id} className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 font-display">{rev.role}</h4>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-600">{rev.author}</span>
                        <span>•</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(rev.rating) 
                              ? 'text-slate-800 fill-slate-800' 
                              : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Scores breakdown slider block */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] font-mono text-slate-500">
                    <div>
                      <span>WLB Balance:</span>
                      <span className="font-bold text-slate-800 block">{rev.wlbRating.toFixed(1)} / 5.0</span>
                    </div>
                    <div>
                      <span>Process Transparency:</span>
                      <span className="font-bold text-slate-800 block">{rev.transparencyRating.toFixed(1)} / 5.0</span>
                    </div>
                    <div>
                      <span>Recruiter Response:</span>
                      <span className="font-bold text-slate-800 block">{rev.responsivenessRating.toFixed(1)} / 5.0</span>
                    </div>
                    <div>
                      <span>Interviews difficulty:</span>
                      <span className="font-bold text-slate-800 block">{rev.difficultyRating.toFixed(1)} / 5.0</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    "{rev.text}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">Growth Opportunities / Pros</p>
                      <p className="text-xs text-slate-600 font-sans mt-1">{rev.pros}</p>
                    </div>
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono">Friction points / Cons</p>
                      <p className="text-xs text-slate-600 font-sans mt-1">{rev.cons}</p>
                    </div>
                  </div>

                  {/* Helpful buttons */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <button
                      onClick={() => onUpvoteReview(rev.id)}
                      className="flex items-center space-x-1.5 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                      id={`upvote-review-tab-${rev.id}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">{rev.upvotes} Helpful Votes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Salaries' && (
            <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-6" id="tab-salaries-content">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">Salary & Compensation Estimates</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Average base salaries submitted anonymously by employees at TechNova.</p>
              </div>

              <div className="space-y-4" id="salaries-list">
                {/* Role 1 */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 font-display">Senior Software Engineer</p>
                    <p className="text-[10px] text-slate-400 font-mono">15 Submissions • Technology department</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 font-sans">$165,000 - $210,000</p>
                    <p className="text-[9px] text-slate-400 font-mono">Median: $182,500/yr</p>
                  </div>
                </div>

                {/* Role 2 */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 font-display">Product Designer</p>
                    <p className="text-[10px] text-slate-400 font-mono">8 Submissions • Design department</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 font-sans">$130,000 - $175,000</p>
                    <p className="text-[9px] text-slate-400 font-mono">Median: $152,000/yr</p>
                  </div>
                </div>

                {/* Role 3 */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 font-display">Data Scientist</p>
                    <p className="text-[10px] text-slate-400 font-mono">5 Submissions • Research department</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 font-sans">$155,000 - $190,000</p>
                    <p className="text-[9px] text-slate-400 font-mono">Median: $171,000/yr</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          
          {/* Quick CTA to Submit review for TechNova */}
          <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">Share Your Insight</h4>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Have you interviewed at or worked at {company.name}? Share metrics anonymously.
            </p>
            <button
              onClick={() => setActiveScreen('submit-review')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold py-3 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
            >
              Submit a Scorecard
            </button>
          </div>

          {/* Institutional Newsletter signup */}
          <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4" id="newsletter-widget">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-[#6366f1] uppercase font-mono block">EDITORIAL PULSE</span>
              <h4 className="text-xs font-bold text-slate-900 font-display uppercase">Weekly Digest</h4>
            </div>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              Get raw, vetted salary markers, work flexibility changes, and interview question banks direct.
            </p>
            
            {newsSigned ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3.5 text-center text-xs space-y-1">
                <p className="font-semibold">Vetting is Active!</p>
                <p className="text-[10px] text-emerald-600">You are configured for the weekly brief digest.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 font-sans text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Join Weekly Pulse
                </button>
              </form>
            )}
          </div>

          {/* Quick Stats alignment card */}
          <div className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-950 font-display uppercase tracking-widest">Alignment</h4>
            <div className="space-y-3 font-mono text-[11px] text-slate-500">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span>Vetting Authority</span>
                <span className="text-slate-900 font-bold">Consensus Approved</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span>Core Sentiment</span>
                <span className="text-emerald-600 font-bold">Extremely Positive</span>
              </div>
              <div className="flex justify-between">
                <span>Vetted Indices</span>
                <span className="text-slate-900 font-bold">100% Verified</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
