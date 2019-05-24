import React from 'react';
import { Link } from 'react-router-dom';
import s from 'styled-components'

import {
  BLACK,
  DARK_GRAY,
  ALLBIRDS_GRAY,
} from '../../../styles/colors'

import Links from './Links';
import Menu from './Menu';

const Wrapper = s.nav`
  padding: 0 0.5rem;
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  display: flex;
`

const LogoText = s.h1`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.7rem 0.5rem 0.7rem 3.2rem;
  color: ${DARK_GRAY};

  &:active,
  &:focus,
  &:hover {
    color: ${BLACK};
  }
`

const Logo = s.img`
  display: inline-block;
  height: 3.4rem;
  padding: 0.4rem 0 0.4rem 0.5rem;
  width: auto;
  position: absolute;
  top: 0;
`

// TODO replace imgur jawn with local jawn

const Nav = () => (
  <Wrapper className="navbar" id="navbar">
    <Menu />

    <Link to="/" className="logo">
      <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo"/>
      <LogoText>
        Penn Basics
      </LogoText>
    </Link>

    <Links />
  </Wrapper>
);

export default Nav;
