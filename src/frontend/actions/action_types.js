// NOTE setting actions to have string names makes debugging easier

// Home actions
export const filterHomeCustomizeRequested = 'FILTER_HOME_CUSTOMIZE_REQUESTED'
export const TOGGLE_FILTER_HOME_CUSTOMIZE = 'TOGGLE_FILTER_HOME_CUSTOMIZE'

// Dining actions
export const getVenueInfoRequested = 'GET_VENUE_INFO_REQUESTED'
export const getVenueInfoRejected = 'GET_VENUE_INFO_REJECTED'
export const getVenueInfoFulfilled = 'GET_VENUE_INFO_FULFILLED'
export const updateDiningFavorites = 'UPDATE_DINING_FAVORITES'

// foodtrucks actions
export const getFoodtrucksDataRequested = 'GET_FOODTRUCKS_DATA_REQUESTED'
export const getFoodtrucksDataRejected = 'GET_FOODTRUCKS_DATA_REQUESTED'
export const getFoodtrucksDataFulfilled = 'GET_FOODTRUCKS_DATA_FULFILLED'
export const getFoodtruckInfoRequested = 'GET_FOODTRUCK_INFO_REQUESTED'
export const getFoodtruckInfoFulfilled = 'GET_FOODTRUCK_INFO_FULFILLED'
export const getFoodtruckInfoRejected = 'GET_FOODTRUCK_INFO_REJECTED'
export const setHoveredFoodtruckFulfilled = 'SET_HOVERED_FOODTRUCK_FULFILLED'

// spaces actions
export const getSpacesDataRequested = 'GET_SPACES_DATA_REQUESTED'
export const getSpacesDataRejected = 'GET_SPACES_DATA_REJECTED'
export const getSpacesDataFulfilled = 'GET_SPACES_DATA_FULFILLED'
export const setHoveredSpaceFulfilled = 'SET_HOVERED_SPACE_FULFILLED'
export const filterSpacesOpenRequested = 'FILTER_SPACERS_OPEN_REQUESTED'
export const filterSpacesOutletsRequested = 'FILTER_SPACERS_OUTLETS_REQUESTED'
export const filterSpacesNoiseRequested = 'FILTER_SPACERS_NOISE_REQUESTED'
export const filterSpacesGroupsRequested = 'FILTER_SPACERS_GROUPS_REQUESTED'
export const filterOnCampusRequested = 'FILTER_ON_CAMPUS_REQUESTED'
export const filterSpacesStringRequested = 'FILTER_SPACES_STRING_REQUESTED'
export const clearFilterSpacesRequested = 'CLEAR_FILTER_SPACES_REQUESTED'
export const setActiveSpaceFulfilled = 'SET_ACTIVE_SPACE_FULFILLED'
export const clearActiveSpaceFulfilled = 'CLEAR_ACTIVE_SPACE_FULFILLED'

export const TOGGLE_FILTER_SPACES_OPEN = 'TOGGLE_FILTER_SPACES_OPEN'
export const TOGGLE_FILTER_SPACES_OUTLETS = 'TOGGLE_FILTER_SPACES_OUTLETS'
export const TOGGLE_FILTER_SPACES_NOISE = 'TOGGLE_FILTER_SPACES_NOISE'
export const TOGGLE_FILTER_SPACES_GROUPS = 'TOGGLE_FILTER_SPACES_GROUPS'

// laundry actions
export const getLaundryHallsDataRequested = 'GET_LAUNDRY_HALLS_DATA_REQUESTED'
export const getLaundryHallsDataRejected = 'GET_LAUNDRY_HALLS_DATA_REJECTED'
export const getLaundryHallsDataFulfilled = 'GET_LAUNDRY_HALLS_DATA_FULFILLED'

export const getLaundryHallInfoRequested = 'GET_LAUNDRY_HALL_INFO_REQUESTED'
export const getLaundryHallInfoRejected = 'GET_LAUNDRY_HALL_INFO_REJECTED'
export const getLaundryHallInfoFulfilled = 'GET_LAUNDRY_HALL_INFO_FULFILLED'

export const updateHallIntervalID = 'UPDATE_HALL_INTERVAL_ID'

// TODO classify these (@peter)
export const updateLaundryFavorites = 'UPDATE_LAUNDRY_FAVORITES'
export const getFavoritesHome = 'GET_FAVORITES_HOME'
export const browserSupportRejected = 'BROWSER_SUPPORT_REJECTED'
export const getRemindersRejected = 'GET_REMINDERS_REJECTED'
export const updateReminders = 'UPDATE_REMINDERS'
export const updateReminderIntervalID = 'UPDATE_REMINDER_INTERVAL_ID'

// misc actions
export const updateLink = 'UPDATE_LINK'
