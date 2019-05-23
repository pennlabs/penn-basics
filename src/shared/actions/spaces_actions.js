import axios from 'axios';

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
} from './action_types';


/**
 * @param time in MS
 * @returns minutes (between 0 and 59)
 */
function getMinutes(time) {
  // If there is a decimal
  let minutes = '';
  if (time % 1 !== 0) {
    minutes = `${Math.round((time % 1) * 60)}`;
  }

  return minutes;
}


/**
 * @param time in MS
 * @returns the passed in time as a string
 */
function getTime(time) {
  // Edge case
  if (time < 0) return '';

  const mins = getMinutes(time);
  let hours = Math.floor(time);
  let prefix;
  if (hours < 12) {
    hours = hours || 12; // Change 0 to 12
    prefix = 'am';
  } else {
    hours = (hours === 12) ? hours : hours - 12;
    prefix = 'pm';
  }

  let timeStr = `${hours}`;
  if (mins) {
    timeStr += `:${mins}`;
  }
  timeStr += prefix;

  return timeStr;
}


function getHours({ start, end }, day) {
  const startTime = start[day];
  const endTime = end[day];

  if (startTime < 0 || endTime < 0) return 'Closed';

  return `
    ${getTime(startTime)}
    –
    ${getTime(endTime)}
  `;
}


function isOpen({ start, end }, time, day) {
  const startTime = start[day];
  const endTime = end[day];

  // If either time is less than 0 then the space is closed
  if (startTime < 0 || endTime < 0) {
    return false;
  }

  // If the end time wraps to the next day
  // For example, Huntsman closes at 2am
  if (endTime <= startTime) {
    if (time >= startTime) {
      // This must be before midnight
      return time < endTime + 24;
    }

    // If the time is after midnight
    return time < endTime;
  }

  // If the building closes before midnight
  return (time >= startTime && time < endTime);
}


export function getAllSpacesData() { // eslint-disable-line
  return async (dispatch) => {
    dispatch({
      type: getSpacesDataRequested,
    })

    const today = new Date()
    const day = today.getDay()
    const time = today.getHours() + (today.getMinutes() / 60)

    try {
      axios.get('/api/spaces/all')
        .then((res) => {
          const formattedSpaces = {}
          const { spaces } = res.data

          spaces.forEach((space) => {
            const spaceObj = Object.assign({}, space)

            spaceObj.open = isOpen(space, time, day)
            spaceObj.hours = getHours(space, day)

            const { _id: spaceId } = spaceObj

            formattedSpaces[spaceId] = spaceObj
          });

          dispatch({
            type: getSpacesDataFulfilled,
            spaces: formattedSpaces,
          });
        });
    } catch (error) {
      dispatch({
        type: getSpacesDataRejected,
        error: error.message || 'There was an error pulling studyspaces data',
      })
    }
  }
}

export function setHoveredSpace(spaceId) {
  return (dispatch) => {
    dispatch({
      type: setHoveredSpaceFulfilled,
      spaceId,
    })
  }
}

export function setActiveSpace(spaceId) {
  return (dispatch) => {
    dispatch({
      type: setActiveSpaceFulfilled,
      spaceId,
    })
  }
}

export function clearActiveSpace() {
  return dispatch => dispatch({ type: clearActiveSpaceFulfilled })
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesOpen(filter) {
  return (dispatch) => {
    dispatch({
      type: filterSpacesOpenRequested,
      filter,
    })
  }
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesOutlets(filter) {
  return (dispatch) => {
    dispatch({
      type: filterSpacesOutletsRequested,
      filter,
    })
  }
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesNoise(filter) {
  return (dispatch) => {
    dispatch({
      type: filterSpacesNoiseRequested,
      filter,
    });
  };
}

// TODO DOCS / ERROR CHECKING
export function filterSpacesGroups(filter) {
  return (dispatch) => {
    dispatch({
      type: filterSpacesGroupsRequested,
      filter,
    });
  };
}

export const filterOnCampus = (filter) => {
  return (dispatch) => {
    dispatch({
      type: filterOnCampusRequested,
      filter: filter,
    })
  }
}

export function clearSpacesFilters() {
  return (dispatch) => {
    dispatch({ type: clearFilterSpacesRequested });
  };
}

export const toggleSpacesOpen = () => (
  dispatch => dispatch({ type: TOGGLE_FILTER_SPACES_OPEN })
);

export const toggleSpacesOutlets = () => (
  dispatch => dispatch({ type: TOGGLE_FILTER_SPACES_OUTLETS })
);

export const toggleSpacesNoise = () => (
  dispatch => dispatch({ type: TOGGLE_FILTER_SPACES_NOISE })
);

export const toggleSpacesGroups = () => (
  dispatch => dispatch({ type: TOGGLE_FILTER_SPACES_GROUPS })
);
