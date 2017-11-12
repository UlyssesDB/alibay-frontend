import React, { Component } from 'react';
import { getItemDescription, buy } from '../backend';
import Header from './Header';
import { Link } from 'react-router-dom';

class DisplayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      item: {}    
    }
  }

  async componentDidMount() {
    const itemId = this.props.location.slice(13)
    console.log(await getItemDescription(itemId))
    this.setState({
      item: await getItemDescription(itemId)
    })
    console.log(this.state)
  }

  render() {
    return (
        <div className="display-item">
          <Header loggedIn={this.props.loggedIn} />
          <img style={{width: 400}} src={this.state.item.image} />
          <br />
          <h3>{this.state.item.name}</h3>
          <label>Product Description</label>
          <p>{this.state.item.blurb}</p>
          <label>Price:</label>
          <h4>{this.state.item.price}</h4>
          {console.log(this.props)}
          {this.props.loggedIn ? <Link to="/" ><button onClick={()=>buy(this.props.user.id, this.state.item.sellerID, this.state.item.listingID)} >Buy Item</button></Link> : <Link to="/login"><h3>Login to Buy</h3></Link>}
        </div>
    );
  }
}

export default DisplayItem;
