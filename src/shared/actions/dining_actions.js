import axios from 'axios';

import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled
} from './action_types';

const BASE = 'https://dining-api-v2.herokuapp.com/api';

export function getDiningData(venueId) {
  return async dispatch => {
    dispatch({
      type: getDiningDataRequested
    });
    try {
      const { data: diningData } = await axios.get(`${BASE}/weekly_menu/${venueId}`);
      dispatch({
        type: getDiningDataFulfilled,
        diningData,
      });
    } catch (error) {
      dispatch({
        type: getDiningDataRejected,
        error: error.message,
      });
    }
  };
}
