import React, {Component} from 'react';
import {getDiningData} from '../../actions/index'
import {connect} from 'react-redux'

class DiningVenue extends Component {
  constructor(props){
    super(props)
    this.props.getDiningDataDispatch(523)
  }
  render(){
    return(
      <div>
        <h2>I am commons</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    diningData: state.dining.diningData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDiningDataDispatch: (venue_id) => {dispatch(getDiningData(venue_id))}    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue);
