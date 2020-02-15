import { Action } from 'redux'

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateLaundryFavorites,
  getFavoritesHome,
  browserSupportRejected,
  getRemindersRejected,
  updateReminders,
  updateHallIntervalID,
  updateReminderIntervalID,
} from '../actions/action_types'

import {
  ILaundryHall,
  ILaundryHallInfo,
  IFavorite,
  ILaundryReducerState,
  IFavoriteHome,
  IReminder
} from '../../types/laundry'

const defaultState: ILaundryReducerState = {
  pending: true,
  error: '',
  browserError: '',
  laundryHalls: [],
  laundryHallInfo: {
    hall_name: '',
    location: '',
    machines: {
      details: [],
      dryers: {
        offline: -1,
        open: -1,
        out_of_order: -1,
        running: -1,
        time_remaining: []
      },
      washers: {
        offline: -1,
        open: -1,
        out_of_order: -1,
        running: -1,
        time_remaining: []
      }
    }
  },
  favorites: [],
  favoritesHome: [],
  reminders: [],
  hallIntervalID: -1,
  reminderIntervalID: -1,
}

type ILaundryAction = {
  error?: string
  favorites?: IFavorite[]
  favoritesHome?: IFavoriteHome[]
  laundryHalls?: ILaundryHall[]
  intervalID?: number
  laundryHallInfo?: ILaundryHallInfo
  reminders?: IReminder[]
} & Action

const laundryReducer = (state = defaultState, action: ILaundryAction) => {
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
      }
    case updateLaundryFavorites:
      return {
        ...state,
        favorites: action.favorites,
      }
    case getFavoritesHome:
      return {
        ...state,
        favoritesHome: action.favoritesHome,
      }
    case browserSupportRejected:
      return {
        ...state,
        browserError: action.error,
      }
    case getRemindersRejected:
      return {
        ...state,
        error: action.error,
      }
    case updateReminders:
      return {
        ...state,
        reminders: action.reminders,
      }
    case updateHallIntervalID:
      return {
        ...state,
        hallIntervalID: action.intervalID,
      }
    case updateReminderIntervalID:
      return {
        ...state,
        reminderIntervalID: action.intervalID,
      }
    default:
      return state
  }
}

export default laundryReducer
