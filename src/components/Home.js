import React, { Component } from 'react';
import { initializeUserIfNeeded, allListings, searchForListings } from '../backend';
import Header from './Header';
import Listing from './Listing';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchBar: '',
      loggedIn: false,
      listings: []
    }
  }

  async _searchForListings() {
    const listings = await searchForListings(this.state.searchBar)
    this.setState({listings})
  }

  async componentDidMount() {
    const listings = await allListings()
    this.setState({
      listings: listings || []
    })
  }

  render() {
    return (
      <div className="listing">
        <Header loggedIn={this.props.loggedIn} />
        <div className="searchbar">
          <h3>Product Search:</h3>
          <input type="text" onChange={(e) => this.setState({ searchBar: e.target.value })} />
          <button onClick={() => this._searchForListings()}>Search</button>
        </div>
        {this.state.listings.map((l) => (<Listing key={l.uid} name={l.name} img={l.image} description={l.blurb} price={l.price} listingID={l.listingID} />))}
      </div>
    );
  }
}

export default Home;
