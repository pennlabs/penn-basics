import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
} from '../actions/action_types';

const spacesReducer = (state = { pending: true }, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case getSpacesDataRequested:
      newState.pending = true;
      return newState;

    case getSpacesDataRejected:
      return {
        pending: false,
        error: action.error,
      };

    case getSpacesDataFulfilled:
      return {
        pending: false,
        spacesData: action.spaces,
      };

    default:
      return {
        pending: true,
      };
  }
};

export default spacesReducer;
