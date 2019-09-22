import React from 'react'
import { Link } from 'react-router-dom'
import s from 'styled-components'

import { BLACK, DARK_GRAY, ALLBIRDS_GRAY } from '../../../styles/colors'
import { maxWidth, TABLET, NAV_HEIGHT } from '../../../styles/sizes'

import Links from './Links'
import Menu from './Menu'

const Wrapper = s.nav`
  padding: 0 1rem;
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  display: flex;
  width: 100%;
  min-height: ${NAV_HEIGHT};
`

const LogoText = s.h1`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.7rem 0.5rem 0rem 0.5rem;
  color: ${DARK_GRAY};

  &:active,
  &:focus,
  &:hover {
    color: ${BLACK};
  }

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const Logo = s.img`
  height: 3.4rem;
  padding: 0.4rem 0 0.4rem 0rem;
  width: auto;
`

// TODO replace imgur jawn with local jawn

const Nav = () => (
  <Wrapper className="navbar" id="navbar">
    <Link to="/">
      <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo" />
    </Link>

    <Link to="/">
      <LogoText>Penn Basics</LogoText>
    </Link>

    <Menu />

    <Links />
  </Wrapper>
)

export default Nav
