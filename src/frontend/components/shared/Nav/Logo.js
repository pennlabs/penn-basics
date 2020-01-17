import React from 'react'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, TABLET } from '../../../styles/sizes'
import { BLACK, DARK_GRAY, WHITE } from '../../../styles/colors'

const BetaTag = s.span`
  margin-left: 0.5rem;
  border-radius: 25px;
  background-color: #60B8F2 !important;
  color: ${WHITE} !important;
  margin-top: 15px;
  box-shadow: 0 0px 8px rgba(25, 89, 130, .4);
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

export default () => (
  <>
    <Link href="/">
      <a>
        <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo" />
      </a>
    </Link>

    <Link href="/">
      <a>
        <LogoText>Penn Basics </LogoText>
      </a>
    </Link>

    <BetaTag className="tag is-rounded">Beta</BetaTag>
  </>
)
