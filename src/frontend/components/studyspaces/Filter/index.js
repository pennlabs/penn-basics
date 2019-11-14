import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO decouple index of option and value in database

import FilterBtn from './FilterBtn'
import Search from './Search'
import {
  WHITE,
  ALLBIRDS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
} from '../../../styles/colors'
import {
  filterSpacesOpen,
  filterSpacesOutlets,
  filterSpacesNoise,
  filterSpacesGroups,
  filterSpacesString,
  clearSpacesFilters,
  toggleSpacesOpen,
  toggleSpacesOutlets,
  toggleSpacesNoise,
  toggleSpacesGroups,
} from '../../../actions/spaces_actions'
import ToggleNeighborhood from './ToggleNeighborhood'
import {
  maxWidth,
  PHONE,
  NAV_HEIGHT,
  TABLET,
  minWidth,
  Z_INDEX,
} from '../../../styles/sizes'
import { Modal, ModalContainer, Subtitle } from '../../shared'

const MOBILE_HEIGHT = '46px'

const HideOnTablet = s.span`
  ${maxWidth(TABLET)} {
    display: none;
  }
`

const HideAboveTablet = s.span`
  ${minWidth(TABLET)} {
    display: none;
  }
`

const FilterWrapper = s.div`
  width: 100%;
  background: ${WHITE};
  border-bottom: 1px solid ${ALLBIRDS_GRAY};
  padding: 0.5rem 1rem;

  ${maxWidth(PHONE)} {
    padding: 0.5rem 1rem;
    position: fixed;
    top: ${NAV_HEIGHT};
    left: 0;
    background: ${WHITE};
    z-index: ${Z_INDEX - 1};
    width: 100%;
    overflow-x: scroll;
    overflow-y: visible;
    white-space: nowrap;

    // &::-webkit-scrollbar {
    //   width: 0px;
    //   background: transparent;
    // }

    &:before {
      content: "";
      background: linear-gradient(0.25turn, ${WHITE}, transparent);
      display: block;
      width: 1.2rem;
      height: calc(${MOBILE_HEIGHT} - 1px);
      position: fixed;
      left: 0;
      transform: translateY(-0.5rem);
    }

    &:after {
      content: "";
      background: linear-gradient(0.25turn, transparent, ${WHITE});
      display: block;
      width: 1.2rem;
      height: calc(${MOBILE_HEIGHT} - 1px);
      position: fixed;
      right: 0;
      transform: translateY(calc(-${MOBILE_HEIGHT} + 0.5rem + 1px));
    }
  }
`

const FilterText = s.p`
  display: inline-block;
  color: ${MEDIUM_GRAY};
  cursor: hand;
  opacity: 0.8;
  margin-right: 1rem;

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

class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMoreFilters: false,
    }

    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClickOutlets = this.handleClickOutlets.bind(this)
    this.handleClickNoiseLevel = this.handleClickNoiseLevel.bind(this)
    this.handleClickGroups = this.handleClickGroups.bind(this)
    this.handleInputString = this.handleInputString.bind(this)
    this.toggleMoreFilters = this.toggleMoreFilters.bind(this)
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
    const { filterSpacesStringDispatch } = this.props
    filterSpacesStringDispatch(filterString)
  }

  toggleMoreFilters() {
    const { showMoreFilters } = this.state
    this.setState({ showMoreFilters: !showMoreFilters })
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

    const { showMoreFilters } = this.state

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

        <FilterText onClick={clearSpacesFiltersDispatch}>
          Clear filters
        </FilterText>

        <HideAboveTablet>
          <FilterText onClick={this.toggleMoreFilters}>More filters</FilterText>

          <Modal show={showMoreFilters} toggle={this.toggleMoreFilters}>
            <ModalContainer>
              <Subtitle>More Filters</Subtitle>
              <ToggleNeighborhood />
            </ModalContainer>
          </Modal>
        </HideAboveTablet>

        <HideOnTablet>
          <ToggleNeighborhood />
        </HideOnTablet>
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

const mapStateToProps = ({ spaces }) => spaces

const mapDispatchToProps = dispatch => ({
  clearSpacesFiltersDispatch: () => dispatch(clearSpacesFilters()),

  filterSpacesOpenDispatch: filter => dispatch(filterSpacesOpen(filter)),
  filterSpacesOutletsDispatch: filters =>
    dispatch(filterSpacesOutlets(filters)),
  filterSpacesNoiseDispatch: filters => dispatch(filterSpacesNoise(filters)),
  filterSpacesGroupsDispatch: filters => dispatch(filterSpacesGroups(filters)),
  filterSpacesStringDispatch: filterString =>
    dispatch(filterSpacesString(filterString)),

  toggleSpacesOpenDispatch: () => dispatch(toggleSpacesOpen()),
  toggleSpacesOutletsDispatch: () => dispatch(toggleSpacesOutlets()),
  toggleSpacesNoiseDispatch: () => dispatch(toggleSpacesNoise()),
  toggleSpacesGroupsDispatch: () => dispatch(toggleSpacesGroups()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
