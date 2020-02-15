/* global localStorage */
import { Dispatch, Action } from 'redux'

import {
  filterHomeCustomizeRequested,
  TOGGLE_FILTER_HOME_CUSTOMIZE,
} from './action_types'

const updateFilters = (arr: number[], num: number) => {
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

export const initializeFilterHome = (optionsLength: number) => (dispatch: Dispatch<Action>) => {
    const homeFilter = localStorage.getItem('homeFilter')

    if (!homeFilter) {
      const filterList: number[] = []
      for (let i = 0; i < optionsLength; i++) {
        filterList.push(i)
      }
      localStorage.setItem('homeFilter', JSON.stringify(filterList))
      dispatch({
        type: filterHomeCustomizeRequested,
        filterList,
      })
    } else {
      dispatch({
        type: filterHomeCustomizeRequested,
        filterList: JSON.parse(homeFilter),
      })
    }
  }

// filterList is the existing list of filters
// filter is a number/ index
export const filterHomeCustomize = (filter: number) => (dispatch: Dispatch<Action>) => {
    const homeFilterString = localStorage.getItem('homeFilter')
    if (homeFilterString) {
      let filterList = JSON.parse(homeFilterString)
      filterList = updateFilters(filterList, filter)
      localStorage.setItem('homeFilter', JSON.stringify(filterList))
      dispatch({
        type: filterHomeCustomizeRequested,
        filterList,
      })
    }
  }

export const toggleHomeCustomize = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_HOME_CUSTOMIZE })
