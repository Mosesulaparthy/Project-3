import React from "react";
// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignupForm from "./pages/Signup";
import RecipeSearch from "./pages/RecipeSearch";
import "./styles/App.css";

function App() {
  // const [count, setCount] = useState(0)
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/search" element={<RecipeSearch />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
