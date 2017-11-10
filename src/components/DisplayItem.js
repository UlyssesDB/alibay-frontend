import React, { Component } from 'react';
import {getItemDescription} from '../mock'
import Header from './Header';
import { buy } from '../mock'

class DisplayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      item: {}    
    }
  }

  onClick() {
    //mock.js buy button ?
  }

  componentWillMount() {
    const itemId = this.props.location.slice(13)
    this.setState({
      item: getItemDescription(itemId)
    })
  }

  render() {
    return (
        <div className="display-item">
          <Header />
          <img style={{width: 400}} src={this.state.item.img} />
          <label>Product Description</label>
          <p>{this.state.item.blurb}</p>
          <label>Price:</label>
          <h4>{this.state.item.price}</h4>
          <label>Seller Rating:</label>
          <h4>{this.state.item.rating}</h4>
          {this.props.loggedIn ? <button onClick={()=>buy(buyerID, sellerID, listingID)} >Buy Item</button> : <h3>Login to Buy</h3>}
        </div>
    );
  }
}

export default DisplayItem;


//us itemid from this.params.userid?
//get item object from firebase with that itemid, and put in in state
