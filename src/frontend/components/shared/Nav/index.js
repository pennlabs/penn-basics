import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

import { ALLBIRDS_GRAY, BLACK_ALPHA } from '../../../styles/colors'
import { minWidth, NAV_HEIGHT, PHONE, Z_INDEX } from '../../../styles/sizes'
import { getUserInfo } from '../../../actions/auth_actions'

import Links from './Links'
import Menu from './Menu'
import Logo from './Logo'
import Back from './Back'
import { Shade } from '../Shade'

const NavSpace = s.div`
  width: 100%;
  height: ${NAV_HEIGHT};
`

const Wrapper = s.nav`
  padding: 0 1rem;
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  display: flex;
  width: 100%;
  min-height: ${NAV_HEIGHT};
  z-index: ${Z_INDEX};
  position: fixed;
  top: 0;
  left: 0;
`

const StyledShade = s(Shade)`
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

// TODO replace imgur jawn with local jawn

const Nav = ({ dispatchGetUserInfo, userInfo }) => {
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
  }, [])

  return (
    <>
      <Wrapper className="navbar" id="navbar">
        <Back />
        <Logo />

        <Menu active={active} toggleActive={toggle} zIndex={Z_INDEX} />

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

const mapStateToProps = ({ authentication }) => authentication

const mapDispatchToProps = dispatch => ({
  dispatchGetUserInfo: () => dispatch(getUserInfo()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
