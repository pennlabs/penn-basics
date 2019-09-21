import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import venueData from '../../../server/database/venue_info.json'
import {
  getVenueInfo,
  addFavorite,
  removeFavorite,
} from '../../actions/dining_actions'
import DiningOverview from './DiningOverview'
import NotFound from '../shared/NotFound'
import Loading from '../shared/Loading'
import FavoriteButton from '../shared/favorites/FavoriteButton'

const NAV_HEIGHT = '57px'

const Buttons = s.div`
  float: right;
`

const Wrapper = s.div`
  padding: 1rem;
`

class DiningVenue extends Component {
  constructor(props) {
    super(props)

    const { venueId, dispatchGetVenueInfo } = this.props

    if (venueId) {
      dispatchGetVenueInfo(venueId)
    }
  }

  componentDidUpdate(prevProps) {
    const { venueId, dispatchGetVenueInfo } = this.props

    const previousVenueId = prevProps.venueId
    const currentVenueId = venueId

    if (previousVenueId !== currentVenueId) {
      dispatchGetVenueInfo(currentVenueId)
    }
  }

  render() {
    console.log(this.props)
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
      <Wrapper>
        <div style={{ marginBottom: '1rem' }}>
          <Buttons>
            <FavoriteButton
              isFavorited={isFavorited}
              addFunction={dispatchAddFavorite}
              removeFunction={dispatchRemoveFavorite}
              addParams={{ venueId }}
              removeParams={{ venueId }}
            />
          </Buttons>

          <h1 className="title">{name}</h1>
        </div>

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
  venueHoursPending: PropTypes.bool.isRequired,
  venueHours: PropTypes.array, // eslint-disable-line
  venueId: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string),
  dispatchAddFavorite: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
  dispatchGetVenueInfo: PropTypes.func.isRequired,
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
  dispatchGetVenueInfo: venueId => dispatch(getVenueInfo(venueId)),
  dispatchAddFavorite: ({ venueId }) => dispatch(addFavorite(venueId)),
  dispatchRemoveFavorite: ({ venueId }) => dispatch(removeFavorite(venueId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiningVenue)
