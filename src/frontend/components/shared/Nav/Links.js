import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
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
    padding: 1rem 1rem 0 1rem;
    border-bottom: 1px solid ${BORDER};
    z-index: ${({ zIndex }) => zIndex + 1};

    a {
      font-size: 120%;
      margin-left: 0;
      display: block;
      width: auto;
      margin-bottom: 1rem;
    }

    ${({ active }) => !active && `display: none;`}
  }
`

const Links = ({ active, zIndex, location }) => {
  // TODO: change these redirects to use the current route
  const failureRedirect = '/'
  return (
    <LinksDiv active={active} zIndex={zIndex}>
      <Link to="/dining">Dining</Link>
      <Link to="/foodtrucks">Foodtrucks</Link>
      <Link to="/laundry">Laundry</Link>
      <Link to="/studyspaces">Studyspaces</Link>
      <a
        href={`/api/auth/authenticate?successRedirect=${location.pathname}&failureRedirect=${failureRedirect}`}
      >
        Login
      </a>
    </LinksDiv>
  )
}

Links.defaultProps = {
  active: false,
}

Links.propTypes = {
  active: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
  location: PropTypes.shape.isRequired,
}

export default withRouter(Links)
