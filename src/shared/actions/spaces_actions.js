import axios from 'axios';

import {
  getSpacesDataRequested,
  getSpacesDataRejected,
  getSpacesDataFulfilled,
} from './action_types';

// TODO unit tests!!

function getMinutes(time) {
  // If there is a decimal
  let minutes = '';
  if (time % 1 !== 0) {
    minutes = `${Math.round((time % 1) * 60)}`;
  }

  return minutes;
}

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
    hours -= 12;
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
    });

    const today = new Date();
    const day = today.getDay();
    const time = today.getHours() + (today.getMinutes() / 60);

    try {
      axios.get('/api/spaces/all')
        .then((res) => {
          const formattedSpaces = {};
          const { spaces } = res.data;

          spaces.forEach((space) => {
            const spaceObj = Object.assign({}, space);

            spaceObj.open = isOpen(space, time, day);
            spaceObj.hours = getHours(space, day);

            formattedSpaces[spaceObj._id] = spaceObj; // eslint-disable-line no-underscore-dangle
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
      });
    }
  };
}
