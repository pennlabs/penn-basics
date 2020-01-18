/* global localStorage */
import axios from 'axios'

import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
  getVenueHoursFulfilled,
} from './action_types'
import { logEvent } from '../../utils/analytics'
import venueMapping from '../../server/resources/dining/venue_id_mappings.json'

export const getVenueHours = () => {
  return dispatch => {
    const venueIds = Object.values(venueMapping)
    const responsesSet = venueIds.map(id =>
      axios.get(`https://api.pennlabs.org/dining/hours/${id}`)
    )

    // Dispatch information from the Promise set
    try {
      Promise.all(responsesSet).then(values => {
        const dataSet = {}
        values.forEach((value, idx) => {
          dataSet[venueIds[idx]] = value.data.cafes[venueIds[idx]].days
        })

        dispatch({
          type: getVenueHoursFulfilled,
          venueHours: dataSet,
        })
      })
    } catch (error) {
      // dispatch({
      //   type: getLaundryHallInfoRejected,
      //   error: error.message,
      // })
    }
  }
}

export const getFavorites = () => {
  return dispatch => {
    let favorites = localStorage.getItem('dining_favorites')
    if (favorites) {
      favorites = JSON.parse(favorites).sort((a, b) => {
        return a - b
      })
    } else {
      localStorage.setItem('dining_favorites', JSON.stringify([]))
      favorites = []
    }
    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}

export const addFavorite = venueID => {
  return dispatch => {
    logEvent('dining', 'addFavorite')
    let favorites = localStorage.getItem('dining_favorites')
    if (!favorites) {
      favorites = [venueID]
    } else {
      favorites = JSON.parse(favorites)
      favorites.push(venueID)
      if (!favorites.includes(venueID)) {
        favorites.push(venueID)
      }

      favorites = favorites.sort((a, b) => {
        return a - b
      })
    }

    localStorage.setItem('dining_favorites', JSON.stringify(favorites))

    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}

export const removeFavorite = venueID => {
  return dispatch => {
    logEvent('dining', 'removeFavorite')
    // favorites is an array of venueIDs
    let favorites = JSON.parse(localStorage.getItem('dining_favorites'))
    favorites = favorites.filter(favorite => favorite !== venueID)
    localStorage.setItem('dining_favorites', JSON.stringify(favorites))
    dispatch({
      type: updateDiningFavorites,
      favorites,
    })
  }
}
