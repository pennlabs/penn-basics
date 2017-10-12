import React, {Component} from 'react';

class LinkItem extends Component {
  render(){
    return(
      <li>
        <a href={this.props.url}>
          {this.props.name}
        </a>
      </li>
    )
  }
}

export default LinkItem;
