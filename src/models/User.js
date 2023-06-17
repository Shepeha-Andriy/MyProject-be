import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  username: {type: String, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String},
  googleId: { type: String },
  role: { type: String, default: 'user' }, // admin / user
  isActivated: { type: Boolean, default: false },
  loginAttempt: {
    failedAttempts: { type: Number, default: 0 },
    lastFailedAttempt: Date,
    blockedUntil: Date,
  },
  createdAt: {type: Date, default: new Date()}
})

export default mongoose.model('User', schema)
