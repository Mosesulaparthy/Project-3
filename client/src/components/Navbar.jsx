import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
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
};

export default Navbar;
