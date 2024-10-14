import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth);
  debugger
  return isAuthenticated.token !== '' ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
