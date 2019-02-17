import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from 'styled-components';

import venueData from './content/venueData';
import { getDiningData, getVenueInfo } from '../../actions/index';

import Nav from './Nav';
import DiningQuery from './DiningQuery';
import DiningOverview from './DiningOverview';
import DiningMenu from './DiningMenu';
import ErrorMessage from '../shared/ErrorMessage';
import NotFound from '../shared/NotFound';
import Loading from '../shared/Loading';

const Wrapper = s.div`
  padding: 1rem;
`;

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

    // Set up the state

    // Bind this to helper method
    this.checkForErrors = this.checkForErrors.bind(this);
    this.renderError = this.renderError.bind(this);
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
    }
  }


  // Check for errors
  checkForErrors() {
    let error = '';

    const {
      match,
      diningData,
      dateFormatted,
      meal,
    } = this.props;
    const { id } = match.params;

    if (!venueData[id]) { // If no mapping is found
      error = 'Dining venue not found';
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

  // Helper method to render any error
  renderError() {
    const {
      diningDataPending,
      venueHoursPending,
    } = this.props;

    if (diningDataPending || venueHoursPending) return null;

    // Check for errors
    const error = this.props.error || this.checkForErrors(); // eslint-disable-line

    return ( // NOTE this returns null if there is no error
      <ErrorMessage message={error} />
    );
  }

  // Render the component
  render() {
    const {
      match,
      diningDataPending,
      venueHoursPending,
    } = this.props;
    const { id } = match.params;

    // If the ID is not found
    if (!venueData[id]) {
      return (
        <Nav>
          <Wrapper>
            <NotFound />
          </Wrapper>
        </Nav>
      );
    }

    // If content is still loading
    if (diningDataPending || venueHoursPending) {
      return (
        <Nav>
          <Wrapper>
            <Loading />
          </Wrapper>
        </Nav>
      );
    }

    const { name } = venueData[id];

    return (
      // If there is no error and the data is not pending
      <Nav>
        <Wrapper>
          {/* Render the title of the dining page */}
          <h1 className="title">
            {name}
          </h1>

          {/* Render an error if there is one */}
          {this.renderError()}

          {/* Render the overview card at the top of the dining view */}
          <DiningOverview id={id} />

          {/* Render dropdowns for selecting dates and meals */}
          <DiningQuery />

          {/* Render dining menu for the selected date and meal */}
          <DiningMenu />
        </Wrapper>
      </Nav>
    );
  }
}

DiningVenue.defaultProps = {
  error: '',
  diningData: null,
  meal: '',
  venueHours: null,
  dateFormatted: null,
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
  dateFormatted: PropTypes.string,
  meal: PropTypes.string,
};

const mapStateToProps = state => ({
  dateFormatted: state.dining.dateFormatted,
  meal: state.dining.meal,
  meals: state.dining.meals,
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
