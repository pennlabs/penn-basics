import React, {Component} from 'react';
import {getDiningData} from '../../actions/index';
import {connect} from 'react-redux';
import NotFound from '../shared/NotFound';
import moment from 'moment';
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import {mappings} from './mappings';

class DiningVenue extends Component {
  constructor(props){
    super(props);
    const venue_id = this.props.match.params.id;
    this.props.getDiningDataDispatch(venue_id);
  }

  componentWillUpdate(props) {
    const currentVenueId = this.props.match.params.id
    const nextVenueId = props.match.params.id
    if (currentVenueId !== nextVenueId) {
      this.props.getDiningDataDispatch(nextVenueId)
    }
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
        const date = new Date();
        const momentDate = moment(date);
        const dateFormatted = momentDate.format('MM/DD/YYYY');
        const dateToString = "Today, " + momentDate.format("dddd MMMM Do YYYY");
        const curr = this.props.diningData[dateFormatted];

        return  (
          <div>
            <h1 className="title">
              { mappings[this.props.match.params.id] }
            </h1>
            <DiningOverview />
            <h2>{dateToString}</h2>
            <DiningQuery />
            <DiningMenu diningData={this.props.diningData} dateFormatted={dateFormatted} meal="Lunch" />
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
