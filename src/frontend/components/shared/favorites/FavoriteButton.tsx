import React from 'react'

import FavoriteIcon from '../../../../../public/img/heart.svg'
import { Button } from '../Button'

type IAddFunctionProps = Record<string, any>
type IRemoveFunctionProps = Record<string, any>

interface IFavoriteButtonProps {
  isFavorited: boolean
  addFunction: (props: IAddFunctionProps) => void
  removeFunction: (props: IRemoveFunctionProps) => void

  /**
   * These are passed as props to the addFunction when the button is clicked
   * and is not yet favorited
   */
  addParams: IAddFunctionProps

  /**
   * These are passed as props to the removeFunction when the button is clicked
   * and is already favorited
   */
  removeParams: IRemoveFunctionProps
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
          style={{ transform: 'scale(0.75)', opacity: '0.75', fill: 'white' }}
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
