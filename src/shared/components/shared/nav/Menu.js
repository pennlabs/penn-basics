import React from 'react'
import PropTypes from 'prop-types'

import Bars from './Bars'

const Menu = ({ active, toggleActive }) => {
  const handleKeyPress = event => {
    event.preventDefault()

    if (event.keyCode === 32) {
      toggleActive(!active)
    }
  }

  return (
    <Bars
      handleClick={() => toggleActive(!active)}
      onKeyPress={handleKeyPress}
      tabIndex={0}
    />
  )
}

Menu.propTypes = {
  active: PropTypes.bool.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

export default Menu
