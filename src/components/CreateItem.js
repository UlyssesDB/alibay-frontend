import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { createListing } from '../mock'



class CreateItem extends Component {
  constructor() {
    super();
    this.state = {      
      name: '',
      price: '',
      blurb: '',
      uid: '',
      img: ''
    }
  }

  

  render() {
    return (
        <div className="Listing">
          <Header />
          {
          this.props.loggedIn ? 
          (<br />
          <label>Item name:</label>
          <input type='text' onChange={(e)=>this.setState({name: e.target.value})} />
          <br />
          <label>Choose a picture:</label>
          <input type='file' onChange={(e)=>{
            console.log(e.target.value[0])
            this.setState({img: e.target.value[0]})
          }
          } />
          <br />
          <label>Item price:</label>
          <input type='text' onChange={(e)=>this.setState({price: e.target.value})} />
          <br />
          <label>Item description:</label>
          <input type='text' onChange={(e)=>this.setState({blurb: e.target.value})} />
          
        <button onClick={()=>createListing(this.props.user.id, this.state.name, this.state.img, this.state.price, this.state.blurb)}>Submit Item</button> )
          : (<h1>Login Required</h1>)
          }
          }
          
        </div>
    );
  }
}

export default CreateItem;




//this.props.userid
//user need unique userId