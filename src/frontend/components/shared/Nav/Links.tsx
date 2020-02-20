import React from 'react'
import { withRouter } from 'next/router'
import s from 'styled-components'
import Link from 'next/link'

import { maxWidth, PHONE } from '../../../styles/sizes'
import { DARK_GRAY } from '../../../styles/colors'
import UserSVG from '../../../../../public/img/user.svg'
import {
  DINING_ROUTE,
  FOODTRUCKS_ROUTE,
  LAUNDRY_HALLS_ROUTE,
  STUDYSPACES_ROUTE,
  getApiAuthRouteWithRedirectParams,
  PROFILE_ROUTE,
} from '../../../constants/routes'
import { IUser } from '../../../../types/authentication'

const MOBILE_ACTIVE_NAV_HEIGHT = '250px'

const LinksDiv = s.div<{ zIndex: number; active: boolean }>`
  margin-left: auto;
  
  a {
    margin-left: 1.5rem;
  }

  ${maxWidth(PHONE)} {
    width: 100%;
    z-index: ${({ zIndex }): number => zIndex + 1};
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

    ${({ active }): string =>
      active ? `max-height: ${MOBILE_ACTIVE_NAV_HEIGHT}; opacity: 1;` : ''}
  }
`
const StyledLink = s.a`
  color: ${DARK_GRAY} !important;
`

interface IAuthLinkProps {
  userInfo?: IUser
  router: any
}

const AuthLink = withRouter(({ userInfo, router }: IAuthLinkProps) => {
  if (!userInfo) {
    return null
  }
  const { loggedIn, fullName } = userInfo

  if (!loggedIn) {
    const { pathname } = router
    return <a href={getApiAuthRouteWithRedirectParams(pathname)}>Login</a>
  }

  return (
    <Link href={PROFILE_ROUTE}>
      <StyledLink>
        <UserSVG
          style={{
            transform: 'scale(0.8) translateY(6px)',
            marginRight: '0.5em',
          }}
        />
        {fullName}
      </StyledLink>
    </Link>
  )
})

interface ILinksProps {
  active: boolean
  zIndex: number
  userInfo?: IUser
  toggleActive: (arg0: boolean) => void
}

const Links = ({
  active,
  zIndex,
  userInfo,
  toggleActive,
}: ILinksProps): React.ReactElement => (
  <LinksDiv active={active} zIndex={zIndex}>
    <Link href={DINING_ROUTE}>
      <a onClick={(): void => toggleActive(false)}>Dining</a>
    </Link>
    <Link href={FOODTRUCKS_ROUTE}>
      <a onClick={(): void => toggleActive(false)}>Foodtrucks</a>
    </Link>
    <Link href={LAUNDRY_HALLS_ROUTE}>
      <a onClick={(): void => toggleActive(false)}>Laundry</a>
    </Link>
    <Link href={STUDYSPACES_ROUTE}>
      <a onClick={(): void => toggleActive(false)}>Studyspaces</a>
    </Link>
    <AuthLink userInfo={userInfo} />
  </LinksDiv>
)

export default Links
