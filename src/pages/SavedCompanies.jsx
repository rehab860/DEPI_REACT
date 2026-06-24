import { useNavigate } from 'react-router-dom';

function SavedCompanies() {
  const navigate = useNavigate();
  const savedCompanies = JSON.parse(localStorage.getItem('reevue_saved_companies') || '[]');

  return (
    <>
      <div className="section-light-teal py-5 animate-fade-in min-vh-75">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold mb-1">Saved Companies</h1>
              <p className="text-muted small">Your bookmarked workspaces and candidate interview tracking lists</p>
            </div>
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary-custom rounded-pill">
              Find More Companies
            </button>
          </div>
          <div className="row g-4 mt-2">
            {
              savedCompanies.length > 0
                ? (savedCompanies.map((company) => (
                  <div className="col-12 col-md-6" key={company.name}>
                    <div className="card card-custom p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h4 className="fw-bold mb-1 text-teal">{company.name}</h4>
                        </div>
                        <button onClick={() => navigate(`/company/${company.name}`)} className="btn btn-primary-teal rounded-pill btn-sm px-3">
                          View Profile
                        </button>
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-3 text-secondary small">
                        <div>
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <strong>{company.avgRating.toFixed(1)}</strong> ({company.reviewCount} reviews)
                        </div>
                        <div>
                          <i className="bi bi-bar-chart-fill me-1 text-teal"></i>
                          {company.difficulty} Interview
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                )
                : (
                  <div className="col-12 text-center py-5 bg-white rounded-3 card-custom">
                    <i className="bi bi-bookmark text-muted display-4 mb-3 d-block"></i>
                    <h5 className="fw-semibold">No companies saved yet</h5>
                    <p className="text-muted small">Bookmark companies to track ratings and loops easily.</p>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedCompanies;
