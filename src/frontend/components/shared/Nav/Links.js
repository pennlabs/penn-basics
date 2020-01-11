import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import s from 'styled-components'
import { maxWidth, PHONE, NAV_HEIGHT } from '../../../styles/sizes'
import { WHITE, BORDER } from '../../../styles/colors'

const LinksDiv = s.div`
  margin-left: auto;
  padding-top: 14px;

  a {
    margin-left: 1.5rem;
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    background: ${WHITE};
    position: absolute;
    top: ${NAV_HEIGHT};
    left: 0;
    border-bottom: 1px solid ${BORDER};
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
    <Link href="/dining" onClick={() => toggleActive(false)}>
      Dining
    </Link>
    <Link href="/laundry" onClick={() => toggleActive(false)}>
      Laundry
    </Link>
    <Link href="/studyspaces" onClick={() => toggleActive(false)}>
      Studyspaces
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
