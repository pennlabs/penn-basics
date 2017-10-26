import React, {Component} from 'react';
import {getDiningData} from '../../actions/index'

class DiningVenue extends Component {
  constructor(props){
    super(props)
    getDiningData(523)
  }
  render(){
    return(
      <div>
        <h2>I am Commons</h2>
      </div>
    )
  }
}

export default DiningVenue;
