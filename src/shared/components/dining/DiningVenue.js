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
  /**
   * Constructor method
   * TODO make loading component
   */
  constructor(props){
    super(props);
    const venue_id = this.props.match.params.id;
    this.props.getDiningDataDispatch(venue_id);

    const date = new Date();
    const momentDate = moment(date);
    const dateFormatted = momentDate.format('MM/DD/YYYY');
    const dateToString = "Today, " + momentDate.format("dddd MMMM Do YYYY");

    this.state = {
      dateFormatted: dateFormatted,
      dateToString: dateToString,
      meal: "Brunch" /*TODO: MAKE THIS PROGRAMMATIC*/
    }
  }

  /**
   * When the component will update
   */
  componentWillUpdate(props) {
    const currentVenueId = this.props.match.params.id
    const nextVenueId = props.match.params.id
    if (currentVenueId !== nextVenueId) {
      this.props.getDiningDataDispatch(nextVenueId)
    }
  }

  /**
   * Render the component
   */
  render() {
    if (this.props.pending) {
      return (
        <div>
          Loading...
        </div>
      );
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
        return (
          <div>
            {/* Render the title of the dining page */}
            <h1 className="title">
              { mappings[this.props.match.params.id] }
            </h1>

            {/* Render the overview card at the top of the dining view */}
            <DiningOverview />

            {/* Render the current date */}
            <h2>
              {this.state.dateToString}
            </h2>
            <DiningQuery />
            {!this.props.diningData.pending && <DiningMenu sectionsObj={this.props.diningData[this.state.dateFormatted][this.state.meal]}/>}
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
