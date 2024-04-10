import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import Auth from "../utils/auth"
import logoImage from '../assets/welcome-pic.webp'

const Navbar = () => {
  if (Auth.loggedIn()) {
    return (
      <div>
        <nav className="navbar">
          <Link to="/" className="homeNav">
            Home
          </Link>
          <div className="navbar-logo-text">
            <span>Welcome to Recipe Finder</span>
            <img src={logoImage} alt="Recipe Finder Logo" className="navbar-logo" />
          </div>
          <Link to="/recipe-search" className="searchNav">
            Search
          </Link>
          <a className="logoutNav" href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navbar">
          <Link to="/" className="homeNav">
            Home
          </Link>
          <Link to="/recipe-search" className="searchNav">
            Search
          </Link>
          <Link to="/login" className="loginNav">
            Login
          </Link>
        </nav>
      </div>
    );
  }
};

export default Navbar;
