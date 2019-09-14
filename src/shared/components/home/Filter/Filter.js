import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilterButton from './FilterBtn'
import {
  filterHomeCustomize,
  toggleHomeCustomize,
} from '../../../actions/home_actions'

class Filter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      filterHomeCustomizeDispatch,
      toggleHomeCustomizeDispatch,
      filterCustomizeActive,
    } = this.props

    // TODO get these options from somewhere else
    return (
      <FilterButton
        text="Customize this page"
        onClick={toggleHomeCustomizeDispatch}
        onClickOption={filterHomeCustomizeDispatch}
        options={[
          'Quotes',
          'Weather',
          'Events',
          'News',
          'Laundry',
          'Dining'
        ]}
        activeOptions={JSON.parse(localStorage.getItem('homeFilter'))}
        active={filterCustomizeActive}
      />
    )
  }
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
