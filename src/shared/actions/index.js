import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled
} from '../actions/action_types';

import axios from 'axios';

const BASE = 'https://dining-api-v2.herokuapp.com/api';

export function getDiningData(venueId) {
  return dispatch => {
    dispatch({
      type: getDiningDataRequested
    });
    axios.get(`${BASE}/weekly_menu/${venueId}`)
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
