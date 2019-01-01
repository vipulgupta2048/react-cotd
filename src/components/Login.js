import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
  render() {
    return (
      <nav className="login">
        <h2>Sign in to manage Inventory</h2>
        <button
          className="github"
          onClick={() => this.props.authenticate("Github")}
        >
          Login with GitHub
        </button>
      </nav>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
