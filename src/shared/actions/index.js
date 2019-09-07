import axios from 'axios'
import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled,
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  setMealsFulfilled,
} from './action_types'

export const getVenueInfo = venueId => {
  console.log(`venueID: ${venueId}`)
  return dispatch => {
    dispatch({ type: getVenueInfoRequested })

    // Set the start date to today
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    // Set the end date to three days from now
    const endDate = new Date()
    endDate.setHours(72, 0, 0, 0)

    // Make a post request to pull the data
    axios
      .post('/api/dining/venue_info/', {
        venueId,
        startDate,
        endDate,
      })
      .then(res => {
        const { hours, venue } = res.data
        console.log(venue)
        dispatch({
          type: getVenueInfoFulfilled,
          venueHours: hours,
          venueInfo: venue,
        })
      })
      .catch(error => {
        dispatch({
          type: getVenueInfoRejected,
          error: error.message,
        })
      })
  }
}

export const getDiningData = venueId => {
  console.log(venueId)
  return dispatch => {
    dispatch({
      type: getDiningDataRequested,
    })

    // Format the dates for the request
    // The start date is today
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    // The end date is three days from today
    const endDate = new Date()
    endDate.setHours(72, 0, 0, 0)

    // Send the request
    axios
      .post('/api/dining/menu_date_range/', {
        venueId,
        startDate,
        endDate,
      })
      .then(res => {
        const diningData = res.data
        dispatch({
          type: getDiningDataFulfilled,
          diningData,
        })
      })
      .catch(error => {
        dispatch({
          type: getDiningDataRejected,
          error: error.message,
        })
      })
  }
}

export function setMeals(dateFormatted) {
  return dispatch => {
    dispatch({
      type: setMealsFulfilled,
      dateFormatted,
    })
  }
}
