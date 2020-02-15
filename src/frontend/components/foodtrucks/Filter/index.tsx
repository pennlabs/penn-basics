import React, { Component } from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

// TODO decouple index of option and value in database

import FilterBtn from '../../shared/filter/FilterBtn'
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

import { IFoodTrucksReducerState } from '../../../../types/foodtrucks'

interface IFilterWrapperProps {
  active?: boolean
}

const FilterWrapper = s.div<IFilterWrapperProps>`
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

interface IFilterProps {
  dispatchFilterFoodtrucksOpen: (open: boolean) => void
  dispatchClearFoodtrucksFilter: () => void // Remove filters

  dispatchToggleFoodtrucksOpen: () => void
  dispatchFilterFoodtrucksString: (str: string) => void

  filterOpen?: boolean


  filterOpenActive?: boolean
  filterString?: string
}

class Filter extends Component<IFilterProps> {
  constructor(props: IFilterProps) {
    super(props)

    this.handleClickOpen = this.handleClickOpen.bind(this)
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
   *
   * @param {string} filterString input from user
   */

  handleInputString(filterString: string) {
    const { dispatchFilterFoodtrucksString } = this.props
    dispatchFilterFoodtrucksString(filterString)
  }

  render() {
    const {
      dispatchClearFoodtrucksFilter,
      filterOpenActive,
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
            active={Boolean(filterOpenActive)}
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

const mapStateToProps = ({ foodtrucks }: { foodtrucks: IFoodTrucksReducerState }) => foodtrucks

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFilterFoodtrucksString: (filterString: string) =>
    dispatch(filterFoodtrucksString(filterString)),
  dispatchFilterFoodtrucksOpen: (filter: boolean) =>
    dispatch(filterFoodtrucksOpen(filter)),
  dispatchToggleFoodtrucksOpen: () => dispatch(toggleFoodtrucksOpen()),
  dispatchClearFoodtrucksFilter: () => dispatch(clearFoodtrucksFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
