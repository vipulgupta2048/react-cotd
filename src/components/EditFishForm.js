import React from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

class EditFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  handleRemove = event => {
    // Delete from Frontend
    this.props.deleteFish(this.props.index);
    // ADD MUTATION TO DELETE FISH FROM DATABASE
    this.props.client
      .mutate({
        mutation: gql`
          mutation DELETE_FISH($index: Int) {
            delete_cotd(where: { _id_2: { _eq: $index } }) {
              returning {
                name
              }
            }
          }
        `,
        variables: { index: this.props.fish._id_2 }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  handleUpdate = event => {
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };
    this.props.client
      .mutate({
        mutation: gql`
          mutation UPDATE_FISH($fish: cotd_set_input, $index: Int) {
            update_cotd(where: { _id_2: { _eq: $index } }, _set: $fish) {
              returning {
                name
                desc
                image
              }
            }
          }
        `,
        variables: { index: this.props.fish._id_2, fish: fish }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
          ref={this.nameRef}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
          ref={this.priceRef}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
          ref={this.statusRef}
        >
          <option value="available" ref={this.statusRef}>
            Fresh!
          </option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          ref={this.imageRef}
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={this.handleUpdate}> Update Fish </button>
        <br />
        <button onClick={this.handleRemove}>Remove Fish</button>
      </div>
    );
  }
}

export default withApollo(EditFishForm);
