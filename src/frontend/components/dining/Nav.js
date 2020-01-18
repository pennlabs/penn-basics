import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Scrollbar, Line, NavHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'

import venueData from '../../../server/resources/dining/venue_info.json'

const Nav = ({ favorites, selectedVenueId, venueHours }) => {
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

  // If a venue is selected, hide the scrollbar on mobile
  const hideOnMobile = selectedVenueId !== undefined && selectedVenueId !== null

  return (
    <Scrollbar
      padding="0 0 .5rem 0"
      background={WHITE}
      overflowY="scroll"
      sm={12}
      md={4}
      borderRight
      height={`calc(100vh - ${NAV_HEIGHT})`}
      hideOnMobile={hideOnMobile}
    >
      <Card background={BABY_BLUE} padding="0">
        <NavHeader className="title is-5">Favorites</NavHeader>
        <Line />
      </Card>

      {favorites.map(key => {
        return (
          <DiningCard
            key={uuid()}
            venueId={key}
            selected={selectedVenueId === key}
            isFavorited={false}
            venueHours={venueHours}
          />
        )
      })}

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
            venueHours={venueHours}
          />
        )
      })}

      <Card background={BABY_BLUE} padding="0">
        <NavHeader className="title is-5">Retail</NavHeader>
        <Line />
      </Card>

      {retailKeys.map(key => (
        <DiningCard
          key={uuid()}
          venueId={key}
          selected={selectedVenueId === key}
          isFavorited={favorites.includes(key)}
          venueHours={venueHours}
        />
      ))}

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
  const { favorites, venueHours } = dining

  return {
    favorites,
    venueHours,
  }
}

export default connect(mapStateToProps, null)(Nav)
