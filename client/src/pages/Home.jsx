import React from "react";
import Auth from "../utils/auth"
import "../styles/home.css"
import logoImage from '../assets/welcome-pic.webp'

const Home = () => {
  if (Auth.loggedIn()) {
  return (
    
    <div className='welcome'>
      <img className="logo" src={logoImage} alt="Recipe Finder Logo"/>
      <h1>Welcome to our website!</h1>
      <h1> Access our <a href="/recipe-search">Recipe Finder</a> here or by clicking the search in the Navbar</h1>
      <p><i>*This website is in early development so not all features are available</i></p>
    </div>
  );
} else {
  return (
<div className='login'>
      <h1>Please <a href="/login">login</a> in order to access our recipe search engine.</h1>
    </div>
  )
};
}

export default Home;
