import React, {Component} from 'react';
import Dropdown from './Dropdown';

class DiningQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  handleClick() {
    this.setState({toggled: !this.state.toggled});
  }

  render(){
    const diningOptions = ["Breakfast", "Lunch", "Dinner"];
    const dayOptions = ["Today", "Tomorrow", "Day after tomorrow"]

    return(
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
