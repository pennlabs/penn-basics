import {
  getFoodtrucksDataRequested,
  getFoodtrucksDataFulfilled,
  getFoodtrucksDataRejected,
  setHoveredFoodtruckFulfilled,
} from '../actions/action_types'

const defaultState = {
  pending: false,
  error: null,
  foodtrucksData: null, // excluding menu & priceTypes
  filteredFoodtrucksData: null,
  selectedFoodtruckData: null,
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
    default:
      return state
  }
}

export default foodtrucksReducer
