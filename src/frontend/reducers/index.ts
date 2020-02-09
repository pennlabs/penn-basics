import { combineReducers } from 'redux'
import diningReducer from './diningReducer'
import spacesReducer from './spacesReducer'
import laundryReducer from './laundryReducer'
import homeReducer from './homeReducer'
import foodtrucksReducer from './foodtrucksReducer'
import authReducer from './authReducer'

export default combineReducers({
  dining: diningReducer,
  spaces: spacesReducer,
  laundry: laundryReducer,
  home: homeReducer,
  foodtrucks: foodtrucksReducer,
  authentication: authReducer,
})
