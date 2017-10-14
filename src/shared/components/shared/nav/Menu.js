import React, {Component} from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("lit");
    var sidebar = document.getElementById("sidebar");
    var display = sidebar.style.display;
    sidebar.style.display = display === "none" ? "block" : "none";
  }

  render(){
    return(
      <div id="sidebar-toggle" onClick={this.handleClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    )
  }
}

export default Menu;
