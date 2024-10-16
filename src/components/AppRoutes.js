import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import TextForm from './TextForm';
import PrivateRoute from './PrivateRoute';
import FlashMessage from './FlashMessage';

export default function AppRoutes() {
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