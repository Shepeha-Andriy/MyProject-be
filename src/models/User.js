import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String},
  googleId: { type: String },
  role: { type: String, default: 'user' } // admin / user
})

export default mongoose.model('User', schema)
