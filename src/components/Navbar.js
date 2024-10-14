import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar({title}) {
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  // let user_data = localStorage.getItem('login_user');
  // const user1 = JSON.parse(user_data);

  const isActive = (path) => {
    return location.pathname === path;
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
          {title}
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
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                to="/login">
                Login
              </Link>
            </li>
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

Navbar.defaultProps = {
  title: 'Stranger',
  aboutText: 'About',
};


