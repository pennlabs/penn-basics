import React, {Component} from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var sidebar = document.getElementById("sidebar");
    var shaddow = document.getElementById("shade");
    var width = sidebar.style.width;
    shaddow.classList.toggle("fade-in");
    sidebar.classList.toggle("active");
  }

  // Shadow
  render(){
    return(
      <div id="sidebar-toggle" onClick={this.handleClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div id="shade"></div>
      </div>
    )
  }
}

export default Menu;
