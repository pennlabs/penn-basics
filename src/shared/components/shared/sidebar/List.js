import React, { Component } from 'react';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    const list = this.props.links.map((link, index) =>
      <ListItem name={link.name} isOpen={link.isOpen} venueID={link.venueID} key={index} />
    );
    return (
      <ul>
        {list}
      </ul>
    );
  }
}

List.propTypes = {
  links: PropTypes.array,
};

export default List;
