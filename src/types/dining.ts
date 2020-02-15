// Dining Interfaces
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

export type IFavorite = string

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

export type TVenueHours = Record<string, IVenueHour[]>

export interface IDiningReducerState {
  error: string
  favorites: IFavorite[]
  venueHoursPending: boolean
  venueHours: TVenueHours
}

