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
