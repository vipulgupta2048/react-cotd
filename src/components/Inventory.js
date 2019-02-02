import React from "react";
import { withApollo } from "react-apollo";
import firebase from "firebase/app";
import "firebase/auth";
import gql from "graphql-tag";

import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import { firebaseApp } from "../base.js";
import Login from "./Login";

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const name = authData.user.displayName;
    console.log(name + " is logging in .. Checking ownership");
    const user = {
      uid: authData.user.uid,
      owner: "true"
    };
    this.props.client
      .query({
        query: gql`
          query FIND_ANY_OWNERS {
            user {
              id_user
              uid
              owner
            }
          }
        `
      })
      .then(res => {
        if (res.data.user.length === 0) {
          console.log("No Owner Found .. Adding a new owner");
          this.props.client.mutate({
            mutation: gql`
              mutation ADD_USER($user: [user_insert_input!]!) {
                insert_user(objects: $user) {
                  returning {
                    uid
                  }
                }
              }
            `,
            variables: { user }
          });
          console.log(name + " Added as bew owner");
        }
        this.setState({
          uid: authData.user.uid,
          owner: res.data.user[0].uid || authData.user.uid
        });
      })
      .catch(err => {
        console.log("******** FAILURE **********");
        console.log(err);
      });
  };

  authenticate = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(this.authHandler);
  };

  // Needs fixing
  logout = async () => {
    console.log("Logging out !!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  Delete_Owner = () => {
    this.props.client.mutate({
      mutation: gql`
        mutation DELETE_USER {
          delete_user(where: { owner: { _eq: true } }) {
            returning {
              uid
            }
          }
        }
      `
    });
    this.logout();
    this.setState({ owner: null });
    console.log("Owner removed - I am gonna need a new owner");
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out !!</button>;

    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <h1> Inventory Login </h1>
          <p>Sorry you are not the owner!</p>
          {logout}
          <p>Well, at least the authentication module works.</p>
        </div>
      );
    }

    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            deleteFish={this.props.deleteFish}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
          />
        ))}
        <AddFishForm fetchFish={this.props.fetchFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
        <br />
        <button onClick={this.Delete_Owner}>Delete Owner and Logout</button>
      </div>
    );
  }
}

export default withApollo(Inventory);
