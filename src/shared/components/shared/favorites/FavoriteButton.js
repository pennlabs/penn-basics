import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

const FavoriteIcon = s.i`
  opacity: 0.75;
`

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
        <FavoriteIcon className="fa fa-heart" />
        &nbsp; Favorited
      </span>
    )
  }
  return (
    <span // eslint-disable-line
      className="button"
      onClick={() => addFunction(addParams)}
    >
      <FavoriteIcon className="far fa-heart" />
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
