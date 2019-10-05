import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { LIGHTER_BLUE, BLUE, MEDIUM_GRAY } from '../../styles/colors'

const HEIGHT = 0.875
const WIDTH = 2.25

const Wrapper = s.div`
  float: right;
`

const Label = s.span`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0.625rem;
  margin-right: 0.625em;
  color: ${MEDIUM_GRAY};
  transition: all 0.2 ease;
  cursor: pointer;
  opacity: 0.6;

  ${({ active }) =>
    active &&
    `
    opacity: 1;
    color: ${BLUE} !important;
  `}
`

const ToggleWrapper = s.div`
  width: ${WIDTH}rem;
  position: relative;
  display: inline-block;
`

const Bar = s.div`
  transition: all 0.2s ease;
  width: 100%;
  height: ${HEIGHT}rem;
  border-radius: ${HEIGHT}rem;
  margin-top: ${(2.5 - HEIGHT) / 2}rem;
  display: inline-block;
  background: ${LIGHTER_BLUE};
  cursor: pointer;
`

const Circle = s.div`
  transition: all 0.2s ease;
  height: ${HEIGHT + 0.4}rem;
  width: ${HEIGHT + 0.4}rem;
  border-radius: 100%;
  margin-top: ${(2.5 - HEIGHT) / 2 - 0.2}rem;
  position: absolute;
  background: ${BLUE};
  margin-left: ${({ active }) => (active ? `${WIDTH - HEIGHT - 0.4}rem` : '0')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`
/*
  dispatchFilterAction: the redux action that toggles the filter
  filter: filter in the redux
  filterOffText:
  filterOnText:
*/

class Toggle extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { dispatchFilterAction } = this.props
    e.stopPropagation()
    dispatchFilterAction()
  }

  render() {
    const { filter, filterOffText, filterOnText } = this.props
    return (
      <Wrapper>
        <Label onClick={this.handleClick} active>
          {filterOffText}
        </Label>
        <ToggleWrapper>
          <Circle onClick={this.handleClick} active={filter} />
          <Bar onClick={this.handleClick} active={filter} />
        </ToggleWrapper>
        <Label onClick={this.handleClick} active>
          {filterOnText}
        </Label>
      </Wrapper>
    )
  }
}

Toggle.defaultProps = {
  filter: false,
  filterOffText: '',
  filterOnText: '',
}

Toggle.propTypes = {
  filter: PropTypes.bool,
  dispatchFilterAction: PropTypes.func.isRequired,
  filterOffText: PropTypes.string,
  filterOnText: PropTypes.string,
}

export default Toggle
