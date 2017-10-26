import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled
} from '../actions/action_types'

const diningReducer = (state = {pending: false}, action) => {
  switch(action.type){
      case getDiningDataRequested:
          return {
              pending: true,
          }
      case getDiningDataRejected:
          return {
              pending: false,
              error: action.error,
          }
      case getDiningDataFulfilled:
          return {
              pending: false,
              diningData: action.diningData,
          }
      default:
          return {
              pending: false
          }
  }
}
export default diningReducer