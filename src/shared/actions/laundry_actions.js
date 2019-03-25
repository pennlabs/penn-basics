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
  getFavoritesHome1,
  getFavoritesHome2,
  getFavoritesHome3
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

export function getFavoritesHomePage1(laundryHall) {
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallInfoRequested
    });

    try {
      if (!laundryHall.hallId){
        dispatch({
          type: getFavoritesHome1,
          favorite: {}
        });
      }
      const { locationName, hallId } = laundryHall
      const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallId}`);

      const { data } = axiosResponse;
      let favorite = {};
      favorite.locationName = locationName;
      favorite.dryers = data.machines.dryers;
      favorite.washers = data.machines.washers;
      dispatch({
        type: getFavoritesHome1,
        favorite
      });
    } catch (error) {
      dispatch({
        type: getLaundryHallInfoRejected,
        error: error.message,
      });
    }
  }
}

export function getFavoritesHomePage2(laundryHall) {
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallInfoRequested
    });

    try {
      if (!laundryHall.hallId){
        dispatch({
          type: getFavoritesHome2,
          favorite: {}
        });
      }
      const { locationName, hallId } = laundryHall
      const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallId}`);

      const { data } = axiosResponse;
      let favorite = {};
      favorite.locationName = locationName;
      favorite.dryers = data.machines.dryers;
      favorite.washers = data.machines.washers;
      dispatch({
        type: getFavoritesHome2,
        favorite
      });
    } catch (error) {
      dispatch({
        type: getLaundryHallInfoRejected,
        error: error.message,
      });
    }
  }
}

export function getFavoritesHomePage3(laundryHall) {
  return async (dispatch) => {
    dispatch({
      type: getLaundryHallInfoRequested
    });

    try {
      if (!laundryHall.hallId){
        dispatch({
          type: getFavoritesHome3,
          favorite: {}
        });
      }
      const { locationName, hallId } = laundryHall
      const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallId}`);

      const { data } = axiosResponse;
      let favorite = {};
      favorite.locationName = locationName;
      favorite.dryers = data.machines.dryers;
      favorite.washers = data.machines.washers;
      dispatch({
        type: getFavoritesHome3,
        favorite
      });
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
