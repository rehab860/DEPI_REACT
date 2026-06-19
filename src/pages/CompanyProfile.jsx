import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CompanyDetails } from '../components/CompanyDetails';
export const CompanyProfile = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
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
    const companyName = name || '';
    const handleBack = () => {
        navigate('/trending');
    };
    const handleWriteReview = (comp) => {
        navigate('/submit-review', { state: { prefilledCompany: comp } });
    };
    return (<div className="animate-fade-in">
      <CompanyDetails companyName={companyName} reviews={reviews} onBack={handleBack} onWriteReview={handleWriteReview}/>
    </div>);
};
export default CompanyProfile;
