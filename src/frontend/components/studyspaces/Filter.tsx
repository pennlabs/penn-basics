import React from 'react'
import { connect } from 'react-redux'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import Filter from '../shared/filter'

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
} from '../../actions/spaces_actions'

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

  filterOutlets: number[]
  filterNoise: number[]
  filterGroups: number[]
  filterString?: string
}

interface IFilterButton {
  text: string
  onClick: () => void
  onClickOption: (filter: number) => void
  options: string[]
  activeOptions: number[]
  active: boolean
}

const SpacesFilter: React.FC<IFilterProps> = ({
  filterSpacesOpenDispatch,
  toggleSpacesOpenDispatch,
  clearSpacesFiltersDispatch,
  filterSpacesStringDispatch,
  toggleSpacesOutletsDispatch,
  filterSpacesOutletsDispatch,
  toggleSpacesNoiseDispatch,
  filterSpacesNoiseDispatch,
  toggleSpacesGroupsDispatch,
  filterSpacesGroupsDispatch,

  filterOpenActive,
  filterOutletsActive,
  filterNoiseActive,
  filterGroupsActive,

  filterString,
  filterOutlets,
  filterGroups,
  filterNoise,
  filterOpen,
}) => {
  const searchParams = {
    filterFunction: filterSpacesStringDispatch,
    filterString
  }

  const filterButtons: IFilterButton[] = [
    {
      text: 'Outlets',
      onClick: toggleSpacesOutletsDispatch,
      onClickOption: filterSpacesOutletsDispatch,
      options: ['No outlets', 'Few outlets', 'Many outlets'],
      activeOptions: filterOutlets,
      active: Boolean(filterOutletsActive)
    },
    {
      text: 'Noise level',
      onClick: toggleSpacesNoiseDispatch,
      onClickOption: filterSpacesNoiseDispatch,
      options: ['Talkative', 'Quiet', 'Silent'],
      activeOptions: filterNoise,
      active: Boolean(filterNoiseActive)
    },
    {
      text: 'Groups',
      onClick: toggleSpacesGroupsDispatch,
      onClickOption: filterSpacesGroupsDispatch,
      options: [
        'No groups',
        'Good for small groups',
        'Good for large groups',
      ],
      activeOptions: filterGroups,
      active: Boolean(filterGroupsActive),
    }
  ]

  const handleClickOpen = (): void => {
    toggleSpacesOpenDispatch()
    filterSpacesOpenDispatch(!filterOpen)
  }

  const openButtonParams = {
    onClick: handleClickOpen,
    active: Boolean(filterOpenActive)
  }

  return (
    <Filter filterButtons={filterButtons} searchParams={searchParams} openButtonParams={openButtonParams} />
  )
}

const mapStateToProps = ({ spaces }: { spaces: ISpacesReducerState }) => spaces

const mapDispatchToProps = (dispatch: any) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(SpacesFilter)
