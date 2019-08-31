/* globals localStorage */
import axios from 'axios'
import _ from 'lodash'

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateFavorites,
  getFavoritesHome,
  updateReminder
} from './action_types';

const publicVapidKey = "BJVQhZ9UzolT01excKsF0DnBAzasAxs0VbmYxI208_sn-WHgqsDNsK8RCUVwwGQ34O8yvDqbZwoQ8xH2kznhz74";
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

export const getFavoritesHomePage = () => (dispatch) => {
  dispatch({ type: getLaundryHallInfoRequested })

  // get the list of laundry halls from local storage
  const laundryHalls = JSON.parse(localStorage.getItem('laundry_favorites'))
  // get the first 3 halls
  let IdArray = []
  // only update IdArray if laundryHalls exist
  if (laundryHalls) {
    IdArray = laundryHalls.map((hall, index) => {
      if (index <= 2) {
        return hall.hallId
      }

      return null
    });
  }

  // remove the null Id in the array
  IdArray = IdArray.filter(id => id !== null)
  // get the set of Promise set
  const responsesSet = IdArray.map(id => axios.get(`${BASE}/laundry/hall/${id}`))
  // dispatch information from the Promise set
  try {
    Promise.all(responsesSet).then((values) => {
      const dataSet = values.map((value) => {
        if (!value.error) {
          return value.data;
        }

        return null;
      });

      dispatch({
        type: getFavoritesHome,
        favorites: dataSet,
      })
    })
  } catch (error) {
    dispatch({
      type: getLaundryHallInfoRejected,
      error: error.message,
    })
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
    const favoritesString = localStorage.getItem('laundry_favorites');

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

    localStorage.setItem('laundry_favorites', JSON.stringify(favoritesArray));

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

    const favoritesString = localStorage.getItem('laundry_favorites');
    const favoritesArray = JSON.parse(favoritesString)

    favoritesArray.forEach((favorite, index) => {
      if (favorite.hallId === laundryHallId) {
        favoritesArray.splice(index, 1);
      }
    })

    localStorage.setItem('laundry_favorites', JSON.stringify(favoritesArray));
    dispatch({
      type: updateFavorites,
      favorites: favoritesArray,
    });
  };
}

export function handleReminder(machineID, hallID, register, reminded) {
  console.log(register);
  console.log(reminded);
  return async (dispatch) => {
    if (!reminded) {
      console.log('reminder is set');
      register = await navigator.serviceWorker.register('/laundry_worker.js', {
        scope: '/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallID}`);
      const { data } = axiosResponse;
      const machine = data.machines.details.filter(detail => detail.id == machineID);
      const time_remaining = machine[0].time_remaining;

      dispatch({
        type: updateReminder,
        register,
        reminded: true
      })

      await axios.post('/api/laundry/reminder', { subscription, time_remaining });

      dispatch({
        type: updateReminder,
        register,
        reminded: false
      })
    } else {
      register.unregister().then((cancelled) => {
        if (cancelled){
          console.log('reminder is cancelled');
          dispatch({
            type: updateReminder,
            register,
            reminded: false
          });
        }
      })
    }
  }
}

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}