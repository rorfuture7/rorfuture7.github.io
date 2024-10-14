// src/components/Dashboard.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth) 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {
        auth.message &&
        <h5>{auth.message}</h5>
      }
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
