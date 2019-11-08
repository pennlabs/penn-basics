import React, { useState } from 'react'
import s from 'styled-components'

import { ALLBIRDS_GRAY, BLACK_ALPHA } from '../../../styles/colors'
import { minWidth, NAV_HEIGHT, PHONE } from '../../../styles/sizes'

import Links from './Links'
import Menu from './Menu'
import Logo from './Logo'
import Back from './Back'

const Z_INDEX = 1300

const NavSpace = s.div`
  width: 100%;
  height: ${NAV_HEIGHT};
`

const Wrapper = s.nav`
  padding: 0 1rem;
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  display: flex;
  width: 100%;
  min-height: ${NAV_HEIGHT};
  z-index: ${Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
`

const Shade = s.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: ${BLACK_ALPHA(0.5)};
  z-index: ${({ zIndex }) => zIndex - 1};

  ${minWidth(PHONE)} {
    display: none;
  }
`

const Nav = () => {
  const [active, toggleActive] = useState(false)

  const showBackButton = true

  return (
    <>
      <Wrapper className="navbar" id="navbar">
        {showBackButton && <Back />}

        <Logo />

        <Menu active={active} toggleActive={toggleActive} zIndex={Z_INDEX} />

        <Links active={active} zIndex={Z_INDEX} />
      </Wrapper>
      {active && (
        <Shade zIndex={Z_INDEX} onClick={() => toggleActive(!active)} />
      )}
      <NavSpace />
    </>
  )
}

export default Nav
