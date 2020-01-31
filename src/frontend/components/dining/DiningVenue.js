import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import venueData from '../../../server/resources/dining/venue_info.json'
import { addFavorite, removeFavorite } from '../../actions/dining_actions'
import DiningOverview from './DiningOverview'
import NotFound from '../shared/NotFound'
import Loading from '../shared/Loading'
import FavoriteButton from '../shared/favorites/FavoriteButton'
import { NoData, Title } from '../shared'
import { maxWidth, PHONE } from '../../styles/sizes'

const DiningHeader = s.div`
  padding-bottom: 0;

  ${maxWidth(PHONE)} {
    padding: 0.64rem;
  }
`

const Buttons = s.div`
  float: right;

  ${maxWidth(PHONE)} {
    float: none;
    width: 100%;
    margin-bottom: 1rem;

    .button {
      width: 100%;
    }
  }
`

const Wrapper = s.div`
  padding: 1rem;

  ${maxWidth(PHONE)} {
    padding: 0;
  }
`

const DiningVenue = ({
  favorites,
  venueId,
  venueHoursPending,
  dispatchAddFavorite,
  dispatchRemoveFavorite,
}) => {
  if (!venueId) {
    return (
      <NoData
        image="/img/dining.png"
        imageAlt="Dining plate"
        text="Select a dining hall to see information"
      />
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
        <Loading padding="40vh 0" />
      </Wrapper>
    )
  }

  const { name } = venueData[venueId]
  const isFavorited = favorites.includes(venueId)

  return (
    <Wrapper>
      <DiningHeader>
        <Title>{name}</Title>
        <Buttons>
          <FavoriteButton
            isFavorited={isFavorited}
            addFunction={dispatchAddFavorite}
            removeFunction={dispatchRemoveFavorite}
            addParams={{ venueId }}
            removeParams={{ venueId }}
          />
        </Buttons>
      </DiningHeader>

      <DiningOverview id={venueId} />
    </Wrapper>
  )
}

DiningVenue.defaultProps = {
  venueId: null,
  favorites: [],
}

DiningVenue.propTypes = {
  venueHoursPending: PropTypes.bool.isRequired,
  venueId: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string),
  dispatchAddFavorite: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
}

const mapStateToProps = ({ dining }) => {
  const { venueHoursPending, favorites } = dining

  return {
    venueHoursPending,
    favorites,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: ({ venueId }) => dispatch(addFavorite(venueId)),
  dispatchRemoveFavorite: ({ venueId }) => dispatch(removeFavorite(venueId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue)
