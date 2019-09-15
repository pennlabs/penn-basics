import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

import DiningCard from './DiningCard'
import { Card, Line, NavSectionHeader } from '../shared'
import { BABY_BLUE } from '../../styles/colors'

const Favorites = props => {
  const { favorites } = props

  if (!favorites || !favorites.length) return null

  return (
    <div>
      <Card background={BABY_BLUE} padding="0">
        <NavSectionHeader className="title is-5">Favorites</NavSectionHeader>
        <Line />
      </Card>

      {favorites.map(id => {
        return <DiningCard key={uuid()} venueId={id} />
      })}
    </div>
  )
}

Favorites.defaultProps = {
  favorites: [],
}

Favorites.propTypes = {
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
)(Favorites)
