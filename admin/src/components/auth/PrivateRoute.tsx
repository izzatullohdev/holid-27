import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Token mavjudligini tekshiradi

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
