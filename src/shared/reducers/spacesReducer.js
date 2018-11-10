import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
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

    case setHoveredSpaceFulfilled:
      newState.hoveredSpace = action.spaceId;
      return newState;

    default:
      return {
        pending: true,
      };
  }
};

export default spacesReducer;
