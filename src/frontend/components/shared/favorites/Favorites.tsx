import React from 'react'
import PropTypes from 'prop-types'

import { Line } from '../Line'
import { Card } from '../Card'
import { NavHeader } from '../Typography'
import { BABY_BLUE } from '../../../styles/colors'

// TODO we can't use UUID here--should supply ID as a prop

// favorites: the array that includes all favorited elements
// favoriteCard: a functional component that takes in a favorited element and render the card
// inputName: name of the input that will be passed to FavoriteCard
const Favorites = ({
  favorites,
  FavoriteCard,
  inputName,
  keyAttributeName,
}) => {
  if (!favorites || !favorites.length) return null

  console.log(favorites)

  return (
    <>
      <Card background={BABY_BLUE} padding="0">
        <NavHeader className="title is-5">Favorites</NavHeader>
        <Line />
      </Card>

      {favorites.map(favorite => {
        // allow dynamic props name to be passed
        const dynamicProps = {}
        dynamicProps[inputName] = favorite
        return (
          <FavoriteCard
            key={`favorite-${favorite[keyAttributeName]}`}
            {...dynamicProps}
          />
        )
      })}
    </>
  )
}

Favorites.defaultProps = {
  favorites: [],
}

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string),
  FavoriteCard: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  keyAttributeName: PropTypes.string.isRequired,
}

export default Favorites
