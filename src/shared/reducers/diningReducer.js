import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled,
  getVenueHoursRequested,
  getVenueHoursRejected,
  getVenueHoursFulfilled,
} from '../actions/action_types';

const defaultState = {
  diningDataPending: true,
  venueHoursPending: true,
  sidebarInfo: [{
    "title": "Open now",
    "links": [
      {
        "name": "1920 Commons",
        "isOpen": true,
        "venueID": 593,
      },
      {
        "name": "Hill",
        "isOpen": true,
        "venueID": 636,
      },
    ],
  }, {
    "title": "Closed",
    "links": [
      {
        "name": "Kings Court",
        "isOpen": false,
      },
      {
        "name": "New College House",
        "isOpen": false,
      },
      {
        "name": "Bridge",
        "isOpen": false,
      },
    ],
  }]
};

const diningReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getDiningDataRequested:
      return {
        ...state,
        diningDataPending: true,
      };
    case getDiningDataRejected:
      return {
        ...state,
        diningDataPending: false,
        error: action.error,
      };
    case getDiningDataFulfilled:
      return {
        ...state,
        diningDataPending: false,
        diningData: action.diningData,
      };

    case getVenueHoursRequested:
      return {
        ...state,
        venueHoursPending: true,
      };
    case getVenueHoursRejected:
      return {
        ...state,
        venueHoursPending: false,
        error: action.error,
      };
    case getVenueHoursFulfilled:
      return {
        ...state,
        venueHoursPending: false,
        venueHours: action.venueHours,
      };
    default:
      return state;
  }
};
export default diningReducer;
