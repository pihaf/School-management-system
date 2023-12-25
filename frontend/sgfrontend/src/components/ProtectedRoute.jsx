import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token exists, false otherwise
};

function ProtectedRoute({ element: Element, ...rest }){
    return (
      <Route
        {...rest}
        element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
      />
    );
  }

export default ProtectedRoute;