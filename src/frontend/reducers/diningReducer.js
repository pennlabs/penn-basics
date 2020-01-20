import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
} from '../actions/action_types'

const defaultState = {
  error: null,
  favorites: [],
  venueHoursPending: true,
  venueHours: null,
}

const diningReducer = (state = defaultState, action) => {
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
