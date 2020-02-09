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

const defaultState = {
  pending: true,
  error: null,
  browserError: null,
  laundryHalls: null,
  laundryHallInfo: null,
  favorites: [],
  favoritesHome: [],
  reminders: [],
  hallIntervalID: null,
  reminderIntervalID: null,
}

interface IFavoritesProps {
  locationName: string
  hallId: number
}

interface ILaundryHallInfo {
  hall_name: string
  id: number
  location: string
}

interface ILaundryHallProps {
  location: string
  halls: [ILaundryHallInfo]
}

interface IDetailProps {
  id: number
  status: string
  time_remaining: number
  type: string
}

interface IMachinesProps {
  dryers: {
    offline: number
    open: number
    out_of_order: number
    running: number
    time_remaining: number[] | number
  }
  washers: {
    offline: number
    open: number
    out_of_order: number
    running: number
    time_remaining: number[] | number
  }
  details: IDetailProps[]
}

interface ILaundryHallInfoProps {
  hall_name: string
  location: string
  machines: IMachinesProps[]
}

type ILaundryAction = {
  error?: string
  favorites?: IFavoritesProps
  laundryHalls?: ILaundryHallProps
  intervalID?: number
  laundryHallInfo?: ILaundryHallInfoProps
  reminders?: []
} & Action

const laundryReducer = (state = defaultState, action : ILaundryAction) => {
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
        favoritesHome: action.favorites,
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
