import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mappings from './content/mappings';

import { getDiningData, getVenueInfo } from '../../actions/index';

import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import ErrorMessage from '../shared/ErrorMessage';
import NotFound from '../shared/NotFound';
import Loading from '../shared/Loading';

// Render the view for a dining venue
class DiningVenue extends Component {
  constructor(props) {
    super(props);

    const {
      match,
      getDiningDataDispatch,
      getVenueInfoDispatch,
    } = this.props;

    // Pull meal data and hours data for the venue
    const venueId = match.params.id;
    getDiningDataDispatch(venueId);
    getVenueInfoDispatch(venueId);

    // Format the current date
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();

    // Set up the state
    this.state = {
      dateFormattedToday: date,
      dateFormatted: date,
      meal: '',
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
    this.refreshState = this.refreshState.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

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
  componentWillUpdate(newProps) {
    const {
      match,
      getDiningDataDispatch,
      getVenueInfoDispatch,
    } = this.props;

    const currentVenueId = match.params.id;
    const nextVenueId = newProps.match.params.id;

    if (currentVenueId !== nextVenueId) {
      getDiningDataDispatch(nextVenueId);
      getVenueInfoDispatch(nextVenueId);

      const { dateFormattedToday } = this.state;

      this.refreshState(dateFormattedToday);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      meal,
      meals,
      dateFormatted,
      days,
    } = this.state;

    // Refresh the meals state if necessary
    // This is if we have changed the date or meal selected
    if (
      !meal
      || (prevState.meal !== meal)
      || !meals.length
      || (prevState.dateFormatted !== dateFormatted)
    ) {
      this.findMeals();
    }

    // Refresh the days state if necessary
    // This is the case if we have changed the date selected
    if (
      !dateFormatted
      || (prevState.dateFormatted !== dateFormatted)
      || !days.length
    ) {
      this.findDays();
    }
  }

  refreshState(dateFormatted) {
    // Clear some of the state
    this.setState({
      meal: '',
      meals: [],
      days: [],
      dateFormatted,
      error: '',
    });
  }

  /**
   * Find days
   */
  findDays() {
    const { diningData } = this.props;

    const { dateFormatted, meal, dateFormattedToday } = this.state;

    // Find the relevant meal if variables have been populated in the state and props
    if (diningData
        && dateFormatted
        && !diningData.pending
        && !meal) {
      // Get all days passed to us from the API
      // These are of the form MM/DD/YYYY EXCEPT in the case that the month
      // begins with a "0", in which case the format is M/DD/YYYY
      const days = Object.keys(diningData);

      // Iterate over the days until we find the current day
      // This is stored in the state as this.state.dateFormattedToday
      let matched = false;

      // Construct an array of all days that the user will be able to select from
      const daysToShow = [dateFormattedToday];

      // Include at most 2 days in addition to today
      let count = 2;

      // Iterate
      days.forEach((day) => {
        // Check for a match if we have not yet found one
        if (!matched) {
          if (day === dateFormattedToday) {
            matched = true;
          }
        } else if (count > 0) {
          // Add the day to the list
          daysToShow.push(day);

          // Decrement the count
          count -= 1;
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
    const { diningData, diningDataPending } = this.props;
    const { dateFormatted, meal } = this.state;

    // Find the relevant meal
    if (diningData
        && dateFormatted
        && diningData[dateFormatted]
        && !diningDataPending) {
      const meals = Object.keys(diningData[dateFormatted]);

      // Update the state
      if (meals.some(element => element === meal)) {
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
    let error = '';

    const {
      match,
      diningData,
    } = this.props;
    const { dateFormatted, meal } = this.state;

    // If no mapping is found
    if (!mappings[match.params.id]) {
      error = 'Dining with passed in ID not found';
    } else if (diningData && dateFormatted) {
      if (!diningData[dateFormatted]) {
        error = "Dining data not found for today's date";
      } else if (meal && !diningData[dateFormatted][meal]) {
        error = `Dining data not found for meal: "${meal}"`;
      } else {
        error = '';
      }
    } else if (!diningData) {
      error = 'Failed to find meal data.';
    } else {
      error = '';
    }

    // Return the error
    return error;
  }

  renderMenu() {
    const { diningData } = this.props;
    const { meal, dateFormatted } = this.state;

    if (!diningData) return null;
    if (!meal) return null;

    return (
      <DiningMenu sectionsObj={diningData[dateFormatted][meal]} />
    );
  }

  // Helper method to render any error
  renderError() {
    const {
      diningDataPending,
      venueHoursPending,
    } = this.props;

    if (diningDataPending || venueHoursPending) return null;

    // Check for errors
    const error = this.props.error || this.state.error || this.checkForErrors(); // eslint-disable-line

    return ( // NOTE this returns null if there is no error
      <ErrorMessage message={error} />
    );
  }

  // Render the component
  render() {
    const { match, diningDataPending, venueHoursPending } = this.props;

    // If the ID is not found
    if (!mappings[match.params.id]) return (<NotFound />);

    // Render based on state
    if (diningDataPending || venueHoursPending) {
      // If data or an error is still pending
      return (
        <Loading />
      );
    }

    const {
      meal,
      meals,
      days,
      dateFormatted,
    } = this.state;

    return (
      // If there is no error and the data is not pending
      <div>
        {/* Render the title of the dining page */}
        <h1 className="title">
          { mappings[match.params.id] }
        </h1>

        {/* Render an error if there is one */}
        {this.renderError()}

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview id={match.params.id} />

        {/* Render dropdowns for selecting dates and meals */}
        <DiningQuery
          meal={meal}
          meals={meals}
          mealCallback={this.handleChangeMeal}
          dayCallback={this.handleChangeDate}
          days={days}
          day={dateFormatted}
        />

        { this.renderMenu() }
      </div>
    );
  }
}

DiningVenue.defaultProps = {
  error: '',
  diningData: null,
  venueHours: null,
};

DiningVenue.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line
  getDiningDataDispatch: PropTypes.func.isRequired,
  getVenueInfoDispatch: PropTypes.func.isRequired,
  diningDataPending: PropTypes.bool.isRequired,
  venueHoursPending: PropTypes.bool.isRequired,
  error: PropTypes.string,
  diningData: PropTypes.object, // eslint-disable-line
  venueHours: PropTypes.array, // eslint-disable-line
};

const mapStateToProps = state => ({
  diningData: state.dining.diningData,
  venueHours: state.dining.venueHours,
  venueInfo: state.dining.venueInfo,
  error: state.dining.error,
  diningDataPending: state.dining.diningDataPending,
  venueHoursPending: state.dining.venueHoursPending,
});

const mapDispatchToProps = dispatch => ({
  getDiningDataDispatch: (venueId) => {
    dispatch(getDiningData(venueId));
  },
  getVenueInfoDispatch: (venueId) => {
    dispatch(getVenueInfo(venueId));
  },
});

// Redux config
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiningVenue);
