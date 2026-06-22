import { useEffect, useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';
import CompaniesContext, { CompaniesProvider } from './context/CompaniesContext';

import { BrowserRouter, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppRouter } from './routes/AppRouter';

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
                <AppRouter />
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
