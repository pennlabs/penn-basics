/* globals localStorage */
import axios from 'axios'
import _ from 'lodash'
import uuidv4 from 'uuid/v4'

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  updateFavorites,
  getFavoritesHome,
  updateReminders
} from './action_types';

const publicVapidKey =
  'BFlvGJCEH3s7ofWwBy-h-VSzGiQmBD_Mg80qpA-nkBUeRBFJPN4-YjPu5zE3oRy1uFCG9fyfMhyVnElGhI-fQb8'
const BASE = 'http://api.pennlabs.org'

function processLaundryHallsData(idData) {
  const groupByLocation = _.groupBy(idData.halls, obj => obj.location)
  return Object.keys(groupByLocation).map(locationName => {
    //eslint-disable-line
    return {
      location: locationName,
      halls: groupByLocation[locationName],
    }
  })
}

export function getLaundryHalls() {
  // eslint-disable-line
  return async dispatch => {
    dispatch({
      type: getLaundryHallsDataRequested,
    })
    try {
      const idData = await axios.get(`${BASE}/laundry/halls/ids`)
      const laundryHalls = processLaundryHallsData(idData.data)

      dispatch({
        type: getLaundryHallsDataFulfilled,
        laundryHalls,
      })
    } catch (error) {
      dispatch({
        type: getLaundryHallsDataRejected,
        error: error.message,
      })
    }
  }
}

export function getLaundryHall(laundryHallId) {
  // eslint-disable-line
  return async dispatch => {
    dispatch({
      type: getLaundryHallInfoRequested,
    })
    try {
      const axiosResponse = await axios.get(
        `${BASE}/laundry/hall/${laundryHallId}`
      )

      const { data } = axiosResponse
      dispatch({
        type: getLaundryHallInfoFulfilled,
        laundryHallInfo: data,
        laundryHallId,
      })
    } catch (error) {
      dispatch({
        type: getLaundryHallInfoRejected,
        error: error.message,
      })
    }
  }
}

export const getFavoritesHomePage = () => dispatch => {
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
    })
  }

  // remove the null Id in the array
  IdArray = IdArray.filter(id => id !== null)
  // get the set of Promise set
  const responsesSet = IdArray.map(id =>
    axios.get(`${BASE}/laundry/hall/${id}`)
  )
  // dispatch information from the Promise set
  try {
    Promise.all(responsesSet).then(values => {
      const dataSet = values.map(value => {
        if (!value.error) {
          return value.data
        }

        return null
      })

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
  return dispatch => {
    let favorites = localStorage.getItem('laundry_favorites')
    if (favorites) {
      favorites = JSON.parse(favorites)
    } else {
      localStorage.setItem('laundry_favorites', JSON.stringify([]))
      favorites = []
    }
    dispatch({
      type: updateFavorites,
      favorites,
    })
  }
}

export function addFavorite(laundryHallId, location, hallName) {
  return async dispatch => {
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format
    const favoritesString = localStorage.getItem('laundry_favorites')

    let favoritesArray = []
    const favoriteLocation = {}

    // update fields for favoritesArray
    favoriteLocation.locationName = `${location}: ${hallName}`
    favoriteLocation.hallId = laundryHallId

    if (!favoritesString) {
      favoritesArray = [favoriteLocation]
    } else {
      favoritesArray = JSON.parse(favoritesString)
      if (
        !favoritesArray.some(
          favorite => favorite.hallId === favoriteLocation.hallId
        )
      ) {
        favoritesArray.push(favoriteLocation)
      }
    }

    localStorage.setItem('laundry_favorites', JSON.stringify(favoritesArray))

    dispatch({
      type: updateFavorites,
      favorites: favoritesArray,
    })
  }
}

export function removeFavorite(laundryHallId) {
  return dispatch => {
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format

    const favoritesString = localStorage.getItem('laundry_favorites')
    const favoritesArray = JSON.parse(favoritesString)

    favoritesArray.forEach((favorite, index) => {
      if (favorite.hallId === laundryHallId) {
        favoritesArray.splice(index, 1)
      }
    })

    localStorage.setItem('laundry_favorites', JSON.stringify(favoritesArray))
    dispatch({
      type: updateFavorites,
      favorites: favoritesArray,
    })
  }
}

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const getReminders = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
  }

  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      throw new Error('permission not granted for notification')
    }
  })

  // TODO: clear the notifications list once in a while
  // navigator.serviceWorker.getRegistrations().then(registrations => {
  //   registrations.forEach(registration => {
  //     registration.unregister().then(successful => {
  //       if (successful){

  //       }
  //     })
  //   })
  // })

  navigator.serviceWorker.register('/sw.js')

  return (dispatch) => {
    let reminders = localStorage.getItem('laundry_reminders')
    if (reminders) {
      reminders = JSON.parse(reminders)
      console.log('----reminders----')
      console.log(reminders)
      let newReminders = []
      navigator.serviceWorker.getRegistrations().then(registrations => {
        console.log(registrations)
      })
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          console.log("---notifications----")
          console.log(notifications)
          reminders.forEach(reminder => {
            const notified = notifications.some(notification =>
              notification.data.machineID == reminder.machineID &&
              notification.data.hallID == reminder.hallID &&
              notification.data.reminderID == reminder.reminderID
            )
            console.log(notified)
            if (!notified) {
              newReminders.push(reminder)
            }
          })
          localStorage.setItem('laundry_reminders', JSON.stringify(newReminders))
          dispatch({
            type: updateReminders,
            reminders: newReminders
          })
        })
      })
    } else {
      localStorage.setItem('laundry_reminders', JSON.stringify([]))
      dispatch({
        type: updateReminders,
        reminders: [],
      });
    }
  }
}

export const addReminder = (machineID, hallID, hallName) => {
  return (dispatch) => {
    try {
      navigator.serviceWorker.register('/sw.js')

      navigator.serviceWorker.ready
        .then(registration => {
          // const response = await fetch('/api/laundry/vapidPublicKey');
          // const vapidPublicKey = await response.text();

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            // applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          });
        }).then(async subscription => {
          let reminders = JSON.parse(localStorage.getItem('laundry_reminders'))
          const reminderID = uuidv4()
          reminders.push({ machineID, hallID, reminderID })
          dispatch({
            type: updateReminders,
            reminders
          })
          localStorage.setItem('laundry_reminders', JSON.stringify(reminders))

          const axiosResponse = await axios.post('/api/laundry/addReminder', { subscription, machineID, hallID, hallName, reminderID })

          if (!axiosResponse.data.error) {
            reminders = JSON.parse(localStorage.getItem('laundry_reminders'))
            reminders = reminders.filter(reminder => reminder.machineID != machineID || reminder.hallID != hallID)
            dispatch({
              type: updateReminders,
              reminders
            })
            localStorage.setItem('laundry_reminders', JSON.stringify(reminders))
          }
        })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
}

export const removeReminder = () => {
  return (dispatch) => {
    navigator.serviceWorker.ready.then(registration => {
      return registration.pushManager.getSubscription()
    }).then(subscription => {
      subscription.unsubscribe().then(async successful => {
        if (successful) {
          dispatch({
            type: updateReminders,
            reminders: []
          })
          localStorage.setItem('laundry_reminders', JSON.stringify([]))
          console.log("----Service Worker: Unsubscription successful----")
        }
      })
    })
  }
}
