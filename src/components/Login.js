import React from "react";
import { getFunName } from "../helpers.js";

class Login extends React.Component {
  email = React.createRef();

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/cotd`);
  };

  render() {
    return (
      <div className="store-selector">
        <form onSubmit={this.handleFormSubmit}>
          <h2>Log Into {getFunName()}</h2>
          <input
            type="email"
            ref={this.email}
            required
            placeholder="Enter your email address"
          />
          <button type="submit">
            Authentication is still under development. GraphQL is being very
            naughty. And the developer ain't experienced or paid enough.
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
