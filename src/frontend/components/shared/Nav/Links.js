import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import s from 'styled-components'

import { maxWidth, PHONE } from '../../../styles/sizes'

const LinksDiv = s.div`
  margin-left: auto;
  
  a {
    margin-left: 1.5rem;
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    z-index: ${({ zIndex }) => zIndex + 1};
    padding: 0;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 200ms ease, opacity 200ms ease;
    
    a {
      font-size: 120%;
      margin-left: 0;
      display: block;
      width: auto;
      margin: 1rem;
    }

    ${({ active }) => active && `max-height: 150px; opacity: 1;`}
  }
`

const Links = ({ active, zIndex, toggleActive }) => (
  <LinksDiv active={active} zIndex={zIndex}>
    <Link href="/dining">
      <a onClick={() => toggleActive(false)}>Dining</a>
    </Link>
    <Link href="/laundry">
      <a onClick={() => toggleActive(false)}>Laundry</a>
    </Link>
    <Link href="/studyspaces">
      <a onClick={() => toggleActive(false)}>Studyspaces</a>
    </Link>
  </LinksDiv>
)

Links.propTypes = {
  active: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
  toggleActive: PropTypes.func.isRequired,
}

Links.defaultProps = {
  active: false,
}

export default Links
