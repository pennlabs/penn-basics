import React, { useState } from 'react'
import s from 'styled-components'

// TODO decouple index of option and value in database

// import styles
import {
  WHITE,
  ALLBIRDS_GRAY,
  MEDIUM_GRAY,
  DARK_GRAY,
  WHITE_ALPHA,
} from '../../../styles/colors'
import {
  maxWidth,
  PHONE,
  NAV_HEIGHT,
  MOBILE_FILTER_HEIGHT,
  Z_INDEX,
  FILTER_HEIGHT,
} from '../../../styles/sizes'

// import Components
import FilterBtn from './FilterBtn'
import ToggleNeighborhood from './ToggleNeighborhood'
import {
  ModalContainer,
  Subtitle,
  withHideAboveTablet,
  HiddenOnTablet,
  Search,
} from '..'
import Modal from '../Modal'

// import types

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
    ${({ active }): string => active ? `height: calc(100vh - ${NAV_HEIGHT});`: ''}

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

const FilterTextHideAboveTablet = withHideAboveTablet(FilterText)

interface IFilterButton {
  text: string
  onClick: () => void
  onClickOption: (filter: number) => void
  options: string[]
  activeOptions: number[]
  active: boolean
}

interface IFilterProps {
  filterButtons: IFilterButton[]
  searchParams: {
    filterString?: string
    filterSpacesStringDispatch: (str: string) => void
  }
}

const Filter: React.FC<IFilterProps> = ({
  filterButtons,
  searchParams,
  openButtonParams

  // filterSpacesOpenDispatch,
  // filterOpenActive,
  // filterOutletsActive,
  // filterNoiseActive,
  // filterGroupsActive,
  // filterOpen
}) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const toggleMoreFilters = (): void => {
    setShowMoreFilters(!showMoreFilters)
  }

  const anyFilterModalActive =
      filterOutletsActive || filterNoiseActive || filterGroupsActive


  return (
    <>
      <FilterWrapper active={anyFilterModalActive}>
        <Search {...searchParams} />

        <FilterBtn text="Open" {...openButtonParams} />

        {filterButtons.map(filterButtonProps => (
          <FilterBtn {...filterButtonProps} />
        ))}

        <FilterTextHideAboveTablet onClick={toggleMoreFilters}>
          More
        </FilterTextHideAboveTablet>

        <FilterText
          onClick={clearSpacesFiltersDispatch}
          style={{ marginRight: 0 }}
        >
          Clear filters
        </FilterText>

        <HiddenOnTablet style={{ marginLeft: 'auto' }}>
          <ToggleNeighborhood />
        </HiddenOnTablet>
      </FilterWrapper>

      <FilterSpace />

      <Modal show={showMoreFilters} toggle={toggleMoreFilters}>
        <ModalContainer>
          <Subtitle>More Filters</Subtitle>
          <ToggleNeighborhood />
        </ModalContainer>
      </Modal>
    </>
  )
}

export default Filter
