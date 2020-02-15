import { Action } from 'redux'
import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
} from '../actions/action_types'

import { IDiningReducerState, TVenueHours, IFavorite } from '../../types/dining'

const defaultState: IDiningReducerState = {
  error: '',
  favorites: [],
  venueHoursPending: true,
  venueHours: {},
}

type IDiningAction = {
  error?: string
  venueHours?: TVenueHours
  favorites?: IFavorite[]
} & Action

const diningReducer = (state = defaultState, action: IDiningAction) => {
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
