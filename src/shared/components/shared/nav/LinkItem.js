import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';

import WrappedLink from '../WrappedLink';

class LinkItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
  }

  render() {
    return (
      <li>
        <WrappedLink to={`${this.props.url}`} className="link">
          {this.props.name}
        </WrappedLink>
      </li>
    );
  }
}

export default LinkItem;
