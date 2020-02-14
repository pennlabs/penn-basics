/* globals localStorage, window, navigator, Notification, indexedDB */
import axios from 'axios'
import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import { Dispatch, Action } from 'redux'
import { isValidNumericId } from '../../utils/helperFunctions'

import {
  getLaundryHallsDataRequested,
  getLaundryHallsDataRejected,
  getLaundryHallsDataFulfilled,
  getLaundryHallInfoRequested,
  getLaundryHallInfoRejected,
  getLaundryHallInfoFulfilled,
  getFavoritesHome,
  updateLaundryFavorites,
  getRemindersRejected,
  updateReminders,
  browserSupportRejected,
  updateHallIntervalID,
  updateReminderIntervalID,
} from './action_types'
import { logEvent } from '../../utils/analytics'
import { IReminder, ILaundryHallGeneralInfo, IFavorite } from '../../types'

const BASE = 'https://api.pennlabs.org'

interface IidData {
  halls: ILaundryHallGeneralInfo[]
}

const processLaundryHallsData = (idData: IidData) => {
  const groupByLocation = _.groupBy(idData.halls, obj => obj.location)
  return Object.keys(groupByLocation).map(locationName =>
    //eslint-disable-line
     ({
      location: locationName,
      halls: groupByLocation[locationName],
    })
  )
}

export const getLaundryHalls = () => async (dispatch: Dispatch<Action>): Promise<void> => {
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

const getLaundryHallInterval = async (dispatch: Dispatch<Action>, laundryHallId: number) => {
  if (!isValidNumericId(laundryHallId)) {
    dispatch({
      type: getLaundryHallInfoRejected,
      error: 'Missing laundryHallId',
    })
    return
  }

  // TODO why is this being reused??? should be separate actions
  // TODO why is this called interval????
  // Document this...
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
    })
  } catch (error) {
    dispatch({
      type: getLaundryHallInfoRejected,
      error: error.message,
    })
  }
}

export function getLaundryHall(laundryHallId: number, prevIntervalID: number) {
  return async (dispatch: Dispatch<Action>) => {
    if (prevIntervalID) {
      clearInterval(prevIntervalID)
      dispatch({
        type: updateHallIntervalID,
        intervalID: null,
      })
    }

    getLaundryHallInterval(dispatch, laundryHallId)

    const intervalID = setInterval(() => {
      getLaundryHallInterval(dispatch, laundryHallId)
    }, 5 * 1000)

    dispatch({
      type: updateHallIntervalID,
      intervalID,
    })
  }
}

// TODO document....
export const getFavoritesHomePage = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: getLaundryHallInfoRequested })

  // Get the list of laundry halls from local storage
  const laundryHallsString = localStorage.getItem('laundry_favorites')

  if (!laundryHallsString) {return}

  let laundryHalls: IFavorite[] = JSON.parse(laundryHallsString)
  laundryHalls = laundryHalls.splice(0, 3)

  // Get the first 3 halls
  let IdArray: number[] = []

  // Only update IdArray if laundryHalls exist
  if (laundryHalls) {
    IdArray = laundryHalls.map(hall => hall.hallId)
  }

  // Remove the null Id in the array
  IdArray = IdArray.filter(id => id !== null)

  // Get the set of Promise set
  const responsesSet = IdArray.filter(isValidNumericId).map(id =>
    axios.get(`${BASE}/laundry/hall/${id}`)
  )

  // Dispatch information from the Promise set
  try {
    Promise.all(responsesSet).then(values => {
      const dataSet = values.map((value, idx) => {
        const { data } = value
        data.id = IdArray[idx]
        return data
      })

      dispatch({
        type: getFavoritesHome,
        favoritesHome: dataSet,
      })
    })
  } catch (error) {
    dispatch({
      type: getLaundryHallInfoRejected,
      error: error.message,
    })
  }
}

