import React from 'react';

export const Notifications = () => {
    const MOCK_NOTIFS = [
        { id: 1, title: 'New Review for Stripe', desc: 'A Senior Frontend Engineer added a review. Stripe is now rated 4.8★.', time: '2 hours ago', icon: 'bi-building', unread: true },
        { id: 2, title: 'Helpful Review Upvote', desc: 'Someone marked your review of Google as helpful. Total helpful count is now 25.', time: '1 day ago', icon: 'bi-hand-thumbs-up-fill', unread: false },
        { id: 3, title: 'Welcome to ReeVue!', desc: 'Start tracking recruitment loops, write reviews, and contribute to the candidate community.', time: '3 days ago', icon: 'bi-person-badge-fill', unread: false },
    ];
    return (<div className="section-light-teal py-5 animate-fade-in min-vh-75">
      <div className="container">
        <h1 className="fw-bold mb-1">Notifications</h1>
        <p className="text-muted small mb-4">Stay updated with reviews and upvote achievements</p>

        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card card-custom p-3">
              {MOCK_NOTIFS.map((notif) => (<div key={notif.id} className={`p-3 rounded-3 mb-2 d-flex gap-3 align-items-start ${notif.unread ? 'bg-light border-start border-teal border-3' : 'bg-white'}`} style={{ transition: 'background-color 0.2s' }}>
                  <div className={`p-2 rounded-circle bg-light text-teal d-flex align-items-center justify-content-center`}>
                    <i className={`bi ${notif.icon} fs-5`}></i>
                  </div>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className={`fw-bold mb-1 ${notif.unread ? 'text-teal' : ''}`}>{notif.title}</h6>
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>{notif.time}</span>
                    </div>
                    <p className="small text-secondary mb-0" style={{ lineHeight: '1.5' }}>{notif.desc}</p>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default Notifications;
