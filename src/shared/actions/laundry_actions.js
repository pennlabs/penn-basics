import axios from 'axios';

import {
  getLaundryDataRequested,
  getLaundryDataRejected,
  getLaundryDataFulfilled,
} from './action_types';

const BASE = 'http://api.pennlabs.org';

// TODO: implement me.
// Transform API data into format suitable for redux
function combineData(hallData, idData) {

}

// make two requests to two different endpoints, and combine the data
export function getAllLaundryData() {
  return async (dispatch) => {
    dispatch({
      type: getLaundryDataRequested,
    });
    try {
      const [hallData, idData] = await Promise.all([
        axios.get(`${BASE}/laundry/halls`),
        axios.get(`${BASE}/laundry/halls/ids`),
      ]);
      const laundryData = combineData(hallData, idData);
      dispatch({
        type: getLaundryDataFulfilled,
        laundryData,
      });
    } catch (error) {
      dispatch({
        type: getLaundryDataRejected,
        error: error.message,
      });
    }
  };
}
