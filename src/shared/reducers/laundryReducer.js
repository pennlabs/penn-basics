// TODO: this file is currently the same as dining

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  pullLaundryFavorites,
} from '../actions/action_types';

const defaultState = {
  pending: true,
  error: false,
  laundryHalls: null,
  laundryHallInfo: null,
  favorites: [],
};

const laundryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getLaundryHallsDataRequested:
      return {
        ...state,
        pending: true,
      };
    case getLaundryHallsDataRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case getLaundryHallsDataFulfilled:
      return {
        ...state,
        pending: false,
        laundryHalls: action.laundryHalls,
      };
    case getLaundryHallInfoRequested:
      return {
        ...state,
        pending: true,
      };
    case getLaundryHallInfoRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case getLaundryHallInfoFulfilled:
      return {
        ...state,
        pending: false,
        laundryHallInfo: action.laundryHallInfo,
        laundryHallId: action.laundryHallId,
      };
    case pullLaundryFavorites:
      return {
        ...state,
        favorites: action.favorites,
      };
    default:
      return state;
  }
};
export default laundryReducer;
