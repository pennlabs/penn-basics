import axios from 'axios'
import { Dispatch, Action } from 'redux'

import {
  TSpaceId,
  ISpaceWithHoursAndOpenAndSpaceId,
  ISpaceWithSpaceID,
} from '../../types/studyspaces'
import { IFilterInputProps } from '../../types/filter'
import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
  setActiveSpaceFulfilled,
  clearActiveSpaceFulfilled,
  clearFilterSpacesRequested,
  TOGGLE_FILTER_SPACES_OPEN,
  TOGGLE_FILTER_SPACES_OUTLETS,
  TOGGLE_FILTER_SPACES_NOISE,
  TOGGLE_FILTER_SPACES_GROUPS,
} from './action_types'
import { isOpen, getHours } from '../../utils/helperFunctions'

export function getAllSpacesData() {
  // eslint-disable-line
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: getSpacesDataRequested,
    })

    const today = new Date()
    const day = today.getDay()
    const time = today.getHours() + today.getMinutes() / 60

    try {
      // TODO abstract this string to a common routes file
      axios.get('/api/spaces/all').then(res => {
        const formattedSpaces: Record<
          TSpaceId,
          ISpaceWithHoursAndOpenAndSpaceId
        > = {}
        const spaces: ISpaceWithSpaceID[] = res.data.spaces

        spaces.forEach((space: ISpaceWithSpaceID) => {
          const spaceObj: ISpaceWithHoursAndOpenAndSpaceId = Object.assign(
            {
              open: isOpen(space, time, day),
              hours: getHours(space, day),
            },
            space
          )

          const { spaceID } = spaceObj

          formattedSpaces[spaceID] = spaceObj
        })

        dispatch({
          type: getSpacesDataFulfilled,
          spaces: formattedSpaces,
        })
      })
    } catch (error) {
      dispatch({
        type: getSpacesDataRejected,
        error: error.message || 'There was an error pulling studyspaces data',
      })
    }
  }
}

export const setHoveredSpace = (spaceId: TSpaceId) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: setHoveredSpaceFulfilled,
      spaceId,
    })
  }
}

export const setActiveSpace = (spaceId: TSpaceId) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: setActiveSpaceFulfilled,
      spaceId,
    })
  }
}

export const clearActiveSpace = () => {
  return (dispatch: Dispatch<Action>) =>
    dispatch({ type: clearActiveSpaceFulfilled })
}

/**
 * Generic filter function that takes in the type and filter value and dispatch the action
 * @param type string
 * @param filter number | string | boolean
 */
export const filterSpaces = ({ filterKey, filterValue }: IFilterInputProps) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: filterKey,
    filter: filterValue,
  })
}

export function clearSpacesFilters() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: clearFilterSpacesRequested })
  }
}

export const toggleSpacesOpen = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_OPEN })

export const toggleSpacesOutlets = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: TOGGLE_FILTER_SPACES_OUTLETS })
}

export const toggleSpacesNoise = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_NOISE })

export const toggleSpacesGroups = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_GROUPS })
