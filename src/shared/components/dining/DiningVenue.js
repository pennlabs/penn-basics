// Import frameworks
import React from 'react';
import { getDiningData } from '../../actions/index';
import { connect } from 'react-redux';
import NotFound from '../shared/NotFound';
import moment from 'moment';
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import { mappings } from './mappings';
import PropTypes from 'prop-types';

/**
 * Render the view for a dining venue
 */
class DiningVenue extends React.Component {
  /**
   * Constructor method
   */
  constructor(props) {
    super(props);
    const venueId = this.props.match.params.id;
    this.props.getDiningDataDispatch(venueId);

    // Format the current date
    const date = new Date();
    const momentDate = moment(date);
    const dateFormatted = momentDate.format('MM/DD/YYYY');
    const dateToString = "Today, " + momentDate.format("dddd MMMM Do YYYY");

    this.state = {
      dateFormatted: dateFormatted,
      dateToString: dateToString,
      meal: "Brunch",
    };
  }

  /**
   * When the component will update
   * Check if there is a new dining ID
   */
  componentWillUpdate(props) {
    const currentVenueId = this.props.match.params.id;
    const nextVenueId = props.match.params.id;
    if (currentVenueId !== nextVenueId) {
      this.props.getDiningDataDispatch(nextVenueId);
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
    } else if (this.props.error) {
      /**
       * TODO handle more errors
       */
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
          { mappings[this.props.match.params.id] }
        </h1>

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview />

        {/* Render the current date */}
        <h2>
          {this.state.dateToString}
        </h2>
        <DiningQuery />
        {
          !this.props.diningData.pending && (
            <DiningMenu sectionsObj={this.props.diningData[this.state.dateFormatted][this.state.meal]} />
          )
        }
      </div>
    );
  }
}

DiningVenue.propTypes = {
  match: PropTypes.object,
  getDiningDataDispatch: PropTypes.func,
  pending: PropTypes.bool,
  error: PropTypes.string,
  diningData: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    diningData: state.dining.diningData,
    error: state.dining.error,
    pending: state.dining.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiningDataDispatch: (venueId) => {
      dispatch(getDiningData(venueId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue);
