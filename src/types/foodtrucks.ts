// Foodtrucks Interfaces
import { Dispatch, Action } from 'redux'

import mongoose from '../server/database/mongoose-connect'

interface IFoodTruckMenuItem {
  name: string
  prices: number[]
}

interface IFoodTruckMenu {
  name: string
  items: IFoodTruckMenuItem[]
}

export interface ReviewVote {
  pennid: number
  isUpvote: boolean
}

export interface IFoodTruckUserReview {
  pennid: number
  fullName: string
  rating: number
  votes: ReviewVote[]
  upvoteScore?: number
  comment: string
  timeCreated?: string
  timeEdited?: string
  showName: boolean
}

export type TFoodTruckId = string

type TimeOfDay = string

export type OperatingHoursFormat = TimeOfDay | 'unknown' | null

export interface IFoodTruckData {
  name: string
  payments?: string[]
  start: OperatingHoursFormat[]
  end: OperatingHoursFormat[]
  location?: {
    plusCode: string
    lat: number
    lng: number
  }
  tags?: string[]
  menu: Record<string, IFoodTruckMenuItem[]>
  link?: string
  languageTypes?: [string]

  image?: string
  description?: string
}

export interface IFoodTruckBase {
  foodtruckID: TFoodTruckId
  name: string
  payments?: string[]
  start: OperatingHoursFormat[]
  end: OperatingHoursFormat[]
  location?: {
    plusCode?: string
    lat: number
    lng: number
  }
  tags?: string[]
  link?: string
  languageTypes?: [string]

  overallRating: number
  image: string
  description?: string
  menu: IFoodTruckMenu[]
  reviews: IFoodTruckUserReview[]
  timeUpdated?: string
}

export interface PriceType {
  name: string
  options?: string[]
}

export interface IFoodTruckRaw {
  foodtruckID?: TFoodTruckId
  name: string
  payments?: string[]
  start?: OperatingHoursFormat[]
  end?: OperatingHoursFormat[]
  location?: {
    plusCode?: string
    lat: number
    lng: number
  }
  tags?: string[]
  link?: string
  languageTypes?: string[]
  priceTypes?: PriceType[]

  image?: string
  description?: string
  menu: IFoodTruckMenu[]
  timeUpdated?: Date
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

export type IFoodTruckUserReviewDocument = IFoodTruckUserReview &
  mongoose.Document

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
