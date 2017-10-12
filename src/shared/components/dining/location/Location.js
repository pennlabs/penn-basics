import React, {Component} from 'react';
import Hours from './Hours';

class Location extends Component {
  render(){
    return(
      <div>
        <h2>
          {this.props.name}
        </h2>
        <Hours hours={{
          "Saturday", "9-12",
          "Sunday", "8-2",
        }} />
      </div>
    )
  }
}

export default Location;
