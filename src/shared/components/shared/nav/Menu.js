/* global document */
import React from 'react'
import Bars from './Bars'

// TODO shade thing

const Menu = () => {
  const toggle = () => {
    const sidebar = document.getElementById('sidebar')
    const shadow = document.getElementById('shade')
    shadow.classList.toggle('fade-in')
    sidebar.classList.toggle('active')
  }

  const handleKeyPress = event => {
    event.preventDefault()

    if (event.keyCode === 32) {
      toggle()
    }
  }

  const handleClick = event => {
    event.preventDefault()

    toggle()
  }

  // Shadow
  return (
    <>
      <Bars onClick={handleClick} onKeyPress={handleKeyPress} tabIndex={0} />
      <div id="shade" />
    </>
  )
}

export default Menu
