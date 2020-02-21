import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'

import { WHITE, LIGHT_GRAY } from '../../styles/colors'
import {
  LONG_ANIMATION_DURATION,
  Z_INDEX,
  maxWidth,
  TABLET,
} from '../../styles/sizes'
import { slideIn, slideOut } from './Animations'
import { Shade } from './Shade'
import { ESCAPE_KEY_CODE } from '../../constants/misc'

interface IModalContent {
  show?: boolean
  isThin?: boolean
}

const ModalContent = styled.div<IModalContent>`
  background: ${WHITE};
  width: ${({ isThin }) => (isThin ? '30%' : '50%')};
  display: inline-block;
  margin-top: ${({ show }) => (show ? 'calc(1rem + 5vh)' : '100vh')};
  margin-bottom: calc(1rem + 5vh);
  box-sizing: border-box;
  padding: 10.41vh 0;
  border-radius: 1rem;
  text-align: left;
  position: relative;

  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${LONG_ANIMATION_DURATION};

  @media screen and (max-width: 1024px) {
    padding: 1rem 0;
    width: 75%;
  }

  ${maxWidth(TABLET)} {
    width: calc(100% - 1rem);
  }
`

interface IModalClose {
  show?: boolean
}

const ModalClose = styled.div<IModalClose>`
  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${LONG_ANIMATION_DURATION};

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
  z-index: ${Z_INDEX + 3};
  transition: opacity 0.2s ease;
  :hover {
    opacity: 0.75;
  }

  ${maxWidth(TABLET)} {
    margin-left: 0;
    top: 0.5rem;
    right: 1rem;
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
const noop = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
  event.stopPropagation()

/**
 * NOTE either `toggle` or `ROUTE` should be defined
 */
interface IModalProps {
  show: boolean
  children: React.ReactNode | React.ReactNodeArray
  toggle?: () => void
  ROUTE?: string // TODO this should not be uppercase
  isThin?: boolean // Percent
}

interface IModalState {
  isNewlyMounted: boolean
}

class Modal extends Component<IModalProps, IModalState> {
  private focusRef: React.RefObject<HTMLDivElement>

  constructor(props: IModalProps) {
    super(props)

    this.state = { isNewlyMounted: true }

    this.focusRef = React.createRef()

    this.makeNotNewlyMounted = this.makeNotNewlyMounted.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  // Avoid animations showing on load
  componentDidUpdate(prevProps: IModalProps) {
    const { show } = this.props
    const { isNewlyMounted } = this.state

    // If this is the first time the modal is mounting, engage the animation
    if (isNewlyMounted && prevProps.show !== show) {
      this.makeNotNewlyMounted()
    }

    // If we are showing the modal, focus on it
    if (show && !prevProps.show) {
      const { current } = this.focusRef || {}
      if (!current) {return}
      current.focus()
    }
  }

  makeNotNewlyMounted() {
    this.setState({ isNewlyMounted: false })
  }

  // Close the modal when the user presses the escape key
  handleKeyPress(event: React.KeyboardEvent) {
    const { show, ROUTE } = this.props
    if (
      (event.keyCode === ESCAPE_KEY_CODE ||
        event.key.toLowerCase() === 'escape') &&
      show
    ) {
      const { toggle } = this.props
      if (toggle) {
        toggle()
      } else {
        ROUTE && Router.push(ROUTE)
      }
    }
  }

  render() {
    const { show, children, toggle, isThin, ROUTE } = this.props
    const { isNewlyMounted } = this.state


    if (toggle || !ROUTE) {
      return (
        <Shade
          show={show}
          ref={this.focusRef}
          tabIndex={show ? 0 : -1}
          onClick={toggle}
          isNewlyMounted={isNewlyMounted}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyPress}
        >
          <ModalContent onClick={noop} show={show} isThin={isThin}>
            <ModalClose onClick={toggle} show={show}>
              <Times>&times;</Times>
            </ModalClose>
            {children}
          </ModalContent>
        </Shade>
      )
    }

    return (
      <Shade
        show={show}
        ref={this.focusRef}
        tabIndex={show ? 0 : -1}
        onClick={() => Router.push(ROUTE)}
        isNewlyMounted={isNewlyMounted}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyPress}
      >
        <ModalContent  onClick={noop} show={show} isThin={isThin}>
          <Link href={ROUTE}>
            <ModalClose show={show}>
              <Times>&times;</Times>
            </ModalClose>
          </Link>
          {children}
        </ModalContent>
      </Shade>
    )
  }
}

export default Modal

interface IModalContent {
  padding?: string
  background?: string
  paddingTop?: string
  paddingBottom?: string
}

export const ModalContainer = styled.div<IModalContent>`
  padding: 0 ${({ padding = 8.33 }) => padding}vw;
  background: ${({ background }) => background || WHITE};
  padding-top: ${({ paddingTop }) => paddingTop || 0};
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 0};
`
