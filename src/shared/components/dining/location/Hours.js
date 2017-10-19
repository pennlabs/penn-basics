import React, {Component} from 'react';

class Hours extends Component {
  hours() {
    return Object.entries(this.props.hours).forEach([key, value]) => {
      return(
        <li>
          <div className="day">
            {key}
          </div>
          <div className="hours">
            {value}
          </div>
        </li>
      )
    }
  }

  render(){
    return(
      <div className="hours">
        <h4>Hours of operation</h4>
        <ul>
          { hours() }
        </ul>
      </div>
    )
  }
}

export default Hours;
