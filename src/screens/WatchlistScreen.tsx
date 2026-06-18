import { Eye, Star, MapPin, Building, ArrowRight, Trash2, ShieldAlert } from 'lucide-react';
import { Company } from '../types';

interface WatchlistScreenProps {
  companies: Company[];
  watchlist: string[];
  toggleWatchlist: (companyId: string) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
}

export default function WatchlistScreen({
  companies,
  watchlist,
  toggleWatchlist,
  setActiveScreen
}: WatchlistScreenProps) {
  
  // Filter company objects matching watchlist array IDs
  const watchedCompanies = companies.filter(c => watchlist.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="watchlist-page">
      
      {/* Header section block */}
      <div className="mb-8 space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-[#6366f1] uppercase font-mono block">MONITORED REGISTRY</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Your Watchlist
        </h1>
        <p className="text-xs text-slate-500 font-sans">
          Monitor company scorecards, salaries, and keep track of peer interview additions on your personalized feed.
        </p>
      </div>

      {watchedCompanies.length > 0 ? (
        /* Watching Grid List */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="watchlist-grid">
          {watchedCompanies.map((company) => (
            <div
              key={company.id}
              className="border border-slate-100 hover:border-slate-200 rounded-2xl bg-white p-6 flex flex-col justify-between group relative hover:shadow-xs transition-all duration-200"
              id={`watchlist-card-${company.id}`}
            >
              {/* Delete button from watchlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(company.id);
                }}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                title="Remove from watchlist"
                id={`unwatch-${company.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                {/* Logo and aggregate stars */}
                <div className="flex items-center space-x-3">
                  <div 
                    onClick={() => setActiveScreen('company', company.id)}
                    className="h-12 w-12 rounded-xl bg-slate-900 text-white font-display font-black text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    {company.logo}
                  </div>
                  <div>
                    <h3 
                      onClick={() => setActiveScreen('company', company.id)}
                      className="font-bold text-sm text-slate-900 font-display group-hover:text-slate-700 cursor-pointer transition-colors"
                    >
                      {company.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{company.industry}</p>
                  </div>
                </div>

                {/* Score panel */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg text-center text-[10px] font-mono text-slate-500 border border-slate-100">
                  <div>
                    <span>Score:</span>
                    <span className="font-bold text-slate-800 block">{company.rating.toFixed(1)} <Star className="w-2.5 h-2.5 inline align-middle text-slate-700 fill-slate-700" /></span>
                  </div>
                  <div>
                    <span>Complexity:</span>
                    <span className="font-bold text-slate-800 block">{company.difficulty}</span>
                  </div>
                  <div>
                    <span>Offer Rate:</span>
                    <span className="font-bold text-slate-800 block">{company.offerRate}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                  {company.description}
                </p>
              </div>

              {/* Inspect profile trigger link */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[10px]">{company.totalReviews} Peer Checklist Scorecards</span>
                <button
                  onClick={() => setActiveScreen('company', company.id)}
                  className="flex items-center gap-1 font-bold text-slate-900 hover:text-slate-600 transition-colors pointer-events-auto cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Watchlist State */
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white max-w-lg mx-auto space-y-4" id="watchlist-empty-state">
          <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
            <Eye className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-slate-900 text-sm">Your Watchlist is Empty</h3>
            <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto leading-relaxed">
              Toggle the eye follow switch across company listings or scorecards to populate this direct monitoring feed.
            </p>
          </div>
          <button
            onClick={() => setActiveScreen('results')}
            className="text-white bg-slate-900 hover:bg-slate-800 font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Explore Companies
          </button>
        </div>
      )}
    </div>
  );
}
