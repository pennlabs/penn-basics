import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

// TODO use the other venue data json
import venueData from './content/venueData'
import {
  getVenueInfo,
  addFavorite,
  removeFavorite,
} from '../../actions/dining_actions'

import DiningOverview from './DiningOverview'
import NotFound from '../shared/NotFound'
import Loading from '../shared/Loading'

const NAV_HEIGHT = '57px'

const Buttons = s.div`
  float: right;
`

const Wrapper = s.div`
  padding: 1rem;
`

const FavoriteIcon = s.i`
  opacity: 0.75;
`

// Render the view for a dining venue
class DiningVenue extends Component {
  constructor(props) {
    super(props)

    const { venueId, getVenueInfoDispatch } = this.props

    if (venueId) {
      getVenueInfoDispatch(venueId)
    }
  }

  componentDidUpdate(prevProps) {
    const { venueId, getVenueInfoDispatch } = this.props

    const previousVenueId = prevProps.venueId
    const currentVenueId = venueId

    if (previousVenueId !== currentVenueId) {
      getVenueInfoDispatch(currentVenueId)
    }
  }

  // Render the component
  render() {
    const {
      venueHoursPending,
      favorites,
      venueId,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
    } = this.props

    if (!venueId) {
      return (
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
      )
    }

    // If the ID is not found
    if (!venueData[venueId]) {
      return (
        <Wrapper>
          <NotFound />
        </Wrapper>
      )
    }

    // If content is still loading
    if (venueHoursPending) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      )
    }

    const { name } = venueData[venueId]
    const isFavorited = favorites.includes(venueId)

    return (
      // If there is no error and the data is not pending
      <Wrapper>
        <div style={{ marginBottom: '1rem' }}>
          <Buttons>
            {isFavorited ? (
              <span // eslint-disable-line
                className="button is-info"
                onClick={() => dispatchRemoveFavorite(venueId)}
              >
                <FavoriteIcon className="fa fa-heart" />
                &nbsp; Favorited
              </span>
            ) : (
              <span // eslint-disable-line
                className="button"
                onClick={() => dispatchAddFavorite(venueId)}
              >
                <FavoriteIcon className="far fa-heart" />
                &nbsp; Make Favorite
              </span>
            )}
          </Buttons>

          <h1 className="title">{name}</h1>
        </div>

        {/* Render the overview card at the top of the dining view */}
        <DiningOverview id={venueId} />
      </Wrapper>
    )
  }
}

DiningVenue.defaultProps = {
  venueHours: null,
  venueId: null,
  favorites: [],
}

DiningVenue.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line
  getVenueInfoDispatch: PropTypes.func.isRequired,
  venueHoursPending: PropTypes.bool.isRequired,
  venueHours: PropTypes.array, // eslint-disable-line
  venueId: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string),
  dispatchAddFavorite: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
}

const mapStateToProps = ({ dining }) => {
  const { venueHours, venueHoursPending, favorites } = dining

  return {
    venueHours,
    venueHoursPending,
    favorites,
  }
}

const mapDispatchToProps = dispatch => ({
  getVenueInfoDispatch: venueId => dispatch(getVenueInfo(venueId)),
  dispatchAddFavorite: venueId => dispatch(addFavorite(venueId)),
  dispatchRemoveFavorite: venueId => dispatch(removeFavorite(venueId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiningVenue)
