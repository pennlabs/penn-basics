import React from 'react'

import FavoriteIcon from '../../../../../public/img/heart.svg'
import { Button } from '../Button'

interface IFavoriteButtonProps {
  isFavorited: boolean
  addFunction: ({ venueId } : { venueId: string }) => void
  removeFunction: ({ venueId } : { venueId: string }) => void
  addParams: { venueId: string}
  removeParams: { venueId: string }
}

const FavoriteButton = ({
  isFavorited,
  addFunction,
  removeFunction,
  addParams,
  removeParams,
}: IFavoriteButtonProps) => {
  if (isFavorited) {
    return (
      <Button className="is-info" onClick={() => removeFunction(removeParams)}>
        <FavoriteIcon
          // opacity="0.75"
          // fill="white"
          style={{ transform: 'scale(0.75)', opacity: '0.75', fill:'white' }}
        />
        &nbsp; Favorited
      </Button>
    )
  }
  return (
    <Button isInfo onClick={() => addFunction(addParams)}>
      <FavoriteIcon style={{ transform: 'scale(0.75)', opacity: '0.75' }} />
      &nbsp; Make Favorite
    </Button>
  )
}

export default FavoriteButton
