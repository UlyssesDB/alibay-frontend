import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className="Listing">
        <br />
        <img style={{ width: 200 }} src={this.props.img} />
        <br />
        <h4>{this.props.name}</h4>
        <p><b>Product Description:</b> {this.props.description}</p>
        <h4>Price: {this.props.price}</h4>
        <Link to={`/displayItem/${this.props.listingID}`}>
          <button>View Item</button>
        </Link>
        <br />
        <hr />
      </div>
    );
  }
}

export default Listing;
