import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Screens
import LandingScreen from './screens/LandingScreen';
import SearchListingScreen from './screens/SearchListingScreen';
import CompanyProfileScreen from './screens/CompanyProfileScreen';
import InterviewScreen from './screens/InterviewScreen';
import SubmitReviewScreen from './screens/SubmitReviewScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import TrendingScreen from './screens/TrendingScreen';
import NotificationScreen from './screens/NotificationScreen';
import LoginScreen from './screens/LoginScreen';

// Dynamic Database Content
import {
  INITIAL_COMPANIES,
  INITIAL_REVIEWS,
  INITIAL_QUESTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROFILE,
  INITIAL_WATCHLIST,
} from './data';
import { Company, Review, Question, AppNotification, UserProfile } from './types';

export default function App() {
  
  // App-level state hooks
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [watchlist, setWatchlist] = useState<string[]>(INITIAL_WATCHLIST);
  const [user, setUser] = useState<UserProfile>(INITIAL_PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Routing states
  const [activeScreen, setActiveScreen] = useState<string>('login');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('technova');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle active screen router with optional parameters
  const handleActiveScreenChange = (screen: string, companyId?: string) => {
    setActiveScreen(screen);
    if (companyId) {
      setSelectedCompanyId(companyId);
    }
    // Scroll to top of preview frame for smooth experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search filter callback
  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Watchlist follow-selector toggle back-and-forth
  const toggleWatchlist = (companyId: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(companyId);
      let updated: string[];
      if (exists) {
        updated = prev.filter(id => id !== companyId);
      } else {
        updated = [...prev, companyId];
      }
      
      // Sync helpful user saved metric dynamically
      setUser(userPrev => ({
        ...userPrev,
        savedCount: updated.length
      }));
      return updated;
    });
  };

  // Submit dynamic review scorecard
  const handleSubmitReview = (newReviewData: Omit<Review, 'id' | 'date' | 'upvotes' | 'author'>) => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    const newReview: Review = {
      ...newReviewData,
      id: `rev-added-${Date.now()}`,
      date: formattedDate,
      upvotes: 0,
      author: user.name
    };

    // Update reviews feed state
    setReviews(prev => [newReview, ...prev]);

    // Update aggregate company statistics (increment totalReviews in our database representation)
    setCompanies(prev => 
      prev.map(c => 
        c.id === newReviewData.companyId 
          ? { ...c, totalReviews: c.totalReviews + 1 }
          : c
      )
    );

    // Update profile totals count
    setUser(prev => ({
      ...prev,
      reviewsCount: prev.reviewsCount + 1
    }));
  };

  // Remove review (from user profile)
  const handleDeleteReview = (reviewId: string) => {
    const target = reviews.find(r => r.id === reviewId);
    if (!target) return;

    setReviews(prev => prev.filter(r => r.id !== reviewId));

    // Decrement company metric totalReviews
    setCompanies(prev => 
      prev.map(c => 
        c.id === target.companyId 
          ? { ...c, totalReviews: Math.max(0, c.totalReviews - 1) }
          : c
      )
    );

    // Decrement user profile stats
    setUser(prev => ({
      ...prev,
      reviewsCount: Math.max(0, prev.reviewsCount - 1)
    }));
  };

  // Vote helper indicator callback
  const handleUpvoteReview = (reviewId: string) => {
    setReviews(prev => 
      prev.map(r => 
        r.id === reviewId
          ? { ...r, upvotes: r.upvotes + 1 }
          : r
      )
    );
    // Increment global helpful profile stats
    setUser(prev => ({
      ...prev,
      helpfulVotes: prev.helpfulVotes + 1
    }));
  };

  // Submit Candidate Q&A Question dynamically
  const handleAddQuestion = (newQ: { text: string, department: string, difficulty: 'Easy' | 'Medium' | 'Hard', author: string }) => {
    const freshQuestion: Question = {
      id: `q-added-${Date.now()}`,
      companyId: selectedCompanyId,
      companyName: companies.find(c => c.id === selectedCompanyId)?.name || 'Vetted Company',
      text: newQ.text,
      author: newQ.author,
      date: 'Just now',
      difficulty: newQ.difficulty,
      department: newQ.department,
      upvotes: 0,
      repliesCount: 0,
      replies: []
    };

    setQuestions(prev => [freshQuestion, ...prev]);
  };

  // Question upvotes
  const handleUpvoteQuestion = (qId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === qId 
          ? { ...q, upvotes: q.upvotes + 1 }
          : q
      )
    );
  };

  // Notification clean routines
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleRead = (nId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === nId 
          ? { ...n, read: !n.read }
          : n
      )
    );
  };

  const handleClearNotification = (nId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== nId));
  };

  // Identity Login SUCCESS routines
  const handleLoginSuccess = (name: string, email: string) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      name: name || 'Alex D.',
      email: email
    }));
  };

  // Retrieve matching company object
  const activeCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50/20" id="reevue-root-layout">
      
      {/* Interactive Global Header */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={handleActiveScreenChange}
        user={user}
        notifications={notifications}
        onSearch={handleGlobalSearch}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Screen Render Switch Console */}
      <main className="flex-1 w-full" id="main-content-window">
        {activeScreen === 'home' && (
          <LandingScreen
            companies={companies}
            reviews={reviews}
            setActiveScreen={handleActiveScreenChange}
            onSearch={handleGlobalSearch}
          />
        )}

        {activeScreen === 'results' && (
          <SearchListingScreen
            companies={companies}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
            setActiveScreen={handleActiveScreenChange}
            searchQuery={searchQuery}
            onSearch={handleGlobalSearch}
          />
        )}

        {activeScreen === 'company' && (
          <CompanyProfileScreen
            company={activeCompany}
            reviews={reviews}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
            setActiveScreen={handleActiveScreenChange}
            onUpvoteReview={handleUpvoteReview}
          />
        )}

        {activeScreen === 'interview' && (
          <InterviewScreen
            company={activeCompany}
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpvoteQuestion={handleUpvoteQuestion}
            setActiveScreen={handleActiveScreenChange}
          />
        )}

        {activeScreen === 'submit-review' && (
          <SubmitReviewScreen
            companies={companies}
            onSubmitReview={handleSubmitReview}
            setActiveScreen={handleActiveScreenChange}
          />
        )}

        {activeScreen === 'profile' && (
          <UserProfileScreen
            user={user}
            reviews={reviews}
            companies={companies}
            questions={questions}
            watchlist={watchlist}
            onDeleteReview={handleDeleteReview}
            setActiveScreen={handleActiveScreenChange}
          />
        )}

        {activeScreen === 'watchlist' && (
          <WatchlistScreen
            companies={companies}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
            setActiveScreen={handleActiveScreenChange}
          />
        )}

        {activeScreen === 'trending' && (
          <TrendingScreen
            companies={companies}
            questions={questions}
            setActiveScreen={handleActiveScreenChange}
          />
        )}

        {activeScreen === 'notifications' && (
          <NotificationScreen
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            onToggleRead={handleToggleRead}
            onClearNotification={handleClearNotification}
          />
        )}

        {activeScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            setActiveScreen={handleActiveScreenChange}
          />
        )}
      </main>

      {/* Institutional Editorial Footer */}
      <Footer setActiveScreen={handleActiveScreenChange} />

    </div>
  );
}
