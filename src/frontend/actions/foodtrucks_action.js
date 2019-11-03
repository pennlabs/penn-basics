import axios from 'axios'
import moment from 'moment'

import {
  getFoodtrucksDataRequested,
  getFoodtrucksDataRejected,
  getFoodtrucksDataFulfilled,
  setHoveredFoodtruckFulfilled,
  setActiveFoodtruckFulfilled,
} from './action_types'
import { convertDate } from '../helperFunctions'

const isOpen = ({ start, end }, day) => {
  const startTime = start[day]
  const endTime = end[day]

  // If either time is null then the space is closed
  if (!startTime || !endTime) {
    return false
  }

  const currTime = moment().format('HH:mm')
  return startTime <= currTime && currTime <= endTime
}

export const getAllFoodtrucksData = () => {
  return async dispatch => {
    dispatch({
      type: getFoodtrucksDataRequested,
    })

    try {
      axios.get('/api/foodtrucks/all').then(res => {
        const formattedData = {}
        const { trucks } = res.data

        trucks.forEach(foodtruck => {
          // console.log(foodtruck)
          const foodtruckObj = Object.assign({}, foodtruck)

          // Sunday: 0, Monday: 1
          // but in DB, we store [monday, tuesday, ...]
          // left shift index of day
          const day =
            moment().format('d') === '0' ? 6 : Number(moment().format('d')) - 1

          if (foodtruck.start.length !== 0 && foodtruck.end.length !== 0) {
            foodtruckObj.open = isOpen(foodtruck, day)
            if (foodtruckObj.open) {
              foodtruckObj.hours = `
              ${convertDate(foodtruck.start[day])}
              -
              ${convertDate(foodtruck.end[day])}
            `
            } else {
              foodtruckObj.hours = 'Closed'
            }
          } else {
            foodtruckObj.hours = 'Closed'
          }

          const { foodtruckID } = foodtruck
          formattedData[foodtruckID] = foodtruckObj
        })
        // console.log(formattedData)
        dispatch({
          type: getFoodtrucksDataFulfilled,
          foodtrucksData: formattedData,
        })
      })
    } catch (error) {
      dispatch({
        type: getFoodtrucksDataRejected,
        error: error.message || 'There was an error pulling studyspaces data',
      })
    }
  }
}

export const setHoveredFoodtruck = footruckId => {
  return dispatch => {
    dispatch({
      type: setHoveredFoodtruckFulfilled,
      footruckId,
    })
  }
}

export const setActiveSpace = footruckId => {
  return dispatch => {
    dispatch({
      type: setActiveFoodtruckFulfilled,
      footruckId,
    })
  }
}
