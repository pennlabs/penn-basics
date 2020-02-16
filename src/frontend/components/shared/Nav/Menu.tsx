import React from 'react'
import Bars from './Bars'

interface IMenuProps {
  active: boolean
  toggleActive: (active: boolean) => void
}

const Menu = ({ active, toggleActive }: IMenuProps): React.ReactElement => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault()

    if (event.keyCode === 32) {
      toggleActive(!active)
    }
  }

  return (
    <Bars
      handleClick={(): void => toggleActive(!active)}
      onKeyPress={handleKeyPress}
    />
  )
}

export default Menu
