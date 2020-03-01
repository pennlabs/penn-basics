import { Action } from 'redux'
import {
  IFoodTruck,
  TFoodTruckId,
  IFoodTruckWithOpen,
  IFoodTrucksReducerState,
  IFormattedFoodtruck,
} from '../../types/foodtrucks'
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

interface ILocation {
  lat: number
  lng: number
}

interface IFoodTruckInfo {
  location: ILocation
  payments: null | string
  start: string | null[]
  end: string | null[]
  _id: string
  name: string
}

type IFoodTrucksAction = {
  foodtrucksData?: Record<TFoodTruckId, IFoodTruck>
  error?: string
  footruckId?: TFoodTruckId
  filterString?: string
  filter?: boolean
  foodtruckInfo?: IFoodTruckInfo
} & Action

const defaultFoodtruckInfo: IFormattedFoodtruck = {
  foodtruckID: '',
  name: '',
  payments: [],
  start: [],
  end: [],
  location: {
    plusCode: '',
    lat: -1,
    lng: -1,
  },
  tags: [],
  link: '',
  priceTypes: {},
  overallRating: 0,
  image: '',
  description: '',
  menu: [],
  reviews: [],
  timeUpdated: '',
  open: false,
  hours: '',
}

const defaultState: IFoodTrucksReducerState = {
  pending: false,
  infoPending: false,
  error: '',
  infoError: undefined,
  foodtrucksData: undefined, // excluding menu, priceTypes, and reviews
  filteredFoodtrucksData: {},
  foodtruckInfo: defaultFoodtruckInfo,
  hoveredFoodtruck: '', // id of the foodtruck hovered on
  filterOpen: false,
  filterString: '',
  filterOpenActive: false,
}

// Default state where all filters are cleared and none are active
// const clearFilterState = {
//   filterOpen: false,
//   filterString: null,
// }

/**
 * @param foodtrucksData
 * @param filterOpen
 * @returns filteredFoodtrucksData
 */
const filterFoodtrucks = (
  foodtrucksData: Record<TFoodTruckId, IFoodTruckWithOpen> | undefined,
  filterOpen?: boolean,
  filterString?: string
): Record<TFoodTruckId, IFoodTruck> => {
  if (!foodtrucksData) {
    return {}
  }
  if (!filterOpen && !filterString) {
    const foodtrucksDataCopy = Object.assign({}, foodtrucksData)
    return foodtrucksDataCopy
  }

  const filteredFoodtrucksData: Record<string, IFoodTruck> = {}
  let filteredFoodtrucksIDs: string[] = Object.keys(foodtrucksData)

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

const foodtrucksReducer = (
  state = defaultState,
  action: IFoodTrucksAction
): any => {
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
