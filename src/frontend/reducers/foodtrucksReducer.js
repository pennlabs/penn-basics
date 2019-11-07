import {
  getFoodtrucksDataRequested,
  getFoodtrucksDataFulfilled,
  getFoodtrucksDataRejected,
  getFoodtruckInfoRequested,
  getFoodtruckInfoFulfilled,
  getFoodtruckInfoRejected,
  setHoveredFoodtruckFulfilled,
} from '../actions/action_types'

const defaultState = {
  pending: false,
  infoPending: false,
  error: null,
  infoError: null,
  foodtrucksData: null, // excluding menu & priceTypes
  filteredFoodtrucksData: null,
  foodtruckInfo: null,
  hoveredFoodtruck: null, // id of the foodtruck hovered on
}

// Default state where all filters are cleared and none are active
const clearFilterState = {
  filterOpen: null,
  filterString: null,
}

/**
 * @param foodtrucksData
 * @param filter
 * @returns filteredFoodtrucksData
 */
const filterFoodtrucks = ({ foodtrucksData, filterOpen, filterString }) => {
  if (!filterOpen && !filterString) {
    const filteredFoodtrucksData = Object.assign({}, foodtrucksData)
    return filteredFoodtrucksData
  }

  const filteredFoodtrucksData = {}
  let filteredFoodtrucksIDs = Object.keys(foodtrucksData)

  if (filterOpen) {
    filteredFoodtrucksIDs = filteredFoodtrucksIDs.filter(
      id => foodtrucksData[id].open
    )
  }

  if (filterString) {
    filteredFoodtrucksIDs = filteredFoodtrucksIDs.filter(id =>
      foodtrucksData[id].name
        .toLowerCase()
        .includes(filterString.toLowerCase().trim())
    )
  }

  filteredFoodtrucksIDs.forEach(id => {
    filteredFoodtrucksData[id] = foodtrucksData[id]
  })

  return filteredFoodtrucksData
}

const foodtrucksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getFoodtrucksDataRequested:
      return {
        ...state,
        pending: true,
      }
    case getFoodtrucksDataFulfilled:
      return {
        ...state,
        pending: false,
        foodtrucksData: action.foodtrucksData,
        filteredFoodtrucksData: action.foodtrucksData,
      }
    case getFoodtrucksDataRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case setHoveredFoodtruckFulfilled:
      return {
        ...state,
        hoveredFoodtruck: action.footruckId,
      }
    case getFoodtruckInfoRequested:
      return {
        ...state,
        infoPending: true,
      }
    case getFoodtruckInfoFulfilled:
      return {
        ...state,
        infoPending: false,
        foodtruckInfo: action.foodtruckInfo,
      }
    case getFoodtruckInfoRejected:
      return {
        ...state,
        infoPending: false,
        infoError: action.error,
      }
    default:
      return state
  }
}

export default foodtrucksReducer
