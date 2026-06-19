import React from 'react';
import { useNavigate } from 'react-router-dom';
export const NotFound = () => {
    const navigate = useNavigate();
    return (<div className="section-light-teal py-5 animate-fade-in d-flex flex-column justify-content-center align-items-center min-vh-75 text-center">
      <div className="container">
        <div className="display-1 fw-bold text-teal mb-3">404</div>
        <h2 className="fw-bold mb-3">Page Not Found</h2>
        <p className="text-muted small mb-4" style={{ maxWidth: '420px', margin: '0 auto', lineHeight: '1.6' }}>
          The review list, Q&A session, or company dashboard you are trying to visit does not exist or has been relocated.
        </p>
        <button type="button" onClick={() => navigate('/')} className="btn btn-primary-teal rounded-pill px-4">
          <i className="bi bi-house-door me-2"></i> Back to Home
        </button>
      </div>
    </div>);
};
export default NotFound;
