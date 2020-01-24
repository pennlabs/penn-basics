import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { Switch } from 'antd'

import { BLUE } from '../../styles/colors'
import 'antd/es/switch/style/index.css'

// const HEIGHT = 0.875
// const WIDTH = 2.25

const Wrapper = s.div`
  float: right;
`

const Label = s.span`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0.625rem;
  margin-right: 0.625em;
  transition: all 0.2 ease;

  ${({ active }) =>
    active &&
    `
    opacity: 1;
    color: ${BLUE} !important;
  `}
`

// const ToggleWrapper = s.div`
//   width: ${WIDTH}rem;
//   position: relative;
//   display: inline-block;
// `

// const Bar = s.div`
//   transition: all 0.2s ease;
//   width: 100%;
//   height: ${HEIGHT}rem;
//   border-radius: ${HEIGHT}rem;
//   margin-top: ${(2.5 - HEIGHT) / 2}rem;
//   display: inline-block;
//   background: ${LIGHTER_BLUE};
//   cursor: pointer;
// `

// const Circle = s.div`
//   transition: all 0.2s ease;
//   height: ${HEIGHT + 0.4}rem;
//   width: ${HEIGHT + 0.4}rem;
//   border-radius: 100%;
//   margin-top: ${(2.5 - HEIGHT) / 2 - 0.2}rem;
//   position: absolute;
//   background: ${BLUE};
//   margin-left: ${({ active }) => (active ? `${WIDTH - HEIGHT - 0.4}rem` : '0')};
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
//   cursor: pointer;
// `

/**
 * @param {function} dispatchFilterAction: the redux action that toggles the filter
 * @param {boolean} filter: filter in the redux
 * @param {string} filterOffText: text rendered when the filter is off
 * @param {string} filterOnText text rendered when filter is on
 */

const Toggle = ({ filterOffText, filterOnText, filterAction }) => (
  <Wrapper>
    <Label> {filterOffText} </Label>
    <Switch onChange={filterAction} />
    <Label> {filterOnText} </Label>
  </Wrapper>
)

Toggle.defaultProps = {
  filterOffText: '',
  filterOnText: '',
}

Toggle.propTypes = {
  filterAction: PropTypes.func.isRequired,
  filterOffText: PropTypes.string,
  filterOnText: PropTypes.string,
}

export default Toggle
