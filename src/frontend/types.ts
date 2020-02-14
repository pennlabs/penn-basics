// TODO move to a single types file at the root of the repo

// Profile Interfaces
export interface IUserInfo {
  pennid: string
  fullName: string
  loggedIn: boolean
  displayName: string
  expires: string
}

// Dining Interfaces
export interface IDaypart {
  endtime: string
  hide: string
  id: string
  label: string
  message: string
  starttime: string
}

export interface IVenueHour {
  date: string
  dayparts: IDaypart[]
  message: string
  status: string
}

export type TVenueHour = Record<string, IVenueHour[]>

export interface IDiningReducerState {
  error: string | null
  favorites: string[]
  venueHoursPending: boolean
  venueHours: TVenueHour
}

export interface IVenueData {
  lat: number
  lng: number
  image: string
  description: string
  address: string
  name: string
  pennDiningSlug: string
  isRetail?: boolean
  showMealLabels?: boolean
}

export type TVenueData = Record<string, IVenueData>

