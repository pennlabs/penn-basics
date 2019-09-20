import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Scrollbar, Line, NavSectionHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import Favorites from '../shared/favorites/Favorites'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueData from '../../../server/database/venue_info.json'

const Nav = ({ favorites }) => {
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
      />

      <Card background={BABY_BLUE} padding="0">
        <NavSectionHeader className="title is-5">Dining</NavSectionHeader>
        <Line />
      </Card>

      {diningKeys.map(key => {
        return (
          <DiningCard
            key={uuid()}
            venueId={key}
            isFavorited={favorites.includes(key)}
          />
        )
      })}

      <Card background={BABY_BLUE} padding="0">
        <NavSectionHeader className="title is-5">Retail</NavSectionHeader>
        <Line />
      </Card>

      {retailKeys.map(key => {
        return (
          <DiningCard
            key={uuid()}
            venueId={key}
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
}

Nav.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
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
