import { useState, useMemo } from 'react';
import { Search, Star, Filter, SlidersHorizontal, Eye, EyeOff, LayoutGrid, Check, MapPin, Building2, HelpCircle } from 'lucide-react';
import { Company } from '../types';

interface SearchListingScreenProps {
  companies: Company[];
  watchlist: string[];
  toggleWatchlist: (companyId: string) => void;
  setActiveScreen: (screen: string, companyId?: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchListingScreen({
  companies,
  watchlist,
  toggleWatchlist,
  setActiveScreen,
  searchQuery,
  onSearch
}: SearchListingScreenProps) {
  
  // Local Filter States
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('Any');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Any');
  const [sortBy, setSortBy] = useState<string>('Most Reviewed');
  
  // Available cities from static list
  const cities = ['All', 'Palo Alto, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY', 'San Francisco, CA', 'Boston, MA', 'Boulder, CO'];

  // Handle industry toggling 
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(ind => ind !== industry) 
        : [...prev, industry]
    );
  };

  // Filter companies dynamically based on global search text AND all sidebar filters
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      // 1. Global Search Filter (matches name, industry, or city)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          company.name.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.city.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query);
          
        if (!matchesQuery) return false;
      }

      // 2. Industry Sidebar Filter
      if (selectedIndustries.length > 0 && !selectedIndustries.includes(company.industry)) {
        return false;
      }

      // 3. City Sidebar Filter
      if (selectedCity !== 'All' && company.city !== selectedCity) {
        return false;
      }

      // 4. Size Sidebar Filter
      if (selectedSize !== 'Any' && company.size !== selectedSize) {
        return false;
      }

      // 5. Rating Sidebar Filter
      if (minRating > 0 && company.rating < minRating) {
        return false;
      }

      // 6. Difficulty Sidebar Filter
      if (selectedDifficulty !== 'Any' && company.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [companies, searchQuery, selectedIndustries, selectedCity, selectedSize, minRating, selectedDifficulty]);

  // Sort companies dynamically
  const sortedAndFilteredCompanies = useMemo(() => {
    const list = [...filteredCompanies];
    if (sortBy === 'Most Reviewed') {
      return list.sort((a, b) => b.totalReviews - a.totalReviews);
    } else if (sortBy === 'Highest Rated') {
      return list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Newest First') {
      return list; // default ordered
    }
    return list;
  }, [filteredCompanies, sortBy]);

  const clearAllFilters = () => {
    setSelectedIndustries([]);
    setSelectedCity('All');
    setSelectedSize('Any');
    setMinRating(0);
    setSelectedDifficulty('Any');
    onSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="search-results-page">
      
      {/* Search Header Banner */}
      <div className="mb-8 space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block">ENTERPRISE CLASSIFICATION</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          Search Results
        </h1>
        <p className="text-xs text-slate-500 font-sans">
          Find vetted employer scorecards, peer feedback channels, and interview process transparency indices.
        </p>
      </div>

      {/* Main Structural Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:col-span-1 border border-slate-100 rounded-2xl bg-white p-6 h-fit" id="sidebar-filters">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold font-display uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Filter By
            </h3>
            <button 
              onClick={clearAllFilters}
              className="text-[10px] font-mono text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
              id="clear-filters-btn"
            >
              Reset All
            </button>
          </div>

          {/* Industry selection list */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Industry</label>
            <div className="space-y-1.5" id="industry-filter-group">
              {['Technology', 'Design & Media', 'Financial Services', 'Healthcare'].map(industry => {
                const isActive = selectedIndustries.includes(industry);
                return (
                  <button
                    key={industry}
                    onClick={() => toggleIndustry(industry)}
                    className={`w-full flex items-center justify-between text-left text-xs px-3 py-2 rounded-xl transition-all border outline-none ${
                      isActive 
                        ? 'bg-slate-900 border-slate-900 text-white font-medium shadow-2xs' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{industry}</span>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* City Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
              id="city-filter-select"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city === 'All' ? 'All Locations' : city}</option>
              ))}
            </select>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Company Size</label>
            <div className="grid grid-cols-2 gap-1.5" id="company-size-grid">
              {['Any', '1-50', '51-200', '201-1000', '1000+'].map(size => {
                const isActive = (size === 'Any' && selectedSize === 'Any') || (selectedSize === size);
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size === 'Any' ? 'Any' : size)}
                    className={`text-[11px] py-1.5 rounded-lg border text-center transition-all ${
                      isActive 
                        ? 'bg-slate-900 border-slate-900 text-white font-semibold' 
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {size === 'Any' ? 'Any Size' : size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Rating Stars Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase block">Minimum Rating</label>
            <div className="flex items-center space-x-1.5" id="rating-star-selector">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setMinRating(prev => prev === star ? 0 : star)}
                  className="focus:outline-none cursor-pointer"
                >
                  <Star 
                    className={`w-6 h-6 transition-colors ${
                      star <= minRating 
                        ? 'text-slate-800 fill-slate-800' 
                        : 'text-slate-200 hover:text-slate-400'
                    }`} 
                  />
                </button>
              ))}
              {minRating > 0 && (
                <span className="text-[11px] font-semibold font-mono text-slate-600 pl-1">{minRating}+ Stars</span>
              )}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Interview Difficulty</label>
            <div className="flex flex-col space-y-1.5" id="difficulty-radio-group">
              {['Any', 'Easy', 'Medium', 'Hard'].map(diff => (
                <label key={diff} className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="difficulty"
                    checked={selectedDifficulty === diff}
                    onChange={() => setSelectedDifficulty(diff)}
                    className="accent-slate-900 h-3.5 w-3.5"
                  />
                  <span>{diff === 'Any' ? 'Any Difficulty' : diff}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Listing Area */}
        <section className="lg:col-span-3 space-y-6" id="results-listing">
          {/* List Statistics Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800 font-display">
                {sortedAndFilteredCompanies.length} Companies Available
              </h2>
              {searchQuery && (
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Matching phrase: <span className="text-slate-900 font-mono font-bold">"{searchQuery}"</span>
                </p>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2.5 text-xs">
              <span className="text-slate-400 font-mono">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                id="companies-sort"
              >
                <option value="Most Reviewed">Most Reviewed</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="Newest First">Newest First</option>
              </select>
            </div>
          </div>

          {/* Main Companies List Stack */}
          {sortedAndFilteredCompanies.length > 0 ? (
            <div className="space-y-4" id="companies-cards-container">
              {sortedAndFilteredCompanies.map((company) => {
                const isWatched = watchlist.includes(company.id);
                return (
                  <div
                    key={company.id}
                    className="relative border border-slate-100 hover:border-slate-200 rounded-2xl bg-white p-6 transition-all flex flex-col md:flex-row gap-6 hover:shadow-xs group"
                    id={`company-card-${company.id}`}
                  >
                    {/* Floating Watchlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(company.id);
                      }}
                      className={`absolute top-6 right-6 p-2 rounded-xl border transition-all ${
                        isWatched 
                          ? 'bg-slate-900 border-slate-900 text-white' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'
                      }`}
                      title={isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      id={`watchlist-toggle-${company.id}`}
                    >
                      {isWatched ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    {/* Logo Identifier Box */}
                    <div 
                      onClick={() => setActiveScreen('company', company.id)}
                      className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 flex items-center justify-center rounded-2xl bg-slate-900 font-display font-extrabold text-sm sm:text-lg text-white cursor-pointer hover:scale-105 transition-transform"
                    >
                      {company.logo}
                    </div>

                    {/* Left details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        {/* Company Name & Sector */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 
                            onClick={() => setActiveScreen('company', company.id)}
                            className="font-display font-bold text-base sm:text-lg text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
                          >
                            {company.name}
                          </h3>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            {company.industry}
                          </span>
                        </div>
                        {/* Location */}
                        <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{company.city}</span>
                          <span className="mx-1">•</span>
                          <Building2 className="w-3 h-3" />
                          <span>{company.size} employees</span>
                        </div>
                      </div>

                      {/* Score Metrics Horizontal Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        {/* Total Rating */}
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Overall Score</p>
                          <div className="flex items-center space-x-1 mt-0.5">
                            <Star className="w-3.5 h-3.5 text-slate-800 fill-slate-800" />
                            <span className="text-xs font-bold text-slate-900 font-mono">{company.rating.toFixed(1)}</span>
                            <span className="text-[10px] text-slate-400">({company.totalReviews})</span>
                          </div>
                        </div>

                        {/* Prep Difficulty */}
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Interview level</p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">{company.difficulty}</p>
                        </div>

                        {/* Offer Rate */}
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Offer Rate</p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">{company.offerRate}%</p>
                        </div>

                        {/* WLB Grade */}
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Work-Life Balance</p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">{company.wlb.toFixed(1)} / 5.0</p>
                        </div>
                      </div>

                      {/* Brief description */}
                      <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-2">
                        {company.description}
                      </p>

                      {/* Action trigger links */}
                      <div className="flex items-center gap-4 mt-3 pt-1">
                        <button
                          onClick={() => setActiveScreen('company', company.id)}
                          className="text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                          View Full Profile
                        </button>
                        <span className="text-slate-200">|</span>
                        <button
                          onClick={() => {
                            setActiveScreen('company', company.id);
                            // Set immediate visual cue
                          }}
                          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          Interview Experience (Q&A)
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty Result State */
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white space-y-4" id="empty-companies-state">
              <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-slate-900 text-sm">No Companies Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                  We couldn't find matches under your specific combined selectors. Try clearing filters to see our basic registry.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold px-4 py-2 border rounded-xl hover:bg-slate-50"
              >
                Clear All Constraints
              </button>
            </div>
          )}

          {/* Simple Pagination Footer */}
          {sortedAndFilteredCompanies.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-6 text-xs text-slate-400 font-mono" id="pagination-footer">
              <span>Showing 1-{sortedAndFilteredCompanies.length} of {sortedAndFilteredCompanies.length} matches</span>
              <div className="flex space-x-2">
                <button disabled className="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-300 pointer-events-none">Prev</button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700">Next</button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
