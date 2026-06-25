import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

import { useNavigate } from 'react-router-dom';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';

import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function Home() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    // بتجيب الرففيوز من الباك
    const fetchReviews = async () => {
      const reviewsRef = collection(db, 'reviews');
      // Sort reviews by date created (الجديد بيظهر فوق)
      const q = query(reviewsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const reviewsList = [];
      querySnapshot.forEach((doc) => {
        reviewsList.push({ id: doc.id, ...doc.data() });
      });//بحول البيانات الي جبتها من الباك لاراي عشان اعرف استخدمهم

      setReviews(reviewsList);
    };
    fetchReviews();
  }, []);
  
  // Calculate summaries dynamically
  const getCompanySummaries = () => {
    const summariesMap = {}
    // {
    //   'companyname1': { ratings: [ , , ..], difficulties: [ , , ..] },
    //   'companyname2': { ratings: [ , , ..], difficulties: [ , , ..] },
    // }
    reviews.forEach((r) => {
      const name = r.companyName;
      if (!summariesMap[name]){  //بشوف الكومباني دي موجودة في الاوبجكت و لا لا
        summariesMap[name] = { ratings: [], difficulties: [] }
      }
      summariesMap[name].ratings.push(r.rating);
      summariesMap[name].difficulties.push(r.difficulty);
    });
    return Object.keys(summariesMap).map((name) => {
      const data = summariesMap[name];
      const avg = data.ratings.reduce((sum, r) => sum + r, 0) / data.ratings.length; //calculate av. rating
      const diffCounts = data.difficulties.reduce((acc, curr) => { // بشوف اني لفل صعوبة متكرر اكتر
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
  //---------------------

  const companySummaries = getCompanySummaries();
  const topReviews = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <>
      <div className="animate-fade-in">
        {/* Hero section */}
        <section className="d-flex align-items-center" style={{ backgroundImage: `url(${isDark ? '/hero-bg-dark.jpg' : '/hero-bg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>
          <div className="container ">
            <div>
              <div className="w-50">
                <h1 className="display-4 fw-bold mb-3" style={{ lineHeight: '1.2', fontFamily: "'Sora', sans-serif" }}>
                  Find the <span className="text-teal text-gradient" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, }}>Real Truth</span> about Tech Careers
                </h1>
                <p className="fs-5 text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Explore interview difficulty levels, realistic job reviews, pros, and cons. Written by engineers, for engineers.
                </p>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <button onClick={() => navigate('/reviews')} className="btn btn-primary-teal rounded-pill d-inline-flex align-items-center gap-2">
                  <i className="bi bi-fire"></i> Browse Reviews
                </button>
                <button onClick={() => navigate('/submit-review')} className="btn btn-secondary-custom rounded-pill">
                  Submit a Review
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Company Directory */}
        <section className="section-light-teal" id="companies">
          <div className="container">
            <h2 className="fw-bold mb-1">Company Directory</h2>
            <p className="text-muted small mb-4">Click a company to view aggregate stats and filtered reviews</p>
            <div className="row g-4">
              {
                companySummaries.map((company) => (
                  <div className="col-12 col-sm-6 col-md-3" key={company.name}>
                    <div onClick={() => navigate(`/company/${company.name}`)} style={{ cursor: 'pointer' }} className="card card-custom p-4 text-center h-100">
                      <h4 className="fw-bold mb-2 text-teal">{company.name}</h4>
                      <div className="d-flex justify-content-center mb-2">
                        <StarRating rating={company.avgRating} mode="display" size="sm" />
                      </div>
                      <div className="small text-muted mb-2 fw-medium">
                        {company.avgRating.toFixed(1)}
                        <i className="bi bi-star-fill mx-2"></i>
                        ({company.reviewCount} {company.reviewCount === 1 ? 'review' : 'reviews'})
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
              <button type="button" onClick={() => navigate('/reviews')} className="btn btn-tertiary-custom btn-sm">
                View all reviews
              </button>
            </div>

            <div className="row">
              {
                topReviews.map((review, index) => (
                  <div className="col-12 col-lg-8 mx-auto" key={index}>
                    <ReviewCard {...review} onCompanyClick={(companyName) => navigate(`/company/${companyName}`)} />
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </>
  );
};


export default Home;
