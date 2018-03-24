import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';

class LinkItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
  }

  render() {
    return (
      <li>
        <Link to={`${this.props.url}`} className="link">
          {this.props.name}
        </Link>
      </li>
    );
  }
}

export default LinkItem;
