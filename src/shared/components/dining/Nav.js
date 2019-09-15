import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import { Card, Scrollbar, Line, NavSectionHeader } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import DiningCard from './DiningCard'
import { WHITE, BABY_BLUE } from '../../styles/colors'
import { NAV_HEIGHT } from '../../styles/sizes'
import Favorites from './Favorites'

import venueData from '../../../server/database/venue_info.json'

class Nav extends Component {
  render() {
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

    const { favorites } = this.props

    return (
      <Scrollbar
        padding="0 0 .5rem 0"
        background={WHITE}
        overflowY="scroll"
        width="30%"
        borderRight
        height={`calc(100vh - ${NAV_HEIGHT})`}
      >
        <Favorites />

        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5">Dining</NavSectionHeader>
          <Line />
        </Card>

        {diningKeys.map(key => {
          const { name, image } = venueData[key]
          return (
            <DiningCard
              key={uuid()}
              venueId={key}
              name={name}
              image={image}
              isFavorited={favorites.includes(key)}
            />
          )
        })}

        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5">Retail</NavSectionHeader>
          <Line />
        </Card>

        {retailKeys.map(key => {
          const { name, image } = venueData[key]
          return (
            <DiningCard
              key={uuid()}
              venueId={key}
              name={name}
              image={image}
              isFavorited={favorites.includes(key)}
            />
          )
        })}

        <PennLabsCredit />
      </Scrollbar>
    )
  }
}

Nav.defaultProps = {
  favorites: [],
}

Nav.propTypes = {
  favorites: PropTypes.array,
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
