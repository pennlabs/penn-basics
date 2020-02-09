/* globals window */

import React, { useEffect, useState } from 'react'
import { withRouter, Router } from 'next/router'
import s from 'styled-components'
import Link from 'next/link'
import Chevron from '../../../../../public/img/chevron-left.svg'
import { BLACK } from '../../../styles/colors'
import { minWidth, TABLET } from '../../../styles/sizes'

const Wrapper = s.div<{}>`
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

interface IBackProps {
  router: Router
}

const Back = ({ router }: IBackProps): React.ReactElement => {
  const [route, setRoute] = useState<string>('')

  useEffect(() => {
    const { asPath } = router
    setRoute(asPath)
  })

  if (!route || route === '/') return <React.Fragment />

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

export default withRouter(Back)
