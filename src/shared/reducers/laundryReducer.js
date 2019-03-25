// TODO: this file is currently the same as dining

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateFavorites,
  getFavoritesHome1,
  getFavoritesHome2,
  getFavoritesHome3
} from '../actions/action_types';

const defaultState = {
  pending: true,
  error: false,
  laundryHalls: null,
  laundryHallInfo: null,
  favorites: [],
  favoriteHome1: {},
  favoriteHome2: {},
  favoriteHome3: {}
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
    case updateFavorites:
      return {
        ...state,
        favorites: action.favorites,
      };
    case getFavoritesHome1:
      return {
        ...state,
        favoriteHome1: action.favorite,
      }
    case getFavoritesHome2:
      return {
        ...state,
        favoriteHome2: action.favorite,
      }
    case getFavoritesHome3:
      return {
        ...state,
        favoriteHome3: action.favorite,
      }
    default:
      return state;
  }
};
export default laundryReducer;
