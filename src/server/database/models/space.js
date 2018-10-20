const mongoose = require('../mongoose-connect');

const { Schema } = mongoose;

const SpaceSchema = new Schema({
  name: String,
  address: String,
  description: String,
  start: [Number],
  end: [Number],
  outlets: Number,
  groups: Number,
  quiet: Number,
  image: String,
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model('Space', SpaceSchema);
