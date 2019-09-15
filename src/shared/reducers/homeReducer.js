/* global localStorage */
import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from '../actions/action_types'

const defaultState = {
  filterCustomize: [],
  filterCustomizeActive: false,
}

const updateFilters = (arr, num) => {
  if (!arr || !arr.length) {
    return [num]
  }

  if (arr.includes(num)) {
    return arr.filter(item => item !== num).sort()
  }

  arr.push(num)
  return arr.sort()
}

const homeReducer = (state = defaultState, action) => {
  const newState = Object.assign({}, state)

  if (state.filterCustomize && Array.isArray(state.filterCustomize)) {
    newState.filterCustomize = state.filterCustomize.slice()
    Object.assign(
      newState.filterCustomize,
      JSON.parse(localStorage.getItem('homeFilter'))
    )
  }

  const { filterCustomize, filterCustomizeActive } = newState
  const { filter, type } = action

  switch (type) {
    case filterHomeCustomizeRequested:
      newState.filterCustomize = updateFilters(filterCustomize, filter)
      localStorage.setItem(
        'homeFilter',
        JSON.stringify(newState.filterCustomize)
      )
      return newState

    case TOGGLE_FILTER_HOME_CUSTOMIZE:
      newState.filterCustomizeActive = !filterCustomizeActive
      return newState

    default:
      return state
  }
}

export default homeReducer
