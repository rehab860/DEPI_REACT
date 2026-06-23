// src/pages/SignUp.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Password strength
    const getStrength = (val) => {
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
        return score;
    };

    const strengthMap = [
        { label: '', color: '#e2f5ed', width: '0%' },
        { label: 'Weak', color: '#e24b4a', width: '25%' },
        { label: 'Fair', color: '#ef9f27', width: '50%' },
        { label: 'Good', color: '#1d9e75', width: '75%' },
        { label: 'Strong', color: '#0f6e56', width: '100%' },
    ];

    const strength = getStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = 'Please enter your first name.';
        if (!lastName.trim()) newErrors.lastName = 'Please enter your last name.';
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = 'Please enter a valid email.';
        if (phone.trim() && phone.replace(/\D/g, '').length < 7)
            newErrors.phone = 'Please enter a valid phone number.';
        if (password.length < 8)
            newErrors.password = 'Password must be at least 8 characters.';
        if (password !== confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match.';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const displayName = `${firstName.trim()} ${lastName.trim()}`;
            await signup(email.trim().toLowerCase(), password, displayName);
            navigate('/');
        } catch (error) {
            console.error('Sign up failed:', error);
            alert(error.message || 'Failed to create account. Please try again.');
        }
    };

    return (
        <>
            <div className="section-light-teal py-5 animate-fade-in min-vh-100 d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: 460 }}>

                    {/* Home icon */}
                    <div className="mb-3">
                        <Link
                            to="/"
                            className="text-decoration-none d-inline-flex align-items-center gap-1"
                            style={{ color: 'var(--primary-teal)', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                            <i className="bi bi-house-fill" style={{ fontSize: '1.1rem' }}></i>
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-4">
                        <div
                            className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 56, height: 56, background: 'var(--primary-teal)' }}
                        >
                            <i className="bi bi-person-plus-fill text-white fs-4"></i>
                        </div>
                        <h2 className="fw-bold" style={{ fontSize: '1.5rem' }}>
                            Create your ReeVue account
                        </h2>
                        <p className="text-muted small mt-1">
                            Join thousands sharing honest interview experiences
                        </p>
                    </div>

                    <div className="card card-custom p-4">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* First Name + Last Name */}
                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <label htmlFor="signup-firstname" className="form-label small fw-bold">First Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <i className="bi bi-person text-teal"></i>
                                        </span>
                                        <input
                                            id="signup-firstname"
                                            type="text"
                                            className={`form-control bg-light border-0 ${errors.firstName ? 'is-invalid' : ''}`}
                                            placeholder="Ahmed"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="signup-lastname" className="form-label small fw-bold">Last Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <i className="bi bi-person text-teal"></i>
                                        </span>
                                        <input
                                            id="signup-lastname"
                                            type="text"
                                            className={`form-control bg-light border-0 ${errors.lastName ? 'is-invalid' : ''}`}
                                            placeholder="Hassan"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="signup-email" className="form-label small fw-bold">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <i className="bi bi-envelope text-teal"></i>
                                    </span>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        className={`form-control bg-light border-0 ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="ahmed@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="mb-3">
                                <label htmlFor="signup-phone" className="form-label small fw-bold">
                                    Phone Number <span className="text-muted fw-normal">(optional)</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <i className="bi bi-telephone text-teal"></i>
                                    </span>
                                    <input
                                        id="signup-phone"
                                        type="tel"
                                        className={`form-control bg-light border-0 ${errors.phone ? 'is-invalid' : ''}`}
                                        placeholder="+20 100 000 0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label htmlFor="signup-pass" className="form-label small fw-bold">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <i className="bi bi-lock text-teal"></i>
                                    </span>
                                    <input
                                        id="signup-pass"
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control bg-light border-0 ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Min. 8 characters"
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
                                {password.length > 0 && (
                                    <div className="mt-2">
                                        <div style={{ height: 5, borderRadius: 4, background: '#e2f5ed', overflow: 'hidden' }}>
                                            <div
                                                style={{
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    width: strengthMap[strength].width,
                                                    background: strengthMap[strength].color,
                                                    transition: 'width 0.3s, background 0.3s',
                                                }}
                                            />
                                        </div>
                                        <small style={{ color: strengthMap[strength].color }}>
                                            {strengthMap[strength].label}
                                        </small>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3">
                                <label htmlFor="signup-confirm" className="form-label small fw-bold">Confirm Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <i className="bi bi-lock-fill text-teal"></i>
                                    </span>
                                    <input
                                        id="signup-confirm"
                                        type={showConfirm ? 'text' : 'password'}
                                        className={`form-control bg-light border-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        placeholder="Repeat password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className="input-group-text bg-light border-0"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowConfirm((p) => !p)}
                                    >
                                        <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'} text-teal`}></i>
                                    </span>
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-4">
                                <label htmlFor="signup-bio" className="form-label small fw-bold">Short Bio <span className="text-muted fw-normal">(optional)</span></label>
                                <textarea
                                    id="signup-bio"
                                    rows={3}
                                    className="form-control bg-light border-0"
                                    placeholder="CS student, Frontend developer, etc."
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary-teal rounded-pill w-100 fw-semibold">
                                <i className="bi bi-check-circle me-1"></i> Create Account
                            </button>

                        </form>

                        <div className="d-flex align-items-center gap-2 my-3">
                            <hr className="flex-grow-1" />
                            <span className="text-muted small">or</span>
                            <hr className="flex-grow-1" />
                        </div>
                        <p className="text-center small text-muted mb-0">
                            Already have an account?{' '}
                            <Link to="/login" className="text-teal fw-bold text-decoration-none">
                                Sign in
                            </Link>
                        </p>
                    </div >

                    <p className="text-center mt-3" style={{ fontSize: '0.75rem', color: 'var(--text-color)' }}>
                        By signing up you agree to ReeVue's{' '}
                        <Link to="/terms" className="text-teal text-decoration-none">Terms of Service</Link>
                        {' '}&amp;{' '}
                        <Link to="/privacy" className="text-teal text-decoration-none">Privacy Policy</Link>
                    </p>

                </div >
            </div >
        </>
    );
};

export default SignUp;