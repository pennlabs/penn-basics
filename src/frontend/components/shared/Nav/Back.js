/* globals window */

import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import Link from 'next/link'

import { BLACK } from '../../../styles/colors'
import Chevron from '../../../../../public/img/chevron-left.svg'
import { minWidth, TABLET } from '../../../styles/sizes'

const Wrapper = s.div`
  vertical-align: top;
  opacity: 0.5;
  padding-top: 1rem;
  padding-right: 0.75rem;
  margin-left: -0.5rem;
  cursor: pointer;
  display: inline-block;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }

  ${minWidth(TABLET)} {
    display: none !important;
  }
`

const Back = () => {
  const [route, setRoute] = useState(null)

  useEffect(() => {
    const { pathname } = window.location
    setRoute(pathname)
  })

  if (!route || route === '/') return null

  const lastIdx = route.lastIndexOf('/')
  const to = route.substring(0, lastIdx) || '/'

  return (
    <Wrapper>
      <Link href={to}>
        <a>
          <Chevron style={{ transform: 'scale(1.4)', color: BLACK }} />
        </a>
      </Link>
    </Wrapper>
  )
}

export default Back
