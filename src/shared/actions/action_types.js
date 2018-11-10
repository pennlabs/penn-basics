// NOTE setting actions to have string names makes debugging easier

// dining actions
export const getDiningDataRequested = 'GET_DINING_DATA_REQUESTED';
export const getDiningDataRejected = 'GET_DINING_DATA_REJECTED';
export const getDiningDataFulfilled = 'GET_DINING_DATA_FULFILLED';

// dining venue actions
export const getVenueInfoRequested = 'GET_VENUE_INFO_REQUESTED';
export const getVenueInfoRejected = 'GET_VENUE_INFO_REJECTED';
export const getVenueInfoFulfilled = 'GET_VENUE_INFO_FULFILLED';
export const dateFormattedChange = 'DATE_FORMATTED_CHANGE';
export const selectedMealChangeFulfilled = 'SELECTED_MEAL_CHANGE_FULFILLED';
export const setMealsFulfilled = 'SET_MEALS_FULFILLED';

// sidebar actions
export const sidebarDining = 'SIDEBAR_DINING';
export const sidebarLaundry = 'SIDEBAR_LAUNDRY';
export const sidebarReservations = 'SIDEBAR_RESERVATIONS';
export const sidebarStudyspaces = 'SIDEBAR_STUDYSPACES';

// spaces actions
export const getSpacesDataRequested = 'GET_SPACES_DATA_REQUESTED';
export const getSpacesDataRejected = 'GET_SPACES_DATA_REJECTED';
export const getSpacesDataFulfilled = 'GET_SPACES_DATA_FULFILLED';
export const setHoveredSpaceFulfilled = 'SET_HOVERED_SPACE_FULFILLED';

// laundry actions
export const getLaundryDataRequested = 'GET_LAUNDRY_DATA_REQUESTED';
export const getLaundryDataRejected = 'GET_LAUNDRY_DATA_REJECTED';
export const getLaundryDataFulfilled = 'GET_LAUNDRY_DATA_FULFILLED';

// misc actions
export const updateLink = 'UPDATE_LINK';
