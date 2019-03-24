/* global document */
import React from 'react';

const Menu = () => {
  const toggle = () => {
    const sidebar = document.getElementById('sidebar');
    const shadow = document.getElementById('shade');
    shadow.classList.toggle('fade-in');
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
      tabIndex={0}
    >
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div id="shade" />
    </div>
  );
};

export default Menu;
