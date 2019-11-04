import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { WHITE, LIGHT_GRAY, BLACK_ALPHA } from '../../styles/colors'

const Z_INDEX = 1305
const ANIMATION_DURATION = '0.4s'

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
    opacity: 0;
    margin-top: 100%;
  }

  100% {
    opacity: 1;
    margin-top: calc(1rem + 5vh);
  }
`

const slideOut = keyframes`
  0% {
    opacity: 1;
    margin-top: calc(1rem + 5vh);
  }

  100% {
    opacity: 0;
    margin-top: 100%;
  }
`

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  overflow-x: hidden;
  overflow-y: scroll;
  background: ${BLACK_ALPHA(0.5)};
  z-index: ${Z_INDEX};
  text-align: center;
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
  display: inline-block;
  margin-top: ${({ show }) => (show ? 'calc(1rem + 5vh)' : '100vh')};
  margin-bottom: calc(1rem + 5vh);
  box-sizing: border-box;
  padding: 10.41vh 0;
  border-radius: 1rem;
  text-align: left;
  position: relative;

  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${ANIMATION_DURATION};

  @media screen and (max-width: 1024px) {
    width: 75%;
  }

  @media screen and (max-width: 848px) {
    width: calc(100% - 1rem);
  }
`

const ModalClose = styled.div`
  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${ANIMATION_DURATION};

  margin-top: ${({ show }) => (show ? 'calc(1rem + 5vh)' : '100vh')};

  position: fixed;
  top: 1rem;
  margin-left: 1rem;
  background: ${WHITE};
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
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
          <ModalClose onClick={toggle} show={show}>
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
