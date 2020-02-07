import mongoose from '../mongoose-connect'

const { Schema } = mongoose

const UserSchema = new Schema({
  pennid: { type: Number, required: true },
  email: String,
  first_name: String,
  last_name: String,
  displayName: String,
  affiliation: [String],
})

export default mongoose.model('User', UserSchema)
