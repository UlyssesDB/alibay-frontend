import React, { Component } from 'react';
import { searchForListings } from '../backend'
import Header from './Header';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = { 
      
    }
  }

  render() {
    return (
        <div className="login">
          <Header loggedIn={this.props.loggedIn} />
          <br />
          <br />
          <h3>Login with Google for more options</h3>
          <Link to={"/"}>
            <button onClick={() => this.props.loginUser()}>Login</button>
          </Link>
        </div>
    );
  }
}

export default Login;
