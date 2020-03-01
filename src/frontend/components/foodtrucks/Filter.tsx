import React from 'react'
import { connect } from 'react-redux'

import Filter from '../shared/filter'
import {
  filterSpaces as filterAction,
  toggleSpaces as toggleAction,
} from '../../actions/spaces_actions'
import { clearFoodtrucksFilter } from '../../actions/foodtrucks_action'
import { IFilterInputProps, IToggleProps } from '../../../types/filter'
import { IFoodTrucksReducerState } from '../../../types/foodtrucks'
import {
  TOGGLE_FILTER_FOODTRUCKS_OPEN,
  filterFoodtrucksOpenRequested,
  filterFoodtrucksStringRequested
} from '../../actions/action_types'

interface IFoodtrucksStateProps {
  filterOpen: boolean,
  filterOpenActive: boolean,
  filterString: string
}

interface IFoodtrucksDispatchProps {
  clearFoodtrucksFiltersDispatch: () => void // Remove filters
  dispatchFilterAction: (inputParams: IFilterInputProps) => void
  dispatchToggleAction: (toggleParams: IToggleProps) => void
}

type IFoodtrucksFilterProps = IFoodtrucksStateProps & IFoodtrucksDispatchProps

const FoodtrucksFilter: React.FC<IFoodtrucksFilterProps> = ({
  dispatchFilterAction,
  dispatchToggleAction,
  clearFoodtrucksFiltersDispatch,
  filterOpen,
  filterOpenActive,
  filterString,
}) => {
  // input params for the Search Component
  const searchParams = {
    filterFunction: (str: string) =>
      dispatchFilterAction({ filterKey: filterFoodtrucksStringRequested, filterValue: str }),
    filterString
  }

  // input parameters for the FilterOpenButton
  const openButtonParams = {
    onClick: (): void => {
      dispatchToggleAction({ toggleType: TOGGLE_FILTER_FOODTRUCKS_OPEN })
      dispatchFilterAction({ filterKey: filterFoodtrucksOpenRequested, filterValue: !filterOpen })
    },
    active: Boolean(filterOpenActive)
  }

  const clearFilterOnClick = clearFoodtrucksFiltersDispatch

  return (
    <Filter
      filterButtons={[]}
      searchParams={searchParams}
      openButtonParams={openButtonParams}
      clearFilterOnClick={clearFilterOnClick}
      anyFilterModalActive={false}
    />
  )
}

const mapStateToProps = ({ foodtrucks }: { foodtrucks: IFoodTrucksReducerState }) => {
  const { filterOpen, filterOpenActive, filterString } = foodtrucks
  return {
    filterOpen,
    filterOpenActive,
    filterString,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFilterAction: (inputParams: IFilterInputProps): void =>
    dispatch(filterAction(inputParams)),
  dispatchToggleAction: ({ toggleType }: IToggleProps): void => dispatch(toggleAction({ toggleType })),
  clearFoodtrucksFiltersDispatch: (): void => dispatch(clearFoodtrucksFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodtrucksFilter)