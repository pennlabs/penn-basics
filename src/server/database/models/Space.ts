import mongoose from '../mongoose-connect'

const { Schema } = mongoose

const SpaceSchema = new Schema({
  spaceID: { type: String, index: true },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  description: String,
  start: [Number],
  end: [Number],
  outlets: {
    type: Number,
    min: 0,
    max: 10,
  },
  groups: Number,
  quiet: Number,
  image: String,
  tags: [String],
  imageCredit: {
    name: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
  location: {
    lat: Number,
    lng: Number,
  },
})

export default mongoose.model('Space', SpaceSchema)
