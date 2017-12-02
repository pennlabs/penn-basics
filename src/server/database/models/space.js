const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema({
  name: String,
  address: String,
  description: String,
  start: [Number],
  end: [Number],
  outlets: Number,
  groups: Number,
  quiet: Number
});

module.exports = mongoose.model('Space', SpaceSchema);