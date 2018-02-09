import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled
} from '../actions/action_types';

import axios from 'axios';

const BASE = 'https://hidden-scrubland-81317.herokuapp.com/api';

export function getDiningData(venue_id) {
  return dispatch => {
    dispatch({
      type: getDiningDataRequested
    });
    axios.get(`${BASE}/weekly_menu/${venue_id}`)
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
          error,
        });
      });
  };
}