import {Link} from 'react-router-dom'
export const Footer = ({ companyName = 'ReeVue',
   tagline = 'Transparent reviews, realistic ratings, and interview insights from peers.', }) => {
  return (
    <footer className="text-muted py-5 border-top mt-auto" style={{ backgroundColor: '#f8f9fa' }}>      <div className="container">
      <div className="row align-items-center justify-content-between gy-4">
        <div className="col-12 col-md-5">
          <a className="logo-container mb-2 d-inline-flex" href="#" onClick={(e) => e.preventDefault()}>
            <i className="bi bi-eye-fill text-teal fs-3"></i>
            <span className="logo-text fw-bold">{companyName}</span>
          </a>
          <p className="small text-muted mt-2 mb-0" style={{ maxWidth: '380px', lineHeight: '1.6' }}>
            {tagline}
          </p>
        </div>

        <div className="col-12 col-md-6 d-flex flex-wrap justify-content-md-end gap-3 gap-md-4">
          <Link to="/" className="text-decoration-none text-muted small hover-teal">
            About Us
          </Link>
          <Link to="/qa" className="text-decoration-none text-muted small hover-teal">
            FAQ
          </Link>
          <a href="#privacy" className="text-decoration-none text-muted small hover-teal">
            Privacy Policy
          </a>
          <a href="#terms" className="text-decoration-none text-muted small hover-teal">
            Terms of Service
          </a>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top border-light">
        <p className="small text-muted mb-0">
          &copy; 2025 {companyName}. Built as a student team project.
        </p>
        <div className="d-flex gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com/rehab860/DEPI_REACT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
    </div>
    </footer>
  );
};
