import mongoose from '../mongoose-connect';
const Schema = mongoose.Schema;

const SpaceSchema = new Schema({
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