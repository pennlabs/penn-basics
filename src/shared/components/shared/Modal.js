import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { WHITE, LIGHT_GRAY, SNOW_ALPHA, SHADOW } from '../../styles/colors'

const Z_INDEX = 1200
const ANIMATION_DURATION = '0.4s'
const LG_WIDTH = 50
const SM_WIDTH = 80

// TODO mobile responsiveness
// TODO use refactored modal code

const fadeIn = keyframes`
  0% {
    opacity: 0;
    max-height: 100vh;
  }

  100% {
    opacity: 1;
    max-height: 100vh;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
    max-height: 100vh;
  }

  100% {
    opacity: 0;
    max-height: 100vh;
  }
`

const slideIn = keyframes`
  0% {
    margin-left: 100%;
  }

  100% {
    margin-left: ${LG_WIDTH}%;
  }
`

const slideOut = keyframes`
  0% {
    margin-left: ${LG_WIDTH}%;
  }

  100% {
    margin-right: 100%;
  }
`

const slideInMobile = keyframes`
  0% {
    margin-left: 100%;
  }

  100% {
    margin-left: ${SM_WIDTH}%;
  }
`

const slideOutMobile = keyframes`
  0% {
    margin-left: ${SM_WIDTH}%;
  }

  100% {
    margin-right: 100%;
  }
`

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${SNOW_ALPHA};
  z-index: ${Z_INDEX};
  animation-name: ${({ isNewlyMounted, show }) => {
    if (isNewlyMounted) {
      return ''
    }
    if (show) {
      return fadeIn
    }

    return fadeOut
  }};
  animation-duration: ${ANIMATION_DURATION};
  max-height: ${({ show }) => (show ? '100vh' : '0vh')};
  opacity: ${({ show }) => (show ? '1' : '0')};
`

const ModalContent = styled.div`
  min-height: 100%;
  background: ${WHITE};
  width: 50%;
  margin-left: ${({ show }) => (show ? '50%' : '100%')};
  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${ANIMATION_DURATION};
  box-sizing: border-box;
  padding: 10.41vh 0;

  @media screen and (max-width: 900px) {
    width: 75%;
    margin-left: ${({ show }) => (show ? '25%' : '100%')};
    animation-name: ${({ show }) => (show ? slideInMobile : slideOutMobile)};
  }
`

const ModalClose = styled.div`
  position: fixed;
  top: 4.16vw;
  right: 4.16vw;
  background: ${WHITE};
  border-radius: 50%;
  box-shadow: 0 1px 4px ${SHADOW};
  cursor: hand;
  line-height: 1;
  width: 2rem;
  height: 2rem;
  text-align: center;
  vertical-align: middle;
  z-index: 1300;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.75;
  }
`

const Times = styled.span`
  color: ${LIGHT_GRAY};
  font-size: 32px;
  margin-top: -3px;
  display: inline-block;
  width: 32px;
`

// Do not propagate events on the modal content to the modal background
// This would otherwise cause the modal to close on any click
const noop = event => event.stopPropagation()

export class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = { isNewlyMounted: true }

    this.focusRef = React.createRef()

    this.makeNotNewlyMounted = this.makeNotNewlyMounted.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  // Avoid animations showing on load
  componentDidUpdate(prevProps) {
    const { show } = this.props
    const { isNewlyMounted } = this.state

    // If this is the first time the modal is mounting, engage the animation
    if (isNewlyMounted && prevProps.show !== show) {
      this.makeNotNewlyMounted()
    }

    // If we are showing the modal, focus on it
    if (show && !prevProps.show) {
      this.focusRef.current.focus()
    }
  }

  makeNotNewlyMounted() {
    this.setState({ isNewlyMounted: false })
  }

  // Close the modal when the user presses the escape key
  handleKeyPress(event) {
    const ESCAPE_KEY_CODE = 27
    const { show } = this.props

    if (
      (event.keyCode === ESCAPE_KEY_CODE ||
        event.key.toLowerCase() === 'escape') &&
      show
    ) {
      const { toggle } = this.props

      toggle()
    }
  }

  render() {
    const { show, toggle, children } = this.props
    const { isNewlyMounted } = this.state

    return (
      <ModalWrapper
        show={show}
        ref={this.focusRef}
        tabIndex={show ? 0 : -1}
        onClick={toggle}
        isNewlyMounted={isNewlyMounted}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyPress}
      >
        <ModalContent onClick={noop} show={show}>
          <ModalClose onClick={toggle}>
            <Times>&times;</Times>
          </ModalClose>

          {children}
        </ModalContent>
      </ModalWrapper>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line
}

export const ModalContainer = styled.div`
  padding: 0 8.33vw;
  background: ${({ background }) => background || WHITE};
  padding-top: ${({ paddingTop }) => paddingTop || 0};
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 0};
`
