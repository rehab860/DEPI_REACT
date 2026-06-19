import React, { useState, useEffect , useContext} from 'react';
import AuthContext from '../context/AuthContext';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { ReviewCard } from '../components/ReviewCard';
export const Trending = () => {
    const navigate = useNavigate();
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;
    const [searchParams] = useSearchParams();
     
    const [reviews, setReviews] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedSort, setSelectedSort] = useState('Helpful');
    const [searchQuery, setSearchQuery] = useState('');
    // Sync search query from URL parameter if present (?q=...)
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
        }
        else {
            setSearchQuery('');
        }
    }, [searchParams]);
    // Load reviews list
    useEffect(() => {
        const stored = localStorage.getItem('reevue_reviews_v1');
        if (stored) {
            try {
                setReviews(JSON.parse(stored));
            }
            catch (err) {
                console.error(err);
            }
        }
    }, []);
    const handleDeleteReview = (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            const updated = reviews.filter((r) => r.id !== id);
            setReviews(updated);
            localStorage.setItem('reevue_reviews_v1', JSON.stringify(updated));
        }
    };
    const handleEditReview = (id) => {
        navigate('/submit-review', { state: { editingReviewId: id } });
    };
    const handleCompanyClick = (companyName) => {
        navigate(`/company/${companyName}`);
    };
    // Filter and sort reviews
    const getFilteredAndSortedReviews = () => {
        let result = [...reviews];
        // Search query filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((r) => r.companyName.toLowerCase().includes(q) ||
                r.jobTitle.toLowerCase().includes(q) ||
                r.pros.toLowerCase().includes(q) ||
                r.cons.toLowerCase().includes(q));
        }
        // Difficulty filter
        if (selectedDifficulty !== 'All') {
            result = result.filter((r) => r.difficulty === selectedDifficulty);
        }
        // Sorting
        if (selectedSort === 'Helpful') {
            result.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
        }
        else if (selectedSort === 'Highest') {
            result.sort((a, b) => b.rating - a.rating);
        }
        else if (selectedSort === 'Newest') {
            result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return result;
    };
    const filteredReviews = getFilteredAndSortedReviews();
    return (<div className="animate-fade-in section-light-teal py-4 min-vh-75">
      <div className="container">
        
        {/* Header toolbar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold mb-1">Browse Reviews</h2>
            <p className="text-muted small mb-0">Filter and sort through real candidate and employee feedback</p>
          </div>

          <button onClick={() => navigate('/submit-review')} className="btn btn-primary-teal rounded-pill btn-sm px-4">
            <i className="bi bi-plus-lg me-1"></i> Add Review
          </button>
        </div>

        {/* Clear Search Indicator */}
        {searchQuery && (<div className="alert bg-white border-0 d-flex justify-content-between align-items-center mb-4 rounded-3 shadow-sm px-4 animate-fade-in">
            <div className="small">
              Showing reviews matching: <strong className="text-teal">"{searchQuery}"</strong>
            </div>
            <button type="button" onClick={() => navigate('/trending')} className="btn btn-sm btn-secondary-custom rounded-pill py-1 px-3" style={{ fontSize: '0.8rem' }}>
              Clear Search
            </button>
          </div>)}

        {/* Filter controls panel */}
        <div className="card card-custom p-3 mb-4">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-12 col-md-6 d-flex align-items-center gap-2">
              <span className="small text-muted fw-bold d-none d-sm-inline">Difficulty:</span>
              <div className="d-flex flex-wrap gap-2">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (<button key={diff} type="button" onClick={() => setSelectedDifficulty(diff)} className={`btn btn-sm px-3 rounded-pill transition border-0 ${selectedDifficulty === diff ? 'btn-primary-teal' : 'btn-secondary-custom'}`}>
                    {diff}
                  </button>))}
              </div>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-end gap-2">
              <span className="small text-muted fw-bold">Sort:</span>
              <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="form-select form-select-sm bg-light border-0 rounded-pill px-3 py-2 fw-medium text-dark" style={{ width: '160px', cursor: 'pointer' }}>
                <option value="Helpful">Most Helpful</option>
                <option value="Highest">Highest Rated</option>
                <option value="Newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Review list */}
        <div className="row">
          {filteredReviews.length > 0 ? (<div className="col-12 col-lg-8 mx-auto">
              {filteredReviews.map((review, index) => (<ReviewCard key={review.id || index} {...review} onCompanyClick={handleCompanyClick} onDeleteClick={auth.user && review.authorEmail === auth?.user?.email ? handleDeleteReview : undefined} onEditClick={auth.user && review.authorEmail === auth?.user?.email ? handleEditReview : undefined}/>))}
            </div>) : (<div className="col-12 text-center py-5">
              <i className="bi bi-inbox text-muted display-3 mb-3 d-block"></i>
              <h5 className="fw-semibold">No reviews match your filters</h5>
              <p className="text-muted small">Try adjusting your search criteria or resetting filters.</p>
              <button onClick={() => {
                setSelectedDifficulty('All');
                setSelectedSort('Helpful');
                navigate('/trending');
            }} className="btn btn-secondary-custom rounded-pill mt-2">
                Reset All Filters
              </button>
            </div>)}
        </div>
      </div>
    </div>);
};
export default Trending;
