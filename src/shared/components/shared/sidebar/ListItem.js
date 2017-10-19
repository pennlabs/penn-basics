import React, {Component} from 'react';

class ListItem extends Component {
  render(){
    return(
      <li>
        <span className={this.props.isOpen ? "open" : "closed"}></span>
        {this.props.name}
      </li>
    )
  }
}

export default ListItem;
