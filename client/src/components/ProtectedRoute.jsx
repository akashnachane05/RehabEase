import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the ProtectedRoute to handle authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the token exists in localStorage

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
