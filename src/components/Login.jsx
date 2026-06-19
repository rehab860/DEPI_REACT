import { useState } from 'react';
export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Email address is required';
        }
        else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        // For mock layout, we extract a default display name from the email
        const namePart = email.split('@')[0];
        const formattedName = namePart
            .split('.')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        onLogin(formattedName || 'Jane Doe', email.toLowerCase());
    };
    // const handleFillDemo = () => {
    //     setEmail('student@reevue.edu');
    //     setPassword('password123');
    //     setErrors({});
    // };
    return (<div className="d-flex align-items-center justify-content-center bg-light min-vh-100" style={{
            background: 'linear-gradient(135deg, var(--light-teal-bg) 0%, #F8F9FA 100%)',
            padding: '24px',
        }}>
      <div className="card card-custom p-4 p-md-5 w-100" style={{ maxWidth: '460px' }}>
        {/* Brand logo */}
        <div className="text-center mb-4">
          <div className="logo-container justify-content-center mb-2">
            <i className="bi bi-eye-fill text-teal fs-1"></i>
            <span className="logo-text fw-bold fs-2">ReeVue</span>
          </div>
          <p className="text-muted small">
            Sign in to read and share interview reviews & insights.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label fw-semibold">
              Email Address
            </label>
            <input type="email" id="loginEmail" className={`form-control bg-light border-0 py-2.5 ${errors.email ? 'is-invalid' : ''}`} placeholder="e.g. name@university.edu" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="loginPassword" className="form-label fw-semibold">
              Password
            </label>
            <input type="password" id="loginPassword" className={`form-control bg-light border-0 py-2.5 ${errors.password ? 'is-invalid' : ''}`} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary-teal rounded-pill w-100 py-2.5 mb-3">
            Sign In
          </button>
        </form>

        {/* Demo login option
        <div className="text-center mt-3 pt-3 border-top border-light">
          <p className="small text-muted mb-2">Want to test with mock student details?</p>
          <button type="button" onClick={handleFillDemo} className="btn btn-secondary-custom rounded-pill btn-sm px-4">
            Fill Demo Credentials
          </button>
        </div> */}
      </div>
    </div>);
};
export default Login;
