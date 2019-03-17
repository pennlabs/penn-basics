/* global document */
import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ tabIndex }) => {
  const toggle = () => {
    const sidebar = document.getElementById('sidebar');
    const shaddow = document.getElementById('shade');
    shaddow.classList.toggle('fade-in');
    sidebar.classList.toggle('active');
  };

  const handleKeyPress = (event) => {
    event.preventDefault();

    if (event.keyCode === 32) {
      toggle();
    }
  };

  const handleClick = (event) => {
    event.preventDefault();

    toggle();
  };

  // Shadow
  return (
    <div
      id="sidebar-toggle"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={tabIndex}
    >
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div id="shade" />
    </div>
  );
};

Menu.defaultProps = {
  tabIndex: -1,
};

Menu.propTypes = {
  tabIndex: PropTypes.number,
};

export default Menu;
