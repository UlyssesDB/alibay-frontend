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
          <Header />
         <button onClick={() => this.props.loginUser()}>Login</button>
        </div>
    );
  }
}

export default Login;


// bind state from app, login func is bound in app so that it can be passed down as a prop