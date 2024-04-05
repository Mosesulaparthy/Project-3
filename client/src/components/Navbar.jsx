import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import Auth from "../utils/auth"
const Navbar = () => {
  if (Auth.loggedIn()) {
    return (
      <div>
        <nav className="navbar">
          <Link to="/" className="homeNav">
            Home
          </Link>
          <Link to="/search" className="searchNav">
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
          <Link to="/search" className="searchNav">
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
