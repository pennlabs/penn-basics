import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO decouple index of option and value in database

import FilterBtn from './FilterBtn'
import { Search } from '../../shared'
import {
  WHITE,
  ALLBIRDS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
} from '../../../styles/colors'
import { filterFoodtrucksString } from '../../../actions/foodtrucks_action'

const FilterWrapper = s.div`
  width: 100%;
  background: ${WHITE};
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  padding: 0.5rem 1rem;
`

const ClearText = s.p`
  display: inline-block;
  color: ${MEDIUM_GRAY};
  cursor: hand;
  opacity: 0.8;

  :hover,
  :active,
  :focus {
    color: ${DARK_GRAY};
  }
`

class Filter extends Component {
  constructor(props) {
    super(props)

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClickOutlets = this.handleClickOutlets.bind(this)
    this.handleClickNoiseLevel = this.handleClickNoiseLevel.bind(this)
    this.handleClickGroups = this.handleClickGroups.bind(this)
    this.handleInputString = this.handleInputString.bind(this)
  }

  /**
   * Handle when the user clicks to filter by if a study space is open or not
   * NOTE there is no parameter as this is a binary filter: either show all
   * studyspaces or only show spaces which are open
   */
  handleClickOpen() {
    const {
      filterSpacesOpenDispatch,
      filterOpen,
      toggleSpacesOpenDispatch,
    } = this.props

    toggleSpacesOpenDispatch()
    filterSpacesOpenDispatch(!filterOpen)
  }

  /**
   * Handle when the user clicks to filter by outlets level
   *
   * @param num: index in the array of options
   */
  handleClickOutlets(num) {
    const { filterSpacesOutletsDispatch } = this.props
    filterSpacesOutletsDispatch(num)
  }

  /**
   * Handle when the user clicks to filter by noise level
   *
   * @param num: index in the array of options
   */
  handleClickNoiseLevel(num) {
    const { filterSpacesNoiseDispatch } = this.props
    filterSpacesNoiseDispatch(num)
  }

  /**
   * Handle when the user clicks to filter by group` size
   *
   * @param num: index in the array of options
   */
  handleClickGroups(num) {
    const { filterSpacesGroupsDispatch } = this.props
    filterSpacesGroupsDispatch(num)
  }

  /**
   *
   * @param {string} filterString input from user
   */

  handleInputString(filterString) {
    const { dispatchFilterFoodtrucksString } = this.props
    dispatchFilterFoodtrucksString(filterString)
  }

  render() {
    const {
      clearSpacesFiltersDispatch,
      toggleSpacesOutletsDispatch,
      toggleSpacesNoiseDispatch,
      toggleSpacesGroupsDispatch,

      filterOpenActive,
      filterOutletsActive,
      filterNoiseActive,
      filterGroupsActive,

      filterOutlets,
      filterNoise,
      filterGroups,
      filterString,
    } = this.props

    // TODO OTHER ACTIVE PROPS?

    return (
      <FilterWrapper>
        <Search
          filterFunction={this.handleInputString}
          filterString={filterString}
        />

        <FilterBtn
          text="Open"
          onClick={this.handleClickOpen}
          active={filterOpenActive}
        />

        <FilterBtn
          text="Outlets"
          onClick={toggleSpacesOutletsDispatch}
          onClickOption={this.handleClickOutlets}
          options={['No outlets', 'Few outlets', 'Many outlets']}
          activeOptions={filterOutlets}
          active={filterOutletsActive}
        />

        <FilterBtn
          text="Noise level"
          onClick={toggleSpacesNoiseDispatch}
          onClickOption={this.handleClickNoiseLevel}
          options={['Talkative', 'Quiet', 'Silent']}
          activeOptions={filterNoise}
          active={filterNoiseActive}
        />

        <FilterBtn
          text="Groups"
          onClick={toggleSpacesGroupsDispatch}
          onClickOption={this.handleClickGroups}
          options={[
            'No groups',
            'Good for small groups',
            'Good for large groups',
          ]}
          activeOptions={filterGroups}
          active={filterGroupsActive}
        />

        <ClearText onClick={clearSpacesFiltersDispatch}>
          Clear filters
        </ClearText>
      </FilterWrapper>
    )
  }
}

Filter.defaultProps = {
  filterOpen: false,
  filterOutlets: [],
  filterNoise: [],
  filterGroups: [],
  filterString: null,
}

Filter.propTypes = {
  filterSpacesOpenDispatch: PropTypes.func.isRequired,
  filterSpacesOutletsDispatch: PropTypes.func.isRequired,
  filterSpacesNoiseDispatch: PropTypes.func.isRequired,
  filterSpacesGroupsDispatch: PropTypes.func.isRequired,
  clearSpacesFiltersDispatch: PropTypes.func.isRequired,
  filterSpacesStringDispatch: PropTypes.func.isRequired,
  filterOpen: PropTypes.bool,

  toggleSpacesOpenDispatch: PropTypes.func.isRequired,
  toggleSpacesOutletsDispatch: PropTypes.func.isRequired,
  toggleSpacesNoiseDispatch: PropTypes.func.isRequired,
  toggleSpacesGroupsDispatch: PropTypes.func.isRequired,

  filterOpenActive: PropTypes.bool.isRequired,
  filterOutletsActive: PropTypes.bool.isRequired,
  filterNoiseActive: PropTypes.bool.isRequired,
  filterGroupsActive: PropTypes.bool.isRequired,

  filterOutlets: PropTypes.arrayOf(PropTypes.number),
  filterNoise: PropTypes.arrayOf(PropTypes.number),
  filterGroups: PropTypes.arrayOf(PropTypes.number),
  filterString: PropTypes.string,
}

const mapStateToProps = ({ foodtrucks }) => foodtrucks

const mapDispatchToProps = dispatch => ({
  dispatchFilterFoodtrucksString: filterString =>
    dispatch(filterFoodtrucksString(filterString)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
