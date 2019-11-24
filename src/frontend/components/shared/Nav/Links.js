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

const Links = ({ active, zIndex, userInfo }) => {
  return (
    <LinksDiv active={active} zIndex={zIndex}>
      <Link to="/dining">Dining</Link>
      <Link to="/foodtrucks">Foodtrucks</Link>
      <Link to="/laundry">Laundry</Link>
      <Link to="/studyspaces">Studyspaces</Link>
      <AuthLink userInfo={userInfo} />
    </LinksDiv>
  )
}

Links.defaultProps = {
  active: false,
}

Links.propTypes = {
  active: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
}

export default Links
