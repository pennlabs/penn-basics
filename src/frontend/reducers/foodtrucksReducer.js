import {
  getFoodtrucksDataRequested,
  getFoodtrucksDataFulfilled,
  getFoodtrucksDataRejected,
  getFoodtruckInfoRequested,
  getFoodtruckInfoFulfilled,
  getFoodtruckInfoRejected,
  setHoveredFoodtruckFulfilled,
  filterFoodtrucksStringRequested,
  filterFoodtrucksOpenRequested,
  clearFilterFoodtrucksRequested,
  TOGGLE_FILTER_FOODTRUCKS_OPEN,
} from '../actions/action_types'

const defaultState = {
  pending: false,
  infoPending: false,
  error: null,
  infoError: null,
  foodtrucksData: null, // excluding menu, priceTypes, and reviews
  filteredFoodtrucksData: null,
  foodtruckInfo: null,
  hoveredFoodtruck: null, // id of the foodtruck hovered on
  filterOpen: false,
  filterString: '',
  filterOpenActive: false,
}

// Default state where all filters are cleared and none are active
const clearFilterState = {
  filterOpen: false,
  filterString: null,
}

/**
 * @param foodtrucksData
 * @param filter
 * @returns filteredFoodtrucksData
 */
const filterFoodtrucks = (foodtrucksData, filterOpen, filterString) => {
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
    case filterFoodtrucksStringRequested:
      return {
        ...state,
        filterString: action.filterString,
        filteredFoodtrucksData: filterFoodtrucks(
          state.foodtrucksData,
          state.filterOpen,
          action.filterString
        ),
      }
    case filterFoodtrucksOpenRequested:
      return {
        ...state,
        filterOpen: action.filter,
        filteredFoodtrucksData: filterFoodtrucks(
          state.foodtrucksData,
          action.filter,
          state.filterString
        ),
      }
    case clearFilterFoodtrucksRequested:
      return {
        ...defaultState,
        foodtrucksData: state.foodtrucksData,
        filteredFoodtrucksData: state.foodtrucksData,
      }
    case TOGGLE_FILTER_FOODTRUCKS_OPEN:
      return {
        ...state,
        filterOpenActive: !state.filterOpenActive,
      }
    default:
      return state
  }
}

export default foodtrucksReducer
