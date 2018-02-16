import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

class LinkItem extends Component {
  render() {
    return (
      <li>
        <Link to={`${this.props.url}`} className="link">
          {this.props.name}
        </Link>
      </li>
    )
  }
}

export default LinkItem;
