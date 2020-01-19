import React from 'react'
import PropTypes from 'prop-types'
import s, { css } from 'styled-components'

import {
  WHITE,
  OUTLINE,
  BLUE,
  GREEN,
  DARK_GRAY,
  HOVER_GRAY,
  FOREST,
  DARK_BLUE,
  RED,
  DARK_RED,
} from '../../styles/colors'
import { SHORT_ANIMATION_DURATION } from '../../styles/sizes'

export const ButtonWrapper = s.button(
  ({ isSecondary, isInfo, isDanger, lg }) => {
    const background = isSecondary
      ? WHITE
      : isInfo
      ? GREEN
      : isDanger
      ? RED
      : BLUE
    const color = isSecondary
      ? DARK_GRAY
      : isInfo
      ? WHITE
      : isDanger
      ? WHITE
      : WHITE
    const hoverBackground = isSecondary
      ? HOVER_GRAY
      : isInfo
      ? FOREST
      : isDanger
      ? DARK_RED
      : DARK_BLUE
    const padding = lg
      ? 'calc(0.8em - 1px) calc(1em - 1px)'
      : 'calc(0.375em - 1px) calc(0.75em - 1px)'
    const fontSize = lg ? '1.2rem' : '1rem'

    return css`
      font-weight: 500;
      background: ${background};
      color: ${color} !important;
      align-items: center;
      border: 1px solid transparent;
      border-radius: 3px;
      box-shadow: none;
      display: inline-flex;
      font-size: ${fontSize};
      height: 2.25em;
      line-height: 1.5;
      padding: ${padding};
      position: relative;
      vertical-align: top;
      user-select: none;
      cursor: pointer;
      justify-content: center;
      text-align: center;
      white-space: nowrap;
      transition: background ${SHORT_ANIMATION_DURATION} ease;

      &:hover,
      &:active,
      &:focus {
        background: ${hoverBackground};
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem ${OUTLINE};
      }
    `
  }
)

export const Button = ({ className, children, ...props }) => (
  <ButtonWrapper {...props}>{children}</ButtonWrapper>
)

Button.defaultProps = {
  className: '',
  isInfo: false,
  isPrimary: false,
  isSecondary: false,
  isDanger: false,
  lg: false,
}

Button.propTypes = {
  isPrimary: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isInfo: PropTypes.bool,
  isDanger: PropTypes.bool,
  className: PropTypes.string,
  lg: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export const AnchorButton = ({ children, ...rest }) => (
  <ButtonWrapper as="a" {...rest}>
    {children}
  </ButtonWrapper>
)

AnchorButton.propTypes = {
  children: PropTypes.node.isRequired,
}
