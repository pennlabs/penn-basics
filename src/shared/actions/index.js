import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled,
  getVenueHoursRequested,
  getVenueHoursRejected,
  getVenueHoursFulfilled
} from '../actions/action_types';
import axios from 'axios';

export function getVenueHours(venueId) {
  return dispatch => {
    dispatch({
      type: getVenueHoursRequested
    });
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(48, 0, 0, 0);
    axios.post(`/api/dining/venue_hours/`, {
      venueId,
      startDate,
      endDate,
    })
      .then(res => {
        const venueHours = res.data;
        dispatch({
          type: getVenueHoursFulfilled,
          venueHours,
        });
      })
      .catch(error => {
        dispatch({
          type: getVenueHoursRejected,
          error: error.message,
        });
      });
  };
}

export function getDiningData(venueId) {
  return dispatch => {
    dispatch({
      type: getDiningDataRequested,
    });

    // Format the dates for the request
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(72, 0, 0, 0);

    // Send the request
    axios.post(`/api/dining/menu_date_range/`, {
      venueId,
      startDate,
      endDate,
    })
      .then(res => {
        const diningData = res.data;
        dispatch({
          type: getDiningDataFulfilled,
          diningData,
        });
      })
      .catch(error => {
        dispatch({
          type: getDiningDataRejected,
          error: error.message,
        });
      });
  };
}
