import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
} from '../actions/action_types';

const filter = (state) => {
  if (!state.filters) return state;

  const {
    open,
    outlets,
    noise,
    groups,
  } = state.filters;

  // If there is nothing to filter on
  if (!open && !outlets && !noise && !groups) return state;

  const filteredSpacesData = {};
  const { spacesData } = state;
  let filteredSpaceIDs = Object.keys(spacesData);

  if (open) {
    filteredSpaceIDs = filteredSpaceIDs.filter(id => spacesData[id].open);
  }

  if (outlets) {
    // TODO
  }

  if (noise) {
    // TODO
  }

  if (groups) {
    // TODO
  }

  filteredSpaceIDs.forEach(id => { // eslint-disable-line
    filteredSpacesData[id] = spacesData[id];
  });

  const newState = Object.assign({}, state);
  newState.filteredSpacesData = filteredSpacesData;

  return newState;
};

const spacesReducer = (state = { pending: true }, action) => {
  const newState = Object.assign({}, state);
  const { filters, spaces, type } = action;

  switch (type) {
    case getSpacesDataRequested:
      newState.pending = true;
      return newState;

    case getSpacesDataRejected:
      return {
        pending: false,
        error: action.error,
        filters: {},
      };

    case getSpacesDataFulfilled:
      return {
        pending: false,
        spacesData: spaces,
        filteredSpacesData: spaces,
        filters: {},
      };

    case setHoveredSpaceFulfilled:
      newState.hoveredSpace = action.spaceId;
      return newState;

    case filterSpacesOpenRequested: /* TODO FILTERING */
      newState.filters.open = filters;
      return filter(newState);

    case filterSpacesOutletsRequested: /* TODO FILTERING */
      newState.filters.outlets = filters;
      return filter(newState);

    case filterSpacesNoiseRequested: /* TODO FILTERING */
      newState.filters.noise = filters;
      return filter(newState);

    case filterSpacesGroupsRequested: /* TODO FILTERING */
      newState.filters.groups = filters;
      return filter(newState);

    default:
      return {
        pending: true,
        spacesData: undefined,
        filteredSpacesData: undefined,
        filters: {},
      };
  }
};

export default spacesReducer;
