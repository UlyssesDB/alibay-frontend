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
          <img style={{width: 200}}src={this.props.img} />
          <br />
          <p><b>Product Description:</b> {this.props.description}</p>
          <h4>Price: {this.props.price}</h4>
          <h4>Seller Rating: {this.props.rating}</h4>
          <Link to={`/displayItem/${this.props.uid}`}>
            <button>View Item</button>
          </Link>
          <br />
          <hr />
        </div>
    );
  }
}

export default Listing;








//  a listing of top rated product - (manually populate database with 8 items, with pictures, descriptions, price, rating, seller id, 
//   item id)