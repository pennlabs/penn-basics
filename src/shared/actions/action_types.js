import uuid from 'uuid/v4';

// dining actions
export const getDiningDataRequested = uuid();
export const getDiningDataRejected = uuid();
export const getDiningDataFulfilled = uuid();

// sidebar actions
export const sidebarDining = uuid();
export const sidebarLaundry = uuid();
export const sidebarReservations = uuid();
export const sidebarStudyspaces = uuid();

// spaces actions
export const getSpacesDataRequested = uuid();
export const getSpacesDataRejected = uuid();
export const getSpacesDataFulfilled = uuid();

// laundry actions
export const getLaundryDataRequested = uuid();
export const getLaundryDataRejected = uuid();
export const getLaundryDataFulfilled = uuid();

// misc actions
export const updateLink = uuid();
