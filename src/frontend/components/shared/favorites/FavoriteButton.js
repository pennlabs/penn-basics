import React from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from '../../../../../public/img/heart.svg'
import { Button } from '../Button'

const FavoriteButton = ({
  isFavorited,
  addFunction,
  removeFunction,
  addParams,
  removeParams,
}) => {
  if (isFavorited) {
    return (
      <Button className="is-info" onClick={() => removeFunction(removeParams)}>
        <FavoriteIcon
          opacity="0.75"
          fill="white"
          style={{ transform: 'scale(0.75)' }}
        />
        &nbsp; Favorited
      </Button>
    )
  }
  return (
    <Button isInfo onClick={() => addFunction(addParams)}>
      <FavoriteIcon opacity="0.75" style={{ transform: 'scale(0.75)' }} />
      &nbsp; Make Favorite
    </Button>
  )
}

FavoriteButton.defaultProps = {
  isFavorited: null,
}

// TODO more precise prop types
FavoriteButton.propTypes = {
  isFavorited: PropTypes.bool,
  addFunction: PropTypes.func.isRequired,
  removeFunction: PropTypes.func.isRequired,
  addParams: PropTypes.object, // eslint-disable-line
  removeParams: PropTypes.object, // eslint-disable-line
}

export default FavoriteButton
