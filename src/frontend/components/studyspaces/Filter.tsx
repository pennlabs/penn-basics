import React from 'react'
import { connect } from 'react-redux'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import Filter from '../shared/filter'
import { IFilterInputProps, IFilterButton } from '../../../types/filter'

// import Redux actions
import {
  filterSpaces,
  clearSpacesFilters,
  toggleSpacesOpen,
  toggleSpacesOutlets,
  toggleSpacesNoise,
  toggleSpacesGroups,
} from '../../actions/spaces_actions'
import {
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
  filterSpacesStringRequested,
  filterOnCampusRequested
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
  toggleSpacesOpenDispatch: () => void
  toggleSpacesOutletsDispatch: () => void
  toggleSpacesNoiseDispatch: () => void
  toggleSpacesGroupsDispatch: () => void
}

type IFilterProps = IFilterStateProps & IFilterDispatchProps

const SpacesFilter: React.FC<IFilterProps> = ({
  dispatchFilterSpaces,

  toggleSpacesOpenDispatch,
  clearSpacesFiltersDispatch,
  toggleSpacesOutletsDispatch,

  toggleSpacesNoiseDispatch,
  toggleSpacesGroupsDispatch,

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
  console.log(filterOutlets)
  const filterButtons: IFilterButton[] = [
    {
      text: 'Outlets',
      active: Boolean(filterOutletsActive),
      onClick: toggleSpacesOutletsDispatch,
      options: ['No outlets', 'Few outlets', 'Many outlets'],
      onClickOption: (num: number) =>
        dispatchFilterSpaces({ filterKey: filterSpacesOutletsRequested, filterValue: num }),
      activeOptions: filterOutlets
    },
    {
      text: 'Noise level',
      onClick: toggleSpacesNoiseDispatch,
      onClickOption: (num: number) =>
        dispatchFilterSpaces({ filterKey: filterSpacesNoiseRequested, filterValue: num }),
      options: ['Talkative', 'Quiet', 'Silent'],
      activeOptions: filterNoise,
      active: Boolean(filterNoiseActive)
    },
    {
      text: 'Groups',
      onClick: toggleSpacesGroupsDispatch,
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

  const searchParams = {
    filterFunction: (str: string) =>
      dispatchFilterSpaces({ filterKey: filterSpacesStringRequested, filterValue: str }),
    filterString
  }

  const openButtonParams = {
    onClick: (): void => {
      toggleSpacesOpenDispatch()
      dispatchFilterSpaces({ filterKey: filterSpacesOpenRequested, filterValue: !filterOpen })
      // filterSpacesOpenDispatch(!filterOpen)
    },
    active: Boolean(filterOpenActive)
  }

  const clearFilterOnClick = clearSpacesFiltersDispatch

  const toggleNeighborHoodParams = {
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
      toggleNeighborHoodParams={toggleNeighborHoodParams}
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
  toggleSpacesOpenDispatch: (): void => dispatch(toggleSpacesOpen()),
  toggleSpacesOutletsDispatch: (): void => dispatch(toggleSpacesOutlets()),
  toggleSpacesNoiseDispatch: (): void => dispatch(toggleSpacesNoise()),
  toggleSpacesGroupsDispatch: (): void => dispatch(toggleSpacesGroups()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpacesFilter)
