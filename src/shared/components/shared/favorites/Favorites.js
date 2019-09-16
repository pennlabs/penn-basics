import React from 'react'
import PropTypes from 'prop-types'

import { Card, Line, NavSectionHeader } from '..'
import { BABY_BLUE } from '../../../styles/colors'

// favorites: the array that includes all favorited elements
// favoriteCard: a functional component that takes in a favorited element and render the card
// inputName: name of the input that will be passed to FavoriteCard
const Favorites = ({ favorites, FavoriteCard, inputName }) => {
  if (!favorites || !favorites.length) return null

  return (
    <div>
      <Card background={BABY_BLUE} padding="0">
        <NavSectionHeader className="title is-5">Favorites</NavSectionHeader>
        <Line />
      </Card>

      {favorites.map(favorite => {
        // allow dynamic props name to be passed
        const dynamicProps = {}
        dynamicProps[inputName] = favorite
        return <FavoriteCard {...dynamicProps} />
      })}
    </div>
  )
}

Favorites.defaultProps = {
  favorites: [],
  inputName: '',
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  FavoriteCard: PropTypes.func.isRequired,
  inputName: PropTypes.string,
}

export default Favorites
