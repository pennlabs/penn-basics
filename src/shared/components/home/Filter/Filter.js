/* global localStorage */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilterButton from './FilterBtn'
import {
  filterHomeCustomize,
  toggleHomeCustomize,
} from '../../../actions/home_actions'

// TODO abstract away localStorage from React components

const Filter = ({
  filterHomeCustomizeDispatch,
  toggleHomeCustomizeDispatch,
  filterCustomizeActive,
}) => (
  <FilterButton
    text="Customize this page"
    onClick={toggleHomeCustomizeDispatch}
    onClickOption={filterHomeCustomizeDispatch}
    options={['Quotes', 'Weather', 'Events', 'News', 'Laundry', 'Dining']}
    activeOptions={JSON.parse(localStorage.getItem('homeFilter'))}
    active={filterCustomizeActive}
  />
)

Filter.propTypes = {
  filterHomeCustomizeDispatch: PropTypes.func.isRequired,
  toggleHomeCustomizeDispatch: PropTypes.func.isRequired,
  filterCustomizeActive: PropTypes.bool,
}

Filter.defaultProps = {
  filterCustomizeActive: false,
}

const mapStateToProps = ({ home }) => home

const mapDispatchToProps = dispatch => ({
  filterHomeCustomizeDispatch: filter => dispatch(filterHomeCustomize(filter)),
  toggleHomeCustomizeDispatch: () => dispatch(toggleHomeCustomize()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
