import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { minWidth, PHONE } from '../../../styles/sizes'
import { BLACK } from '../../../styles/colors'

const Wrapper = s.div`
  padding: 10px 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0.5rem;
  z-index: 1;

  &:hover {
    opacity: 0.5;
  }

  ${minWidth(PHONE)} {
    padding: 0;
    margin: 0;
    height: 0;
    width: 0;
    overflow: hidden;
    display: none;
  }
`

const Bar = s.span`
  width: 16px;
  height: 2px;
  margin-bottom: 3px;
  display: block;
  background: ${BLACK};

  &:first-child {
    margin-top: 3px;
  }
`

const Bars = ({ handleClick, onKeyPress }) => (
  <Wrapper onClick={handleClick} onKeyPress={onKeyPress}>
    <Bar />
    <Bar />
    <Bar />
  </Wrapper>
)

Bars.propTypes = {
  handleClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
}

export default Bars
