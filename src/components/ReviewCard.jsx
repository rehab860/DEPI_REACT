import React, { useState } from 'react';
import { StarRating } from './StarRating';
export const ReviewCard = ({ id, authorEmail, companyName, jobTitle, date, rating, pros, cons, difficulty, recommend, helpfulCount = 0, isAnonymous = false, onCompanyClick, onDeleteClick, onEditClick, }) => {
    const [likes, setLikes] = useState(helpfulCount);
    const [hasLiked, setHasLiked] = useState(false);
    const handleLikeClick = () => {
        if (hasLiked) {
            setLikes(likes - 1);
            setHasLiked(false);
        }
        else {
            setLikes(likes + 1);
            setHasLiked(true);
        }
    };
    // Map difficulty levels to custom CSS classes
    const getDifficultyClass = (diff) => {
        switch (diff) {
            case 'Easy':
                return 'difficulty-easy';
            case 'Medium':
                return 'difficulty-medium';
            case 'Hard':
                return 'difficulty-hard';
            default:
                return 'difficulty-medium';
        }
    };
    return (<div className="card card-custom p-4 mb-4">
      {/* Top Header: Company Name + Recommendation Badge */}
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
        <div>
          <span onClick={() => onCompanyClick && onCompanyClick(companyName)} style={{ cursor: onCompanyClick ? 'pointer' : 'default' }} className="badge bg-light text-dark border-0 rounded-pill px-3 py-2 fw-semibold fs-7 mb-2 d-inline-block animate-fade-in" title={onCompanyClick ? `View details for ${companyName}` : ''}>
            {companyName}
          </span>
          <h4 className="card-title fw-bold mb-1">{jobTitle}</h4>
          <div className="text-muted small d-flex flex-wrap align-items-center gap-2">
            <span>Reviewed on {date}</span>
            {isAnonymous ? (<span className="badge bg-secondary text-white rounded-pill px-2 py-0.5" style={{ fontSize: '0.7rem' }}>
                <i className="bi bi-shield-fill-check me-1"></i>Anonymous Reviewer
              </span>) : (authorEmail && (<span className="badge bg-light text-teal border-0 rounded-pill px-2 py-0.5" style={{ fontSize: '0.7rem', color: 'var(--primary-teal)' }}>
                  <i className="bi bi-person-fill me-1"></i>{authorEmail}
                </span>))}
          </div>
        </div>

        {/* Difficulty Badge (Left-border style) */}
        <div className={`difficulty-badge ${getDifficultyClass(difficulty)}`}>
          {difficulty} Interview
        </div>
      </div>

      {/* Star Rating Section */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <StarRating rating={rating} mode="display" size="md"/>
        <span className="fw-bold text-dark ms-1">{rating.toFixed(1)} / 5.0</span>
      </div>

      {/* Recommendation status */}
      <div className="mb-3">
        {recommend ? (<span className="text-success small fw-semibold d-flex align-items-center gap-1">
            <i className="bi bi-hand-thumbs-up-fill"></i> Recommends this company
          </span>) : (<span className="text-secondary small fw-semibold d-flex align-items-center gap-1">
            <i className="bi bi-hand-thumbs-down"></i> Does not recommend
          </span>)}
      </div>

      {/* Pros & Cons Section - Separated by left-bordered panels, no boundaries */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded-3 h-100 border-start border-success border-4">
            <div className="fw-bold text-success d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.95rem' }}>
              <i className="bi bi-plus-circle-fill"></i> Pros
            </div>
            <p className="card-text text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
              {pros}
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="p-3 bg-light rounded-3 h-100 border-start border-danger border-4">
            <div className="fw-bold text-danger d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.95rem' }}>
              <i className="bi bi-dash-circle-fill"></i> Cons
            </div>
            <p className="card-text text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
              {cons}
            </p>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="d-flex justify-content-between align-items-center pt-2 mt-2">
        {/* Helpful Vote Button */}
        <button type="button" onClick={handleLikeClick} className={`btn btn-sm d-flex align-items-center gap-2 border-0 px-3 py-2 rounded-pill transition ${hasLiked ? 'btn-primary-teal' : 'btn-secondary-custom'}`} aria-label="Mark review as helpful">
          <i className={`bi bi-hand-thumbs-up${hasLiked ? '-fill' : ''}`}></i>
          <span>Helpful ({likes})</span>
        </button>

        {/* Owned Action Controls vs Report Action */}
        <div className="d-flex gap-2">
          {onEditClick && id && (<button type="button" onClick={() => onEditClick(id)} className="btn btn-sm btn-secondary-custom py-2 px-3 rounded-pill border-0 d-inline-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
              <i className="bi bi-pencil"></i> Edit
            </button>)}
          {onDeleteClick && id && (<button type="button" onClick={() => onDeleteClick(id)} className="btn btn-sm btn-danger py-2 px-3 rounded-pill border-0 text-white d-inline-flex align-items-center gap-1" style={{ backgroundColor: '#dc3545', fontSize: '0.8rem' }}>
              <i className="bi bi-trash"></i> Delete
            </button>)}
          {!onDeleteClick && (<button type="button" className="btn btn-tertiary-custom btn-sm text-muted">
              <i className="bi bi-flag me-1"></i> Report
            </button>)}
        </div>
      </div>
    </div>);
};
export default ReviewCard;
