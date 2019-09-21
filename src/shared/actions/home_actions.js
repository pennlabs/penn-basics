/* global localStorage */
import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from './action_types'

const updateFilters = (arr, num) => {
  if (!arr || !arr.length) {
    return [num]
  }

  if (arr.includes(num)) {
    return arr.filter(item => item !== num).sort()
  }

  // MUST not modify the input arr
  const newArr = arr.slice() // create a copy
  newArr.push(num)

  return newArr.sort()
}

export const initializeFilterHome = optionsLength => {
  return dispatch => {
    if (!localStorage.getItem('homeFilter')) {
      const filterList = [...Array(optionsLength).keys()]
      localStorage.setItem('homeFilter', JSON.stringify(filterList))
      dispatch({
        type: filterHomeCustomizeRequested,
        filterList,
      })
    } else {
      dispatch({
        type: filterHomeCustomizeRequested,
        filterList: JSON.parse(localStorage.getItem('homeFilter')),
      })
    }
  }
}

// filterList is the existing list of filters
// filter is a number/ index
export const filterHomeCustomize = (filterList, filter) => {
  return dispatch => {
    const newFilterList = updateFilters(filterList, filter)
    localStorage.setItem('homeFilter', JSON.stringify(newFilterList))
    dispatch({
      type: filterHomeCustomizeRequested,
      filterList: newFilterList,
    })
  }
}

export const toggleHomeCustomize = () => dispatch =>
  dispatch({ type: TOGGLE_FILTER_HOME_CUSTOMIZE })
