import  { useState, useEffect , useContext} from 'react';
import AuthContext from '../context/AuthContext';

import { useSearchParams, useNavigate } from 'react-router-dom';

import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
export const Search = () => {
    const navigate = useNavigate();
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;
    const [searchParams] = useSearchParams();
     
    const [reviews, setReviews] = useState([]);
    const query = searchParams.get('q') || '';
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
    const handleCompanyClick = (companyName) => {
        navigate(`/company/${companyName}`);
    };
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
    // Filter matching reviews
    const getMatchingReviews = () => {
        if (!query.trim())
            return [];
        const q = query.toLowerCase();
        return reviews.filter((r) => r.companyName.toLowerCase().includes(q) ||
            r.jobTitle.toLowerCase().includes(q) ||
            r.pros.toLowerCase().includes(q) ||
            r.cons.toLowerCase().includes(q));
    };
    // Filter matching company names
    const getMatchingCompanies = () => {
        if (!query.trim())
            return [];
        const q = query.toLowerCase();
        // Group metrics
        const summariesMap = {};
        reviews.forEach((r) => {
            const name = r.companyName;
            if (name.toLowerCase().includes(q)) {
                if (!summariesMap[name]) {
                    summariesMap[name] = { ratings: [], difficulties: [] };
                }
                summariesMap[name].ratings.push(r.rating);
                summariesMap[name].difficulties.push(r.difficulty);
            }
        });
        return Object.keys(summariesMap).map((name) => {
            const data = summariesMap[name];
            const avg = data.ratings.reduce((sum, r) => sum + r, 0) / data.ratings.length;
            return {
                name,
                avgRating: avg,
                reviewCount: data.ratings.length,
            };
        });
    };
    const matchingReviews = getMatchingReviews();
    const matchingCompanies = getMatchingCompanies();
    return (<div className="section-light-teal py-5 animate-fade-in min-vh-75">
      <div className="container">
        
        {/* Header summary */}
        <div className="mb-4">
          <h1 className="fw-bold mb-1">Search Results</h1>
          <p className="text-muted small">
            Showing results for: <strong className="text-teal">"{query}"</strong>
          </p>
        </div>

        {/* Matches Grid */}
        <div className="row g-4">
          {/* Companies Matches Column */}
          {matchingCompanies.length > 0 && (<div className="col-12 mb-4">
              <h4 className="fw-bold mb-3 text-dark">Matching Companies</h4>
              <div className="row g-3">
                {matchingCompanies.map((c) => (<div className="col-12 col-md-4" key={c.name}>
                    <div onClick={() => handleCompanyClick(c.name)} className="card card-custom p-3 cursor-pointer hover-overlay border-0 shadow-sm" style={{ cursor: 'pointer' }}>
                      <h5 className="fw-bold text-teal mb-2">{c.name}</h5>
                      <div className="d-flex align-items-center justify-content-between">
                        <StarRating rating={c.avgRating} mode="display" size="sm"/>
                        <span className="small text-muted">{c.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>))}
              </div>
            </div>)}

          {/* Reviews Matches Column */}
          <div className="col-12 col-lg-8">
            <h4 className="fw-bold mb-3 text-dark">Matching Reviews ({matchingReviews.length})</h4>
            {matchingReviews.length > 0 ? (matchingReviews.map((review, index) => (<ReviewCard key={review.id || index} {...review} onCompanyClick={handleCompanyClick} onDeleteClick={auth.user && review.authorEmail === auth?.user?.email ? handleDeleteReview : undefined} onEditClick={auth.user && review.authorEmail === auth?.user?.email ? handleEditReview : undefined}/>))) : (<div className="text-center py-5 bg-white rounded-3 card-custom shadow-none border-0">
                <i className="bi bi-search text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-semibold">No reviews found</h5>
                <p className="text-muted small">Try searching for other keywords like "Google", "Stripe", or "SRE".</p>
              </div>)}
          </div>
        </div>

      </div>
    </div>);
};
export default Search;
