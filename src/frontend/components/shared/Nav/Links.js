import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, PHONE } from '../../../styles/sizes'
import { DARK_GRAY } from '../../../styles/colors'
import UserSVG from '../../../../../public/img/user.svg'

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
const StyledLink = s.a`
  color: ${DARK_GRAY} !important;
`

const AuthLink = withRouter(({ userInfo, router }) => {
  if (!userInfo) return null
  const { loggedIn } = userInfo
  console.log(router.pathname)
  if (!loggedIn) {
    return (
      <a
        href={`/api/auth/authenticate?successRedirect=${router.pathname}&failureRedirect=${router.pathname}`}
      >
        Login
      </a>
    )
  }
  return (
    <Link href="/profile">
      <StyledLink style={{ marginLeft: '1.5rem' }}>
        <UserSVG
          style={{
            transform: 'scale(0.8) translateY(6px)',
            marginRight: '0.5em',
          }}
        />
        {userInfo.fullName}
      </StyledLink>
    </Link>
  )
})

const Links = ({ active, zIndex, userInfo, toggleActive }) => (
  <LinksDiv active={active} zIndex={zIndex}>
    <Link href="/dining">
      <a onClick={() => toggleActive(false)}>Dining</a>
    </Link>
    <Link href="/foodtrucks">
      <a onClick={() => toggleActive(false)}> Foodtrucks </a>
    </Link>
    <Link href="/laundry">
      <a onClick={() => toggleActive(false)}>Laundry</a>
    </Link>
    <Link href="/studyspaces">
      <a onClick={() => toggleActive(false)}>Studyspaces</a>
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
