import axios from 'axios';
import _ from 'lodash';

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  pullLaundryFavorites,
} from './action_types';

const BASE = 'http://api.pennlabs.org';

function processLaundryHallsData(idData) {
  const groupByLocation = _.groupBy(idData.halls, obj => obj.location);
  return Object.keys(groupByLocation).map((locationName) => { //eslint-disable-line
    return {
      location: locationName,
      halls: groupByLocation[locationName],
    };
  });
}

export function getLaundryHalls() { // eslint-disable-line
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallsDataRequested,
    });
    try {
      const idData = await axios.get(`${BASE}/laundry/halls/ids`);
      const laundryHalls = processLaundryHallsData(idData.data);

      dispatch({
        type: getLaundryHallsDataFulfilled,
        laundryHalls,
      });
    } catch (error) {
      dispatch({
        type: getLaundryHallsDataRejected,
        error: error.message,
      });
    }
  };
}

export function getLaundryHall(laundryHallId) { // eslint-disable-line
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallInfoRequested,
    });
    try {
      const axiosResponse = await axios.get(`${BASE}/laundry/hall/${laundryHallId}`);
      const { data } = axiosResponse;
      dispatch({
        type: getLaundryHallInfoFulfilled,
        laundryHallInfo: data,
        laundryHallId,
      });
    } catch (error) {
      dispatch({
        type: getLaundryHallInfoRejected,
        error: error.message,
      });
    }
  };
}


export function getFavorites() {
  return (dispatch) => {
    let favorites = localStorage.getItem('laundry_favorites');
    console.log(favorites)
    if (favorites == null) {
      localStorage.setItem('laundry_favorites', []);
      favorites = [];
    }
    dispatch({
      type: pullLaundryFavorites,
      favorites,
    });
  };
}

// export function addFavorite(hallInfo) {
//   return (dispatch) => {
//     const favorites = 
//   }
// }
