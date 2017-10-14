import React, {Component} from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var sidebar = document.getElementById("sidebar");
    var shaddow = document.getElementById("shaddow");
    var width = sidebar.style.width;
    shaddow.classList.toggle("fade-in");
    sidebar.classList.toggle("active");
  }

  render(){
    return(
      <div id="sidebar-toggle" onClick={this.handleClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div id="shaddow"></div>
      </div>
    )
  }
}

export default Menu;
