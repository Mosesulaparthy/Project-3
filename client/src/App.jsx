import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <Home />
      <Login />
    </div>
  );
}

export default App;
