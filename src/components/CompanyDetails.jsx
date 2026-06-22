import { useState } from 'react';
import { ReviewCard } from './ReviewCard';
import Swal from 'sweetalert2';

export const CompanyDetails = ({ companyName, reviews, onBack, onWriteReview, }) => {
  const [isSaved, setIsSaved] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('reevue_saved_companies') || '[]');
    return saved.some(c => c.name === companyName);
  });

  const handleSaveCompany = () => {
    const saved = JSON.parse(localStorage.getItem('reevue_saved_companies') || '[]');
    if (isSaved) {
      const updated = saved.filter(c => c.name !== companyName);
      localStorage.setItem('reevue_saved_companies', JSON.stringify(updated));
      setIsSaved(false);
      Swal.fire({
        icon: 'info',
        title: 'Removed',
        text: `${companyName} removed from saved companies.`,
      });
    } else {
      saved.push({ name: companyName, avgRating: avgRating, reviewCount: totalReviewsCount, difficulty: 'Medium' });
      localStorage.setItem('reevue_saved_companies', JSON.stringify(saved));
      setIsSaved(true);
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: `${companyName} added to saved companies.`,
      })
    }
  };
  // Filter reviews for this specific company
  const companyReviews = reviews.filter((r) => r.companyName.toLowerCase() === companyName.toLowerCase());
  const totalReviewsCount = companyReviews.length;
  // Aggregate Metrics
  const avgRating = totalReviewsCount > 0
    ? companyReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount
    : 0;
  const recommendPercent = totalReviewsCount > 0
    ? Math.round((companyReviews.filter((r) => r.recommend).length / totalReviewsCount) * 100)
    : 0;
  // Calculate difficulty counts
  const easyCount = companyReviews.filter((r) => r.difficulty === 'Easy').length;
  const mediumCount = companyReviews.filter((r) => r.difficulty === 'Medium').length;
  const hardCount = companyReviews.filter((r) => r.difficulty === 'Hard').length;
  const getDifficultyPercent = (count) => {
    return totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
  };
  const easyPercent = getDifficultyPercent(easyCount);
  const mediumPercent = getDifficultyPercent(mediumCount);
  const hardPercent = getDifficultyPercent(hardCount);
  // Helper to render stars
  const renderStars = (score) => {
    const stars = [];
    const roundedScore = Math.round(score);
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedScore) {
        stars.push(<i key={i} className="bi bi-star-fill star-filled fs-4"></i>);
      }
      else {
        stars.push(<i key={i} className="bi bi-star star-empty fs-4"></i>);
      }
    }
    return stars;
  };
  return (<div className="company-details-view animate-fade-in">
    {/* Top Banner (White background section) */}
    <section className="section-white pt-4 pb-4">
      <div className="container">
        <button type="button" onClick={onBack} className="btn btn-secondary-custom btn-sm mb-4 d-inline-flex align-items-center gap-2">
          <i className="bi bi-arrow-left"></i> Back to Directory
        </button>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
          <div>
            <h1 className="display-4 fw-bold mb-2">{companyName}</h1>
            <p className="text-muted mb-0">
              Aggregated workspace analytics and peer interview reports.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button type="button" onClick={() => onWriteReview(companyName)} className="btn btn-primary-teal rounded-pill d-inline-flex align-items-center gap-2">
              <i className="bi bi-plus-lg"></i> Write a Review
            </button>
            <button type="button" onClick={handleSaveCompany} className="btn btn-secondary-custom rounded-pill d-inline-flex align-items-center gap-2">
              <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i> {isSaved ? 'Saved' : 'Save Company'}
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Analytics Dashboard Panel (Light Teal background section - NO border lines!) */}
    <section className="section-light-teal">
      <div className="container">
        <div className="row g-4">
          {/* Overall Rating card */}
          <div className="col-12 col-md-4">
            <div className="card card-custom p-4 h-100 text-center d-flex flex-column justify-content-center">
              <span className="text-muted small fw-semibold uppercase mb-2">Overall Rating</span>
              <div className="display-3 fw-bold text-teal mb-2">{avgRating.toFixed(1)}</div>
              <div className="d-flex justify-content-center mb-2">{renderStars(avgRating)}</div>
              <span className="text-muted small">Based on {totalReviewsCount} employee reviews</span>
            </div>
          </div>

          {/* Recommendation Stats card */}
          <div className="col-12 col-md-4">
            <div className="card card-custom p-4 h-100 text-center d-flex flex-column justify-content-center">
              <span className="text-muted small fw-semibold uppercase mb-2">Recommend to Friends</span>
              <div className="display-3 fw-bold text-success mb-2">{recommendPercent}%</div>
              <div className="d-flex align-items-center justify-content-center gap-2 text-success fw-semibold">
                <i className="bi bi-hand-thumbs-up-fill fs-5"></i>
                <span>Would Recommend</span>
              </div>
              <span className="text-muted small mt-2">Highly favorable work environment</span>
            </div>
          </div>

          {/* Interview Difficulty Distributions */}
          <div className="col-12 col-md-4">
            <div className="card card-custom p-4 h-100">
              <h5 className="fw-bold text-dark mb-3">Interview Difficulty</h5>
              <div className="space-y-3">
                {/* Easy */}
                <div className="mb-2">
                  <div className="d-flex justify-content-between small fw-semibold mb-1">
                    <span className="text-success border-start border-success border-3 ps-2">Easy ({easyCount})</span>
                    <span>{easyPercent}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${easyPercent}%` }} aria-valuenow={easyPercent} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>

                {/* Medium */}
                <div className="mb-2">
                  <div className="d-flex justify-content-between small fw-semibold mb-1">
                    <span className="text-warning border-start border-warning border-3 ps-2">Medium ({mediumCount})</span>
                    <span>{mediumPercent}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${mediumPercent}%` }} aria-valuenow={mediumPercent} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>

                {/* Hard */}
                <div className="mb-2">
                  <div className="d-flex justify-content-between small fw-semibold mb-1">
                    <span className="text-danger border-start border-danger border-3 ps-2">Hard ({hardCount})</span>
                    <span>{hardPercent}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${hardPercent}%` }} aria-valuenow={hardPercent} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Review List Section (White background section) */}
    <section className="section-white">
      <div className="container">
        <h3 className="fw-bold mb-4">Employee Reviews ({totalReviewsCount})</h3>

        <div className="row">
          {totalReviewsCount > 0 ? (<div className="col-12 col-lg-8">
            {companyReviews.map((review, idx) => (<ReviewCard key={idx} {...review} />))}
          </div>) : (<div className="col-12 text-center py-5">
            <i className="bi bi-chat-left-text text-muted display-4 mb-3 d-block"></i>
            <h5 className="fw-semibold">No reviews yet for {companyName}</h5>
            <p className="text-muted small">Be the first to share your workspace experience!</p>
            <button type="button" onClick={() => onWriteReview(companyName)} className="btn btn-primary-teal rounded-pill mt-2">
              Write the First Review
            </button>
          </div>)}
        </div>
      </div>
    </section>
  </div>);
};
