import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
  TOGGLE_FILTER_TEMPERATURE,
} from '../actions/action_types'

const defaultState = {
  filterList: [],
  filterCustomizeActive: false,
  filterTemperature: false, // false is Farenheit | true is Celsius
}

const homeReducer = (state = defaultState, action) => {
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
    case TOGGLE_FILTER_TEMPERATURE:
      return {
        ...state,
        filterTemperature: !state.filterTemperature,
      }
    default:
      return state
  }
}

export default homeReducer
