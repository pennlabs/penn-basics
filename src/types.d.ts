import mongoose from './server/database/mongoose-connect'

export interface IUser {
  pennid: number
  email: string
  first_name: string
  last_name: string
  displayName: string
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

export interface IFoodTruck {
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
  priceTypes: [
    {
      name: string
      options: string[]
    }
  ]
  overallRating?: number
  image?: string
  description?: string
  menu: IMenu[]
  reviews: IFoodTruckReview[]
  timeUpdated?: string
}

export type IFoodTruckDocument = IFoodTruck & mongoose.Document

export type IFoodTruckWithOpen = IFoodTruck & { open: boolean }

export type TDispatchFunction = (dispatch: Dispatch<Action>) => { type: string }
