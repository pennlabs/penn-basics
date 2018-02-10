// Import frameworks
import React from 'react';
import { getDiningData } from '../../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';
import { mappings } from './mappings';
import PropTypes from 'prop-types';

// Import components
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import NotFound from '../shared/NotFound';
import ErrorMessage from '../shared/ErrorMessage';

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
    let dateFormatted = momentDate.format('MM/DD/YYYY');

    // Remove a leading 0 if there is one
    if (dateFormatted.startsWith("0")) {
      dateFormatted = dateFormatted.substring(1);
    }
    const dateToString = "Today, " + momentDate.format("dddd MMMM Do YYYY");

    this.state = {
      dateFormatted: dateFormatted,
      dateToString: dateToString,
      meal: "",
      meals: [],
    };

    // Bind this to helper method
    this.checkForErrors = this.checkForErrors.bind(this);
    this.findMeals = this.findMeals.bind(this);
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

      // Clear some of the state
      this.setState({
        meal: "",
        error: "",
      });
    }
  }

  /**
   * When the component updates
   */
  componentDidUpdate() {
    this.findMeals();
  }

  /**
   * Find meals
   */
  findMeals() {
    // Find the relevant meal
    if (this.props.diningData &&
        this.state.dateFormatted &&
        !this.props.diningData.pending &&
        !this.state.meal) {
      const meals = Object.keys(this.props.diningData[this.state.dateFormatted]);

      // Update the state
      // TODO don't always pick the first meal
      this.setState({
        meals: meals,
        meal: meals[0],
      });
    }
  }

  /**
   * Check for errors
   */
  checkForErrors() {
    // Check for errors
    let error = "";

    // If no mapping is found
    if (!mappings[this.props.match.params.id]) {
      error = "Dining with passed in ID not found";
    } else if (this.props.diningData && this.state.dateFormatted) {
      if (!this.props.diningData[this.state.dateFormatted]) {
        error = "Dining data not found for today's date";
      } else if (this.state.meal && !this.props.diningData[this.state.dateFormatted][this.state.meal]) {
        error = `Dining data not found for meal: "${ this.state.meal }"`;
      } else {
        error = "";
      }
    } else if (!this.props.diningData) {
      error = "Dining data is undefined";
    } else {
      error = "";
    }

    // Return the error
    return error;
  }

  /**
   * Render the component
   */
  render() {
    if (!this.state.pending && this.props.diningData && !this.props.diningData.pending) {
      console.log(this.props.diningData);
      console.log(this.state.dateFormatted);
      console.log(Object.keys(this.props.diningData)[4]);
    }

    // Check for errors
    const error = this.checkForErrors();

    // Render based on state
    if (this.props.pending) {
      // If data or an error is still pending
      return (
        <div>
          Loading...
        </div>
      );
    } else if (this.props.error) {
      // If there was some other error
      return (
        <ErrorMessage message={ this.props.error } />
      );
    } else if (this.state.error) {
      // If there is a state error
      return (
        <ErrorMessage message={ this.state.error } />
      );
    } else if (error) {
      return (
        <ErrorMessage message={ error } />
      );
    }

    return (
      // If there is no error and the data is not pending
      <div>
        {/* Render the title of the dining page */}
        <h1 className="title">
          { mappings[this.props.match.params.id] }
        </h1>

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview />

        {/* Render the current date */}
        <h2>
          { this.state.dateToString }
        </h2>

        <DiningQuery
          meal={ this.state.meal }
          meals={ this.state.meals }
          days={["Today", "Tomorrow", "Day after tomorrow"]}
        />

        {
          (this.props.diningData.pending || !this.state.meal) ? (
            "Loading..."
          ) : (
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

// Redux config
DiningVenue = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiningVenue);

export default DiningVenue;
