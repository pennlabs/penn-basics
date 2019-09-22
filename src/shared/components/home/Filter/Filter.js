import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilterButton from './FilterBtn'
import {
  filterHomeCustomize,
  toggleHomeCustomize,
  initializeFilterHome,
} from '../../../actions/home_actions'

const Filter = ({
  dispatchFilterHomeCustomize,
  dispatchToggleHomeCustomize,
  dispatchInitializeFilterHome,
  filterCustomizeActive,
  filterList,
}) => (
  <FilterButton
    text="Customize this page"
    onClick={dispatchToggleHomeCustomize}
    onClickOption={dispatchFilterHomeCustomize}
    options={['Quotes', 'Weather', 'Events', 'News', 'Laundry', 'Dining']}
    activeOptions={filterList}
    active={filterCustomizeActive}
    initialize={dispatchInitializeFilterHome}
  />
)

Filter.defaultProps = {
  filterList: [],
  filterCustomizeActive: false,
}

Filter.propTypes = {
  dispatchFilterHomeCustomize: PropTypes.func.isRequired,
  dispatchToggleHomeCustomize: PropTypes.func.isRequired,
  dispatchInitializeFilterHome: PropTypes.func.isRequired,
  filterCustomizeActive: PropTypes.bool,
  filterList: PropTypes.arrayOf(PropTypes.number),
}

const mapStateToProps = ({ home }) => home

const mapDispatchToProps = dispatch => ({
  dispatchFilterHomeCustomize: filter => dispatch(filterHomeCustomize(filter)),
  dispatchToggleHomeCustomize: () => dispatch(toggleHomeCustomize()),
  dispatchInitializeFilterHome: optionsLength =>
    dispatch(initializeFilterHome(optionsLength)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
