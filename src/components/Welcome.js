import React from "react";
import { getFunName } from "../helpers";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <form className="store-selector">
          <h2>
            Welcome to <br />
            Catch of the Day
          </h2>
          <input
            type="text"
            placeholder="Store Name"
            defaultValue={`You are ` + getFunName()}
          />
          <button
            type="submit"
            onClick={() => this.props.history.push("/cotd")}
          >
            Visit Store →
          </button>
        </form>
        <footer align="center">
          This react store app is created by{" "}
          <a href="https://github.com">Vipul Gupta</a> taking inspiration from{" "}
          <a href="https://wesbos.com/">Wes Bos</a>. <br /> <br />
          Still working on it, check out the source code{" "}
          <a href="https://github.com/vipulgupta2048/react-cotd">here</a>.
        </footer>
      </div>
    );
  }
}

export default Welcome;
