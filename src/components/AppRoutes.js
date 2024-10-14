import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import About from './About';
import Login from './Login';
import Dashboard from './Dashboard';
import TextForm from './TextForm';
import PrivateRoute from './PrivateRoute';
export default function AppRoutes() {
	return (
		<BrowserRouter>
    <Navbar title="TextUtils"/>
      <Routes>
        <Route exact path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/" element={<TextForm heading="This is text box" />} />
      </Routes>
    </BrowserRouter>
	)
}