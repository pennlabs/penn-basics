/* global document */
import React from 'react';
import PropTypes from 'prop-types';

import Check from './Check';

const Filter = ({ tabIndex = -1 }) => {
  const handleKeyPress = (event) => {
    event.preventDefault();

    if (event.keyCode === 32) { // Spacebar
      const filterContent = document.getElementById('filterContent');
      filterContent.classList.toggle('active');
    }
  };

  const handleClick = (event) => {
    event.preventDefault();

    const filterContent = document.getElementById('filterContent');
    filterContent.classList.toggle('active');
  };

  return (
    <div className="filter">
      <div className="filterToggleWrapper">
        <div
          className="filterToggle hover"
          onClick={handleClick}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex={tabIndex}
        >
          <i className="fa fa-filter" />
          Filter
        </div>
      </div>
      <div className="columns is-desktop" id="filterContent">
        <div className="column">
          <h2>Filter title</h2>
          <Check description="Filter1" />
          <Check description="Filter2" />
          <Check description="Filter3" />
        </div>
      </div>
    </div>
  );
};

Filter.defaultProps = {
  tabIndex: -1,
};

Filter.propTypes = {
  tabIndex: PropTypes.number,
};

export default Filter;
