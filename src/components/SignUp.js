// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({user: { email, password, confirm_password }, new_app: "true"}));
  };

  if (auth.token) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container my-5">
      <h2>Registration</h2>
      {/*
        auth.message &&
        <h5>{auth.message}</h5>
      */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name="email" value={email}  onChange={(text) => setEmail(text.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" value={password} onChange={(text) => setPassword(text.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input name="confirm_password" type="password" value={confirm_password} onChange={(text) => setConfirmPassword(text.target.value)} required />
        </div>
        {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        <h6>Already have an account ? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate("/login")}>Login</span></h6>
        <button type="submit" className="btn btn-primary" disabled={auth.loading}>
          {auth.loading ? 'SignUp in...' : 'SignUp'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
