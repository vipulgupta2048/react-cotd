import React from "react";
import firebase from 'firebase'
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import Login from "./Login.js";

class Inventory extends React.Component {
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    fire base.auth()
  };

  render() {
    return <Login authenticate={this.authenticate} />;
    return (
      <div className="inventory">
        <h2>inventory</h2>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            deleteFish={this.props.deleteFish}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
