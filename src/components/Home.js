import React, { Component } from 'react';
import { initializeUserIfNeeded, allListings, searchForListings } from '../mock.js'
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
    initializeUserIfNeeded()
  }

  search(arg) {
    return
  }

  componentWillMount() {
    const listings = allListings()
    console.log(listings)
    this.setState({
      listings
    })
    console.log(this.state)
  }

  render() {
    return (
        <div className="listing">
          <Header loggedIn={this.state.user} />
          <div className="searchbar">
            <h3>Product Search:</h3>
            <input type="text" onChange={(e)=>this.setState({searchBar: e.target.value})} />
            <button onClick={()=>this.searchForListings()}>Search</button>
          </div>
          {this.state.listings.map((l) =>(<Listing key={l.uid + l.rating} img={l.img} description={l.blurb} price={l.price} rating={l.rating} uid={l.uid} />))}
        </div>
    );
  }
}

export default Home;


//...this.state, < goes inside of input if setstate for one key erases all keys