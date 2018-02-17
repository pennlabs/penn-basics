import React, { Component } from 'react';
import { getDiningData } from '../../actions/index';
import { connect } from 'react-redux';
import NotFound from '../shared/NotFound';
import moment from 'moment';
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import { mappings } from './mappings';

class DiningVenue extends Component {
  // TODO make loading component

  componentDidMount() {
    // venue id
    this.props.getDiningDataDispatch(this.props.match.params.id);
  }

  state = (function() {
    const date = new Date();
    const momentDate = moment(date);
    const dateFormatted = momentDate.format('MM/DD/YYYY');
    const dateToString = "Today, " + momentDate.format("dddd MMMM Do YYYY");
    return {
      dateFormatted: dateFormatted,
      dateToString: dateToString,
      meal: "Brunch" /*TODO: MAKE THIS PROGRAMMATIC*/
    }
  })()


  componentWillUpdate(props) {
    const currentVenueId = this.props.match.params.id
    const nextVenueId = props.match.params.id
    if (currentVenueId !== nextVenueId) {
      this.props.getDiningDataDispatch(nextVenueId)
    }
  }

  render() {
    if (this.props.pending) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    if (this.props.error) {
      return (
        <NotFound
          title={"Venue with ID " + this.props.match.params.id + " not found"}
          url="/dining"
          urlText="Back to dining"
        />
      );
    }
    return (
      <div>
        {/* Render the title of the dining page */}
        <h1 className="title">
          {mappings[this.props.match.params.id]}
        </h1>

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview />

        {/* Render the current date */}
        <h2>
          {this.state.dateToString}
        </h2>
        <DiningQuery />
        {!this.props.diningData.pending && <DiningMenu sectionsObj={this.props.diningData[this.state.dateFormatted][this.state.meal]} />}
      </div>
    );
  }
}

const mapStateToProps = ({ dining: { diningData, error, pending } }) => {
  return {
    diningData,
    error,
    pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDiningDataDispatch: (venue_id) => { dispatch(getDiningData(venue_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue);
