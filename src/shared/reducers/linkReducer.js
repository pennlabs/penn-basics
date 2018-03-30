import {
  updateLink
} from '../actions/action_types';

const defaultState = null;

const linkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateLink:
      return action.payload;
    default:
      return state;
  }
};

export default linkReducer;