import React, {Component} from 'react';
import uuid from 'uuid/v4';

class Laundry extends Component {
  // Constructor method
  constructor(props) {
    super(props);

    /**
     * Set the state
     * TODO replace dummy data
     * api.pennlabs.org/laundry/
     * /halls/ids --> returns all halls and all ids
     * /hall/:id
     * /hall/0/1  --> returns in 1 call 2 laundry halls
     * /usage/:id --> usage data for that hall
     */
    this.state = {
      "dryer_data": {
        "0": 5.5,
        "1": 8.75,
        "10": 9.0,
        "11": 9.0,
        "12": 7.5,
        "13": 6.5,
        "14": 5.0,
        "15": 1.5,
        "16": 4.5,
        "17": 6.25,
        "18": 6.0,
        "19": 7.75,
        "2": 9.0,
        "20": 9.0,
        "21": 6.25,
        "22": 7.75,
        "23": 8.25,
        "24": 8.25,
        "25": 7.5,
        "26": 8.75,
        "3": 9.0,
        "4": 9.0,
        "5": 9.0,
        "6": 9.0,
        "7": 9.0,
        "8": 9.0,
        "9": 9.0
      },
      "total_number_of_dryers": 9.0,
    };
  }

  // Helper method to render the bars
  renderBars() {
    const bars = Object.keys(this.state.dryer_data).map((key) => {
      const avg = this.state.total_number_of_dryers - this.state.dryer_data[key];
      return (
        <div className="bar" key={ uuid() } height={ (avg / this.state.total_number_of_dryers * 100) + "%"} />
      );
    });

    return bars;
  }

  // Render the component
  render() {
    return (
      <div className="laundryOverview overview">
        <h2 className="is-size-5">
          Hourly activity
        </h2>
        <div className="hourlyActivity">
          <div className="bars">
            { this.renderBars() }
          </div>
          <div className="hours">
          </div>
        </div>
      </div>
    );
  }
}

export default Laundry;
