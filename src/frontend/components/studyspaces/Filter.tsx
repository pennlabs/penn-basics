import React from 'react'
import { connect } from 'react-redux'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import Filter from '../shared/filter'
import { IFilterInputProps, IFilterButton, IToggleProps } from '../../../types/filter'

// import Redux actions
import {
  filterSpaces,
  clearSpacesFilters,
  toggleSpaces,
} from '../../actions/spaces_actions'
import {
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
  filterSpacesStringRequested,
  filterOnCampusRequested,
  TOGGLE_FILTER_SPACES_OPEN,
  TOGGLE_FILTER_SPACES_OUTLETS,
  TOGGLE_FILTER_SPACES_NOISE,
  TOGGLE_FILTER_SPACES_GROUPS
} from '../../actions/action_types'


interface IFilterStateProps {
  filterOpenActive?: boolean
  filterOutletsActive?: boolean
  filterNoiseActive?: boolean
  filterGroupsActive?: boolean
  filterOpen?: boolean
  filterOutlets: number[]
  filterNoise: number[]
  filterGroups: number[]
  filterString?: string
  filterOnCampus?: boolean
}

interface IFilterDispatchProps {
  clearSpacesFiltersDispatch: () => void // Remove filters
  dispatchFilterSpaces: (inputParams: IFilterInputProps) => void
  dispatchToggleSpaces: (toggleParams: IToggleProps) => void
}

type IFilterProps = IFilterStateProps & IFilterDispatchProps

const SpacesFilter: React.FC<IFilterProps> = ({
  dispatchFilterSpaces,
  dispatchToggleSpaces,

  clearSpacesFiltersDispatch,

  filterOpenActive,
  filterOutletsActive,
  filterNoiseActive,
  filterGroupsActive,

  filterString,
  filterOutlets,
  filterGroups,
  filterNoise,
  filterOpen,
  filterOnCampus
}) => {
  const filterButtons: IFilterButton[] = [
    {
      text: 'Outlets',
      active: Boolean(filterOutletsActive),
      onClick: () => dispatchToggleSpaces({ toggleType: TOGGLE_FILTER_SPACES_OUTLETS }),
      options: ['No outlets', 'Few outlets', 'Many outlets'],
      onClickOption: (num: number) =>
        dispatchFilterSpaces({ filterKey: filterSpacesOutletsRequested, filterValue: num }),
      activeOptions: filterOutlets
    },
    {
      text: 'Noise level',
      onClick: () => dispatchToggleSpaces({ toggleType: TOGGLE_FILTER_SPACES_NOISE }),
      onClickOption: (num: number) =>
        dispatchFilterSpaces({ filterKey: filterSpacesNoiseRequested, filterValue: num }),
      options: ['Talkative', 'Quiet', 'Silent'],
      activeOptions: filterNoise,
      active: Boolean(filterNoiseActive)
    },
    {
      text: 'Groups',
      onClick: () => dispatchToggleSpaces({ toggleType: TOGGLE_FILTER_SPACES_GROUPS }),
      onClickOption: (num: number) =>
        dispatchFilterSpaces({ filterKey: filterSpacesGroupsRequested, filterValue: num }),
      options: [
        'No groups',
        'Good for small groups',
        'Good for large groups',
      ],
      activeOptions: filterGroups,
      active: Boolean(filterGroupsActive),
    }
  ]

  // input params for the Search Component
  const searchParams = {
    filterFunction: (str: string) =>
      dispatchFilterSpaces({ filterKey: filterSpacesStringRequested, filterValue: str }),
    filterString
  }

  // input parameters for the FilterOpenButton
  const openButtonParams = {
    onClick: (): void => {
      dispatchToggleSpaces({ toggleType: TOGGLE_FILTER_SPACES_OPEN })
      dispatchFilterSpaces({ filterKey: filterSpacesOpenRequested, filterValue: !filterOpen })
    },
    active: Boolean(filterOpenActive)
  }

  const clearFilterOnClick = clearSpacesFiltersDispatch

  const toggleNeighborhoodParams = {
    filterOnCampusDispatch: (filter: boolean) =>
      dispatchFilterSpaces({ filterKey: filterOnCampusRequested, filterValue: filter }),
    filterOnCampus
  }

  return (
    <Filter
      filterButtons={filterButtons}
      searchParams={searchParams}
      openButtonParams={openButtonParams}
      clearFilterOnClick={clearFilterOnClick}
      anyFilterModalActive={filterOutletsActive || filterNoiseActive || filterGroupsActive}
      toggleNeighborhoodParams={toggleNeighborhoodParams}
    />
  )
}

const mapStateToProps = ({ spaces }: { spaces: ISpacesReducerState }) => {
  const {
    filterOpenActive,
    filterOutletsActive,
    filterNoiseActive,
    filterGroupsActive,
    filterOpen,
    filterOutlets,
    filterNoise,
    filterGroups,
    filterString,
    filterOnCampus
  } = spaces

  return {
    filterOpenActive,
    filterOutletsActive,
    filterNoiseActive,
    filterGroupsActive,
    filterOpen,
    filterOutlets,
    filterNoise,
    filterGroups,
    filterString,
    filterOnCampus
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  clearSpacesFiltersDispatch: (): void => dispatch(clearSpacesFilters()),
  dispatchFilterSpaces: (inputParams: IFilterInputProps): void =>
    dispatch(filterSpaces(inputParams)),
  dispatchToggleSpaces: ({ toggleType }: IToggleProps): void => dispatch(toggleSpaces({ toggleType })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpacesFilter)
