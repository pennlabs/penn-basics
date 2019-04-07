import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

// TODO use the other venue data json
import venueData from './content/venueData'
import { getDiningData, getVenueInfo } from '../../actions/index'

import Nav from './Nav'
import DiningQuery from './DiningQuery'
import DiningOverview from './DiningOverview'
import DiningMenu from './DiningMenu'
import ErrorMessage from '../shared/ErrorMessage'
import NotFound from '../shared/NotFound'
import Loading from '../shared/Loading'
import { retailLocations } from './constants'

const NAV_HEIGHT = '57px'

const Wrapper = s.div`
  padding: 1rem;
`

// Render the view for a dining venue
class DiningVenue extends Component {
  constructor(props) {
    super(props)

    const {
      match,
      getDiningDataDispatch,
      getVenueInfoDispatch,
    } = this.props

    // Pull meal data and hours data for the venue
    const venueId = match.params.id
    getDiningDataDispatch(venueId)
    getVenueInfoDispatch(venueId)

    this.checkForErrors = this.checkForErrors.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  /**
   * When the component will update
   * Check if there is a new dining ID
   *
   * @param newProps
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


  checkForErrors() {
    let error = ''

    const {
      match,
      diningData,
      dateFormatted,
      meal,
    } = this.props
    const { id } = match.params

    if (!venueData[id]) { // If no mapping is found
      error = 'Dining venue not found'
    } else if (diningData && dateFormatted) {
      if (!diningData[dateFormatted]) {
        error = "Dining data not found for today's date"
      } else if (meal && !diningData[dateFormatted][meal]) {
        error = `Dining data not found for meal: "${meal}"`
      } else {
        error = ''
      }
    } else if (!diningData) {
      error = 'Failed to find meal data.'
    } else {
      error = ''
    }

    return error
  }

  // Helper method to render any error
  renderError() {
    const {
      diningDataPending,
      venueHoursPending,
    } = this.props

    if (diningDataPending || venueHoursPending) return null

    // Check for errors
    const { error: propsError } = this.props
    const error = propsError || this.checkForErrors()

    return (<ErrorMessage message={error} />)
  }

  // Render the component
  render() {
    const {
      match: {
        params: {
          id,
        } = { id: undefined },
      } = {},
      diningDataPending,
      venueHoursPending,
    } = this.props

    if (!id) {
      return (
        <Nav>
          <div
            className="columns is-vcentered is-centered"
            style={{ height: `calc(100% - ${NAV_HEIGHT}` }}
          >
            <div className="column is-7">
              <img src="/img/dining.png" alt="Dining plate" />
              <p style={{ opacity: 0.5, fontSize: '150%', textAlign: 'center' }}>
                Select a dining hall to see information
              </p>
            </div>
          </div>
        </Nav>
      )
    }

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

    if (retailLocations.includes(id)) {
      return (
        // If there is no error and the data is not pending
        <Nav>
          <Wrapper>
            {/* Render the title of the dining page */}
            <h1 className="title">
              {name}
            </h1>

            {/* Render the overview card at the top of the dining view */}
            <DiningOverview id={id} />
          </Wrapper>
        </Nav>
      )
    }

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

const mapStateToProps = ({
  dining: {
    dateFormatted,
    meal,
    meals,
    diningData,
    venueHours,
    venueInfo,
    error,
    diningDataPending,
    venueHoursPending,
  },
}) => ({
  dateFormatted,
  meal,
  meals,
  diningData,
  venueHours,
  venueInfo,
  error,
  diningDataPending,
  venueHoursPending,
})

const mapDispatchToProps = dispatch => ({
  getDiningDataDispatch: venueId => dispatch(getDiningData(venueId)),
  getVenueInfoDispatch: venueId => dispatch(getVenueInfo(venueId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue)