export const getFavorites = () => (dispatch: Dispatch<Action>) => {
    const favorites = localStorage.getItem('laundry_favorites')
    let favoritesArray: IFavorite[] = []
    if (favorites) {
      // Read in from localStore, map from strings to numbers
      favoritesArray = JSON.parse(favorites)
      favoritesArray = favoritesArray.map(fav => Object.assign({}, fav, { hallId: Number(fav.hallId) }))
    } else {
      localStorage.setItem('laundry_favorites', JSON.stringify([]))
      favoritesArray = []
    }
    dispatch({
      type: updateLaundryFavorites,
      favorites,
    })
  }

export const addFavorite = (hallURLId: number, location: string, hallName: string) => async (dispatch: Dispatch<Action>) => {
    logEvent('laundry', 'addFavorite')
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format
    const favoritesString = localStorage.getItem('laundry_favorites')

    let favoritesArray: IFavorite[] = []
    const favoriteLocation: IFavorite = { locationName: '', hallId: -1 }

    // update fields for favoritesArray
    favoriteLocation.locationName = `${location}: ${hallName}`
    favoriteLocation.hallId = hallURLId

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
      type: updateLaundryFavorites,
      favorites: favoritesArray,
    })
  }

export const removeFavorite = (hallURLId: number) => (dispatch: Dispatch<Action>) => {
    logEvent('laundry', 'removeFavorite')
    // favoritesString is the raw data taken from localStorage
    // therefore is in string format
    const favoritesString = localStorage.getItem('laundry_favorites')
    let favoritesArray: IFavorite[] = []
    if (favoritesString) {
      favoritesArray = JSON.parse(favoritesString)
    }

    favoritesArray.forEach((favorite, index) => {
      if (favorite.hallId === hallURLId) {
        favoritesArray.splice(index, 1)
      }
    })

    localStorage.setItem('laundry_favorites', JSON.stringify(favoritesArray))
    dispatch({
      type: updateLaundryFavorites,
      favorites: favoritesArray,
    })
  }

export const checkBrowserCompatability = () => (dispatch: Dispatch<Action>) => {
    try {
      if (!Notification || !Notification.requestPermission()) {
        dispatch({
          type: browserSupportRejected,
          error: 'Notifications is not supported for your browser',
        })
      } else {
        Notification.requestPermission().then(permission => {
          if (permission !== 'granted') {
            dispatch({
              type: browserSupportRejected,
              error: 'Please enable notifications to support laundry reminders',
            })
          }
        })
      }

      if (!('serviceWorker' in navigator) || !window.indexedDB) {
        dispatch({
          type: browserSupportRejected,
          error:
            'Laundry reminder is currently not supported for your browser. Please consider upgrading to the latest version!',
        })
      } else {
        navigator.serviceWorker.register('/sw.js')
        navigator.serviceWorker.ready.then(async registration => {
          // serviceWorker can only subscribe once
          // --> need to clear the previous subscription first
          await registration.pushManager
            .getSubscription()
            .then(subscription => {
              if (subscription) {
                subscription.unsubscribe()
              }
            })
          await registration.update()
        })
      }

      if (!('PushManager' in window)) {
        dispatch({
          type: browserSupportRejected,
          error:
            'Laundry reminder is not supported for your browser. Please consider switching to Chrome or Firefox!',
        })
      }
    } catch (err) {
      dispatch({
        type: browserSupportRejected,
        error: err.message || 'Sorry, an error occurred.',
      })
    }
  }

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const getRemindersInterval = (dispatch: Dispatch<Action>) => {
  if (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    window.indexedDB &&
    Notification.permission === 'granted'
  ) {
    // DB Name: LocalDB
    // Object Store: laundryReminders
    // Key: hallMachineID ({hallID}-{machineID})
    // value: reminderID
    const dbRequest = indexedDB.open('LocalDB', 1) // opens the first version of LocalDB

    // TODO: change event
    dbRequest.onerror = (event: any) => {
      // triggered when request to LocalDB fails
      if (event.target && event.target.errorCode) {
        dispatch({
          type: getRemindersRejected,
          error: event.target.errorCode,
        })
      }
    }

    dbRequest.onupgradeneeded = (event: any) => {
      // triggered when there is a change in the DB structure
      if (event.target) {
        const db = event.target.result
        db.createObjectStore('laundryReminders', { keyPath: 'hallMachineID' })
      }
    }

    dbRequest.onsuccess = (event: any) => {
      // triggered when request to LocalDB is successful
      if (!event.target) {return}
      const db = event.target.result
      const reminders = localStorage.getItem('laundry_reminders')
      let remindersArray: IReminder[] = []
      if (reminders) {
        // create a transaction that interacts with the object store
        const transaction = db.transaction(['laundryReminders'], 'readonly')

        remindersArray = JSON.parse(reminders)
        const newReminders: IReminder[] = []

        transaction.oncomplete = () => {
          localStorage.setItem(
            'laundry_reminders',
            JSON.stringify(newReminders)
          )
          dispatch({
            type: updateReminders,
            reminders: newReminders,
          })
          console.log('---complete updating reminders from localStorage----') // eslint-disable-line
        }

        transaction.onerror = (e: any) => {
          if (!e.target) {return}
          dispatch({
            type: getRemindersRejected,
            error: e.target.errorCode,
          })
        }

        // creates a reference to the objectStore
        const objectStore = transaction.objectStore('laundryReminders')

        remindersArray.forEach(reminder => {
          const storeRequest = objectStore.get(
            `${reminder.hallID}-${reminder.machineID}`
          )

          storeRequest.onsuccess = (e: any) => {
            if (!e.target) {return}
            const { result } = e.target
            if (
              !result ||
              (result && result.reminderID !== reminder.reminderID)
            ) {
              newReminders.push(reminder)
            }
          }

          storeRequest.onerror = (e: any) => {
            if (!e.target) {return}
            dispatch({
              type: getRemindersRejected,
              error: e.target.errorCode,
            })
          }
        })
      } else {
        localStorage.setItem('laundry_reminders', JSON.stringify([]))
        dispatch({
          type: updateReminders,
          reminders: [],
        })
      }
    }
  }
}

