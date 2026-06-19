import React, { useState, useEffect, useContext } from 'react';
import CompaniesContext from '../context/CompaniesContext';

import { useNavigate } from 'react-router-dom';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';

const INITIAL_MOCK_REVIEWS = [
  {
    id: 'rev-1',
    authorEmail: 'student@reevue.edu',
    companyName: 'Google',
    jobTitle: 'Software Engineer II',
    date: 'June 15, 2026',
    rating: 4.5,
    difficulty: 'Medium',
    recommend: true,
    helpfulCount: 24,
    pros: 'Excellent work-life balance, top-tier compensation, fantastic campus facilities, and access to state-of-the-art tools and resources. Teams are highly collaborative and engineering quality is outstanding.',
    cons: 'Promotion processes can feel slow and bureaucratic. The company size means some projects move slowly, and there can be duplicate efforts across different divisions.',
  },
  {
    id: 'rev-2',
    authorEmail: 'stripe.dev@example.com',
    companyName: 'Stripe',
    jobTitle: 'Senior Frontend Engineer',
    date: 'May 28, 2026',
    rating: 4.8,
    difficulty: 'Hard',
    recommend: true,
    helpfulCount: 42,
    pros: 'High caliber of engineering talent, focus on building elegant APIs and great UI details. Beautiful office, amazing health benefits, and very clear career ladders for technical individual contributors.',
    cons: 'Highly rigorous interview process. High expectation of output can lead to longer hours during major product releases. Fast-paced environment is not for everyone.',
  },
  {
    id: 'rev-3',
    authorEmail: 'amzn.lead@example.com',
    companyName: 'Amazon',
    jobTitle: 'Area Manager',
    date: 'April 12, 2026',
    rating: 3.5,
    difficulty: 'Easy',
    recommend: false,
    helpfulCount: 8,
    pros: 'Fast hiring process and low barrier to entry. Great operational experience and opportunities to manage large teams early in your career. Solid benefits package.',
    cons: 'Work hours can be long, including weekends and night shifts. High pressure to meet target metrics (KPIs) and higher turnover rates compared to peer companies.',
  },
  {
    id: 'rev-4',
    authorEmail: 'meta.design@example.com',
    companyName: 'Meta',
    jobTitle: 'Product Designer',
    date: 'March 18, 2026',
    rating: 4.6,
    difficulty: 'Medium',
    recommend: true,
    helpfulCount: 15,
    pros: 'Incredible design culture and focus on direct user impact. Access to massive datasets for UX research, strong engineering partners, and top of market compensation packages.',
    cons: 'Public scrutiny can affect morale. The move towards a flatter organization creates ambiguity in team structures, and cross-functional alignments can take significant negotiation.',
  },
  {
    id: 'rev-5',
    authorEmail: 'sre.google@example.com',
    companyName: 'Google',
    jobTitle: 'Site Reliability Engineer',
    date: 'February 10, 2026',
    rating: 4.2,
    difficulty: 'Hard',
    recommend: true,
    helpfulCount: 19,
    pros: 'Unmatched scale and complexity of systems. High engineering standards, robust tooling, and excellent compensation. On-call compensation is very fair and transparent.',
    cons: 'On-call rotations can be stressful and interrupt sleep patterns. Extensive design doc processes are required for even minor architectural changes, which slowing execution down.',
  },
];


