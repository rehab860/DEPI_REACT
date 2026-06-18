import { useState } from 'react';
import { User, Award, CheckCircle, Edit, Trash2, Calendar, Star, ThumbsUp, ArrowRight, Bookmark, MessageSquare } from 'lucide-react';
import { UserProfile, Review, Company, Question } from '../types';

interface UserProfileScreenProps {
  user: UserProfile;
  reviews: Review[];
  companies: Company[];
  questions: Question[];
  watchlist: string[];
  onDeleteReview: (reviewId: string) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
}

export default function UserProfileScreen({
  user,
  reviews,
  companies,
  questions,
  watchlist,
  onDeleteReview,
  setActiveScreen
}: UserProfileScreenProps) {
  
  const [activeTab, setActiveTab] = useState<'reviews' | 'saved' | 'comments'>('reviews');

  // Filter Alex D. specific reviews (author matches "Alex D.")
  const userReviews = reviews.filter(r => r.author === user.name);

  // Filter Alex D. saved companies
  const savedCompanies = companies.filter(c => watchlist.includes(c.id));

  // Filter questions asked by "Alex D." or replied to
  const userQuestions = questions.filter(q => q.author.includes(user.name) || q.communityAnswer?.includes(user.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="profile-page">
      
      {/* Header Summary Metadata bar */}
      <div className="border border-slate-100 rounded-2xl bg-white p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" id="profile-bar-header">
        <div className="flex items-center space-x-3.5">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono text-slate-500 font-semibold">{user.joinedDate}</span>
          <span className="text-slate-200">|</span>
          <span className="text-xs font-sans text-slate-500">Alex D. has verified credentials on record</span>
        </div>
        <div className="text-right text-xs font-mono font-bold text-emerald-600 flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Profile Status: Active Curated Expert</span>
        </div>
      </div>

      {/* Primary Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Info & achievements */}
        <div className="lg:col-span-1 space-y-6" id="profile-sidebar">
          
          {/* Identity Card */}
          <div className="border border-slate-100 rounded-2xl bg-white p-6 text-center space-y-4" id="identity-card">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-slate-50"
            />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 font-display">{user.name}</h2>
              <p className="text-xs text-slate-500 tracking-tight font-sans">{user.role}</p>
            </div>

            <button
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
              id="edit-profile-btn"
            >
              Edit Profile
            </button>
          </div>

          {/* Activity Statistics Card */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3" id="profile-stats-card">
            <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-50 pb-2">
              Metrics Scorecard
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-50 pb-2 text-slate-500">
                <span>Reviews</span>
                <span className="text-slate-900 font-bold">{userReviews.length}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2 text-slate-500">
                <span>Saved Companies</span>
                <span className="text-slate-900 font-bold">{watchlist.length}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Helpful Votes</span>
                <span className="text-slate-900 font-bold">{user.helpfulVotes}</span>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="border border-slate-100 rounded-2xl bg-white p-5 space-y-4" id="achievements-card">
            <h4 className="text-[10px] font-bold tracking-widest text-[#4f46e5] uppercase font-mono">Special achievements</h4>
            <div className="space-y-3">
              {/* Badge 1 */}
              <div className="flex items-center space-x-3 bg-indigo-50/50 border border-indigo-100 p-2.5 rounded-xl">
                <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-950 font-display">TOP CURATOR</p>
                  <p className="text-[9px] text-indigo-500 font-mono">Vetted reviews contributor</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center space-x-3 bg-indigo-50/50 border border-indigo-100 p-2.5 rounded-xl">
                <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-950 font-display">30+ HELPFUL VOTES</p>
                  <p className="text-[9px] text-indigo-500 font-mono">Peer consensus approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Tab Content Feed */}
        <section className="lg:col-span-3 space-y-6" id="profile-primary-feed">
          
          {/* Tabs header */}
          <div className="border-b border-slate-100 flex items-center space-x-8" id="profile-feed-tabs">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`relative py-4 text-xs font-bold uppercase tracking-wider font-mono transition-all ${
                activeTab === 'reviews' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
              }`}
              id="profile-tab-my-reviews"
            >
              My Reviews ({userReviews.length})
              {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />}
            </button>
            
            <button
              onClick={() => setActiveTab('saved')}
              className={`relative py-4 text-xs font-bold uppercase tracking-wider font-mono transition-all ${
                activeTab === 'saved' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
              }`}
              id="profile-tab-saved-companies"
            >
              Saved Companies ({savedCompanies.length})
              {activeTab === 'saved' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />}
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`relative py-4 text-xs font-bold uppercase tracking-wider font-mono transition-all ${
                activeTab === 'comments' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'
              }`}
              id="profile-tab-my-qa"
            >
              My Q&A ({userQuestions.length})
              {activeTab === 'comments' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />}
            </button>
          </div>

          {/* Dynamic Feed Body depending on active selection */}
          {activeTab === 'reviews' && (
            <div className="space-y-4" id="feed-reviews-content">
              {userReviews.length > 0 ? (
                userReviews.map((rev) => (
                  <div key={rev.id} className="border border-slate-100 rounded-2xl bg-white p-6 space-y-4 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100 overflow-none bg-slate-900 text-white px-2 py-0.5 rounded-md inline-block mr-2 text-[10px] uppercase font-mono">
                          {rev.companyName}
                        </h4>
                        <span className="font-bold text-xs text-slate-800 font-display">{rev.role}</span>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Submitted on {rev.date}</p>
                      </div>

                      {/* Score stars */}
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < Math.floor(rev.rating) ? 'text-slate-800 fill-slate-800' : 'text-slate-200'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      "{rev.text}"
                    </p>

                    {/* Action buttons (Edit/Delete options) */}
                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1.5 text-slate-400 font-mono text-[10px]">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{rev.upvotes} peers marked as helpful</span>
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            // Quick alert visual or edit setup
                            alert('Edit scorecard is loaded. Update values in the Review tab.');
                            setActiveScreen('submit-review');
                          }}
                          className="flex items-center space-x-1 p-1.5 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100 rounded-lg bg-slate-50"
                          title="Edit scorecard"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteReview(rev.id)}
                          className="flex items-center space-x-1 p-1.5 text-slate-400 hover:text-red-600 transition-colors border border-red-50 rounded-lg bg-red-50/50"
                          title="Delete review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white text-xs text-slate-400">
                  You haven't submitted any reviews yet. Click Submit Review above!
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="feed-saved-content">
              {savedCompanies.length > 0 ? (
                savedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="border border-slate-100 rounded-2xl bg-white p-5 flex flex-col justify-between group cursor-pointer hover:border-slate-200 hover:shadow-xs transition-all"
                    onClick={() => setActiveScreen('company', company.id)}
                    id={`saved-card-${company.id}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-9 w-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-display font-black text-xs">
                          {company.logo}
                        </div>
                        <div className="flex items-center space-x-0.5 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                          <Star className="w-3 h-3 text-slate-700 fill-slate-700" />
                          <span className="text-[10px] font-bold font-mono">{company.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-slate-700 transition-colors">
                          {company.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{company.industry} • {company.city}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-50 text-[10px] text-slate-400 font-mono">
                      <span>{company.totalReviews} peer evaluations on file</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white text-xs text-slate-400">
                  No followed companies on watch. Explore search results and toggle follow.
                </div>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4" id="feed-comments-content">
              {userQuestions.length > 0 ? (
                userQuestions.map((q) => (
                  <div key={q.id} className="border border-slate-100 rounded-2xl bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                      <span className="text-[9px] font-bold font-mono text-indigo-600 tracking-wider font-display uppercase">{q.department}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Posted at {q.companyName}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      "{q.text}"
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg text-xs leading-relaxed text-slate-500 border border-slate-100">
                      <span className="font-bold text-[10px] font-mono text-slate-400 block mb-1">Your reply blueprint:</span>
                      "{q.communityAnswer}"
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white text-xs text-slate-400">
                  No discussions on file yet. Visit any interview question and add a viewpoint!
                </div>
              )}
            </div>
          )}

          {/* Prompt to write more reviews */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between text-left gap-4 hover:border-slate-200 transition-all font-sans" id="ready-share-more-insights">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 font-display">Ready to share more insights?</h4>
              <p className="text-xs text-slate-500">Grow our editorial repository today to earn higher-tier curator achievements!</p>
            </div>
            <button
              onClick={() => setActiveScreen('submit-review')}
              className="text-white bg-slate-900 hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Submit Scorecard
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}
