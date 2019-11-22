import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import s from 'styled-components'
import { connect } from 'react-redux'

import pjson from '../../../../../package.json'
import {
  BLACK,
  DARK_GRAY,
  ALLBIRDS_GRAY,
  BLACK_ALPHA,
  WHITE,
} from '../../../styles/colors'
import {
  maxWidth,
  minWidth,
  TABLET,
  NAV_HEIGHT,
  PHONE,
} from '../../../styles/sizes'
import { getUserInfo } from '../../../actions/auth_actions'

import Links from './Links'
import Menu from './Menu'

const Z_INDEX = 1300

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

const LogoText = s.h1`
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.7rem 0.5rem 0rem 0.5rem;
  color: ${DARK_GRAY};

  &:active,
  &:focus,
  &:hover {
    color: ${BLACK};
  }

  ${maxWidth(TABLET)} {
    display: none;
  }
`

const Logo = s.img`
  height: 3.4rem;
  padding: 0.4rem 0 0.4rem 0rem;
  width: auto;
`

const Shade = s.div`
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

const BetaTag = s.span`
  margin-left: 3px;
  border-radius: 25px;
  background-color: #60B8F2 !important;
  color: ${WHITE} !important;
  margin-top: 15px;
  box-shadow: 0 0px 8px rgba(25, 89, 130, .4);
`

// TODO replace imgur jawn with local jawn

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }

    const { dispatchGetUserInfo } = this.props
    dispatchGetUserInfo()
  }

  render() {
    const { active } = this.state
    const { userInfo } = this.props

    return (
      <>
        <Wrapper className="navbar" id="navbar">
          <Link to="/">
            <Logo src="https://i.imgur.com/JhifMZc.png" alt="logo" />
          </Link>

          <Link to="/">
            <LogoText>Penn Basics </LogoText>
          </Link>

          <BetaTag className="tag is-rounded">{`v${pjson.version}`}</BetaTag>

          <Menu
            active={active}
            toggleActive={() => this.setState({ active: !active })}
            zIndex={Z_INDEX}
          />

          <Links active={active} zIndex={Z_INDEX} userInfo={userInfo} />
        </Wrapper>
        {active && (
          <Shade
            zIndex={Z_INDEX}
            onClick={() => this.setState({ active: !active })}
          />
        )}
        <NavSpace />
      </>
    )
  }
}

const mapStateToProps = ({ authentication }) => authentication

const mapDispatchToProps = dispatch => ({
  dispatchGetUserInfo: () => dispatch(getUserInfo()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
