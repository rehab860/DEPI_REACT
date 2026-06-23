import React, { useState, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // If already logged in, redirect to home
    if (auth?.isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const validate = () => {
        const newErrors = {};
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = 'Please enter a valid email address.';
        if (!password || password.length < 8)
            newErrors.password = 'Password must be at least 8 characters.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await login(email.trim().toLowerCase(), password);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert(error.message || 'Invalid email or password.');
        }
    };

    return (
    <div className="section-light-teal py-5 animate-fade-in min-vh-100 d-flex align-items-center justify-content-center">
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Home icon */}
        <div className="mb-3">
          <Link
            to="/"
            className="text-decoration-none d-inline-flex align-items-center gap-1"
            style={{ color: 'var(--primary-teal)' , fontSize: '0.85rem', fontWeight: 600 }}
          >
            <i className="bi bi-house-fill" style={{ fontSize: '1.1rem' }}></i>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 56, height: 56, background: 'var(--primary-teal)'  }}
          >
            <i className="bi bi-box-arrow-in-right text-white fs-4"></i>
          </div>
          <h2 className="fw-bold" style={{ fontSize: '1.5rem'}}>
            Welcome back to ReeVue
          </h2>
          <p className="text-muted small mt-1">
            Sign in to access your reviews and profile
          </p>
        </div>

        <div className="card card-custom p-4">
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label small fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-envelope text-teal"></i>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className={`form-control bg-light border-0 ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label htmlFor="login-pass" className="form-label small fw-bold mb-0">Password</label>
                <a href="#" className="text-teal small fw-semibold text-decoration-none">
                  Forgot password?
                </a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-lock text-teal"></i>
                </span>
                <input
                  id="login-pass"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control bg-light border-0 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text bg-light border-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword((p) => !p)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-teal`}></i>
                  
                </span>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            <button type="submit" className="btn btn-primary-teal rounded-pill w-100 fw-semibold">
              <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
            </button>

          </form>

          <div className="d-flex align-items-center gap-2 my-3">
            <hr className="flex-grow-1" />
            <span className="text-muted small">or</span>
            <hr className="flex-grow-1" />
          </div>

          <p className="text-center small text-muted mb-0">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal fw-bold text-decoration-none">
              Create one now
            </Link>
          </p>
        </div>

        <p className="text-center mt-3" style={{ fontSize: '0.75rem', color: 'var(--text-color)' }}>
          By signing in you agree to ReeVue's{' '}
          <Link to="/terms" className="text-teal text-decoration-none">Terms of Service</Link>
          {' '}&amp;{' '}
          <Link to="/privacy" className="text-teal text-decoration-none">Privacy Policy</Link>
        </p>

      </div >
    </div >
  );
};

export default Login;