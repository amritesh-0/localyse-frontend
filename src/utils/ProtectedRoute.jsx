import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute: loading:', loading, 'user:', user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    console.log(`ProtectedRoute: User role '${user.type}' not allowed, redirecting to correct dashboard`);
    const redirectPath = user.type === 'influencer' ? '/dashboard/influencer' : '/dashboard/business';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
