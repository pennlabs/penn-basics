import React, {Component} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

/**
 * Show a dropdown item
 */
const Dropdown = ({ options, selected }) => {
  const content = options.map(option => {
    return (
      <option key={ uuid() } value={ option } selected={ option === selected ? "selected" : "" }>
        { option }
      </option>
    );
  });

  return (
    <div className="select">
      <select className="dropdown" id="meal">
        { content }
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
};

export default Dropdown;
