import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled
} from '../actions/action_types'

const spacesReducer = (state = { pending: true }, action) => {
  switch (action.type) {
    case getSpacesDataRequested:
      return {
        pending: true,
      }
    case getSpacesDataRejected:
      return {
        pending: false,
        error: action.error,
      }
    case getSpacesDataFulfilled:
      return {
        pending: false,
        spacesData: action.spacesData.spaces,
      }
    default:
      return {
        pending: true
      }
  }
}
export default spacesReducer
