import React from 'react'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, TABLET, PHONE } from '../../../styles/sizes'
import { BLACK, DARK_GRAY, WHITE } from '../../../styles/colors'

const BetaTag = s.span`
  margin-left: 0.5rem;
  border-radius: 25px;
  background-color: #60B8F2 !important;
  color: ${WHITE} !important;
  box-shadow: 0 0px 8px rgba(25, 89, 130, .4);
`

const LogoText = s.h1`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0 0.5rem;
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

const LOGO_HEIGHT = '2.5rem'

const Logo = s.img`
  height: ${LOGO_HEIGHT};
  padding-right: 0.4rem;
  width: auto;
`

const Wrapper = s.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${maxWidth(PHONE)} {
    padding-top: 8px;
  }
`

export default () => (
  <Wrapper>
    <Link href="/">
      <a style={{ height: LOGO_HEIGHT }}>
        <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo" />
      </a>
    </Link>

    <Link href="/">
      <a>
        <LogoText>Penn Basics </LogoText>
      </a>
    </Link>

    <BetaTag className="tag is-rounded">Beta</BetaTag>
  </Wrapper>
)
