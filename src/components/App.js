import React from "react";
import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes.js";
import Fish from "./Fish.js";

const axios = require("axios");

// const ACCESS_TOKEN = localStorage.getItem("access_token");
export const client = new ApolloClient({
  uri: "https://cotd2048.herokuapp.com/v1alpha1/graphql"
});

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  fetchFish = () => {
    axios({
      url: "https://cotd2048.herokuapp.com/v1alpha1/graphql",
      method: "post",
      data: {
        query: `
          query Fresh {
            cotd {
              _id_2
              name
              price
              status
              image
              desc
            }
          }`
      }
    })
      .then(result => {
        this.setState({ fishes: result.data.data.cotd });
      })
      .catch(error => {
        // Error
        if (error.response) {
          // If response out of the 2xx range
          console.log(error.response.data);
          alert("Are you connected to the Internet?");
        } else if (error.request) {
          // Request made but no response
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  // On component mounting, following things are happening
  // 1. Getting order state previously saved from localstorage of user
  // 2. Query the database to get a list of fishes
  componentDidMount() {
    // QUERY DATABASE (FRESH) - use setstate() to show updated fishes.
    // Had to use HTTP to make a GraphQL query because Apollo Provider doesn't reach here - IMPROVEMENT NEEDED
    // Now that I think of it, could possibly use ApolloConsumer here
    this.fetchFish();
    const localStorageRef = localStorage.getItem("/cotd");
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  // Every component update, would update the order in local storage
  componentDidUpdate() {
    localStorage.setItem("/cotd", JSON.stringify(this.state.order));
  }

  // addFish = fish => {
  //   // Taking a copy of the fishes
  //   const fishes = { ...this.state.fishes };
  //   // Adding out new fish to fishes variable
  //   fishes[`fish${Date.now()}`] = fish;
  //   // New fishes object to state
  //   this.setState({ fishes });
  // };

  updateFish = (key, updateFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updateFish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    alert(fishes[key].name + "- Removed Successfully");
    delete fishes[key];
    this.setState({ fishes });
  };

  //  Feature Additon - Reset the order
  resetOrder = key => {
    var order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  // Used only for testing UI components
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  // Functionality for order button
  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Gotta Catch 'em All" />
            <ul className="fishes">
              {Object.keys(this.state.fishes).map(key => (
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              ))}
            </ul>
          </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            resetOrder={this.resetOrder}
          />
          <Inventory
            fetchFish={this.fetchFish}
            updateFish={this.updateFish}
            loadSampleFishes={this.loadSampleFishes}
            deleteFish={this.deleteFish}
            fishes={this.state.fishes}
            store="cotd"
          />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
