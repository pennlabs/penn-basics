import React from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

// TODO decouple index of option and value in database

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

// import Redux actions
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
import { ISpacesReducerState } from '../../../../types/studyspaces'

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
    ${({ active }): string =>
      active ? `height: calc(100vh - ${NAV_HEIGHT});` : ''}

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

interface IFilterProps {
  filterSpacesOpenDispatch: (open: boolean) => void
  filterSpacesOutletsDispatch: (num: number) => void
  filterSpacesNoiseDispatch: (num: number) => void
  filterSpacesGroupsDispatch: (num: number) => void
  clearSpacesFiltersDispatch: () => void // Remove filters
  filterSpacesStringDispatch: (str: string) => void
  filterOpen?: boolean

  toggleSpacesOpenDispatch: () => void
  toggleSpacesOutletsDispatch: () => void
  toggleSpacesNoiseDispatch: () => void
  toggleSpacesGroupsDispatch: () => void

  filterOpenActive?: boolean
  filterOutletsActive?: boolean
  filterNoiseActive?: boolean
  filterGroupsActive?: boolean

  filterOutlets?: number[]
  filterNoise?: number[]
  filterGroups?: number[]
  filterString?: string
}

interface IFilterState {
  showMoreFilters: boolean
}

class Filter extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props)

    this.state = {
      showMoreFilters: false,
    }
  }

  /**
   * Handle when the user clicks to filter by if a study space is open or not
   * NOTE there is no parameter as this is a binary filter: either show all
   * studyspaces or only show spaces which are open
   */
  handleClickOpen(): void {
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
  handleClickOutlets(num: number): void {
    const { filterSpacesOutletsDispatch } = this.props
    filterSpacesOutletsDispatch(num)
  }

  /**
   * Handle when the user clicks to filter by noise level
   *
   * @param num: index in the array of options
   */
  handleClickNoiseLevel(num: number): void {
    const { filterSpacesNoiseDispatch } = this.props
    filterSpacesNoiseDispatch(num)
  }

  /**
   * Handle when the user clicks to filter by group` size
   *
   * @param num: index in the array of options
   */
  handleClickGroups(num: number): void {
    const { filterSpacesGroupsDispatch } = this.props
    filterSpacesGroupsDispatch(num)
  }

  /**
   * @param {string} filterString input from user
   */
  handleInputString(filterString: string): void {
    const { filterSpacesStringDispatch } = this.props
    filterSpacesStringDispatch(filterString)
  }

  toggleMoreFilters(): void {
    const { showMoreFilters } = this.state
    this.setState({ showMoreFilters: !showMoreFilters })
  }

  render(): React.ReactElement {
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

    const anyFilterModalActive =
      filterOutletsActive || filterNoiseActive || filterGroupsActive

    return (
      <>
        <FilterWrapper active={anyFilterModalActive}>
          <Search
            filterFunction={(value: string): void =>
              this.handleInputString(value)
            }
            filterString={filterString}
          />

          <FilterBtn
            text="Open"
            onClick={(): void => this.handleClickOpen()}
            active={Boolean(filterOpenActive)}
          />

          <FilterBtn
            text="Outlets"
            onClick={toggleSpacesOutletsDispatch}
            onClickOption={(optionIdx: number): void =>
              this.handleClickOutlets(optionIdx)
            }
            options={['No outlets', 'Few outlets', 'Many outlets']}
            activeOptions={filterOutlets}
            active={Boolean(filterOutletsActive)}
          />

          <FilterBtn
            text="Noise level"
            onClick={toggleSpacesNoiseDispatch}
            onClickOption={(num: number): void =>
              this.handleClickNoiseLevel(num)
            }
            options={['Talkative', 'Quiet', 'Silent']}
            activeOptions={filterNoise}
            active={Boolean(filterNoiseActive)}
          />

          <FilterBtn
            text="Groups"
            onClick={toggleSpacesGroupsDispatch}
            onClickOption={(num: number): void => this.handleClickGroups(num)}
            options={[
              'No groups',
              'Good for small groups',
              'Good for large groups',
            ]}
            activeOptions={filterGroups}
            active={Boolean(filterGroupsActive)}
          />

          <FilterTextHideAboveTablet
            onClick={(): void => this.toggleMoreFilters()}
          >
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

        <Modal
          show={showMoreFilters}
          toggle={(): void => this.toggleMoreFilters()}
        >
          <ModalContainer>
            <Subtitle>More Filters</Subtitle>
            <ToggleNeighborhood />
          </ModalContainer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({
  spaces,
}: {
  spaces: ISpacesReducerState
}): ISpacesReducerState => spaces

const mapDispatchToProps = (
  dispatch: any
): {
  clearSpacesFiltersDispatch: () => void
  filterSpacesOpenDispatch: (filter: boolean) => void
  filterSpacesOutletsDispatch: (filters: number) => void
  filterSpacesNoiseDispatch: (filters: number) => void
  filterSpacesGroupsDispatch: (filters: number) => void
  filterSpacesStringDispatch: (filterString: string) => void
  toggleSpacesOpenDispatch: () => void
  toggleSpacesOutletsDispatch: () => void
  toggleSpacesNoiseDispatch: () => void
  toggleSpacesGroupsDispatch: () => void
} => ({
  clearSpacesFiltersDispatch: (): void => dispatch(clearSpacesFilters()),

  filterSpacesOpenDispatch: (filter: boolean): void =>
    dispatch(filterSpacesOpen(filter)),
  filterSpacesOutletsDispatch: (filters: number): void =>
    dispatch(filterSpacesOutlets(filters)),
  filterSpacesNoiseDispatch: (filters: number): void =>
    dispatch(filterSpacesNoise(filters)),
  filterSpacesGroupsDispatch: (filters: number): void =>
    dispatch(filterSpacesGroups(filters)),
  filterSpacesStringDispatch: (filterString: string): void =>
    dispatch(filterSpacesString(filterString)),

  toggleSpacesOpenDispatch: (): void => dispatch(toggleSpacesOpen()),
  toggleSpacesOutletsDispatch: (): void => dispatch(toggleSpacesOutlets()),
  toggleSpacesNoiseDispatch: (): void => dispatch(toggleSpacesNoise()),
  toggleSpacesGroupsDispatch: (): void => dispatch(toggleSpacesGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
