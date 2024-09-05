import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../utils/decoded';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Supondo que o JWT esteja armazenado no localStorage

  if (!token) {
    return <Navigate to="/register" replace />;
  }
  const timeNow = Math.floor(Date.now() / 1000);
  if (decodeToken(token).exp < timeNow) {
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;
