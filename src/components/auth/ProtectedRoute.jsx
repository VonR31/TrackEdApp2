import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const location = useLocation();
  
  // Check if user is authenticated - you might want to use a more secure method
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'teacher':
        return <Navigate to="/home" replace />;
      case 'student':
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return Element;
};

export default ProtectedRoute;