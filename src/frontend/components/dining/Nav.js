import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Scrollbar, Line, NavHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import Favorites from '../shared/favorites/Favorites'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueData from '../../../server/resources/dining/venue_info.json'

const Nav = ({ favorites, selectedVenueId }) => {
  const keys = Object.keys(venueData)
  const diningKeys = []
  const retailKeys = []

  keys.forEach(key => {
    const data = venueData[key]
    if (data.isRetail) {
      retailKeys.push(key)
    } else {
      diningKeys.push(key)
    }
  })

  diningKeys.sort((keyA, keyB) => {
    const { name: nameA } = venueData[keyA]
    const { name: nameB } = venueData[keyB]
    return nameA.localeCompare(nameB)
  })

  return (
    <Scrollbar
      padding="0 0 .5rem 0"
      background={WHITE}
      overflowY="scroll"
      width="30%"
      borderRight
      height={`calc(100vh - ${NAV_HEIGHT})`}
    >
      <Favorites
        favorites={favorites}
        FavoriteCard={DiningCard}
        inputName="venueId"
        keyAttributeName="venueId"
      />

      <Card background={BABY_BLUE} padding="0">
        <NavHeader className="title is-5">Dining</NavHeader>
        <Line />
      </Card>

      {diningKeys.map(key => {
        return (
          <DiningCard
            key={uuid()}
            venueId={key}
            selected={selectedVenueId === key}
            isFavorited={favorites.includes(key)}
          />
        )
      })}

      <Card background={BABY_BLUE} padding="0">
        <NavHeader className="title is-5">Retail</NavHeader>
        <Line />
      </Card>

      {retailKeys.map(key => {
        return (
          <DiningCard
            key={uuid()}
            venueId={key}
            selected={selectedVenueId === key}
            isFavorited={favorites.includes(key)}
          />
        )
      })}

      <PennLabsCredit />
    </Scrollbar>
  )
}

Nav.defaultProps = {
  favorites: [],
  selectedVenueId: null,
}

Nav.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  selectedVenueId: PropTypes.string,
}

const mapStateToProps = ({ dining }) => {
  const { favorites } = dining

  return {
    favorites,
  }
}

export default connect(
  mapStateToProps,
  null
)(Nav)
