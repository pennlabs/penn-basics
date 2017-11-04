import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ListItem extends Component {
  render(){
    return(
      <Link to={ "/dining/" + this.props.venueID }>
        <li>
          <span className={this.props.isOpen ? "open" : "closed"}></span>
          {this.props.name}
        </li>
      </Link>
    )
  }
}

export default ListItem;
