import React, { Component } from 'react';
import './App.css';
import { initializeUserIfNeeded } from './backend';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Listing from './components/Listing';
import CreateItem from './components/CreateItem';
import DisplayItem from './components/DisplayItem';
import UserPage from './components/UserPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: false
    }
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillMount() {
  
  }

  async loginUser() {
    console.log("AFDJAGNI")
    const user = await initializeUserIfNeeded()
    console.log('USER >>', user)
    this.setState({
      user,
      loggedIn: true
    })
  }
  
  render() {
    return (  
      <BrowserRouter>
        <div className="App">
          <Route exact={true} path="/" render={(props) => <Home user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/createItem" render={() => <CreateItem user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/displayItem/:listingId" render={(props) => <DisplayItem location={props.location.pathname} user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/userpage" render={() => <UserPage user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/login" render={() => <Login loginUser={this.loginUser} loggedIn={this.state.loggedIn} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
