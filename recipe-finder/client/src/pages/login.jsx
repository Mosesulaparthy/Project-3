import React from "react";

function Login() {
  return (
    <div class="login">
    <form className="loginForm">
      <label>
        Username:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="text" name="password" />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
}

export default Login;
