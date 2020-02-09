import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
} from '../actions/action_types'
import { AnyAction } from 'redux'

import { IVenueHour } from '../types'

type TVenueHour = Record<number, IVenueHour>

interface IDiningReducerState {
  error: string | null
  favorites: string[]
  venueHoursPending: boolean
  venueHours: TVenueHour | null
}

const defaultState : IDiningReducerState = {
  error: null,
  favorites: [],
  venueHoursPending: true,
  venueHours: null,
}

const diningReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case getVenueInfoRequested:
      return {
        ...state,
        venueHoursPending: true,
      }
    case getVenueInfoRejected:
      return {
        ...state,
        venueHoursPending: false,
        error: action.error,
      }
    case getVenueInfoFulfilled:
      return {
        ...state,
        venueHoursPending: false,
        venueHours: action.venueHours,
      }
    case updateDiningFavorites:
      return {
        ...state,
        favorites: action.favorites,
      }
    default:
      return state
  }
}

export default diningReducer
