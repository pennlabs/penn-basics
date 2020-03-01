import React from 'react'
import { connect } from 'react-redux'

import FilterButton from './FilterBtn'
import {
  filterHomeCustomize,
  toggleHomeCustomize,
  initializeFilterHome,
} from '../../../actions/home_actions'

import { IHomeReducerState } from '../../../../types/home'

interface IFilterProps {
  dispatchFilterHomeCustomize: (filter: number) => void
  dispatchToggleHomeCustomize: () => void
  dispatchInitializeFilterHome: (optionsLength: number) => void
  filterCustomizeActive: boolean
  filterList?: number[]
}

const Filter: React.FC<IFilterProps> = ({
  dispatchFilterHomeCustomize,
  dispatchToggleHomeCustomize,
  dispatchInitializeFilterHome,
  filterCustomizeActive,
  filterList,
}) => (
  <FilterButton
    text="Customize this page"
    onClick={dispatchToggleHomeCustomize}
    onClickOption={dispatchFilterHomeCustomize}
    options={['Weather', 'Events', 'News', 'Laundry', 'Dining', 'Quotes']}
    activeOptions={filterList}
    active={filterCustomizeActive}
    initialize={dispatchInitializeFilterHome}
  />
)

const mapStateToProps = ({
  home,
}: {
  home: IHomeReducerState
}): IHomeReducerState => home

const mapDispatchToProps = (
  dispatch: (action: any) => any
): {
  dispatchFilterHomeCustomize: (filter: number) => void
  dispatchToggleHomeCustomize: () => void
  dispatchInitializeFilterHome: (optionsLength: number) => void
} => ({
  dispatchFilterHomeCustomize: (filter: number): void =>
    dispatch(filterHomeCustomize(filter)),
  dispatchToggleHomeCustomize: (): void => dispatch(toggleHomeCustomize()),
  dispatchInitializeFilterHome: (optionsLength: number): void =>
    dispatch(initializeFilterHome(optionsLength)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
