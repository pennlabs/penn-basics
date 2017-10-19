import React, {Component} from 'react';

class Filter extends Component {
  render(){
    return(
      <div className="filter">
        <div className="filterToggle hover">
          Filter
        </div>

        <div className="columns is-desktop display-none">
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
