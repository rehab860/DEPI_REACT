import React, { useState } from 'react';
export const SubmitReview = ({ onSubmit, prefilledCompany = '', onCancel, editingReview, }) => {
    const [companyName, setCompanyName] = useState(editingReview ? editingReview.companyName : prefilledCompany);
    const [jobTitle, setJobTitle] = useState(editingReview ? editingReview.jobTitle : '');
    const [rating, setRating] = useState(editingReview ? editingReview.rating : 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [difficulty, setDifficulty] = useState(editingReview ? editingReview.difficulty : 'Medium');
    const [recommend, setRecommend] = useState(editingReview ? editingReview.recommend : true);
    const [pros, setPros] = useState(editingReview ? editingReview.pros : '');
    const [cons, setCons] = useState(editingReview ? editingReview.cons : '');
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!jobTitle.trim()) {
            newErrors.jobTitle = 'Job title is required';
        }
        if (rating === 0) {
            newErrors.rating = 'Please select a rating';
        }
        if (pros.trim().length < 15) {
            newErrors.pros = 'Pros must be at least 15 characters long';
        }
        if (cons.trim().length < 15) {
            newErrors.cons = 'Cons must be at least 15 characters long';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        // Use existing date or format a new one
        const dateStr = editingReview ? editingReview.date : new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const newReview = {
            id: editingReview ? editingReview.id : 'rev-' + Date.now(),
            authorEmail: editingReview ? editingReview.authorEmail : undefined, // Handled by App.tsx
            companyName: companyName.trim(),
            jobTitle: jobTitle.trim(),
            date: dateStr,
            rating,
            difficulty,
            recommend,
            pros: pros.trim(),
            cons: cons.trim(),
            helpfulCount: editingReview ? editingReview.helpfulCount : 0,
        };
        onSubmit(newReview);
    };
    return (<section className="section-white pt-4 pb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="fw-bold m-0">
                {editingReview ? 'Edit Your Review' : 'Write an Anonymous Review'}
              </h2>
              <button type="button" onClick={onCancel} className="btn btn-secondary-custom btn-sm">
                Cancel
              </button>
            </div>

            <div className="card card-custom p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                {/* 1. Company Name */}
                <div className="mb-4">
                  <label htmlFor="companyInput" className="form-label fw-bold">Company Name</label>
                  <input type="text" id="companyInput" className={`form-control form-control-lg bg-light border-0 ${errors.companyName ? 'is-invalid' : ''}`} placeholder="e.g. Google, Stripe, Meta" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                  {errors.companyName && (<div className="invalid-feedback">{errors.companyName}</div>)}
                </div>

                {/* 2. Job Title */}
                <div className="mb-4">
                  <label htmlFor="jobInput" className="form-label fw-bold">Job Title</label>
                  <input type="text" id="jobInput" className={`form-control form-control-lg bg-light border-0 ${errors.jobTitle ? 'is-invalid' : ''}`} placeholder="e.g. Frontend Engineer, Product Manager" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
                  {errors.jobTitle && (<div className="invalid-feedback">{errors.jobTitle}</div>)}
                </div>

                <div className="row g-4 mb-4">
                  {/* 3. Overall Rating */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold d-block">Overall Rating</label>
                    <div className="d-flex align-items-center gap-1">
                      {[1, 2, 3, 4, 5].map((index) => (<button key={index} type="button" className="btn p-0 bg-transparent border-0" onClick={() => setRating(index)} onMouseEnter={() => setHoverRating(index)} onMouseLeave={() => setHoverRating(0)} aria-label={`Rate ${index} out of 5`}>
                          <i className={`bi bi-star-fill fs-3 ${index <= (hoverRating || rating)
                ? 'text-teal'
                : 'text-black-50'}`} style={{ transition: 'color 0.15s ease' }}></i>
                        </button>))}
                      {rating > 0 && (<span className="fw-semibold ms-2 text-muted">
                          ({rating}.0 / 5)
                        </span>)}
                    </div>
                    {errors.rating && (<div className="text-danger small mt-1">{errors.rating}</div>)}
                  </div>

                  {/* 4. Recommendation */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold d-block">Would you recommend this company?</label>
                    <div className="d-flex gap-3 mt-2">
                      <button type="button" onClick={() => setRecommend(true)} className={`btn px-4 py-2 rounded-pill flex-fill border-0 transition-all ${recommend === true
            ? 'btn-primary-teal'
            : 'btn-secondary-custom'}`}>
                        <i className="bi bi-hand-thumbs-up-fill me-2"></i> Yes
                      </button>
                      <button type="button" onClick={() => setRecommend(false)} className={`btn px-4 py-2 rounded-pill flex-fill border-0 transition-all ${recommend === false
            ? 'btn-primary-teal'
            : 'btn-secondary-custom'}`}>
                        <i className="bi bi-hand-thumbs-down-fill me-2"></i> No
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Interview Difficulty */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Interview Difficulty Rating</label>
                  <div className="d-flex flex-wrap gap-3 mt-1">
                    {['Easy', 'Medium', 'Hard'].map((diff) => {
            const isActive = difficulty === diff;
            let diffColorClass = 'difficulty-medium';
            if (diff === 'Easy')
                diffColorClass = 'difficulty-easy';
            if (diff === 'Hard')
                diffColorClass = 'difficulty-hard';
            return (<div key={diff} onClick={() => setDifficulty(diff)} style={{ cursor: 'pointer', flex: '1 1 120px' }} className={`p-3 rounded border transition-all ${isActive
                    ? 'bg-light border-teal shadow-sm'
                    : 'bg-white border-light'}`}>
                          <div className={`difficulty-badge ${diffColorClass} m-0`}>
                            {diff} Difficulty
                          </div>
                        </div>);
        })}
                  </div>
                </div>

                {/* 6. Pros Textarea */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="prosInput" className="form-label fw-bold mb-0">Pros</label>
                    <span className="small text-muted">{pros.length} / 15 chars min</span>
                  </div>
                  <textarea id="prosInput" rows={4} className={`form-control bg-light border-0 ${errors.pros ? 'is-invalid' : ''}`} placeholder="What are the best aspects of working here? (work-life balance, culture, technology stack, etc.)" value={pros} onChange={(e) => setPros(e.target.value)}></textarea>
                  {errors.pros && <div className="invalid-feedback">{errors.pros}</div>}
                </div>

                {/* 7. Cons Textarea */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="consInput" className="form-label fw-bold mb-0">Cons</label>
                    <span className="small text-muted">{cons.length} / 15 chars min</span>
                  </div>
                  <textarea id="consInput" rows={4} className={`form-control bg-light border-0 ${errors.cons ? 'is-invalid' : ''}`} placeholder="What are the main pain points or challenges? (long hours, bureaucracy, tools, career stagnation, etc.)" value={cons} onChange={(e) => setCons(e.target.value)}></textarea>
                  {errors.cons && <div className="invalid-feedback">{errors.cons}</div>}
                </div>

                {/* Submit buttons */}
                <div className="d-flex gap-3 justify-content-end mt-5 pt-3">
                  <button type="button" onClick={onCancel} className="btn btn-secondary-custom">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-teal rounded-pill px-5">
                    {editingReview ? 'Save Changes' : 'Publish Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
export default SubmitReview;
