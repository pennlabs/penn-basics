import mongoose from './server/database/mongoose-connect'

export interface IUser {
  pennid: number
  email: string
  first_name: string
  last_name: string
  displayName: string
  loggedIn: boolean
  fullName: string
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
