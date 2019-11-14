import React, { Component } from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  FOCUS_GRAY,
  LIGHT_GRAY,
  LIGHTER_BLUE,
  BLUE,
  MEDIUM_GRAY,
} from '../../../styles/colors'
import { filterOnCampus as setFilterOnCampus } from '../../../actions/spaces_actions'
import { maxWidth, TABLET } from '../../../styles/sizes'

const HEIGHT = 0.875
const WIDTH = 2.25

const Wrapper = s.div`
  float: right;

  ${maxWidth(TABLET)} {
    float: none;
  }
`

const Label = s.span`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0.625rem;
  color: ${MEDIUM_GRAY};
  transition: all 0.2 ease;
  cursor: pointer;
  opacity: 0.6;

  ${({ active }) => active && `opacity: 1; color: ${BLUE} !important;`}
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
  background: ${({ active }) => (active ? LIGHTER_BLUE : FOCUS_GRAY)};
  cursor: pointer;
`

const Circle = s.div`
  transition: all 0.2s ease;
  height: ${HEIGHT + 0.4}rem;
  width: ${HEIGHT + 0.4}rem;
  border-radius: 100%;
  margin-top: ${(2.5 - HEIGHT) / 2 - 0.2}rem;
  position: absolute;
  background: ${({ active }) => (active ? BLUE : LIGHT_GRAY)};
  margin-left: ${({ active }) => (active ? `${WIDTH - HEIGHT - 0.4}rem` : '0')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

class ToggleNeighborhood extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { filterOnCampusDispatch, filterOnCampus } = this.props
    e.stopPropagation()
    filterOnCampusDispatch(!filterOnCampus)
  }

  render() {
    const { filterOnCampus } = this.props
    return (
      <Wrapper>
        <ToggleWrapper>
          <Circle onClick={this.handleClick} active={filterOnCampus} />
          <Bar onClick={this.handleClick} active={filterOnCampus} />
        </ToggleWrapper>
        <Label onClick={this.handleClick} active={filterOnCampus}>
          Univ. City only
        </Label>
      </Wrapper>
    )
  }
}

ToggleNeighborhood.propTypes = {
  filterOnCampus: PropTypes.bool,
  filterOnCampusDispatch: PropTypes.func.isRequired,
}

ToggleNeighborhood.defaultProps = {
  filterOnCampus: false,
}

const mapStateToProps = ({ spaces }) => spaces

const mapDispatchToProps = dispatch => ({
  filterOnCampusDispatch: filter => dispatch(setFilterOnCampus(filter)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleNeighborhood)
