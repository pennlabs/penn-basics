import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from '../shared/NotFound';
import { mappings } from './mappings';
import PropTypes from 'prop-types';

// Import actions
import { getDiningData, getVenueHours } from '../../actions/index';

// Import components
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import ErrorMessage from '../shared/ErrorMessage';
import Loading from '../shared/Loading';

/**
 * Render the view for a dining venue
 */
class DiningVenue extends Component {
  /**
   * Constructor method
   */
  constructor(props) {
    super(props);
    const venueId = this.props.match.params.id;
    this.props.getDiningDataDispatch(venueId);
    this.props.getVenueHoursDispatch(venueId);

    // Format the current date
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();

    // Set up the state
    this.state = {
      dateFormattedToday: date,
      dateFormatted: date,
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
    this.renderError = this.renderError.bind(this);
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
      this.props.getVenueHoursDispatch(nextVenueId);

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
    // Refresh the meals state if necessary
    if (
      !this.state.meal ||
      (prevState.meal !== this.state.meal) ||
      !this.state.meals.length ||
      (prevState.dateFormatted !== this.state.dateFormatted)
    ) {
      this.findMeals();
    }

    // Refresh the days state if necessary
    if (
      !this.state.dateFormatted ||
      (prevState.dateFormatted !== this.state.dateFormatted) ||
      !this.state.days.length
    ) {
      this.findDays();
    }
  }

  /**
   * Find days
   */
  findDays() {
    // Find the relevant meal if variables have been populated in the state and props
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

  // Find meals
  findMeals() {
    // Find the relevant meal
    if (this.props.diningData &&
        this.state.dateFormatted &&
        this.props.diningData[this.state.dateFormatted] &&
        !this.props.diningData.pending) {
      const meals = Object.keys(this.props.diningData[this.state.dateFormatted]);

      // Update the state
      if (meals.some(element => element === this.state.meal)) {
        this.setState({
          meals,
        });
      } else {
        this.setState({
          meals,
          meal: meals[0],
        });
      }
    } else {
      // If the API is not giving us the data we want
    }
  }

  //  Handle change to selection of meal to render
  handleChangeMeal(meal) {
    this.setState({
      meal,
    });
  }

  // Handle the change of day to render
  handleChangeDate(day) {
    this.setState({
      dateFormatted: day,
    });
  }

  // Check for errors
  checkForErrors() {
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

  // Helper method to render any error
  renderError() {
    if (this.props.pending) return null;

    // Check for errors
    const error = this.checkForErrors();
    if (this.props.error) {
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

    // If there is no error in any part of the component
    return null;
  }

  // Render the component
  render() {
    // If the ID is not found
    if (!mappings[this.props.match.params.id]) return (<NotFound />);

    // Render based on state
    if (this.props.pending) {
      // If data or an error is still pending
      return (
        <Loading />
      );
    }

    return (
      // If there is no error and the data is not pending
      <div>
        {/* Render the title of the dining page */}
        <h1 className="title">
          { mappings[this.props.match.params.id] }
        </h1>

        {this.renderError()}

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview id={this.props.match.params.id} />

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
          this.props.diningData ? (
            (this.props.diningData.pending) ? (
              "Loading..."
            ) : (
              !this.state.meal ? null : (
                <DiningMenu sectionsObj={this.props.diningData[this.state.dateFormatted][this.state.meal]} />
              )
            )
          ) : null
        }
      </div>
    );
  }
}

DiningVenue.propTypes = {
  match: PropTypes.object,
  getDiningDataDispatch: PropTypes.func,
  getVenueHoursDispatch: PropTypes.func,
  pending: PropTypes.bool,
  error: PropTypes.string,
  diningData: PropTypes.object,
  venueHours: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    diningData: state.dining.diningData,
    venueHours: state.dining.venueHours,
    error: state.dining.error,
    pending: state.dining.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiningDataDispatch: venueId => {
      dispatch(getDiningData(venueId));
    },
    getVenueHoursDispatch: venueId => {
      dispatch(getVenueHours(venueId));
    },
  };
};

// Redux config
DiningVenue = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiningVenue);

export default DiningVenue;
