import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Navbar = ({ appName = 'ReeVue', activeTab, onTabChange, onSearch, searchQuery, user, onSignOut, onProfileClick, }) => {
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);
  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  const handleProfileDropdownToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const handleNotificationClick = () => {
    setHasUnreadNotifications(false);
    navigate('/notifications');
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!localSearch.trim()) return;

    onSearch(localSearch.trim());

    setIsNavCollapsed(true);
  };
  const handleTabClick = (tab, e) => {
    e.preventDefault();
    onTabChange(tab);
    setIsNavCollapsed(true);
  };
  return (<nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white border-bottom shadow-sm py-2">
    <div className="container">
      {/* Brand/Logo */}
      <a className="logo-container me-3" href="#home" onClick={(e) => handleTabClick('home', e)}>
        <i className="bi bi-eye-fill text-teal fs-3"></i>
        <span className="logo-text fw-bold">{appName}</span>
      </a>

      {/* Mobile Toggler */}
      <button className="navbar-toggler border-0" type="button" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation" onClick={handleNavToggle}>
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Items */}
      <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarContent">
        {/* Menu links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
          <li className="nav-item">
            <a className={`nav-link px-3 ${activeTab === 'home' ? 'text-teal active fw-bold' : 'text-dark'}`} href="#home" onClick={(e) => handleTabClick('home', e)}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link px-3 ${activeTab === 'reviews' ? 'text-teal active fw-bold' : 'text-dark'}`} href="#reviews" onClick={(e) => handleTabClick('reviews', e)}>
              Reviews
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link px-3 ${activeTab === 'submit' ? 'text-teal active fw-bold' : 'text-dark'}`} href="#submit" onClick={(e) => handleTabClick('submit', e)}>
              Submit Review
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link px-3 ${activeTab === 'qa' ? 'text-teal active fw-bold' : 'text-dark'}`} href="#qa" onClick={(e) => handleTabClick('qa', e)}>
              Interview Q&A
            </a>
          </li>
        </ul>

        {/* Search Box in Middle */}
        <form className="d-flex mx-auto col-12 col-lg-3 my-2 my-lg-0 px-2" onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <span className="input-group-text bg-light border-0 rounded-start-pill">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input className="form-control bg-light border-0 rounded-end-pill py-2" type="search" placeholder="Search companies, jobs..." aria-label="Search" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} />
          </div>
        </form>

        {/* User Controls (Notification + Profile) */}
        <div className="d-flex align-items-center justify-content-end gap-3 ms-auto mt-2 mt-lg-0">
          {user ?
            (
              <>
                {/* toggle theme icon */}
                <button type="button" onClick={toggleTheme} className="btn border-0 bg-transparent p-2 text-dark" aria-label="Toggle theme">
                  <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'} fs-5`}></i>
                </button>
                {/* Notification Bell */}
                <button type="button" className="btn position-relative p-2 text-dark bg-transparent border-0" onClick={handleNotificationClick} aria-label="Notifications">
                  <i className="bi bi-bell fs-5"></i>
                  {hasUnreadNotifications && (<span className="position-absolute top-1 start-50 translate-middle-x p-1 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>)}
                </button>

                {/* Profile Dropdown */}
                <div className="position-relative">
                  <button className="btn d-flex align-items-center gap-2 border-0 p-1" type="button" onClick={handleProfileDropdownToggle} aria-expanded={isProfileDropdownOpen}>
                    <div className="rounded-circle border d-flex align-items-center justify-content-center fw-bold text-white" style={{ width: 36, height: 36, background: '#9ca3af', fontSize: '1rem' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="d-none d-md-inline fw-semibold text-dark fs-7">{user.name}</span>
                    <i className={`bi bi-chevron-${isProfileDropdownOpen ? 'up' : 'down'} text-muted small`}></i>
                  </button>

                  {isProfileDropdownOpen && (<ul className="dropdown-menu dropdown-menu-end show shadow position-absolute" style={{
                    right: 0,
                    top: '100%',
                    zIndex: 1000,
                    minWidth: '150px',
                    borderRadius: '8px',
                    border: 'none',
                    display: 'block',
                  }}>
                    <li>
                      <a className="dropdown-item py-2 px-3 fw-medium" href="#profile" onClick={(e) => {
                        e.preventDefault();
                        setIsProfileDropdownOpen(false);
                        onProfileClick();
                      }}>
                        <i className="bi bi-person me-2 text-teal"></i> Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider my-1" />
                    </li>
                    <li>
                      <a className="dropdown-item py-2 px-3 fw-medium text-danger" href="#signout" onClick={(e) => {
                        e.preventDefault();
                        setIsProfileDropdownOpen(false);
                        onSignOut();
                      }}>
                        <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                      </a>
                    </li>
                  </ul>)}
                </div>
              </>
            ) : (
              // <button type="button" onClick={() => onTabChange('home')} className="btn btn-primary-teal rounded-pill btn-sm">
              //   Log In
              // </button>
              <div className="d-flex align-items-center gap-2">
                <button type="button" onClick={() => onTabChange('login')} className="btn btn-secondary-custom rounded-pill btn-sm">
                  Log In
                </button>
                <button type="button" onClick={() => onTabChange('signup')} className="btn btn-primary-teal rounded-pill btn-sm">
                  Sign Up
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  </nav>);
};
