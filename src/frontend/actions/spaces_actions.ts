import axios from 'axios'
import { Dispatch, Action } from 'redux'

import {
  TSpaceId,
  ISpaceWithHoursAndOpenAndSpaceId,
  ISpaceWithSpaceID,
} from '../../types/studyspaces'
import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
  filterSpacesStringRequested,
  filterOnCampusRequested,
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

export function setHoveredSpace(spaceId: TSpaceId) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: setHoveredSpaceFulfilled,
      spaceId,
    })
  }
}

export function setActiveSpace(spaceId: TSpaceId) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: setActiveSpaceFulfilled,
      spaceId,
    })
  }
}

export function clearActiveSpace() {
  return (dispatch: Dispatch<Action>) =>
    dispatch({ type: clearActiveSpaceFulfilled })
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesOpen(filter: boolean) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterSpacesOpenRequested,
      filter,
    })
  }
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesOutlets(filter: number) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterSpacesOutletsRequested,
      filter,
    })
  }
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesNoise(filter: number) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterSpacesNoiseRequested,
      filter,
    })
  }
}

// TODO DOCS / ERROR CHECKING
export const filterSpacesGroups = (filter: number) => (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterSpacesGroupsRequested,
      filter,
    })
  }

export const filterOnCampus = (filter: boolean) => (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterOnCampusRequested,
      filter,
    })
  }

/**
 *
 * @param {string} filter filterString from user input
 */
export const filterSpacesString = (filter: string) => (dispatch: Dispatch<Action>) => {
    dispatch({
      type: filterSpacesStringRequested,
      filter,
    })
  }

export function clearSpacesFilters() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: clearFilterSpacesRequested })
  }
}

export const toggleSpacesOpen = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_OPEN })

export const toggleSpacesOutlets = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_OUTLETS })

export const toggleSpacesNoise = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_NOISE })

export const toggleSpacesGroups = () => (dispatch: Dispatch<Action>) =>
  dispatch({ type: TOGGLE_FILTER_SPACES_GROUPS })
