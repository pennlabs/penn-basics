import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class LinkItem extends Component {
  render() {
    return (
      <li>
        <Link to={this.props.url}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

LinkItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default LinkItem;
