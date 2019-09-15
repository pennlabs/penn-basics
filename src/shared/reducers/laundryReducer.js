import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateLaundryFavorites,
  getFavoritesHome,
  updateReminders,
  updateIntervalID,
} from '../actions/action_types'

const defaultState = {
  pending: true,
  error: false,
  laundryHalls: null,
  laundryHallInfo: null,
  favorites: [],
  favoritesHome: [],
  reminders: [],
  intervalID: null,
}

const laundryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getLaundryHallsDataRequested:
      return {
        ...state,
        pending: true,
      }
    case getLaundryHallsDataRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case getLaundryHallsDataFulfilled:
      return {
        ...state,
        pending: false,
        laundryHalls: action.laundryHalls,
      }
    case getLaundryHallInfoRequested:
      return {
        ...state,
        pending: true,
      }
    case getLaundryHallInfoRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case getLaundryHallInfoFulfilled:
      return {
        ...state,
        pending: false,
        laundryHallInfo: action.laundryHallInfo,
        laundryHallId: action.laundryHallId,
      }
    case updateLaundryFavorites:
      return {
        ...state,
        favorites: action.favorites,
      }
    case getFavoritesHome:
      return {
        ...state,
        favoritesHome: action.favorites,
      }
    case updateReminders:
      return {
        ...state,
        reminders: action.reminders,
      }
    case updateIntervalID:
      return {
        ...state,
        intervalID: action.intervalID,
      }
    default:
      return state
  }
}

export default laundryReducer
