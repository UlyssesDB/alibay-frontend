// import images, who's going to upload images to firebase?
  // on change I put img file into state
    // then pass as argument to the upload file
    //OR
      // I upload, put url in state, with item description etc and then call backend createlisting and pass it everything in state
                // add rating and img to createlisting in backend

      //should items have a title/name

      //on change from state upload to firebase, on submit push img url to firebase

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { allItemsBought, allItemsSold } from '../mock'



class UserPage extends Component {
  constructor() {
    super();
    this.state = {      
      
    }
  }

  render() {
    return (
        <div className="Listing">
          <Header />
          {this.props.loggedIn ?
          (<div>
          <div className="profile">
          <img src={this.props.state.user.additionalUserInfo.picture} />
          <h3>{this.props.state.user.additionalUserInfo.name}</h3>
          <p>email: {this.props.state.user.additionalUserInfo.email}</p>
          <p>country: {this.props.state.user.additionalUserInfo.locale}</p>
          <p>description: {this.props.state.user.additionalUserInfo.id}</p>
        </div>
        <div className="history">
          <button onClick={()=>itemsForSale(this.props.user.id)}>Items Selling</button>
          <button onClick={()=>allItemsSold(this.props.user.id)}>Items Sold</button>
          <button onClick={()=>allItemsBought(this.props.user.id)}>Items Bought</button>
        </div>
        </div>)
          :
          (<h1>Login Required</h1>)
          }
          
          
          
        </div>
    );
  }
}

export default UserPage;

//if not logged in, no access

//profile
  //avatar
  //name
  //email
  //country
  //description

//display buttons
  //items sold
  //items selling
  //items bought