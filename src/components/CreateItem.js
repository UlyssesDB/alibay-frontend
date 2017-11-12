import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { createListing, uploadImage } from '../backend';

class CreateItem extends Component {
  constructor() {
    super();
    this.state = {
      sellerId: '',
      name: '',
      price: '',
      blurb: '',
      uid: '',
      img: ''
    }
  }

  _createListing() {
    createListing(this.props.user.id, this.state.name, this.state.img, this.state.price, this.state.blurb)
    this.setState({
      sellerId: '',
      name: '',
      price: '',
      blurb: '',
      uid: '',
      img: ''
    })
    document.getElementById("inputItemImage").value = '';
  }

  async _uploadFile(e) {
    const img = await uploadImage(e)
    this.setState({
      img
    })
  }

  render() {
    return (
      <div className="Listing">
        <Header loggedIn={this.props.loggedIn} />
        {
          this.props.loggedIn ?
            (<div><br />
              <label>Item name:</label>
              <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
              <br />
              <label>Choose a picture:</label>
              <input id="inputItemImage" type='file' onChange={(e) => this._uploadFile(e)} />
              <br />
              <label>Item price:</label>
              <input type='text' value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
              <br />
              <label>Item description:</label>
              <input type='text' value={this.state.blurb} onChange={(e) => this.setState({ blurb: e.target.value })} />
              <button onClick={() => this._createListing()}>Submit Item</button>
            </div>)
            : (<h1>Login Required</h1>)
        }
        </div>
    );
  }
}

export default CreateItem;
