import { useEffect, useContext } from 'react';
import { BrowserRouter, useNavigate, useLocation, useSearchParams, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// context
import AuthContext, { AuthProvider } from './context/AuthContext';
import CompaniesContext, { CompaniesProvider } from './context/CompaniesContext';
// components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Pages
import Home from './pages/Home';
import Trending from './pages/Trending';
import Search from './pages/Search';
import CompanyProfile from './pages/CompanyProfile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SubmitReview from './pages/SubmitReview';
import UserProfile from './pages/UserProfile';
import SavedCompanies from './pages/SavedCompanies';
import Notifications from './pages/Notifications';
import InterviewQA from './pages/InterviewQA';
import NotFound from './pages/NotFound';

// Protected Route Guard Layout
const ProtectedRoute = () => {
    const { auth, login, logout, updateProfile } = useContext(AuthContext);
    const user = auth?.user;
    const isLoggedIn = auth.isLoggedIn;
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

function AppContent() {
    const navigate = useNavigate();
    const { auth, login, logout, updateProfile } = useContext(AuthContext);
    const user = auth?.user;
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Extract search query from search params (?q=...)
    const searchQuery = searchParams.get('q') || '';
    // Intercept clicks on the Navbar "Sign In" button to redirect to /login
    useEffect(() => {
        const handleGlobalClick = (e) => {
            const target = e.target;
            if (target &&
                (target.tagName === 'BUTTON' || target.closest('button')) &&
                target.textContent?.trim() === 'Sign In' &&
                location.pathname !== '/login') {
                e.preventDefault();
                e.stopPropagation();
                navigate('/login');
            }
        };
        document.addEventListener('click', handleGlobalClick, true);
        return () => document.removeEventListener('click', handleGlobalClick, true);
    }, [navigate, location.pathname]);

    // Dynamically map pathname to Navbar activeTab highlight
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/')
            return 'home';
        if (path === '/trending' || path === '/search')
            return 'trending';
        if (path === '/submit-review')
            return 'submit';
        if (path === '/profile')
            return 'profile';
        if (path.startsWith('/company/'))
            return 'company';
        if (path === '/qa')
            return 'qa';
        return 'home';
    };
    const activeTab = getActiveTab();
    const handleTabChange = (tab) => {
        if (tab === 'home')
            navigate('/');
        if (tab === 'trending')
            navigate('/trending');
        if (tab === 'submit')
            navigate('/submit-review');
        if (tab === 'profile')
            navigate('/profile');
        if (tab === 'login')
            navigate('/login');
        if (tab === 'signup')
            navigate('/signup');
        if (tab === 'qa')
            navigate('/qa');
    };
    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
        else {
            navigate('/trending');
        }
    };
    const handleSignOut = () => {
        logout();
        navigate('/login');
    };
    const handleProfileClick = () => {
        navigate('/profile');
    };
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';



    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Hide navbar and footer on Login page*/}
            {!isLoginPage && (<Navbar activeTab={activeTab} user={auth?.user} onTabChange={handleTabChange} onSearch={handleSearch} searchQuery={searchQuery} onSignOut={handleSignOut} onProfileClick={handleProfileClick} />)}
            <main className="flex-shrink-0">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/company/:name" element={<CompanyProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes , only if user is logged in*/}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/submit-review" element={<SubmitReview />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/saved-companies" element={<SavedCompanies />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/qa" element={<InterviewQA />} />
                    </Route>

                    {/* not match component */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!isLoginPage && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <CompaniesProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </CompaniesProvider>
        </AuthProvider>
    );
}
export default App;
