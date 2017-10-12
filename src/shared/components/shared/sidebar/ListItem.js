import React, {Component} from 'react';

class ListItem extends Component {
  render(){
    return(
      <li>
        <span className={this.props.isOpen ? "open" : "closed"}></span>
        <p>
          {this.props.name}
        </p>
      </li>
    )
  }
}

export default ListItem;
