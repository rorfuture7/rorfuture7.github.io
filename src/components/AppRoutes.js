import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import TextForm from './TextForm';
import PrivateRoute from './PrivateRoute';
import FlashMessage from './FlashMessage';

export default function AppRoutes() {
  const auth = useSelector((state) => state.auth)
  if (auth.user) {
    const string = auth.user.email.split("@")[0]
    document.title = string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    document.title = '';
  }
	return (
		<BrowserRouter>
    <Navbar title="TextUtils"/>
      <FlashMessage /> {/* Display flash message */}
      <Routes>
        <Route exact path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/sign_up" element={<SignUp />} />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/" element={<TextForm heading="This is text box" />} />
      </Routes>
    </BrowserRouter>
	)
}