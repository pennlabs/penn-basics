// TODO: this file is currently the same as dining

import {
  getLaundryDataRequested,
  getLaundryDataRejected,
  getLaundryDataFulfilled,
} from '../actions/action_types';

const defaultState = {
  pending: true,
  sidebarInfo: [{
    title: 'Open now',
    links: [
      {
        name: '1920 Commons',
        isOpen: true,
        venueID: 593,
      },
      {
        name: 'Hill',
        isOpen: true,
        venueID: 636,
      },
    ],
  }, {
    title: 'Closed',
    links: [
      {
        name: 'Kings Court',
        isOpen: false,
      },
      {
        name: 'New College House',
        isOpen: false,
      },
      {
        name: 'Bridge',
        isOpen: false,
      },
    ],
  }],
};

const laundryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getLaundryDataRequested:
      return {
        ...state,
        pending: true,
      };
    case getLaundryDataRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case getLaundryDataFulfilled:
      return {
        ...state,
        pending: false,
        diningData: action.diningData,
      };
    default:
      return state;
  }
};
export default laundryReducer;
