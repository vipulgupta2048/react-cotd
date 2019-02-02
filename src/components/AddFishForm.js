import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    };

    // For the change in BackEnd through GraphQL
    this.props.client
      .mutate({
        mutation: gql`
          mutation ADD_FISH($fish: [cotd_insert_input!]!) {
            insert_cotd(objects: $fish) {
              returning {
                name
              }
            }
          }
        `,
        variables: { fish }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    // Feature addition - Reset the form
    event.currentTarget.reset();
    this.props.fetchFish();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="number"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default withApollo(AddFishForm);
