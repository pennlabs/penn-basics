import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { WHITE } from '../../styles/colors'

export const AnchorButton = s.a`
  font-weight: 500;
  color: ${WHITE} !important;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    color: ${WHITE} !important;
  }
`

export const ButtonWrapper = s.button`
  font-weight: 500;
`

export const Button = ({ className, children, ...props }) => (
  <ButtonWrapper className={`button ${className}`} {...props}>
    {children}
  </ButtonWrapper>
)

Button.defaultProps = {
  className: '',
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}
