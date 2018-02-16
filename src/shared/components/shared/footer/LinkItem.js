import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkItem extends Component {
  render() {
    return (
      <li>
        <Link to={this.props.url}>
          {this.props.name}
        </Link>
      </li>
    )
  }
}

export default LinkItem;
