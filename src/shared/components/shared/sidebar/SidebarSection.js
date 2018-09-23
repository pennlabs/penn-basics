import React from 'react';
import PropTypes from 'prop-types';

import List from './List';

const SidebarSection = ({ title, links, tabIndex = -1 }) => {
  const state = {
    isExpanded: false,
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.keyCode === 32) {
      state.isExpanded = !state.isExpanded;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    state.isExpanded = !state.isExpanded;
  };

  return (
    <div
      className="sidebarSection"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={tabIndex}
    >
      <h2 className="sidebarSectionTitle">
        {title}
      </h2>
      {state.isExpanded && (<List links={links} />)}
    </div>
  );
};

SidebarSection.defaultProps = {
  tabIndex: -1,
};

SidebarSection.propTypes = {
  tabIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SidebarSection;
