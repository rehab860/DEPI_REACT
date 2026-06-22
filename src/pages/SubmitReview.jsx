import React, { useState, useEffect ,useContext} from 'react';
import AuthContext from '../context/AuthContext';

import { useNavigate, useLocation } from 'react-router-dom';

import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
export const SubmitReview = () => {
    const navigate = useNavigate();
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;
    const location = useLocation();
     
    // Extract editing target from router state
    const stateVal = location.state;
    const editingReviewId = stateVal?.editingReviewId || '';
    // Form Fields State
    const [step, setStep] = useState(1);
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('Full-time');
    const [city, setCity] = useState('');
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [rating, setRating] = useState(0);
    const [difficulty, setDifficulty] = useState('Medium');
    const [recommend, setRecommend] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [errors, setErrors] = useState({});
    // Load editing review or saved draft on mount
    useEffect(() => {
        if (editingReviewId) {
            try {
                const stored = localStorage.getItem('reevue_reviews_v1');
                if (stored) {
                    const list = JSON.parse(stored);
                    const editTarget = list.find((r) => r.id === editingReviewId);
                    if (editTarget) {
                        setCompanyName(editTarget.companyName);
                        setIndustry('Software / Internet'); // fallback default
                        // Extract job title and employment type
                        let title = editTarget.jobTitle;
                        let status = 'Full-time';
                        if (editTarget.jobTitle.includes(' (')) {
                            const parts = editTarget.jobTitle.split(' (');
                            title = parts[0];
                            status = parts[1].replace(')', '');
                        }
                        setJobTitle(title);
                        setEmploymentStatus(status);
                        setCity('San Francisco'); // fallback default
                        setPros(editTarget.pros);
                        setCons(editTarget.cons);
                        setRating(editTarget.rating);
                        setDifficulty(editTarget.difficulty);
                        setRecommend(editTarget.recommend);
                        setIsAnonymous(editTarget.isAnonymous !== undefined ? editTarget.isAnonymous : true);
                        setStep(1);
                        return; // skip draft since editing
                    }
                }
            }
            catch (err) {
                console.error('Failed to load editing review target', err);
            }
        }
        // Otherwise, load draft
        try {
            const savedDraft = localStorage.getItem('reevue_review_draft');
            if (savedDraft) {
                const draft = JSON.parse(savedDraft);
                setCompanyName(draft.companyName || '');
                setIndustry(draft.industry || '');
                setJobTitle(draft.jobTitle || '');
                setEmploymentStatus(draft.employmentStatus || 'Full-time');
                setCity(draft.city || '');
                setPros(draft.pros || '');
                setCons(draft.cons || '');
                setRating(draft.rating || 0);
                setDifficulty(draft.difficulty || 'Medium');
                setRecommend(draft.recommend !== undefined ? draft.recommend : true);
                setIsAnonymous(draft.isAnonymous !== undefined ? draft.isAnonymous : true);
                if (draft.step) {
                    setStep(draft.step);
                }
            }
        }
        catch (err) {
            console.error('Failed to load review draft', err);
        }
    }, [editingReviewId]);
    // Save draft to localStorage
    const handleSaveDraft = () => {
        try {
            const draft = {
                companyName,
                industry,
                jobTitle,
                employmentStatus,
                city,
                pros,
                cons,
                rating,
                difficulty,
                recommend,
                isAnonymous,
                step,
            };
            localStorage.setItem('reevue_review_draft', JSON.stringify(draft));
            alert('Draft saved successfully!');
        }
        catch (err) {
            console.error('Failed to save review draft', err);
        }
    };
    // Step Validation Helpers
    const isStep1Valid = () => companyName.trim().length > 0 && industry.trim().length > 0;
    const isStep2Valid = () => jobTitle.trim().length > 0 && city.trim().length > 0;
    const isStep3Valid = () => pros.trim().length >= 15 && cons.trim().length >= 15;
    const isStep4Valid = () => rating > 0;
    const handleNext = () => {
        const newErrors = {};
        if (step === 1) {
            if (!companyName.trim())
                newErrors.companyName = 'Company name is required';
            if (!industry.trim())
                newErrors.industry = 'Industry is required';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setStep(2);
        }
        else if (step === 2) {
            if (!jobTitle.trim())
                newErrors.jobTitle = 'Job title is required';
            if (!city.trim())
                newErrors.city = 'Location city is required';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setStep(3);
        }
        else if (step === 3) {
            if (pros.trim().length < 15)
                newErrors.pros = 'Pros must be at least 15 characters';
            if (cons.trim().length < 15)
                newErrors.cons = 'Cons must be at least 15 characters';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setStep(4);
        }
        else if (step === 4) {
            if (rating === 0)
                newErrors.rating = 'Please rate your overall experience';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setStep(5);
        }
        setErrors({});
    };
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const handleStepClick = (targetStep) => {
        if (targetStep === 1)
            setStep(1);
        if (targetStep === 2 && isStep1Valid())
            setStep(2);
        if (targetStep === 3 && isStep1Valid() && isStep2Valid())
            setStep(3);
        if (targetStep === 4 && isStep1Valid() && isStep2Valid() && isStep3Valid())
            setStep(4);
        if (targetStep === 5 && isStep1Valid() && isStep2Valid() && isStep3Valid() && isStep4Valid())
            setStep(5);
    };
    const handleSubmit = () => {
        if (!isStep1Valid() || !isStep2Valid() || !isStep3Valid() || !isStep4Valid()) {
            alert('Please complete all form fields before submitting.');
            return;
        }
        const todayStr = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        try {
            const stored = localStorage.getItem('reevue_reviews_v1');
            let currentList = [];
            if (stored) {
                currentList = JSON.parse(stored);
            }
            if (editingReviewId) {
                // Edit and update review in place
                const updatedList = currentList.map((r) => {
                    if (r.id === editingReviewId) {
                        return {
                            ...r,
                            companyName: companyName.trim(),
                            jobTitle: `${jobTitle} (${employmentStatus})`,
                            rating,
                            difficulty,
                            recommend,
                            pros: pros.trim(),
                            cons: cons.trim(),
                            isAnonymous,
                        };
                    }
                    return r;
                });
                localStorage.setItem('reevue_reviews_v1', JSON.stringify(updatedList));
            }
            else {
                // Add new review
                const newReview = {
                    id: 'rev-' + Date.now(),
                    authorEmail: auth.user?.email || 'anonymous@reevue.edu',
                    companyName: companyName.trim(),
                    jobTitle: `${jobTitle} (${employmentStatus})`,
                    date: todayStr,
                    rating,
                    difficulty,
                    recommend,
                    pros: pros.trim(),
                    cons: cons.trim(),
                    isAnonymous,
                    helpfulCount: 0,
                };
                localStorage.setItem('reevue_reviews_v1', JSON.stringify([newReview, ...currentList]));
            }
            localStorage.removeItem('reevue_review_draft'); // clear draft
            navigate('/reviews');
        }
        catch (err) {
            console.error('Failed to submit review', err);
        }
    };
    const renderStepProgressBar = () => {
        return (<div className="d-flex justify-content-between align-items-center mb-5 position-relative">
        <div className="position-absolute bg-light-teal-bg" style={{ height: '4px', left: '10%', right: '10%', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#e9ecef', zIndex: 0 }}></div>
        
        {[1, 2, 3, 4, 5].map((sIndex) => {
                const isActive = step === sIndex;
                const isCompleted = step > sIndex;
                let label = 'Company';
                if (sIndex === 2)
                    label = 'Type';
                if (sIndex === 3)
                    label = 'Notes';
                if (sIndex === 4)
                    label = 'Feedback';
                if (sIndex === 5)
                    label = 'Preview';
                return (<button key={sIndex} onClick={() => handleStepClick(sIndex)} className="btn p-0 d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, border: 'none', background: 'transparent' }} disabled={(sIndex === 2 && !isStep1Valid()) ||
                        (sIndex === 3 && (!isStep1Valid() || !isStep2Valid())) ||
                        (sIndex === 4 && (!isStep1Valid() || !isStep2Valid() || !isStep3Valid())) ||
                        (sIndex === 5 && (!isStep1Valid() || !isStep2Valid() || !isStep3Valid() || !isStep4Valid()))}>
              <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold`} style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: isActive
                            ? 'var(--primary-teal)'
                            : isCompleted
                                ? 'var(--primary-container)'
                                : '#FFFFFF',
                        color: isActive || isCompleted ? '#FFFFFF' : '#6c757d',
                        border: isActive || isCompleted ? 'none' : '2px solid #dee2e6',
                        transition: 'all 0.2s',
                    }}>
                {isCompleted ? <i className="bi bi-check-lg"></i> : sIndex}
              </div>
              <span className={`small mt-2 fw-semibold ${isActive ? 'text-teal' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                {label}
              </span>
            </button>);
            })}
      </div>);
    };
    const renderWizardContent = () => {
        switch (step) {
            case 1:
                return (<div className="animate-fade-in">
            <h4 className="fw-bold mb-4">{editingReviewId ? 'Edit Step 1: Company Profile' : 'Step 1: Company Profile'}</h4>
            
            <div className="mb-4">
              <label htmlFor="compName" className="form-label fw-bold">Company Name</label>
              <input type="text" id="compName" className={`form-control bg-light border-0 py-2.5 ${errors.companyName ? 'is-invalid' : ''}`} placeholder="e.g. Google, Stripe, Microsoft" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
              {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="industrySelect" className="form-label fw-bold">Industry Sector</label>
              <select id="industrySelect" className={`form-select bg-light border-0 py-2.5 ${errors.industry ? 'is-invalid' : ''}`} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">-- Select Industry --</option>
                <option value="Software / Internet">Software / Internet</option>
                <option value="Finance / Fintech">Finance / Fintech</option>
                <option value="Hardware / Semiconductor">Hardware / Semiconductor</option>
                <option value="Health / Medtech">Health / Medtech</option>
              </select>
              {errors.industry && <div className="invalid-feedback">{errors.industry}</div>}
            </div>
          </div>);
            case 2:
                return (<div className="animate-fade-in">
            <h4 className="fw-bold mb-4">Step 2: Role Specifications</h4>
            
            <div className="mb-4">
              <label htmlFor="jobT" className="form-label fw-bold">Job Title</label>
              <input type="text" id="jobT" className={`form-control bg-light border-0 py-2.5 ${errors.jobTitle ? 'is-invalid' : ''}`} placeholder="e.g. Frontend Engineer, Product Manager" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
              {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
            </div>

            <div className="row mb-4 g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="empStat" className="form-label fw-bold">Employment Type</label>
                <select id="empStat" className="form-select bg-light border-0 py-2.5" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="cityLoc" className="form-label fw-bold">Location City</label>
                <input type="text" id="cityLoc" className={`form-control bg-light border-0 py-2.5 ${errors.city ? 'is-invalid' : ''}`} placeholder="e.g. San Francisco, New York, Remote" value={city} onChange={(e) => setCity(e.target.value)}/>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>
          </div>);
            case 3:
                return (<div className="animate-fade-in">
            <h4 className="fw-bold mb-1">Step 3: Workspace Insights</h4>
            <p className="text-muted small mb-4">Provide detailed written feedback. Minimally 15 characters each.</p>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label htmlFor="prosText" className="form-label fw-bold">Pros</label>
                <span className="small text-muted">{pros.length} chars</span>
              </div>
              <textarea id="prosText" rows={4} className={`form-control bg-light border-0 ${errors.pros ? 'is-invalid' : ''}`} placeholder="What are the best parts of working here? (compensation, work-life balance, culture)" value={pros} onChange={(e) => setPros(e.target.value)}></textarea>
              {errors.pros && <div className="invalid-feedback">{errors.pros}</div>}
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label htmlFor="consText" className="form-label fw-bold">Cons</label>
                <span className="small text-muted">{cons.length} chars</span>
              </div>
              <textarea id="consText" rows={4} className={`form-control bg-light border-0 ${errors.cons ? 'is-invalid' : ''}`} placeholder="What are the downsides or challenges of this company?" value={cons} onChange={(e) => setCons(e.target.value)}></textarea>
              {errors.cons && <div className="invalid-feedback">{errors.cons}</div>}
            </div>
          </div>);
            case 4:
                return (<div className="animate-fade-in">
            <h4 className="fw-bold mb-4">Step 4: Experience Rating</h4>

            <div className="mb-4">
              <label className="form-label fw-bold d-block">Overall Workspace Score</label>
              <StarRating rating={rating} mode="interactive" size="lg" onChange={setRating}/>
              {errors.rating && <div className="text-danger small mt-1">{errors.rating}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Interview Loop Difficulty</label>
              <div className="d-flex gap-3">
                {['Easy', 'Medium', 'Hard'].map((diff) => {
                        const isActive = difficulty === diff;
                        let colorClass = 'difficulty-medium';
                        if (diff === 'Easy')
                            colorClass = 'difficulty-easy';
                        if (diff === 'Hard')
                            colorClass = 'difficulty-hard';
                        return (<button key={diff} type="button" onClick={() => setDifficulty(diff)} className={`btn p-3 flex-fill text-center rounded border transition-all ${isActive ? 'bg-light border-teal shadow-sm' : 'bg-white border-light'}`} style={{ cursor: 'pointer' }}>
                      <span className={`difficulty-badge ${colorClass} m-0`}>{diff} Loop</span>
                    </button>);
                    })}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold d-block">Recommend to peers?</label>
              <div className="d-flex gap-3 mt-2" style={{ maxWidth: '280px' }}>
                <button type="button" onClick={() => setRecommend(true)} className={`btn flex-fill py-2 rounded-pill border-0 ${recommend ? 'btn-primary-teal' : 'btn-secondary-custom'}`}>
                  <i className="bi bi-hand-thumbs-up-fill me-1"></i> Yes
                </button>
                <button type="button" onClick={() => setRecommend(false)} className={`btn flex-fill py-2 rounded-pill border-0 ${!recommend ? 'btn-primary-teal' : 'btn-secondary-custom'}`}>
                  <i className="bi bi-hand-thumbs-down-fill me-1"></i> No
                </button>
              </div>
            </div>
          </div>);
            case 5:
                const previewProps = {
                    companyName,
                    jobTitle: `${jobTitle} (${employmentStatus})`,
                    date: 'Review Preview',
                    rating,
                    difficulty,
                    recommend,
                    pros,
                    cons,
                    isAnonymous,
                    authorEmail: auth.user?.email || 'reviewer@reevue.edu',
                    helpfulCount: 0,
                };
                return (<div className="animate-fade-in">
            <h4 className="fw-bold mb-4">Step 5: Review & Publish</h4>
            
            <div className="card-preview mb-4">
              <ReviewCard {...previewProps}/>
            </div>

            <div className="card card-custom p-4 bg-light shadow-none mb-4">
              <div className="form-check form-switch d-flex align-items-center gap-3">
                <input className="form-check-input" type="checkbox" role="switch" id="anonSwitch" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} style={{ width: '48px', height: '24px', cursor: 'pointer' }}/>
                <label className="form-check-label fw-bold" htmlFor="anonSwitch" style={{ cursor: 'pointer' }}>
                  Post review anonymously
                  <span className="d-block text-muted fw-normal small">
                    Hides your profile name and email address from the public review feed.
                  </span>
                </label>
              </div>
            </div>
          </div>);
            default:
                return null;
        }
    };
    return (<div className="section-light-teal py-5 animate-fade-in min-vh-75">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card card-custom p-4 p-md-5">
              {renderStepProgressBar()}
              
              {renderWizardContent()}

              <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top border-light">
                <button type="button" onClick={handleBack} className={`btn btn-secondary-custom rounded-pill px-4 ${step === 1 ? 'invisible' : ''}`}>
                  Back
                </button>
                <div className="d-flex gap-2">
                  <button type="button" onClick={handleSaveDraft} className="btn btn-tertiary-custom">
                    Save Draft
                  </button>
                  {step < 5 ? (<button type="button" onClick={handleNext} className="btn btn-primary-teal rounded-pill px-5">
                      Next
                    </button>) : (<button type="button" onClick={handleSubmit} className="btn btn-primary-teal rounded-pill px-5">
                      {editingReviewId ? 'Save Changes' : 'Submit Review'}
                    </button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default SubmitReview;
