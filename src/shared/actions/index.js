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

const pad = number => {
  return number < 10 ? `0${number}` : `${number}`
}

const convertDate = dateObj => {
  const month = dateObj.getUTCMonth() + 1
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()
  return `${year}-${pad(month)}-${pad(day)}`
}

export const getVenueInfo = venueId => {
  return async dispatch => {
    dispatch({ type: getVenueInfoRequested })

    // Set the start date to today

    // Make a post request to pull the data
    try {
      const response = await axios.post('/api/dining/venue_hours', { venueId })
      let { venueHours } = response.data

      let startDate = new Date()
      startDate.setHours(0, 0, 0, 0)
      startDate = convertDate(startDate)

      // Set the end date to three days from now
      let endDate = new Date()
      endDate.setHours(72, 0, 0, 0)
      endDate = convertDate(endDate)
      venueHours = venueHours.filter(
        hour => startDate <= hour.date && hour.date <= endDate
      )
      dispatch({
        type: getVenueInfoFulfilled,
        venueHours,
      })
    } catch (err) {
      dispatch({
        type: getVenueInfoRejected,
        error: error.message,
      })
    }
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
