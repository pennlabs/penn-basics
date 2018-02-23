import React, {Component} from 'react';

class Menu extends Component {
  // Constructor method
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  // Handle when the meny is clicked
  handleClick() {
    var sidebar = document.getElementById("sidebar");
    var shaddow = document.getElementById("shade");
    shaddow.classList.toggle("fade-in");
    sidebar.classList.toggle("active");
  }

  // Shadow
  render() {
    return(
      <div id="sidebar-toggle" onClick={this.handleClick}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div id="shade" />
      </div>
    );
  }
}

export default Menu;
