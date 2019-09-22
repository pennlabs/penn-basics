import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from '../actions/action_types'

const defaultState = {
  filterList: [],
  filterCustomizeActive: false,
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

    default:
      return state
  }
}

export default homeReducer
