import mongoose from '../mongoose-connect';
const Schema = mongoose.Schema;


const venueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  venueId: {
    type: Number,
    required: true
  },
  venueType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Venue', venueSchema);