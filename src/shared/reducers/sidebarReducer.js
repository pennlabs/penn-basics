import {
  sidebarDining,
  sidebarLaundry,
  sidebarReservations,
  sidebarStudyspaces,
} from '../actions/action_types';

// TODO redo this

const defaultState = sidebarDining;

const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case sidebarDining:
      return action.type;

    case sidebarLaundry:
      return action.type;

    case sidebarStudyspaces:
      return action.type;

    case sidebarReservations:
      return action.type;

    default:
      return state;
  }
};

export default sidebarReducer;
