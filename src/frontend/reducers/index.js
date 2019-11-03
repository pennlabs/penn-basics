import { combineReducers } from 'redux'
import diningReducer from './diningReducer'
import linkReducer from './linkReducer'
import spacesReducer from './spacesReducer'
import laundryReducer from './laundryReducer'
import homeReducer from './homeReducer'
import foodtrucksReducer from './foodtrucksReducer'

export default combineReducers({
  dining: diningReducer,
  link: linkReducer,
  spaces: spacesReducer,
  laundry: laundryReducer,
  home: homeReducer,
  foodtrucks: foodtrucksReducer,
})
