import axios from 'axios'
import moment from 'moment'

import {
  getFoodtrucksDataRequested,
  getFoodtrucksDataRejected,
  getFoodtrucksDataFulfilled,
  getFoodtruckInfoRequested,
  getFoodtruckInfoFulfilled,
  getFoodtruckInfoRejected,
  setHoveredFoodtruckFulfilled,
  filterFoodtrucksStringRequested,
  filterFoodtrucksOpenRequested,
  TOGGLE_FILTER_FOODTRUCKS_OPEN,
  clearFilterFoodtrucksRequested,
} from './action_types'
import { convertDate, padHours } from '../../utils/helperFunctions'
import { TFoodTruckId } from 'src/types'

const isOpen = (
  { start, end }: { start: string[]; end: string[] },
  day: number
) => {
  const startTime = padHours(start[day])
  const endTime = padHours(end[day])

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

        trucks.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })

        console.log(trucks)

        trucks.forEach(foodtruck => {
          // console.log(foodtruck)
          const foodtruckObj = Object.assign({}, foodtruck)

          // Sunday: 0, Monday: 1
          // but in DB, we store [monday, tuesday, ...]
          // left shift index of day
          const day =
            moment().format('d') === '0' ? 6 : Number(moment().format('d')) - 1

          if (
            foodtruck.start &&
            foodtruck.end &&
            foodtruck.start.length &&
            foodtruck.end.length
          ) {
            foodtruckObj.open = isOpen(foodtruck, day)
            foodtruckObj.hours = `
            ${convertDate(foodtruck.start[day])}
            -
            ${convertDate(foodtruck.end[day])}
          `
          } else {
            foodtruckObj.open = false
            foodtruckObj.hours = ''
          }

          const { foodtruckID } = foodtruck
          formattedData[foodtruckID] = foodtruckObj
        })

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

export const getFoodtruckInfo = id => {
  return dispatch => {
    dispatch({
      type: getFoodtruckInfoRequested,
    })

    try {
      axios.get(`/api/foodtrucks/${id}`).then(res => {
        const { trucks: truck } = res.data
        const formattedPriceTypes = {}
        const { priceTypes = [] } = truck
        priceTypes.forEach(priceType => {
          formattedPriceTypes[priceType.name] = priceType.options
        })

        dispatch({
          type: getFoodtruckInfoFulfilled,
          foodtruckInfo: {
            ...truck,
            priceTypes: formattedPriceTypes,
          },
        })
      })
    } catch (err) {
      dispatch({
        type: getFoodtruckInfoRejected,
        error:
          err.message ||
          'There was an error pulling relavant information about the foodtruck',
      })
    }
  }
}

export const updateFoodtruckReview = (
  foodtruckID: TFoodTruckId,
  pennID: string,
  fullName: string,
  rating: number,
  comment: string,
  showName: boolean
) => {
  return dispatch => {
    dispatch({
      type: getFoodtruckInfoRequested,
    })

    try {
      axios
        .post(`/api/foodtrucks/${foodtruckID}/review`, {
          pennid: pennID,
          fullName,
          rating,
          comment,
          showName,
        })
        .then(res => {
          const { foodtruck } = res.data
          const formattedPriceTypes = {}
          const { priceTypes = [] } = foodtruck
          priceTypes.forEach(priceType => {
            formattedPriceTypes[priceType.name] = priceType.options
          })
          dispatch({
            type: getFoodtruckInfoFulfilled,
            foodtruckInfo: {
              ...foodtruck,
              priceTypes: formattedPriceTypes,
            },
          })
        })
    } catch (err) {
      dispatch({
        type: getFoodtruckInfoRejected,
        error:
          err.message || 'There was an error updating relavant information',
      })
    }
  }
}

export const setHoveredFoodtruck = (footruckId: TFoodTruckId) => {
  return dispatch => {
    dispatch({
      type: setHoveredFoodtruckFulfilled,
      footruckId,
    })
  }
}

/**
 *
 * @param {string} filterString user input string
 */
export const filterFoodtrucksString = (filterString: string) => {
  return dispatch => {
    dispatch({
      type: filterFoodtrucksStringRequested,
      filterString,
    })
  }
}

/**
 *
 * @param {boolean} filter
 */
export const filterFoodtrucksOpen = (filter: boolean) => {
  return dispatch => {
    dispatch({
      type: filterFoodtrucksOpenRequested,
      filter,
    })
  }
}

export const toggleFoodtrucksOpen = () => dispatch =>
  dispatch({ type: TOGGLE_FILTER_FOODTRUCKS_OPEN })

export const clearFoodtrucksFilter = () => dispatch =>
  dispatch({ type: clearFilterFoodtrucksRequested })
