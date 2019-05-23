import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
  setHoveredSpaceFulfilled,
  filterSpacesOpenRequested,
  filterSpacesOutletsRequested,
  filterSpacesNoiseRequested,
  filterSpacesGroupsRequested,
  filterOnCampusRequested,
  setActiveSpaceFulfilled,
  clearActiveSpaceFulfilled,
  clearFilterSpacesRequested,

  TOGGLE_FILTER_SPACES_OPEN,
  TOGGLE_FILTER_SPACES_OUTLETS,
  TOGGLE_FILTER_SPACES_NOISE,
  TOGGLE_FILTER_SPACES_GROUPS,
} from '../actions/action_types';

// Default state where all filters are cleared and none are active
const clearFilterState = {
  filterOpen: null,
  filterOutlets: null,
  filterNoise: null,
  filterGroups: null,
  filterOpenActive: false,
  filterOutletsActive: false,
  filterNoiseActive: false,
  filterGroupsActive: false,
  filterOnCampus: false,
};

const updateFilters = (arr, num) => {
  if (!arr || !arr.length) {
    return [num];
  }

  if (arr.includes(num)) {
    return arr.filter(item => item !== num);
  }

  arr.push(num);
  return arr;
};

const filterSpaces = (state) => {
  const {
    filterOpen,
    filterOutlets,
    filterNoise,
    filterGroups,
    filterOnCampus,
  } = state;

  // If there is nothing to filter on, remove all filters and reset the data
  if (!filterOpen && !filterOutlets && !filterNoise && !filterGroups && !filterOnCampus) {
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

  if (filterOutlets && filterOutlets.length) {
    filteredSpaceIDs = filteredSpaceIDs.filter(id => (
      filterOutlets.includes(spacesData[id].outlets)
    ));
  }

  if (filterNoise && filterNoise.length) {
    filteredSpaceIDs = filteredSpaceIDs.filter(id => (
      filterNoise.includes(spacesData[id].quiet)
    ));
  }

  if (filterGroups && filterGroups.length) {
    filteredSpaceIDs = filteredSpaceIDs.filter(id => (
      filterGroups.includes(spacesData[id].groups)
    ));
  }

  if (filterOnCampus){
    filteredSpaceIDs = filteredSpaceIDs.filter(id => spacesDate[id]);
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
  const {
    filterOutlets,
    filterNoise,
    filterGroups,

    filterOpenActive,
    filterOutletsActive,
    filterNoiseActive,
    filterGroupsActive,
  } = newState;
  const { filter, spaces, type } = action;

  switch (type) {
    case getSpacesDataRequested:
      newState.pending = true;
      return newState;

    case getSpacesDataRejected:
      return {
        pending: false,
        error: action.error,
        ...clearFilterState,
      };

    case getSpacesDataFulfilled:
      return {
        pending: false,
        spacesData: spaces,
        filteredSpacesData: spaces,
        ...clearFilterState,
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
      newState.filterOpen = filter;
      return filterSpaces(newState);

    case filterSpacesOutletsRequested: /* TODO FILTERING */
      newState.filterOutlets = updateFilters(filterOutlets, filter);
      return filterSpaces(newState);

    case filterSpacesNoiseRequested: /* TODO FILTERING */
      newState.filterNoise = updateFilters(filterNoise, filter);
      return filterSpaces(newState);
    
    case filterOnCampusRequested:
      newState.filterOnCampus = action.filter;
      return newState;

    case filterSpacesGroupsRequested: /* TODO FILTERING */
      newState.filterGroups = updateFilters(filterGroups, filter);
      return filterSpaces(newState);

    case clearFilterSpacesRequested:
      return filterSpaces(Object.assign(newState, clearFilterState));

    case TOGGLE_FILTER_SPACES_OPEN:
      return Object.assign(newState, { filterOpenActive: !filterOpenActive });

    case TOGGLE_FILTER_SPACES_OUTLETS:
      return Object.assign(newState, { filterOutletsActive: !filterOutletsActive });

    case TOGGLE_FILTER_SPACES_NOISE:
      return Object.assign(newState, { filterNoiseActive: !filterNoiseActive });

    case TOGGLE_FILTER_SPACES_GROUPS:
      return Object.assign(newState, { filterGroupsActive: !filterGroupsActive });

    default:
      return {
        pending: true,
        spacesData: null,
        filteredSpacesData: null,
        hoveredSpace: null,
        activeSpace: null,
        ...clearFilterState,
      };
  }
};

export default spacesReducer;
