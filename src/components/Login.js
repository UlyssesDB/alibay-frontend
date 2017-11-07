import React, { Component } from 'react';
import { searchForListings } from '../mock.js'
import Header from './Header';

class Login extends Component {
  constructor() {
    super();
    this.state = { 
      
    }
  }
  

  render() {
    return (
        <div className="login">
         <button onClick={() => this.props.loginUser()}>Login</button>
         <Header />
        </div>
    );
  }
}

export default Login;


