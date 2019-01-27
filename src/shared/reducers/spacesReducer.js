import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
  setActiveSpaceFulfilled,
  clearActiveSpaceFulfilled,
} from '../actions/action_types';

const filter = (state) => {
  const {
    filterOpen,
    filterOutlets,
    filterNoise,
    filterGroups,
  } = state;

  // If there is nothing to filter on, remove all filters and reset the data
  if (!filterOpen && !filterOutlets && !filterNoise && !filterGroups) {
    const newState = Object.assign(state, {});
    newState.filteredSpacesData = state.spacesData;
    return newState;
  }

  const filteredSpacesData = {};
  const { spacesData } = state;
  let filteredSpaceIDs = Object.keys(spacesData);

  if (filterOpen) {
    filteredSpaceIDs = filteredSpaceIDs.filter(id => spacesData[id].open);
  }

  if (filterOutlets) {
    // TODO
  }

  if (filterNoise) {
    // TODO
  }

  if (filterGroups) {
    // TODO
  }

  filteredSpaceIDs.forEach(id => { // eslint-disable-line
    filteredSpacesData[id] = spacesData[id];
  });

  const newState = Object.assign(state, {});

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
        filterOpen: undefined,
        filterOutlets: undefined,
        filterNoise: undefined,
        filterGroups: undefined,
      };

    case getSpacesDataFulfilled:
      return {
        pending: false,
        spacesData: spaces,
        filteredSpacesData: spaces,
        filterOpen: undefined,
        filterOutlets: undefined,
        filterNoise: undefined,
        filterGroups: undefined,
      };

    case setHoveredSpaceFulfilled:
      newState.hoveredSpace = action.spaceId;
      return newState;

    case setActiveSpaceFulfilled:
      newState.activeSpace = action.spaceId;
      return newState;

    case clearActiveSpaceFulfilled:
      newState.activeSpace = null;
      return newState;

    case filterSpacesOpenRequested: /* TODO FILTERING */
      newState.filterOpen = filters;
      return filter(newState);

    case filterSpacesOutletsRequested: /* TODO FILTERING */
      newState.filterOutlets = filters;
      return filter(newState);

    case filterSpacesNoiseRequested: /* TODO FILTERING */
      newState.filterNoise = filters;
      return filter(newState);

    case filterSpacesGroupsRequested: /* TODO FILTERING */
      newState.filterGroups = filters;
      return filter(newState);

    default:
      return {
        pending: true,
        spacesData: undefined,
        filteredSpacesData: undefined,
        filterOpen: undefined,
        filterOutlets: undefined,
        filterNoise: undefined,
        filterGroups: undefined,
        hoveredSpace: undefined,
        activeSpace: undefined,
      };
  }
};

export default spacesReducer;
