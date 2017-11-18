import React, {Component} from 'react';
<<<<<<< HEAD
import {Switch, Route, Link} from 'react-router-dom';
=======
import {Link} from 'react-router-dom';
>>>>>>> master

class LinkItem extends Component {
  render(){
    return(
      <li>
<<<<<<< HEAD
        <Link to={`${this.props.url}`} className="link">
=======
        <Link to={this.props.url}>
>>>>>>> master
          {this.props.name}
        </Link>
      </li>
    )
  }
}

export default LinkItem;
