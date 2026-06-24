import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';


import { useNavigate } from 'react-router-dom';
import { ReviewCard } from '../components/ReviewCard';
import { StarRating } from '../components/StarRating';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
];
export const UserProfile = () => {
  const navigate = useNavigate();
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;


  const [activeSubTab, setActiveSubTab] = useState('reviews');
  // Settings Form State
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  // Reviews and Q&A state loaded from localStorage
  const [reviews, setReviews] = useState([]);
  const [qaList, setQaList] = useState([]);
  // Sync state with Redux User on mount
  useEffect(() => {
    if (auth.user) {
      setName(auth?.user?.name);
      setBio(auth?.user?.bio);
      setAvatar(auth?.user?.avatar);
    }
  }, [auth.user]);
  // Load reviews and Q&As
  useEffect(() => {
    const storedReviews = localStorage.getItem('reevue_reviews_v1');
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      }
      catch (err) {
        console.error(err);
      }
    }
    const storedQa = localStorage.getItem('reevue_qa_v1');
    if (storedQa) {
      try {
        setQaList(JSON.parse(storedQa));
      }
      catch (err) {
        console.error(err);
      }
    }
  }, []);
  if (!auth.user) {
    return (<div className="container py-5 text-center min-vh-75 animate-fade-in">
      <p className="text-muted">Loading profile info...</p>
    </div>);
  }
  // Filter reviews owned by the logged-in user
  const userReviews = reviews.filter((r) => r.authorEmail && r.authorEmail.toLowerCase() === auth.user?.email.toLowerCase());
  const totalHelpfulVotes = userReviews.reduce((sum, r) => sum + (r.helpfulCount || 0), 0);
  // Filter Q&As written by this user
  // For the demonstration, we'll fetch mock questions or questions they submitted in this session
  const userQAs = qaList.filter(q => q.answers.length > 0 || q.id.startsWith('user-'));

  const handleUpdateProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Name cannot be empty.');
      return;
    }
    updateProfile({ name: name.trim(), bio: bio.trim() });
    alert('Settings updated successfully!');
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
  // saved companies list
  const mockSavedCompanies = JSON.parse(localStorage.getItem('reevue_saved_companies') || '[]');
  // Achievements Badges mapping
  const renderBadges = () => {
    const badges = [];
    if (userReviews.length >= 1) {
      badges.push({ name: 'Contributor', desc: 'Contributed 1+ review', icon: 'bi-patch-check-fill', color: 'text-success' });
    }
    if (totalHelpfulVotes >= 20) {
      badges.push({ name: 'Helpful Peer', desc: 'Received 20+ helpful votes', icon: 'bi-heart-fill', color: 'text-danger' });
    }
    badges.push({ name: 'Early Adopter', desc: 'Joined ReeVue in 2026', icon: 'bi-award-fill', color: 'text-warning' });
    return (<div className="card card-custom p-4 mt-4">
      <h5 className="fw-bold mb-3">Achievements</h5>
      <div className="d-flex flex-column gap-3">
        {badges.map((b) => (<div key={b.name} className="d-flex align-items-center gap-3">
          <i className={`bi ${b.icon} fs-3 ${b.color}`}></i>
          <div>
            <div className="fw-bold small" style={{ fontSize: '0.85rem' }}>{b.name}</div>
            <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{b.desc}</div>
          </div>
        </div>))}
      </div>
    </div>);
  };
  return (<div className="section-light-teal py-5 animate-fade-in min-vh-75">
    <div className="container">
      <div className="row g-4">

        {/* Left Column: Profile Card & Badges */}
        <div className="col-12 col-lg-4">
          <div className="card card-custom p-4 text-center">
            <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold text-white" style={{ width: 110, height: 110, background: '#9ca3af', fontSize: '2.5rem' }}>
              {auth?.user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 className="fw-bold mb-1">{auth?.user?.name}</h3>
            <p className="text-teal small fw-semibold mb-3">{auth?.user?.email}</p>
            <p className="text-muted small mb-0 px-2" style={{ lineHeight: '1.6' }}>
              {auth?.user?.bio || 'Add a bio in the settings tab to introduce yourself!'}
            </p>
          </div>

          {/* Render achievements badges */}
          {renderBadges()}
        </div>

        {/* Right Column: Tabbed Panel Content */}
        <div className="col-12 col-lg-8">
          <div className="card card-custom p-4">

            {/* Tab Navigation header */}
            <ul className="nav nav-pills mb-4 gap-2">
              <li className="nav-item">
                <button onClick={() => setActiveSubTab('reviews')} className={`nav-link rounded-pill px-4 border-0 fw-semibold ${activeSubTab === 'reviews' ? 'btn-primary-teal active' : 'btn-secondary-custom'}`}>
                  My Reviews ({userReviews.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveSubTab('saved')} className={`nav-link rounded-pill px-4 border-0 fw-semibold ${activeSubTab === 'saved' ? 'btn-primary-teal active' : 'btn-secondary-custom'}`}>
                  Saved Companies ({mockSavedCompanies.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveSubTab('qa')} className={`nav-link rounded-pill px-4 border-0 fw-semibold ${activeSubTab === 'qa' ? 'btn-primary-teal active' : 'btn-secondary-custom'}`}>
                  My Q&A
                </button>
              </li>
              <li className="nav-item ms-md-auto">
                <button onClick={() => setActiveSubTab('settings')} className={`nav-link rounded-pill px-4 border-0 fw-semibold ${activeSubTab === 'settings' ? 'btn-primary-teal active' : 'btn-secondary-custom'}`}>
                  <i className="bi bi-gear me-1"></i> Settings
                </button>
              </li>
            </ul>

            {/* Sub-tab Rendering */}
            {activeSubTab === 'reviews' && (<div className="animate-fade-in">
              <h5 className="fw-bold mb-3">Reviews You Contributed</h5>
              {userReviews.length > 0 ? (userReviews.map((review, idx) => (<ReviewCard key={review.id || idx} {...review} onDeleteClick={handleDeleteReview} onEditClick={handleEditReview} onCompanyClick={(comp) => navigate(`/company/${comp}`)} />))) : (<div className="text-center py-5 bg-light rounded-3">
                <i className="bi bi-chat-square-dots text-muted fs-2 mb-2 d-block"></i>
                <p className="text-muted small">You haven't contributed any reviews yet.</p>
                <button onClick={() => navigate('/submit-review')} className="btn btn-primary-teal rounded-pill btn-sm">
                  Submit First Review
                </button>
              </div>)}
            </div>)}

            {activeSubTab === 'saved' && (<div className="animate-fade-in">
              <div className="d-flex justify-content-between align-items-end mb-3">
                <h5 className="fw-bold mb-3">Bookmarked Companies</h5>
                <button type="button" onClick={() => navigate('/saved-companies')} className="btn btn-tertiary-custom btn-sm">
                  View all saved
                </button>
              </div>
              <div className="row g-3">
                {mockSavedCompanies.map((c) => (<div className="col-12 col-md-6" key={c.name}>
                  <div onClick={() => navigate(`/company/${c.name}`)} className="p-3 bg-light rounded-3 h-100 cursor-pointer hover-overlay card-custom shadow-none border-0" style={{ cursor: 'pointer' }}>
                    <h6 className="fw-bold text-teal mb-2">{c.name}</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <StarRating rating={c.avgRating} mode="display" size="sm" />
                      <span className="small text-muted fw-semibold">{c.difficulty} Loop</span>
                    </div>
                  </div>
                </div>))}
              </div>
            </div>)}

            {activeSubTab === 'qa' && (<div className="animate-fade-in">
              <h5 className="fw-bold mb-3">Q&As Submitted by You</h5>
              {userQAs.length > 0 ? (<div className="list-group list-group-flush">
                {userQAs.map((q) => (<div key={q.id} className="list-group-item bg-transparent border-light border-0 border-bottom py-3">
                  <span className="badge bg-light text-teal mb-2">{q.companyName} Interview</span>
                  <h6 className="fw-bold text-dark mb-1">{q.question}</h6>
                  {q.answers.length > 0 ? (<p className="small text-muted mb-0 mt-2 bg-light p-2.5 rounded-3 border-start border-teal border-3">
                    <strong>Answer snippet:</strong> {q.answers[0]}
                  </p>) : (<span className="text-muted small mt-1 d-block"><i className="bi bi-hourglass-split me-1"></i>Awaiting responses</span>)}
                </div>))}
              </div>) : (<div className="text-center py-5 bg-light rounded-3">
                <i className="bi bi-patch-question text-muted fs-2 mb-2 d-block"></i>
                <p className="text-muted small">You haven't posted any questions yet.</p>
                <button onClick={() => navigate('/qa')} className="btn btn-primary-teal rounded-pill btn-sm">
                  View Q&A Forum
                </button>
              </div>)}
            </div>)}

            {activeSubTab === 'settings' && (<div className="animate-fade-in">
              <h5 className="fw-bold mb-4">Edit Profile Settings</h5>

              <form onSubmit={handleUpdateProfileSubmit}>
                <div className="mb-3">
                  <label htmlFor="settingsName" className="form-label small fw-bold">Display Name</label>
                  <input type="text" id="settingsName" className="form-control bg-light border-0" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="settingsBio" className="form-label small fw-bold">Bio</label>
                  <textarea id="settingsBio" rows={3} className="form-control bg-light border-0" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="CS student, Frontend developer, etc." />
                </div>

                <div className="mb-4 mt-4 p-3 bg-light rounded-3">
                  <h6 className="fw-bold mb-3 small text-secondary">Notification Preferences</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="emailAlerts" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} style={{ cursor: 'pointer' }} />
                    <label className="form-check-label small" htmlFor="emailAlerts" style={{ cursor: 'pointer' }}>
                      Email notifications for new company reviews
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="pushNotifs" checked={pushNotifs} onChange={(e) => setPushNotifs(e.target.checked)} style={{ cursor: 'pointer' }} />
                    <label className="form-check-label small" htmlFor="pushNotifs" style={{ cursor: 'pointer' }}>
                      Desktop alerts for review helpfulness upvotes
                    </label>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary-teal rounded-pill px-4">
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>)}

          </div>
        </div>

      </div>
    </div>
  </div>);
};
export default UserProfile;