// TODO document this
export const getReminders = () => (dispatch: Dispatch<Action>) => {
    getRemindersInterval(dispatch)

    const intervalID = setInterval(() => {
      getRemindersInterval(dispatch)
    }, 5 * 1000)

    dispatch({
      type: updateReminderIntervalID,
      intervalID,
    })
  }

export const addReminder = (
  machineID: number,
  hallID: number,
  machineType: string,
  timeRemaining: number
) => (dispatch: Dispatch<Action>) => {
    try {
      navigator.serviceWorker.ready.then(async registration => {
        // get public vapid key
        const resp = await axios.get('/api/getPublicVapidKey')
        const { publicKey: publicVapidKey } = resp.data

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        })

        const remindersString = localStorage.getItem('laundry_reminders')
        if (!remindersString) {return}

        const reminders = JSON.parse(remindersString)
        const reminderID = uuidv4()
        reminders.push({ machineID, hallID, reminderID })
        dispatch({
          type: updateReminders,
          reminders,
        })
        localStorage.setItem('laundry_reminders', JSON.stringify(reminders))
        axios.post('/api/laundry/reminder/add', {
          subscription,
          machineID,
          hallID,
          machineType,
          timeRemaining,
          reminderID,
        })
      })
    } catch (err) {
      dispatch({
        type: getRemindersRejected,
        error: 'Error: fail to set reminder',
      })
    }
  }

export const removeReminder = () => (dispatch: Dispatch<Action>) => {
    try {
      navigator.serviceWorker.ready
        .then(registration => registration.pushManager.getSubscription())
        .then(subscription => {
          if (!subscription) {return}
          subscription.unsubscribe().then(async successful => {
            if (successful) {
              dispatch({
                type: updateReminders,
                reminders: [],
              })
              localStorage.setItem('laundry_reminders', JSON.stringify([]))
            }
          })
        })
    } catch (err) {
      dispatch({
        type: getRemindersRejected,
        error: 'Error: fail to remove reminder',
      })
    }
  }
