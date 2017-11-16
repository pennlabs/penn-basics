import React, {Component} from 'react';
import Check from './Check';

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
            <h2>Filter title</h2>
            <Check description="Filter1" />
            <Check description="Filter2" />
            <Check description="Filter3" />
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
