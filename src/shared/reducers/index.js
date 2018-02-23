import { combineReducers } from 'redux'
import diningReducer from './diningReducer'
import sidebarReducer from './sidebarReducer'

export default combineReducers({
  dining: diningReducer,
  sidebar: sidebarReducer
})
