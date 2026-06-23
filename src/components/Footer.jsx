import React from 'react';
export const Footer = ({ companyName = 'ReeVue', tagline = 'Transparent reviews, realistic ratings, and interview insights from peers.', }) => {
  return (
    <footer className="text-muted py-5 border-top mt-auto" style={{ backgroundColor: '#f8f9fa' }}>      <div className="container">
      <div className="row align-items-center justify-content-between gy-4">
        {/* Logo & Tagline */}
        <div className="col-12 col-md-5">
          <a className="logo-container mb-2 d-inline-flex" href="#" onClick={(e) => e.preventDefault()}>
            <i className="bi bi-eye-fill text-teal fs-3"></i>
            <span className="logo-text fw-bold">{companyName}</span>
          </a>
          <p className="small text-muted mt-2 mb-0" style={{ maxWidth: '380px', lineHeight: '1.6' }}>
            {tagline}
          </p>
        </div>

        {/* Links */}
        <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end gap-3 gap-md-4">
          <a href="#about" className="text-decoration-none text-muted small hover-teal">
            About Us
          </a>
          <a href="#faq" className="text-decoration-none text-muted small hover-teal">
            FAQ
          </a>
          <a href="#privacy" className="text-decoration-none text-muted small hover-teal">
            Privacy Policy
          </a>
          <a href="#terms" className="text-decoration-none text-muted small hover-teal">
            Terms of Service
          </a>
        </div>
      </div>

      {/* Separator line override: we use background spacing or subtle class instead of standard borders if appropriate, but since it's inside footer, a simple thin divider can separate copyrights. Let's use a very light background spacer or padding instead of a hard border! */}
      <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top border-light">
        <p className="small text-muted mb-0">
          &copy; 2025 {companyName}. Built as a student team project.
        </p>
        <div className="d-flex gap-3">
          <a href="#" className="text-muted" aria-label="Twitter">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-muted" aria-label="LinkedIn">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#" className="text-muted" aria-label="GitHub">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
    </div>
    </footer>
  );
};
