import React from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from '../../../../../public/img/heart.svg'

const FavoriteButton = ({
  isFavorited,
  addFunction,
  removeFunction,
  addParams,
  removeParams,
}) => {
  if (isFavorited) {
    return (
      <span // eslint-disable-line
        className="button is-info"
        onClick={() => removeFunction(removeParams)}
      >
        <FavoriteIcon
          opacity="0.75"
          fill="white"
          style={{ transform: 'scale(0.75)' }}
        />
        &nbsp; Favorited
      </span>
    )
  }
  return (
    <span // eslint-disable-line
      className="button"
      onClick={() => addFunction(addParams)}
    >
      <FavoriteIcon opacity="0.75" style={{ transform: 'scale(0.75)' }} />
      &nbsp; Make Favorite
    </span>
  )
}

FavoriteButton.defaultProps = {
  isFavorited: null,
}

FavoriteButton.propTypes = {
  isFavorited: PropTypes.bool,
  addFunction: PropTypes.func.isRequired,
  removeFunction: PropTypes.func.isRequired,
  addParams: PropTypes.object, //eslint-disable-line
  removeParams: PropTypes.object, //eslint-disable-line
}

export default FavoriteButton
