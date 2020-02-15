import React from 'react'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, TABLET, PHONE } from '../../../styles/sizes'
import { BLACK, DARK_GRAY, WHITE } from '../../../styles/colors'
import { HOME_ROUTE } from '../../../constants/routes'

const VersionTag = s.span`
  margin-left: 0.5rem;
  border-radius: 25px;
  background-color: #60B8F2 !important;
  color: ${WHITE} !important;
  box-shadow: 0 0px 8px rgba(25, 89, 130, .4);
  transform: translateY(2px);

  ${maxWidth(PHONE)} {
    transform: translateY(8px);
  }
`

const LogoText = s.h1`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0 0.5rem;
  color: ${DARK_GRAY};
  display: inline-block;
  transform: translateY(5px);

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
  padding-top: 0rem;
  width: auto;
  vertical-align: top;
`

const Wrapper = s.div`
  display: inline-block;

  ${maxWidth(PHONE)} {
    padding-top: 8px;
  }
`

export default (): JSX.Element => (
  <Wrapper>
    <Link href={HOME_ROUTE}>
      <a style={{ height: LOGO_HEIGHT }}>
        <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo" />
      </a>
    </Link>

    <Link href={HOME_ROUTE}>
      <a>
        <LogoText>Penn Basics </LogoText>
      </a>
    </Link>

    <VersionTag className="tag is-rounded">v1.0</VersionTag>
  </Wrapper>
)
