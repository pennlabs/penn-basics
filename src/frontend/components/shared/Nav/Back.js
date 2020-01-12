/* globals window */

import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import Link from 'next/link'

import { BLACK } from '../../../styles/colors'
import Chevron from '../../../../../public/img/chevron-left.svg'
import { minWidth, TABLET } from '../../../styles/sizes'

const Wrapper = s.div`
  opacity: 0.5;
  padding-top: 1rem;
  padding-right: 0.75rem;
  margin-left: -0.5rem;
  cursor: pointer;

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
    setRoute(window.location.pathname)
  })

  if (!route || route === '/') return null

  const lastIdx = route.lastIndexOf('/')
  const to = route.substring(0, lastIdx) || '/'

  return (
    <Wrapper>
      <Link href={to} style={{ color: BLACK }}>
        <Chevron style={{ transform: 'scale(1.4)' }} />
      </Link>
    </Wrapper>
  )
}

export default Back
