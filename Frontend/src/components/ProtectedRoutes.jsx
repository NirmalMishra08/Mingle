import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector(store => store.auth);

  // Redirect to /login if no user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, allow access to protected route
  return <>{children}</>;
};

export default ProtectedRoutes;
