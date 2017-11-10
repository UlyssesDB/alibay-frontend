import React, { Component } from 'react';
import { searchForListings } from '../mock.js'
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = { 
      searchBar: ''     
    }
  }
  

  render() {
    return (
        <div className="header">
          <div className="base-navigation-buttons">
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to={"/Login"}>
              <button>Login</button>
            </Link>

            { this.props.loggedIn ?
            (<div>
            <Link to={"/CreateItem"}>
              <button>Post Item</button>
            </Link>
            <Link to={"/UserPage"}>
              <button>My Profile</button>
            </Link>
            </div>)
            : <h3>Login for more options...</h3>
            }
          </div>
        </div>
    );
  }
}

export default Header;


//...this.state, < goes inside of input if setstate for one key erases all keys