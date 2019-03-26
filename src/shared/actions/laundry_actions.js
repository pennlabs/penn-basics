import axios from 'axios';
import _ from 'lodash';

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateFavorites,
  getFavoritesHome,
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

export function getFavoritesHomePage(laundryHalls) {
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallInfoRequested
    });

    const IdArray = laundryHalls.map(hall => hall.hallId);

    try {
      if (IdArray.length === 0) {
        dispatch({
          type: getFavoritesHome,
          favorites: []
        });
      } else if (IdArray.length === 1) {
        const axiosResponse = await axios.get(`${BASE}/laundry/hall/${IdArray[0]}`);
        const { data } = axiosResponse;
        dispatch({
          type: getFavoritesHome,
          favorites: [data]
        });
      } else if (IdArray.length === 2) {
        const axiosResponse1 = await axios.get(`${BASE}/laundry/hall/${IdArray[0]}`);
        const axiosResponse2 = await axios.get(`${BASE}/laundry/hall/${IdArray[1]}`);
        const data1 = axiosResponse1.data;
        const data2 = axiosResponse2.data;
        dispatch({
          type: getFavoritesHome,
          favorites: [data1, data2]
        });
      } else {
        const axiosResponse1 = await axios.get(`${BASE}/laundry/hall/${IdArray[0]}`);
        const axiosResponse2 = await axios.get(`${BASE}/laundry/hall/${IdArray[1]}`);
        const axiosResponse3 = await axios.get(`${BASE}/laundry/hall/${IdArray[2]}`);
        const data1 = axiosResponse1.data;
        const data2 = axiosResponse2.data;
        const data3 = axiosResponse3.data;
        dispatch({
          type: getFavoritesHome,
          favorites: [data1, data2, data3]
        });
      }
    } catch (error) {
      dispatch({
        type: getLaundryHallInfoRejected,
        error: error.message,
      });
    }
  }
}

export function getFavorites() {
  return (dispatch) => {
    let favorites = localStorage.getItem('laundry_favorites');
    if (favorites) {
      favorites = JSON.parse(favorites);
    } else {
      localStorage.setItem('laundry_favorites', JSON.stringify([]));
      favorites = [];
    }
    dispatch({
      type: updateFavorites,
      favorites,
    });
  };
}

export function addFavorite(laundryHallId, location, hallName) {
  return async (dispatch) => {
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format
    const favoritesString = localStorage.getItem("laundry_favorites");

    let favoritesArray = [];
    const favoriteLocation = {};

    // update fields for favoritesArray
    favoriteLocation.locationName = `${location}: ${hallName}`;
    favoriteLocation.hallId = laundryHallId;

    if (!favoritesString) {
      favoritesArray = [favoriteLocation];
    } else {
      favoritesArray = JSON.parse(favoritesString);
      if (!favoritesArray.some(favorite => favorite.hallId === favoriteLocation.hallId)) {
        favoritesArray.push(favoriteLocation);
      }
    }

    localStorage.setItem("laundry_favorites", JSON.stringify(favoritesArray));

    dispatch({
      type: updateFavorites,
      favorites: favoritesArray,
    });
  };
}

export function removeFavorite(laundryHallId) {
  return (dispatch) => {
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format

    const favoritesString = localStorage.getItem("laundry_favorites");

    let favoritesArray = JSON.parse(favoritesString);

    favoritesArray.forEach((favorite, index) => {
      if (favorite.hallId === laundryHallId) {
        favoritesArray.splice(index, 1);
      }
    })

    localStorage.setItem("laundry_favorites", JSON.stringify(favoritesArray));
    dispatch({
      type: updateFavorites,
      favorites: favoritesArray,
    });
  };
}
