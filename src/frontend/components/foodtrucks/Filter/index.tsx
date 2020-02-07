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
  WHITE_ALPHA,
} from '../../../styles/colors'
import {
  filterFoodtrucksString,
  filterFoodtrucksOpen,
  clearFoodtrucksFilter,
  toggleFoodtrucksOpen,
} from '../../../actions/foodtrucks_action'

import {
  maxWidth,
  PHONE,
  NAV_HEIGHT,
  MOBILE_FILTER_HEIGHT,
  Z_INDEX,
  FILTER_HEIGHT,
} from '../../../styles/sizes'

const FilterWrapper = s.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${WHITE};
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  top: ${NAV_HEIGHT};
  left: 0;
  padding: 0.5rem 1rem;
  overflow: visible;
  position: fixed;
  z-index: ${Z_INDEX - 1};

  ${maxWidth(PHONE)} {
    overflow-x: -moz-scrollbars-none;
    ${({ active }) => active && `height: calc(100vh - ${NAV_HEIGHT});`}

    // Scroll horizontally but hide the scrollbar from view
    overflow-x: scroll;
    overflow-y: visible;
    white-space: nowrap;

    -ms-overflow-style: none;
    
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none;
      background: transparent;
    }

    // Put a white fading gradient on the left and right sides
    &:before {
      content: "";
      background: linear-gradient(0.25turn, ${WHITE}, ${WHITE_ALPHA(0)});
      display: block;
      width: 1.2rem;
      height: calc(${MOBILE_FILTER_HEIGHT} - 1px);
      position: fixed;
      left: 0;
      transform: translateY(-0.5rem);
    }

    &:after {
      content: "";
      background: linear-gradient(0.25turn, ${WHITE_ALPHA(0)}, ${WHITE});
      display: block;
      width: 1.2rem;
      height: calc(${MOBILE_FILTER_HEIGHT} - 1px);
      position: fixed;
      right: 0;
      transform: translateY(calc(-${MOBILE_FILTER_HEIGHT} + 0.5rem + 1px));
    }
  }
`

const FilterText = s.p`
  display: inline-block;
  color: ${MEDIUM_GRAY};
  cursor: pointer;
  opacity: 0.8;
  margin-right: 1rem;
  user-select: none;

  :hover,
  :active,
  :focus {
    color: ${DARK_GRAY};
  }

  ${maxWidth(PHONE)} {
    font-size: 80%;
    margin-right: 0.5rem;
  }
`

const FilterSpace = s.div`
  display: block;
  width: 100%;
  height: ${FILTER_HEIGHT};

  ${maxWidth(PHONE)} {
    height: ${MOBILE_FILTER_HEIGHT};
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
      dispatchFilterFoodtrucksOpen,
      filterOpen,
      dispatchToggleFoodtrucksOpen,
    } = this.props

    dispatchToggleFoodtrucksOpen()
    dispatchFilterFoodtrucksOpen(!filterOpen)
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
      dispatchClearFoodtrucksFilter,
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
      <>
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

          <FilterText
            onClick={dispatchClearFoodtrucksFilter}
            style={{ marginRight: 0 }}
          >
            Clear filters
          </FilterText>
        </FilterWrapper>

        <FilterSpace />
      </>
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
  dispatchFilterFoodtrucksOpen: PropTypes.func.isRequired,
  filterSpacesOutletsDispatch: PropTypes.func.isRequired,
  filterSpacesNoiseDispatch: PropTypes.func.isRequired,
  filterSpacesGroupsDispatch: PropTypes.func.isRequired,
  dispatchClearFoodtrucksFilter: PropTypes.func.isRequired,
  dispatchFilterFoodtrucksString: PropTypes.func.isRequired,
  filterOpen: PropTypes.bool,

  dispatchToggleFoodtrucksOpen: PropTypes.func.isRequired,
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
  dispatchFilterFoodtrucksOpen: filter =>
    dispatch(filterFoodtrucksOpen(filter)),
  dispatchToggleFoodtrucksOpen: () => dispatch(toggleFoodtrucksOpen()),
  dispatchClearFoodtrucksFilter: () => dispatch(clearFoodtrucksFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
