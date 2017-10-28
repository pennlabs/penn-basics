import React, {Component} from 'react';
import {getDiningData} from '../../actions/index';
import {connect} from 'react-redux';
import NotFound from '../shared/NotFound';
import moment from 'moment';

class DiningVenue extends Component {
  constructor(props){
    super(props);
    const venue_id = this.props.match.params.id;
    this.props.getDiningDataDispatch(venue_id);
  }
  render(){
    if (this.props.pending) {
      return null;
    } else {
      if (this.props.error) {
        return (
          <NotFound
            title={"Venue with ID " + this.props.match.params.id + " not found"}
            url="/dining"
            urlText="Back to dining"
          />
        );
      } else {
        const dateFormatted = moment(new Date()).format('MM/DD/YYYY');
        const curr = this.props.diningData[dateFormatted];
        console.dir(curr);
        return  (
          <div>
            <h2>{dateFormatted}</h2>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    diningData: state.dining.diningData,
    error: state.dining.error,
    pending: state.dining.pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDiningDataDispatch: (venue_id) => {dispatch(getDiningData(venue_id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue);
