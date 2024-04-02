import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
    <nav className="navbar">
      <button to='/search' class="search">Search</button>
      <button to='/login' class="login">Login</button>
    </nav>
    </div>
  );
};

export default Home;
