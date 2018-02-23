import React, { Component } from 'react';
import { getDiningData } from '../../actions/index';
import { connect } from 'react-redux';
import NotFound from '../shared/NotFound';
import moment from 'moment';
import { mappings } from './mappings';
import PropTypes from 'prop-types';

// Import components
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
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

    // Set up the state
    this.state = {
      dateFormattedToday: dateFormatted,
      dateFormatted: dateFormatted,
      meal: "",
      meals: [],
      days: [],
    };

    // Bind this to helper method
    this.checkForErrors = this.checkForErrors.bind(this);
    this.findMeals = this.findMeals.bind(this);
    this.findDays = this.findDays.bind(this);
    this.handleChangeMeal = this.handleChangeMeal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  /**
   * When the component mounts
   */
  componentDidMount() {
    // Find meals
    this.findMeals();

    // Find dates
    this.findDays();
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
        meals: [],
        dateFormatted: this.state.dateFormattedToday,
        dates: [],
        error: "",
      });
    }
  }

  /**
   * When the component updates
   */
  componentDidUpdate(prevProps, prevState) {
    /**
     * TODO this is being called too many times
     */

    // Refresh the meals state if necessary
    if (!this.state.meal ||
        (prevState.meal !== this.state.meal) ||
        !this.state.meals.length) {
      this.findMeals();
    }

    // Refresh the days state if necessary
    if (!this.state.dateFormatted ||
        (prevState.dateFormatted !== this.state.dateFormatted) ||
        !this.state.days.length) {
      this.findDays();
    }
  }

  /**
   * Find days
   */
  findDays() {
    // Find the relevant meal
    if (this.props.diningData &&
        this.state.dateFormatted &&
        !this.props.diningData.pending &&
        !this.state.meal) {
      // Get all days passed to us from the API
      // These are of the form MM/DD/YYYY EXCEPT in the case that the month
      // begins with a "0", in which case the format is M/DD/YYYY
      const days = Object.keys(this.props.diningData);

      // Iterate over the days until we find the current day
      // This is stored in the state as this.state.dateFormattedToday
      let matched = false;

      // Construct an array of all days that the user will be able to select from
      const daysToShow = [this.state.dateFormattedToday];

      // Include at most 2 days in addition to today
      let count = 2;

      // Iterate
      days.forEach(day => {
        // Check for a match if we have not yet found one
        if (!matched) {
          if (day === this.state.dateFormattedToday) {
            matched = true;
          }
        } else if (count > 0) {
          // Add the day to the list
          daysToShow.push(day);

          // Decrement the count
          count--;
        }
      });

      // Update the state
      this.setState({
        days: daysToShow,
      });
    }
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
   * Handle change to selection of meal to render
   */
  handleChangeMeal(meal) {
    this.setState({
      meal: meal,
    });
  }

  /**
   * Handle the change of day to render
   */
  handleChangeDate(day) {
    this.setState({
      dateFormatted: day,
    });
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

        {/* Render dropdowns for selecting dates and meals */}
        <DiningQuery
          meal={ this.state.meal }
          meals={ this.state.meals }
          mealCallback={ this.handleChangeMeal }
          dayCallback={ this.handleChangeDate }
          days={ this.state.days }
          day={ this.state.dateFormatted }
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
