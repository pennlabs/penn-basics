import mongoose from './server/database/mongoose-connect'

/**
 * Home Reducer
 */

export interface IHomeReducerState {
  filterList?: number[]
  filterCustomizeActive: boolean
}

/**
 * Authentication Reducer
 */
export interface IUser {
  pennid: number
  email: string
  first_name: string
  last_name: string
  displayName: string
  loggedIn: boolean
  fullName: string
}

export interface IAuthReducerState {
  userInfo: IUser
}

export interface ILocation {
  lat: number
  lng: number
}

export type DoneCallback = (err: any, id?: unknown) => void

export type TSpaceId = string

export interface ISpace {
  name: string
  address: string

  /**
   * URL to an image of the studyspace
   */
  image?: string

  /**
   * Attribution for who created this image / where it came from
   */
  imageCredit?: {
    /**
     * Link to where photo was taken or who created it
     */
    link: string

    /**
     * Name of who or what took the picture
     */
    name?: string
  }
  description: string
  start: number[]
  end: number[]
  outlets: number
  quiet: number
  groups: number
  tags: string[]
  location?: {
    lat: number
    lng: number
  }
}

export type ISpaceWithSpaceID = ISpace & { spaceID: TSpaceId }

export type ISpaceDocument = ISpace & Document

export type ISpaceWithHoursAndOpenAndSpaceId = ISpace & {
  open: boolean
  hours: string
  spaceID: TSpaceId
}

/**
 * Food trucks
 */

interface IFoodTruckMenuItem {
  name: string
  prices: number[]
}

interface IFoodTruckMenu {
  name: string
  items: IFoodTruckMenuItem[]
}

interface IFoodTruckUserReview {
  pennid: number
  fullName: string
  rating: number
  upvoteScore?: number
  comment: string
  timeCreated?: string
  timeEdited?: string
  showName: boolean
}

type TFoodTruckId = string

interface IFoodTruckBase {
  foodtruckID: TFoodTruckId
  name: string
  payments?: string[]
  start: string[]
  end: string[]
  location?: {
    plusCode: string
    lat: number
    lng: number
  }
  tags: string[]
  link?: string
  languageTypes?: [string]

  overallRating: number
  image: string
  description?: string
  menu: IFoodTruckMenu[]
  reviews: IFoodTruckReview[]
  timeUpdated?: string
}

export type IFoodTruck = IFoodTruckBase & {
  priceTypes: [
    {
      name: string
      options: string[]
    }
  ]
}

export type IFormattedFoodtruckAction = IFoodTruckBase & {
  open: boolean
  hours: string
}

export type IFormattedFoodtruck = IFormattedFoodtruckAction & {
  priceTypes: Record<string, string[]>
}

export type IFoodTruckDocument = IFoodTruck & mongoose.Document

export type IFoodTruckWithOpen = IFoodTruck & { open: boolean }

export type TDispatchFunction = (dispatch: Dispatch<Action>) => { type: string }

export interface IFoodTrucksReducerState {
  pending: boolean
  infoPending: boolean
  error: string
  infoError?: string
  foodtrucksData?: Record<TFoodTruckId, IFoodTruckWithOpen> // NOTE excluding menu, priceTypes, and reviews
  filteredFoodtrucksData: Record<TFoodTruckId, IFormattedFoodtruck>
  foodtruckInfo: IFormattedFoodtruck
  hoveredFoodtruck: string // id of the foodtruck hovered on
  filterOpen: boolean
  filterString: string
  filterOpenActive: boolean
}

// Laundry Types
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

/**
 * this is a specific laundry hall info
 */
export interface ILaundryHallInfo {
  hall_name: string
  location: string
  machines: {
    details: ILaundryHallDetail[]
    dryers: IMachineInfo
    washers: IMachineInfo
  }
}

interface ILaundryHallGeneralInfo {
  hall_name: string
  id: number
  location: string
}

/**
 * this is a laundry hall when all laundry halls info are fetched
 */
export interface ILaundryHall {
  location: string
  halls: ILaundryHallGeneralInfo[]
}

interface IFavorite {
  locationName: string
  hallId: number
}

interface IFavoriteHome {
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
