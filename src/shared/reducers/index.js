import { combineReducers } from 'redux'
import diningReducer from './diningReducer'

export default combineReducers({
  dining: diningReducer
})
