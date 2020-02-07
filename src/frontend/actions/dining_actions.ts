/* global localStorage */
import axios from 'axios'

import {
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  updateDiningFavorites,
} from './action_types'
import { logEvent } from '../../utils/analytics'
import venueMapping from '../../server/resources/dining/venue_id_mappings.json'

/**
 * Get hours for all dining venues
 */
export const getVenueHours = () => {
  return dispatch => {
    dispatch({ type: getVenueInfoRequested })

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
          type: getVenueInfoFulfilled,
          venueHours: dataSet,
        })
      })
    } catch (error) {
      dispatch({
        type: getVenueInfoRejected,
        error: error.message,
      })
    }
  }
}

export const getFavorites = () => {
  return dispatch => {
    const favoritesString = localStorage.getItem('dining_favorites')
    let favoritesArray : String[] = []
    if (favoritesString) {
      favoritesArray = JSON.parse(favoritesString)
      favoritesArray = favoritesArray.sort((a, b) => {
        return Number(a) - Number(b)
      })
    } else {
      localStorage.setItem('dining_favorites', JSON.stringify(favoritesArray))
    }

    dispatch({
      type: updateDiningFavorites,
      favorites: favoritesArray,
    })
  }
}

export const addFavorite = venueID => {
  return dispatch => {
    logEvent('dining', 'addFavorite')
    const favorites = localStorage.getItem('dining_favorites')
    let favoritesArray : String[]
    if (!favorites) {
      favoritesArray = [venueID]
    } else {
      favoritesArray = JSON.parse(favorites)
      if (!favoritesArray.includes(venueID)) {
        favoritesArray.push(venueID)
      }

      favoritesArray = favoritesArray.sort((a, b) => {
        return Number(a) - Number(b)
      })
    }

    localStorage.setItem('dining_favorites', JSON.stringify(favoritesArray))

    dispatch({
      type: updateDiningFavorites,
      favorites: favoritesArray,
    })
  }
}

export const removeFavorite = venueID => {
  return dispatch => {
    logEvent('dining', 'removeFavorite')
    // favorites is an array of venueIDs
    let favoritesArray : String[] = JSON.parse(localStorage.getItem('dining_favorites'))
    console.log(favoritesArray)
    favoritesArray = favoritesArray.filter(favorite => favorite !== venueID)
    localStorage.setItem('dining_favorites', JSON.stringify(favoritesArray))
    dispatch({
      type: updateDiningFavorites,
      favorites: favoritesArray,
    })
  }
}