export const Home = () => {
  const { companies, setFilters, resetFilters } = useContext(CompaniesContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('reevue_reviews_v1'); //بيشوف هل فيه ريففيوز متخزنة ولا لا
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      }
      catch (err) {
        setReviews(INITIAL_MOCK_REVIEWS);
      }
    }
    else {
      setReviews(INITIAL_MOCK_REVIEWS);
      localStorage.setItem('reevue_reviews_v1', JSON.stringify(INITIAL_MOCK_REVIEWS));
    }
  }, []);

  // Calculate summaries dynamically
  const getCompanySummaries = () => {
    const summariesMap = {};
    reviews.forEach((r) => {
      const name = r.companyName;
      if (!summariesMap[name]) {
        summariesMap[name] = { ratings: [], difficulties: [] };
      }
      summariesMap[name].ratings.push(r.rating);
      summariesMap[name].difficulties.push(r.difficulty);
    });
    return Object.keys(summariesMap).map((name) => {
      const data = summariesMap[name];
      const avg = data.ratings.reduce((sum, r) => sum + r, 0) / data.ratings.length;
      const diffCounts = data.difficulties.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      let modeDifficulty = 'Medium';
      let maxCount = 0;
      Object.keys(diffCounts).forEach((key) => {
        if (diffCounts[key] > maxCount) {
          maxCount = diffCounts[key];
          modeDifficulty = key;
        }
      });
      return {
        name,
        avgRating: avg,
        reviewCount: data.ratings.length,
        difficulty: modeDifficulty,
      };
    });
  };
  const handleCompanyClick = (companyName) => {
    navigate(`/company/${companyName}`);
  };
  const summaries = getCompanySummaries();
  const topReviews = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 2);
  const totalAvgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const totalRecommend = reviews.length > 0
    ? Math.round((reviews.filter((r) => r.recommend).length / reviews.length) * 100)
    : 0;


  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="section-white">
        <div className="container py-4">
          <div className="row align-items-center justify-content-between gy-5">
            <div className="col-12 col-lg-6">
              <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: '1.2' }}>
                Find the <span className="text-teal text-gradient">Real Truth</span> about Tech Careers
              </h1>
              <p className="lead text-muted mb-4" style={{ lineHeight: '1.7' }}>
                Explore interview difficulty levels, realistic job reviews, pros, and cons. Written by engineers, for engineers.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button onClick={() => navigate('/trending')} className="btn btn-primary-teal rounded-pill d-inline-flex align-items-center gap-2">
                  <i className="bi bi-fire"></i> Browse Reviews
                </button>
                <button onClick={() => navigate('/submit-review')} className="btn btn-secondary-custom rounded-pill">
                  Submit a Review
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-5 text-center">
              <div className="p-5 rounded-4 d-flex flex-column justify-content-center align-items-center text-center shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--light-teal-bg), #FFFFFF)',
                  border: '1px solid rgba(0, 83, 91, 0.05)',
                  minHeight: '300px',
                }}>
                <i className="bi bi-clipboard-data text-teal display-3 mb-3"></i>
                <h5 className="fw-bold mb-2">Platform Overview</h5>
                <div className="d-flex gap-4 mt-3">
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-teal">{reviews.length}</div>
                    <div className="small text-muted">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-teal">{totalAvgRating}★</div>
                    <div className="small text-muted">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="fs-3 fw-bold text-teal">{totalRecommend}%</div>
                    <div className="small text-muted">Recommend</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Company Directory */}
      <section className="section-light-teal">
        <div className="container">
          <h2 className="fw-bold mb-1">Company Directory</h2>
          <p className="text-muted small mb-4">Click a company to view aggregate stats and filtered reviews</p>
          <div className="row g-4">
            {
              summaries.map((company) => (
                <div className="col-12 col-sm-6 col-md-3" key={company.name}>
                  <div onClick={() => handleCompanyClick(company.name)} style={{ cursor: 'pointer' }} className="card card-custom p-4 text-center h-100">
                    <h4 className="fw-bold mb-2 text-teal">{company.name}</h4>
                    <div className="d-flex justify-content-center mb-2">
                      <StarRating rating={company.avgRating} mode="display" size="sm" />
                    </div>
                    <div className="small text-muted mb-2 fw-medium">
                      {company.avgRating.toFixed(1)} ★ ({company.reviewCount} {company.reviewCount === 1 ? 'review' : 'reviews'})
                    </div>
                    <div className="mt-auto pt-2">
                      <span className="small fw-semibold text-secondary">
                        {company.difficulty} Interview Loop
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Section 3: Featured Reviews */}
      <section className="section-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Highest Rated Reviews</h2>
              <p className="text-muted small mb-0">Peer recommendations boasting the best ratings</p>
            </div>
            <button type="button" onClick={() => navigate('/trending')} className="btn btn-tertiary-custom btn-sm">
              View all reviews
            </button>
          </div>

          <div className="row">
            {topReviews.map((review, index) => (<div className="col-12 col-lg-8 mx-auto" key={review.id || index}>
              <ReviewCard {...review} onCompanyClick={handleCompanyClick} />
            </div>))}
          </div>
        </div>
      </section>
    </div>);
};


export default Home;
