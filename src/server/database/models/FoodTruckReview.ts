import mongoose from '../mongoose-connect'

const { Schema } = mongoose

const ReviewSchema = new Schema({
  foodtruckID: { type: String, index: true },
  pennid: { type: Number, required: true },
  fullName: String,
  rating: Number,
  upvoteScore: Number,
  comment: String,
  timeCreated: Date,
  timeEdited: Date,
  showName: Boolean,
})

export default mongoose.model('FoodTruckReview', ReviewSchema)
