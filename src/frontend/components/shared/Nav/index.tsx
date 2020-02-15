import React, { useState, useEffect, Dispatch } from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

import { BLACK_ALPHA, BORDER, WHITE } from '../../../styles/colors'
import {
  minWidth,
  NAV_HEIGHT,
  PHONE,
  Z_INDEX,
  maxWidth,
} from '../../../styles/sizes'
import { getUserInfo } from '../../../actions/auth_actions'

import Links from './Links'
import Menu from './Menu'
import Logo from './Logo'
import Back from './Back'
import { Shade } from '../Shade'
import { IUserInfo } from '../../../../types/profile'

/**
 * Navbar is fixed position and thus takes up no height as far as other elements
 * are concerned.
 *
 * This is a relative-positioned block which is the same size as the navbar at
 * top of the page to push content down to the right position.
 */
const NavSpace = s.div`
  width: 100%;
  height: calc(${NAV_HEIGHT});
`

const Wrapper = s.nav`
  padding: 0 1rem;
  border-bottom: 1px solid ${BORDER};
  display: flex;
  width: 100%;
  min-height: ${NAV_HEIGHT};
  z-index: ${Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
  background: ${WHITE};
  display: flex;
  align-items: center;

  ${maxWidth(PHONE)} {
    display: block;
  }
`

const StyledShade = s(Shade)<{ zIndex: number }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: ${BLACK_ALPHA(0.5)};
  z-index: ${({ zIndex }) => zIndex - 1};

  ${minWidth(PHONE)} {
    display: none;
  }
`

export interface IOwnProps {}

interface IStateProps {
  userInfo?: IUserInfo
}

interface IDispatchProps {
  dispatchGetUserInfo: () => void
}

type Props = IStateProps & IDispatchProps & IOwnProps

const Nav = ({ dispatchGetUserInfo, userInfo }: Props) => {
  const [isNewlyMounted, setIsNewlyMounted] = useState(true)
  const [active, toggleActive] = useState(false)

  const toggle = () => {
    if (isNewlyMounted) {
      setIsNewlyMounted(false)
    }
    toggleActive(!active)
  }

  useEffect(() => {
    dispatchGetUserInfo()
  }, [dispatchGetUserInfo])

  return (
    <>
      <Wrapper id="navbar">
        <Back />
        <Logo />

        <Menu active={active} toggleActive={toggle} />

        <Links
          active={active}
          zIndex={Z_INDEX}
          toggleActive={toggle}
          userInfo={userInfo}
        />
      </Wrapper>

      <StyledShade
        show={active}
        isNewlyMounted={isNewlyMounted}
        zIndex={Z_INDEX}
        onClick={toggle}
      />
      <NavSpace />
    </>
  )
}


const mapStateToProps = ({ authentication }: { authentication: IUserInfo }) => authentication

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatchGetUserInfo: () => dispatch(getUserInfo()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
