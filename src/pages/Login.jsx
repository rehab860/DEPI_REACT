import { useContext} from 'react';
import AuthContext from '../context/AuthContext';


import { Navigate } from 'react-router-dom';
import { Login as LoginComponent } from '../components/Login';

export const Login = () => {
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;
    
    const isLoggedIn = auth.isLoggedIn;
    if (isLoggedIn) {
        return <Navigate to="/" replace/>;
    }
    const handleLogin = (name, email) => {
        const mockUser = {
    name,
    email,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    bio: 'CS student. Curious about candidate experience metrics, system designs, and loops.',
    reviewsWritten: [],
};
        login({
            user: mockUser,
            token: 'mock-jwt-session-token-v1',
        });
    };
    return <LoginComponent onLogin={handleLogin}/>;
};
export default Login;
