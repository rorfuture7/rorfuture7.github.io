// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, google_auth } from '../features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
// import FlashMessage2 from 'react-flash-message';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({user: { email, password }}));
  };

  const handleSuccess = (credentialResponse) =>{
    console.log("Google Sign In Success", credentialResponse)
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    dispatch(google_auth({data: { access_token: token}}));

  }
  const handleError = () =>{
    console.log('Login Failed');
  }

  if (auth.token) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container my-5">
      <h2>Login</h2>
      {/*<FlashMessage2 duration={3000} persistOnHover={true}>
        <p>Message</p>
      </FlashMessage2>*/}
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
        {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        <h6>Don't have a account ? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate("/sign_up")}>Sign Up</span></h6>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <GoogleOAuthProvider clientId="173957723954-svtaetqk1f2ieeq4d4p3vvobk1cmklrd.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </GoogleOAuthProvider>
      </form>
    </div>
  );
};

export default Login;
