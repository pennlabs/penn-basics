import mongoose from './server/database/mongoose-connect'

export interface IUser {
  pennid: number
  email: string
  first_name: string
  last_name: string
  displayName: string
}

export type DoneCallback = (err: any, id?: unknown) => void

export interface ISpace {
  name: string
  address: string
  description: string
  start: number
  end: number
  outlets: number
  quiet: number
  groups: number
}

export type ISpaceDocument = ISpace & Document

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
