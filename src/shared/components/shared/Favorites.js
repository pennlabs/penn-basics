import React from 'react'
import PropTypes from 'prop-types'

import { Card, Line, NavSectionHeader } from './'
import { BABY_BLUE } from '../../styles/colors'

export const Favorites = props => {
  // favorites: the array that includes all favorited elements
  // favoriteCard: a functional component that takes in a favorited element and render the card
  const { favorites, favoriteCard } = props

  if (!favorites || !favorites.length) return null

  return (
    <div>
      <Card background={BABY_BLUE} padding="0">
        <NavSectionHeader className="title is-5">Favorites</NavSectionHeader>
        <Line />
      </Card>

      {favorites.map(favorite => {
        return favoriteCard(favorite)
      })}
    </div>
  )
}

Favorites.defaultProps = {
  favorites: null,
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  favoriteCard: PropTypes.func.isRequired,
}
