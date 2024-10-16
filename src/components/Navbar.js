import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, clearState } from '../features/auth/authSlice';

export default function Navbar({title, sec}) {
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // let user_data = localStorage.getItem('login_user');
  // const user1 = JSON.parse(user_data);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      setTimeout(() => {
        dispatch(clearState());
      }, 2000);
    });
  };

  // const logOut = () =>{
  //   localStorage.removeItem('login_user');
  //   navigate('/login');
  //   return;
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {title} {sec}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            { !auth.user ? (
							<>
            	<li className="nav-item">
	              <Link 
	                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
	                to="/login">
	                Login
	              </Link>
	            </li>
	            <li className="nav-item">
	              <Link
	                className={`nav-link ${isActive('/sign_up') ? 'active' : ''}`}
	                to="/sign_up">
	                Sign Up
	              </Link>
	            </li>
	            </>
            	) : (
            		<li className="nav-item">
	            		<a
								    href="#"
								    className="nav-link"
								    onClick={handleLogout}
								  >
								  	Logout
	  							</a>
	  						</li>
            	)}
          </ul>

            { auth.user &&
            <button className="btn btn-primary" style={{ textTransform: 'none' }}>
              {auth.user.email} ({auth.user.id})
            </button>
          }
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
