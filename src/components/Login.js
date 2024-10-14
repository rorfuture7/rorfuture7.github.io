// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({user: { email, password }}));
  };

  if (auth.token) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container my-5">
      <h2>Login</h2>
      {
        auth.message &&
        <h5>{auth.message}</h5>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name="email" value={email}  onChange={(text) => setEmail(text.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" value={password} onChange={(text) => setPassword(text.target.value)} required />
        </div>
        {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        <button type="submit" disabled={auth.loading}>
          {auth.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
