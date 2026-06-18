import { useState, FormEvent } from 'react';
import { Bell, Search, Award, LogOut, Check, Building2, User } from 'lucide-react';
import { UserProfile, AppNotification } from '../types';

interface HeaderProps {
  activeScreen: string;
  setActiveScreen: (screen: string, companyId?: string) => void;
  user: UserProfile;
  notifications: AppNotification[];
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export default function Header({
  activeScreen,
  setActiveScreen,
  user,
  notifications,
  onSearch,
  isLoggedIn,
  setIsLoggedIn
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
      setActiveScreen('results');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveScreen('home'); setSearchVal(''); }}
          className="flex cursor-pointer items-center space-x-2"
          id="header-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 font-display font-bold text-white shadow-sm hover:scale-105 transition-transform duration-200">
            RV
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
            Ree<span className="text-gray-500 font-light">Vue</span>
          </span>
        </div>

        {/* Global Desktop Navigation */}
        <nav className="hidden md:flex space-x-8" id="header-nav">
          <button
            onClick={() => setActiveScreen('home')}
            className={`relative py-5 text-sm font-medium transition-all ${
              activeScreen === 'home' 
                ? 'text-slate-900' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
            id="nav-home"
          >
            Home
            {activeScreen === 'home' && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
            )}
          </button>
          
          <button
            onClick={() => setActiveScreen('trending')}
            className={`relative py-5 text-sm font-medium transition-all ${
              activeScreen === 'trending' 
                ? 'text-slate-900' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
            id="nav-trending"
          >
            Trending & Editorial
            {activeScreen === 'trending' && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveScreen('submit-review')}
            className={`relative py-5 text-sm font-medium transition-all ${
              activeScreen === 'submit-review' 
                ? 'text-slate-900' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
            id="nav-submit"
          >
            Submit Review
            {activeScreen === 'submit-review' && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveScreen('watchlist')}
            className={`relative py-5 text-sm font-medium transition-all ${
              activeScreen === 'watchlist' 
                ? 'text-slate-900' 
                : 'text-gray-500 hover:text-slate-900'
            }`}
            id="nav-watchlist"
          >
            My Watchlist
            {activeScreen === 'watchlist' && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-900 rounded-full" />
            )}
          </button>
        </nav>

        {/* Search bar inside header (conditional hide on mobile depending on size, handles enter keys) */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="hidden lg:flex relative items-center max-w-xs w-full mx-4"
          id="header-search-form"
        >
          <input
            type="text"
            placeholder="Search companies..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all duration-200"
          />
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
        </form>

        {/* User profile / Actions Area */}
        <div className="flex items-center space-x-4" id="header-actions">
          
          {/* Notifications bell with live indicator */}
          <button 
            onClick={() => setActiveScreen('notifications')}
            className={`relative p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors ${
              activeScreen === 'notifications' ? 'bg-slate-50 border-slate-200' : ''
            }`}
            aria-label="View notifications"
            id="notifications-bell-btn"
          >
            <Bell className="w-4.5 h-4.5 text-slate-600 hover:text-slate-900" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-sans text-[10px] font-bold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User identity profile trigger */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-100">
              <button
                onClick={() => setActiveScreen('profile')}
                className="flex items-center space-x-2 text-left group focus:outline-none"
                id="avatar-profile-btn"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-8.5 h-8.5 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-slate-300 transition-all duration-200"
                />
                <div className="hidden lg:block">
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {user.role}
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setActiveScreen('login');
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-all"
                title="Log Out"
                id="logout-btn"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveScreen('login')}
              className="text-xs font-medium text-slate-950 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer shadow-xs"
              id="signin-btn"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Rails to switch views */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-50 py-2 bg-slate-50/50">
        <button
          onClick={() => setActiveScreen('home')}
          className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
            activeScreen === 'home' ? 'bg-slate-900 text-white' : 'text-slate-500'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveScreen('trending')}
          className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
            activeScreen === 'trending' ? 'bg-slate-900 text-white' : 'text-slate-500'
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveScreen('submit-review')}
          className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
            activeScreen === 'submit-review' ? 'bg-slate-900 text-white' : 'text-slate-500'
          }`}
        >
          Review
        </button>
        <button
          onClick={() => setActiveScreen('watchlist')}
          className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
            activeScreen === 'watchlist' ? 'bg-slate-900 text-white' : 'text-slate-500'
          }`}
        >
          Watchlist
        </button>
      </div>
    </header>
  );
}
