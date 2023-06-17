import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String},
  googleId: { type: String },
  role: { type: String, default: 'user' }, // admin / user
  loginAttempt: {
    failedAttempts: { type: Number, default: 0 },
    lastFailedAttempt: Date,
    blockedUntil: Date,
  }
})

export default mongoose.model('User', schema)
