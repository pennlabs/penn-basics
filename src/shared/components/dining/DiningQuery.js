import React, { Component } from 'react';
import Dropdown from './Dropdown';

class DiningQuery extends Component {
  render() {
    const diningOptions = ["Breakfast", "Lunch", "Dinner"];
    const dayOptions = ["Today", "Tomorrow", "Day after tomorrow"]

    return (
      <div className="diningQuery">
        <p>What's for</p>
        <Dropdown
          options={diningOptions}
        />
        <Dropdown
          options={dayOptions}
        />
      </div>
    )
  }
}

export default DiningQuery;
