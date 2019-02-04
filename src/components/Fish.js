import React from "react";
import { formatPrice } from "../helpers.js";
// import PropTypes from "prop-types";

class Fish extends React.Component {
  // static propTypes = {
  //   details: PropTypes.shape({
  //     image: PropTypes.string,
  //     name: PropTypes.string,
  //     desc: PropTypes.string,
  //     status: PropTypes.string,
  //     price: PropTypes.number
  //   }),
  //   addToOrder: PropTypes.func
  // };

  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  // This component sets the menu of fishes available to buy for the user
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={this.handleClick} disabled={!isAvailable}>
          {isAvailable ? "Add to Order" : "Sold out !!"}
        </button>
      </li>
    );
  }
}

export default Fish;
