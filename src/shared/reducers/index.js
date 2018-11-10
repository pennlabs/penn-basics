import { combineReducers } from 'redux';
import diningReducer from './diningReducer';
import sidebarReducer from './sidebarReducer';
import linkReducer from './linkReducer';
import spacesReducer from './spacesReducer';

export default combineReducers({
  dining: diningReducer,
  sidebar: sidebarReducer,
  link: linkReducer,
  spaces: spacesReducer,
});
