import {
  sidebarDining,
  sidebarLaundry,
  sidebarReservations,
  sidebarStudyspaces,
} from '../actions/action_types';

const defaultState = sidebarDining;

const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case sidebarDining:
    case sidebarLaundry:
    case sidebarStudyspaces:
    case sidebarReservations:
      return action.type;
    default:
      return state;
  }
};

export default sidebarReducer;
