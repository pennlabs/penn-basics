import React from 'react'
import { connect } from 'react-redux'

import FilterButton from './FilterBtn'
import {
  filterHomeCustomize,
  toggleHomeCustomize,
  initializeFilterHome,
} from '../../../actions/home_actions'

import { IHomeReducerState } from '../../../../types'

interface IFilterProps {
  dispatchFilterHomeCustomize: (filter: number) => void
  dispatchToggleHomeCustomize: () => void
  dispatchInitializeFilterHome: (optionsLength: number) => void
  filterCustomizeActive: boolean
  filterList?: number[]
}

const Filter = ({
  dispatchFilterHomeCustomize,
  dispatchToggleHomeCustomize,
  dispatchInitializeFilterHome,
  filterCustomizeActive,
  filterList,
}: IFilterProps) => (
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

const mapStateToProps = ({ home }: { home: IHomeReducerState }) => home

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchFilterHomeCustomize: (filter: number) => dispatch(filterHomeCustomize(filter)),
  dispatchToggleHomeCustomize: () => dispatch(toggleHomeCustomize()),
  dispatchInitializeFilterHome: (optionsLength: number) =>
    dispatch(initializeFilterHome(optionsLength)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
