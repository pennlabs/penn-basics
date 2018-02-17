import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled
} from '../actions/action_types'

const defaultState = {
  pending: true,
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
}

const diningReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getDiningDataRequested:
      return {
        ...state,
        pending: true,
      }
    case getDiningDataRejected:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case getDiningDataFulfilled:
      return {
        ...state,
        pending: false,
        diningData: action.diningData,
      }
    default:
      return state
  }
}
export default diningReducer
