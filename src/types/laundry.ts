// Laundry Interfaces
export interface ILaundryHallDetail {
  id: number
  status: string
  time_remaining: number
  type: string
}

export interface IMachineInfo {
  offline: number
  open: number
  out_of_order: number
  running: number
  time_remaining: number[]
}

// this is a specific laundry hall info
export interface ILaundryHallInfo {
  hall_name: string
  location: string
  machines: {
    details: ILaundryHallDetail[]
    dryers: IMachineInfo
    washers: IMachineInfo
  }
}

export interface ILaundryHallGeneralInfo {
  hall_name: string
  id: number
  location: string
}

// this is a laundry hall when all laundry halls info are fetched
export interface ILaundryHall {
  location: string
  halls: ILaundryHallGeneralInfo[]
}

export interface IFavorite {
  locationName: string
  hallId: number
}

export interface IFavoriteHome {
  hall_name: string
  location: string
  machines: {
    details: ILaundryHallDetail[]
    dryers: {
      offline: number
      open: number
      out_of_order: number
      running: number
      time_remaining: number[]
    }
    washers: {
      offline: number
      open: number
      out_of_order: number
      running: number
      time_remaining: number[]
    }
  }
  id: string
}

export interface IReminder {
  machineID: number
  hallID: number
  reminderID: string
}

export interface ILaundryReducerState {
  pending: boolean
  error: string
  browserError: string
  laundryHalls: ILaundryHall[]
  laundryHallInfo: ILaundryHallInfo
  favorites: IFavorite[]
  favoritesHome: IFavoriteHome[]
  reminders: IReminder[]
  hallIntervalID: number
  reminderIntervalID: number
}
