import React from 'react'
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

interface IButtonProps {
  isPrimary?: boolean
  isSecondary?: boolean
  isInfo?: boolean
  isDanger?: boolean
  lg?: boolean
  children: React.ReactNode | React.ReactNodeArray
  style?: React.CSSProperties
}

export const ButtonWrapper = s.button<IButtonProps>(
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

export const Button = ({
  children,
  ...props
}: IButtonProps): React.ReactElement => (
  <ButtonWrapper {...props}>{children}</ButtonWrapper>
)

export const AnchorButton = ({
  children,
  ...rest
}: IButtonProps): React.ReactElement => (
  <ButtonWrapper as="a" {...rest}>
    {children}
  </ButtonWrapper>
)
