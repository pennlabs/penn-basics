import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import s from 'styled-components'

import { maxWidth, PHONE, NAV_HEIGHT } from '../../../styles/sizes'
import { WHITE, BORDER, DARK_GRAY } from '../../../styles/colors'
import UserSVG from '../../../../../public/img/user.svg'

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
const StyledLink = s(Link)`
  color: ${DARK_GRAY} !important;
`

const AuthLink = withRouter(({ userInfo, location }) => {
  if (!userInfo) return null
  const { loggedIn } = userInfo
  if (!loggedIn) {
    return (
      <a
        href={`/api/auth/authenticate?successRedirect=${location.pathname}&failureRedirect=${location.pathname}`}
      >
        Login
      </a>
    )
  }
  return (
    <StyledLink to="/profile" style={{ marginLeft: '1.5rem' }}>
      <UserSVG
        style={{
          transform: 'scale(0.8) translateY(6px)',
          marginRight: '0.5em',
        }}
      />
      {userInfo.fullName}
    </StyledLink>
  )
})

const Links = ({ active, zIndex, userInfo, toggleActive }) => (
  <LinksDiv active={active} zIndex={zIndex}>
    <Link to="/dining" onClick={() => toggleActive(false)}>
      Dining
    </Link>
    <Link to="/foodtrucks" onClick={() => toggleActive(false)}>
      Foodtrucks
    </Link>
    <Link to="/laundry" onClick={() => toggleActive(false)}>
      Laundry
    </Link>
    <Link to="/studyspaces" onClick={() => toggleActive(false)}>
      Studyspaces
    </Link>
    <AuthLink userInfo={userInfo} />
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

Links.propTypes = {
  active: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
}

export default Links
