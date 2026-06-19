import React, { useState } from 'react';
import { ReviewCard } from './ReviewCard';
const AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
];
export const Profile = ({ user, onUpdateProfile, reviews, onDeleteReview, onEditReview, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
    const [error, setError] = useState('');
    // Filter reviews written by this user
    const userReviews = reviews.filter((r) => r.authorEmail && r.authorEmail.toLowerCase() === user.email.toLowerCase());
    const totalHelpfulVotes = userReviews.reduce((sum, r) => sum + (r.helpfulCount || 0), 0);
    const handleSave = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name cannot be empty');
            return;
        }
        setError('');
        onUpdateProfile(name.trim(), bio.trim(), selectedAvatar);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setName(user.name);
        setBio(user.bio);
        setSelectedAvatar(user.avatar);
        setError('');
        setIsEditing(false);
    };
    return (<div className="profile-view animate-fade-in">
      {/* Upper Section: Profile Details Banner (White background section) */}
      <section className="section-white pt-4 pb-4">
        <div className="container">
          <h1 className="display-5 fw-bold mb-4">Your Profile</h1>

          <div className="row g-4 align-items-center">
            {/* Avatar Column */}
            <div className="col-12 col-md-3 text-center text-md-start">
              <img src={user.avatar} alt={user.name} className="rounded-circle border shadow-sm img-thumbnail" width="140" height="140" style={{ objectFit: 'cover' }}/>
            </div>

            {/* Profile Info Description Column */}
            <div className="col-12 col-md-9">
              {!isEditing ? (<div>
                  <h2 className="fw-bold mb-1">{user.name}</h2>
                  <p className="text-teal fw-semibold mb-2">{user.email}</p>
                  <p className="text-secondary mb-3" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                    {user.bio || 'No bio written yet. Click edit profile to add details about yourself.'}
                  </p>
                  <button type="button" onClick={() => setIsEditing(true)} className="btn btn-secondary-custom btn-sm rounded-pill px-4">
                    <i className="bi bi-pencil-square me-1"></i> Edit Profile
                  </button>
                </div>) : (<form onSubmit={handleSave} className="card card-custom p-4 bg-light shadow-none">
                  <h5 className="fw-bold text-teal mb-3">Edit Display Settings</h5>

                  {error && <div className="alert alert-danger py-2 px-3 small mb-3">{error}</div>}

                  {/* Name field */}
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label small fw-bold text-secondary">
                      Display Name
                    </label>
                    <input type="text" id="editName" className="form-control border-0" value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>

                  {/* Bio field */}
                  <div className="mb-3">
                    <label htmlFor="editBio" className="form-label small fw-bold text-secondary">
                      Bio
                    </label>
                    <textarea id="editBio" rows={2} className="form-control border-0" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="e.g. Computer Science Student, Aspiring Web Dev"/>
                  </div>

                  {/* Avatar selection list */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary d-block">
                      Select Avatar Preset
                    </label>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {AVATARS.map((avUrl, index) => (<img key={index} src={avUrl} alt={`Avatar ${index}`} onClick={() => setSelectedAvatar(avUrl)} className={`rounded-circle border p-1 img-fluid`} width="52" height="52" style={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderColor: selectedAvatar === avUrl ? 'var(--primary-teal) !important' : '#dee2e6',
                    borderWidth: selectedAvatar === avUrl ? '3px' : '1px',
                }}/>))}
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button type="button" onClick={handleCancel} className="btn btn-secondary-custom btn-sm rounded-pill">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary-teal btn-sm rounded-pill px-4">
                      Save Changes
                    </button>
                  </div>
                </form>)}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Contribution Statistics (Light Teal background section - NO border lines!) */}
      <section className="section-light-teal">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card card-custom p-4 text-center h-100 d-flex flex-column justify-content-center">
                <span className="text-muted small fw-semibold uppercase mb-2">Contributed Reviews</span>
                <div className="display-4 fw-bold text-teal">{userReviews.length}</div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="card card-custom p-4 text-center h-100 d-flex flex-column justify-content-center">
                <span className="text-muted small fw-semibold uppercase mb-2">Helpful Votes Received</span>
                <div className="display-4 fw-bold text-teal">{totalHelpfulVotes}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lower Section: User's Contributed Reviews Feed (White background section) */}
      <section className="section-white">
        <div className="container">
          <h3 className="fw-bold mb-4">Reviews You Contributed</h3>

          <div className="row">
            {userReviews.length > 0 ? (<div className="col-12 col-lg-8">
                {userReviews.map((review, idx) => (<ReviewCard key={review.id || idx} {...review} onDeleteClick={onDeleteReview} onEditClick={onEditReview}/>))}
              </div>) : (<div className="col-12 py-5 text-center bg-light rounded-3">
                <i className="bi bi-chat-left-quote text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-semibold text-dark">You haven't contributed any reviews yet</h5>
                <p className="text-muted small">
                  Your voice matters. Write reviews of interviews or jobs you completed to help the community.
                </p>
              </div>)}
          </div>
        </div>
      </section>
    </div>);
};
export default Profile;
