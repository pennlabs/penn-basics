import {
  getDiningDataRequested,
  getDiningDataRejected,
  getDiningDataFulfilled,
  dateFormattedChange,
  selectedMealChangeFulfilled,
  getVenueInfoRequested,
  getVenueInfoRejected,
  getVenueInfoFulfilled,
  setMealsFulfilled,
  updateDiningFavorites
} from '../actions/action_types'

function getCurrentDateFormatted() {
  let date = new Date()
  date.setHours(0, 0, 0, 0)
  date = date.toString().substring(4, 10)
  return date
}

// Helper function to update the days that should be shown in DiningQuery component
function updateDaysToShow(state) {
  const { diningData, dateFormatted, dateFormattedToday } = state

  // Find the relevant meal if variables have been populated in the state and props
  if (diningData && dateFormatted && !diningData.pending) {
    // Get all days passed to us from the API
    // These are of the form MM/DD/YYYY EXCEPT in the case that the month
    // begins with a "0", in which case the format is M/DD/YYYY
    const days = Object.keys(diningData)

    // Iterate over the days until we find the current day
    // This is stored in the state as this.state.dateFormattedToday
    let matched = false

    // Construct an array of all days that the user will be able to select from
    const daysToShow = [dateFormattedToday]

    // Include at most 2 days in addition to today
    let count = 2

    // Iterate
    days.forEach(day => {
      // Check for a match if we have not yet found one
      if (!matched) {
        if (day === dateFormattedToday) {
          matched = true
        }
      } else if (count > 0) {
        // Add the day to the list
        daysToShow.push(day)

        // Decrement the count
        count -= 1
      }
    })

    // Update the state
    return {
      ...state,
      days: daysToShow,
    }
  }
  return state
}

// Helper function to update the meals that should be shown in DiningQuery component
function updateMeals(state) {
  const { diningData, diningDataPending, dateFormatted, meal } = state

  // Find the relevant meal
  if (
    diningData &&
    dateFormatted &&
    diningData[dateFormatted] &&
    !diningDataPending
  ) {
    const meals = Object.keys(diningData[dateFormatted])
    // Update the state
    if (meals.some(element => element === meal)) {
      return {
        ...state,
        meals,
      }
    }
    return {
      ...state,
      meals,
      meal: meals[0],
    }
  }
  return state
  // If nothing returned, means API isn't returning us anything
}

const defaultState = {
  diningDataPending: true,
  meal: '',
  meals: [],
  favorites: [],
  venueHoursCard: [],
  venueHoursPending: true,
  venueHoursCardPending: true,
  venueHours: null,
  venueInfo: null,
  dateFormatted: getCurrentDateFormatted(),
  dateFormattedToday: getCurrentDateFormatted(),
  sidebarInfo: [
    {
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
    },
    {
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
    },
  ],
}

const diningReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getDiningDataRequested:
      return {
        ...state,
        diningDataPending: true,
      }
    case getDiningDataRejected:
      return {
        ...state,
        diningDataPending: false,
        error: action.error,
      }
    case getDiningDataFulfilled:
      return updateDaysToShow(
        updateMeals({
          ...state,
          diningDataPending: false,
          diningData: action.diningData,
        })
      )
    case dateFormattedChange:
      return updateDaysToShow(
        updateMeals({
          ...state,
          dateFormatted: action.newDate,
        })
      )
    case selectedMealChangeFulfilled:
      return updateMeals({
        ...state,
        meal: action.newMeal,
      })
    case setMealsFulfilled:
      return updateMeals({
        ...state,
        meals: Object.keys(state.diningData[state.dateFormatted]),
      })
    case getVenueInfoRequested:
      return {
        ...state,
        venueHoursPending: true,
      }
    case getVenueInfoRejected:
      return {
        ...state,
        venueHoursPending: false,
        error: action.error,
      }
    case getVenueInfoFulfilled:
      return {
        ...state,
        venueHoursPending: false,
        venueHours: action.venueHours,
        venueInfo: action.venueInfo,
      }
    case updateDiningFavorites:
      return {
        ...state,
        favorites: action.favorites
      }
    default:
      return state
  }
}

export default diningReducer
