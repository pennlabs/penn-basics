import React, {Component} from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var filterContent = document.getElementById("filterContent");
    filterContent.classList.toggle("active");
  }

  render(){
    return(
      <div className="filter">
        <div className="filterToggleWrapper">
          <div className="filterToggle hover" onClick={this.handleClick}>
            <i className="fa fa-filter"></i> Filter
          </div>
        </div>

        <div className="columns is-desktop" id="filterContent">
          <div className="column">
            <h2>Dank</h2>
            <ul>
              <li>Filter 1</li>
              <li>Filter 2</li>
              <li>Filter 3</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
