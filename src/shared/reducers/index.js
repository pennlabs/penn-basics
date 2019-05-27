import { combineReducers } from 'redux';
import diningReducer from './diningReducer';
import sidebarReducer from './sidebarReducer';
import linkReducer from './linkReducer';
import spacesReducer from './spacesReducer';
import laundryReducer from './laundryReducer';
import homeReducer from './homeReducer';

export default combineReducers({
  dining: diningReducer,
  sidebar: sidebarReducer,
  link: linkReducer,
  spaces: spacesReducer,
  laundry: laundryReducer,
  home: homeReducer,
});
