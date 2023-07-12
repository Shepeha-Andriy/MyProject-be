import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  text: { type: String, require: true },
  good: { type: String, require: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
  createdAt: { type: Date, default: new Date() }
})

export default mongoose.model('Reviews', schema)
