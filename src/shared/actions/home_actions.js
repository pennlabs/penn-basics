import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from './action_types'

export const filterHomeCustomize = filter => {
  return dispatch => {
    dispatch({
      type: filterHomeCustomizeRequested,
      filter,
    })
  }
}

export const toggleHomeCustomize = () => dispatch =>
  dispatch({ type: TOGGLE_FILTER_HOME_CUSTOMIZE })
