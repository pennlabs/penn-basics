const mongoose = require('../mongoose-connect');

const { Schema } = mongoose;

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
});

module.exports = mongoose.model('Venue', venueSchema);
