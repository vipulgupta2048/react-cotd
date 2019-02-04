import React from "react";

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => props.authenticate()}>
      Log In With GitHub
    </button>
  </nav>
);

export default Login;
