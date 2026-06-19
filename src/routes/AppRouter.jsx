import { React, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Trending from '../pages/Trending';
import Search from '../pages/Search';
import CompanyProfile from '../pages/CompanyProfile';
import Login from '../pages/Login';
import SubmitReview from '../pages/SubmitReview';
import UserProfile from '../pages/UserProfile';
import SavedCompanies from '../pages/SavedCompanies';
import Notifications from '../pages/Notifications';
import InterviewQA from '../pages/InterviewQA';
import NotFound from '../pages/NotFound';
// Protected Route Guard Layout
const ProtectedRoute = () => {
  const { auth, login, logout, updateProfile } = useContext(AuthContext);
  const user = auth?.user;
  const isLoggedIn = auth.isLoggedIn;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/search" element={<Search />} />
      <Route path="/company/:name" element={<CompanyProfile />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes , only if user is logged in*/}
      <Route element={<ProtectedRoute />}>
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/saved-companies" element={<SavedCompanies />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/qa" element={<InterviewQA />} />
      </Route>

      {/* not match component */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRouter;
