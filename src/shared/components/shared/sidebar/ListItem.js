import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListItem extends Component {
  render() {
    return (
      <Link to={"/dining/" + this.props.venueID}>
        <li>
          <span className={this.props.isOpen ? "open" : "closed"} />
          {this.props.name}
        </li>
      </Link>
    );
  }
}

ListItem.propTypes = {
  venueID: PropTypes.number,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
};

export default ListItem;
