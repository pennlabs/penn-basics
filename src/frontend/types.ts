export interface IUserInfo {
  pennid: string
  fullName: string
  loggedIn: boolean
  displayName: string
  expires: string
}

export interface IDiningVenue {
  lat: number
  lng: number
  image?: string
  description: string
  address: string
  name: string
  pennDiningSlug: string
  isRetail?: boolean
}

interface IDaypart {
  endtime: string
  hide: string
  id: string
  label: string
  message: string
  starttime: string
}

export interface IVenueHour {
  date: string
  dayparts: [IDaypart]
  message: string
  status: string
}
