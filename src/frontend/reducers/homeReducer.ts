import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from '../actions/action_types'
import { Action } from 'redux'

type IHomeAction = {
  filterList?: number[]
} & Action

interface IHomeReducerState {
  filterList?: number[]
  filterCustomizeActive: boolean
}

const defaultState: IHomeReducerState = {
  filterList: [],
  filterCustomizeActive: false,
}

const homeReducer = (
  state: IHomeReducerState = defaultState,
  action: IHomeAction
) : IHomeReducerState => {
  switch (action.type) {
    case filterHomeCustomizeRequested:
      return {
        ...state,
        filterList: action.filterList,
      }
    case TOGGLE_FILTER_HOME_CUSTOMIZE:
      return {
        ...state,
        filterCustomizeActive: !state.filterCustomizeActive,
      }
    default:
      return state
  }
}

export default homeReducer
