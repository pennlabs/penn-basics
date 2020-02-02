import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Scrollbar, NavHeaderCard } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE } from '../../styles/colors'
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
  const hideOnMobile =
    selectedVenueId !== undefined &&
    selectedVenueId !== null &&
    selectedVenueId !== ''

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
      <NavHeaderCard title="Favorites" />

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

      <NavHeaderCard title="Dining" />

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

      <NavHeaderCard title="Retail" />

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
  venueHours: {},
}

Nav.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  selectedVenueId: PropTypes.string,
  venueHours: PropTypes.shape({}),
}

const mapStateToProps = ({ dining }) => {
  const { favorites, venueHours } = dining

  return {
    favorites,
    venueHours,
  }
}

export default connect(mapStateToProps, null)(Nav)
