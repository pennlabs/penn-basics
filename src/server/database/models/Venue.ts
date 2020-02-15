import mongoose from '../mongoose-connect'

const { Schema } = mongoose

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  venueId: {
    type: Number,
    required: true,
  },
  venueType: {
    type: String,
    required: true,
  },
  image_src: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
})

export default mongoose.model('Venue', venueSchema)
