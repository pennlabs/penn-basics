import './mongoose-connect'
import moment from 'moment'
import { Document, Query } from 'mongoose'

import Space from './models/Space'
import Foodtrucks from './models/FoodTruck'
import User from './models/User'
import { IUser } from '../../types/authentication'
import {
  IFoodTruckUserReview,
  IFoodTruckDocument,
  IFoodTruckUserReviewDocument,
  IFoodTruck,
} from '../../types/foodtrucks'
import { ISpace } from '../../types/studyspaces'
import FoodTruckReview from './models/FoodTruckReview'

// return all fields except for menu, priceTypes, and reviews
export const findAllFoodtrucks = async (): Promise<IFoodTruck[]> =>
  (await Foodtrucks.find(
    {},
    { menu: 0, priceTypes: 0, reviews: 0 }
  )) as IFoodTruckDocument[]

/**
 * @param {Number} foodtruckID
 */
export const getFoodTruck = async (
  foodtruckID: string
): Promise<IFoodTruck> => {
  const truck = (await Foodtrucks.findOne({
    foodtruckID,
  })) as IFoodTruckDocument

  if (!truck) {
    return Promise.reject('No food truck with that id found')
  }

  const reviews = (await FoodTruckReview.find({
    foodtruckID,
  })) as IFoodTruckUserReviewDocument[]

  return { ...truck, reviews: reviews ?? [] }
}

export const updateReview = async (
  foodtruckID: string,
  userReview: IFoodTruckUserReview
): Promise<IFoodTruckUserReviewDocument> => {
  const data = (await FoodTruckReview.findOne({
    foodtruckID,
    pennid: userReview.pennid,
  })) as IFoodTruckUserReviewDocument | null

  const now = moment().format()

  if (!data) {
    return new FoodTruckReview({
      ...userReview,
      votes: [],
      foodtruckID,
      timeEdited: now,
      timeCreated: now,
    }).save() as Promise<IFoodTruckUserReviewDocument>
  }

  const { comment, rating, fullName, showName } = userReview

  const review = FoodTruckReview.findOneAndUpdate(
    { foodtruckID, pennid: userReview.pennid },
    { comment, rating, fullName, showName, timeEdited: now },
    { new: true }
  ).exec() as Promise<IFoodTruckUserReviewDocument>

  updateFoodTruckScore(foodtruckID)

  return review
}

const updateFoodTruckScore = async (foodtruckID: string): Promise<any> => {
  const allReviews = (await FoodTruckReview.find({
    foodtruckID,
  })) as IFoodTruckUserReviewDocument[]

  // compute average score
  const overallScore =
    // sum all reviews' scores
    allReviews.reduce(
      (lastSum, rev) => (rev.rating >= 0 ? lastSum + rev.rating : lastSum),
      0
    ) /
    // divide by the length
    allReviews.length

  return Foodtrucks.updateOne({ foodtruckID }, { overallScore }).exec()
}

export const updateFoodtruckReviewScore = async (
  foodtruckID: string,
  reviewerId: number,
  voterId: number,
  isUpvote: boolean
): Promise<IFoodTruckUserReviewDocument> => {
  const data = (await FoodTruckReview.findOne({
    foodtruckID,
    pennid: reviewerId,
  })) as IFoodTruckUserReviewDocument | null
  if (!data) {
    return Promise.reject('The review does not exist')
  }
  const votes = data.votes.map(userVote => {
    if (userVote.pennid === voterId) {
      return userVote
    }
    return { ...userVote, isUpvote }
  })

  return FoodTruckReview.findOneAndUpdate(
    {
      foodtruckID,
      pennid: reviewerId,
    },
    { votes }
  ).exec() as Promise<IFoodTruckUserReviewDocument>
}

export const upvoteFoodtruckReview = (
  foodtruckID: string,
  reviewerId: number,
  voterId: number
): Promise<IFoodTruckUserReviewDocument> =>
  updateFoodtruckReviewScore(foodtruckID, reviewerId, voterId, true)

export const downvoteFoodtruckReview = (
  foodtruckID: string,
  reviewerId: number,
  voterId: number
): Promise<IFoodTruckUserReviewDocument> =>
  updateFoodtruckReviewScore(foodtruckID, reviewerId, voterId, false)

export const findAllSpaces = (): Query<Document[]> => Space.find()

/**
 * @param {boolean} open
 * @param {number} outletLevel
 * @param {number} quietLevel
 * @param {number} groupLevel
 * @param {number} hour
 */
export const filterSpaces = (
  open: boolean,
  outletLevel: number,
  quietLevel: number,
  groupLevel: number,
  hour: number
): Query<Document[]> => {
  if (open) {
    return Space.find({
      start: { $lte: hour },
      end: { $gt: hour },
      outlets: { $gte: outletLevel },
      quiet: { $gte: quietLevel },
      groups: { $gte: groupLevel },
    })
  }

  return Space.find({
    outlets: { $gte: outletLevel },
    quiet: { $gte: quietLevel },
    groups: { $gte: groupLevel },
  })
}

/**
 * @param {String} spaceID
 */
export const getSpace = async (spaceID: string): Promise<Document | null> =>
  await Space.findOne({ spaceID })

export const deleteReview = async (
  foodtruckID: string,
  pennid: number
): Promise<{ message: string }> => {
  if (!pennid || !foodtruckID) {
    return Promise.reject(
      'Both pennid (of the user whose review is to be  deleted) and id (of a foodtruck) are required.'
    )
  }

  const res = await FoodTruckReview.deleteOne({
    foodtruckID,
    pennid,
  })

  if (res.deletedCount) {
    if (res.deletedCount > 1) {
      return Promise.reject('Erroneously deleted duplicates')
    } else if (res.deletedCount === 0) {
      return Promise.reject('The food truck did not exist')
    } else {
      updateFoodTruckScore(foodtruckID)

      return { message: 'The truck has been deleted' }
    }
  }
  return Promise.reject('Cannot confirm deletion')
}

/**
 * @param {object} space
 */
export const insertSpace = async (space: ISpace): Promise<Document> =>
  await new Space(space).save()

export const getUser = async (pennid: number): Promise<Document | null> =>
  await User.findOne({ pennid })

export const insertUser = (userData: IUser): Promise<Document> =>
  new User(userData).save()

export const updateUser = async (
  pennid: number,
  displayName: string
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    { pennid },
    { displayName },
    { new: true }
  )
  return user
}

export const getUserReviews = async (
  pennid: number
): Promise<IFoodTruckUserReview[]> => {
  const reviews = (await FoodTruckReview.find({
    pennid,
  })) as IFoodTruckUserReviewDocument[]

  return reviews ?? []
}
