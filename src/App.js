import React, { Component } from 'react';
import './App.css';
import { initializeUserIfNeeded } from './mock.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Listing from './components/Listing';
import CreateItem from './components/CreateItem';
import DisplayItem from './components/DisplayItem';
import UserPage from './components/UserPage';

  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyBR3g3G-ujYin0fpky-R-FvTgN2gMkj350",
  //   authDomain: "alibay-1065c.firebaseapp.com",
  //   databaseURL: "https://alibay-1065c.firebaseio.com",
  //   projectId: "alibay-1065c",
  //   storageBucket: "alibay-1065c.appspot.com",
  //   messagingSenderId: "399183524517"
  // };
  // firebase.initializeApp(config);



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: '111',
        name: 'Ulysses'
      },
      loggedIn: false
    }
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillMount() {
  
  }

  loginUser() {
    firebase.auth().signInWithPopup(provider)
    .then(data => {
      database.ref('users/').child(data.additionalUserInfo.profile.name).once('value', (data) => {
          this.setState({
            user: data.val(),
            loggedIn: true
          })
        })
      })
  }

  async loginUser() {
    const user = await initializeUserIfNeeded()
    this.setState({
      user
    })
  }
  
  render() {
    return (  
      <BrowserRouter>
        <div className="App">
          <Header loggedIn={this.state.loggedIn}/>
          <Route exact={true} path="/" render={(props) => <Home user={this.state.user} />} />
          <Route path="/createItem" render={() => <CreateItem user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/displayItem/:listingId" render={(props) => <DisplayItem location={props.location.pathname}/>} user={this.state.user} loggedIn={this.state.loggedIn} />
          <Route path="/userpage" render={() => <UserPage user={this.state.user} loggedIn={this.state.loggedIn} />} />
          <Route path="/login" render={() => <Login loginUser={this.loginUser} loggedIn={this.state.loggedIn} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;