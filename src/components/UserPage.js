import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { allItemsBought, allItemsSold, getItemsForSale } from '../backend';
import Listing from './Listing';


class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      showItemsForSale: false,
      showItemsSold: false,
      showItemsBought: false,
      listings: []
    }
  }

  async fetchItemsForSale() {
    this.setState({
      showItemsForSale: true,
      showItemsSold: false,
      showItemsBought: false,
      listings: await getItemsForSale(this.props.user.id) || []
    })
  }

  async fetchItemsSold() {
    this.setState({
      showItemsForSale: false,
      showItemsSold: true,
      showItemsBought: false,
      listings: await allItemsSold(this.props.user.id) || []
    })
  }

  async fetchItemsBought() {
    this.setState({
      showItemsForSale: false,
      showItemsSold: false,
      showItemsBought: true,
      listings: await allItemsBought(this.props.user.id) || []
    })
  }

  render() {
    return (
      <div className="Listing">
        <Header loggedIn={this.props.loggedIn} />
        {this.props.loggedIn ?
          (<div>
            <div className="profile">
              <img style={{ width: 400 }} src={this.props.user.img} />
              <h3>{this.props.user.name}</h3>
              <p>email: {this.props.user.email}</p>
            </div>
            <div className="history">
              <button onClick={() => this.fetchItemsForSale()}>Items Selling</button>
              <button onClick={() => this.fetchItemsSold()}>Items Sold</button>
              <button onClick={() => this.fetchItemsBought()}>Items Bought</button>
            </div>
            {this.state.showItemsForSale
              ? <div>Items currently for sale:</div>
              : (this.state.showItemsSold
                ? <div>Items sold:</div>
                : this.state.showItemsBought
                  ? <div>Items bought:</div>
                  : '')}
            {this.state.listings.map((l) => (<Listing key={l.uid + l.rating} img={l.image} description={l.blurb} price={l.price} listingID={l.listingID} />))}
          </div>)
          :
          (<h1>Login Required</h1>)
        }



      </div>
    );
  }
}

export default UserPage;
