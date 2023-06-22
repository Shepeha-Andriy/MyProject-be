import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, require: true },
  shortDescription: { type: String, require: true, maxlength: 40 },
  descrption: { type: String, require: true },
  type: { type: String, require: true },
  images: { type: Array, require: true },
  amount: { type: Number, default: 1 },
  views: { type: Number, default: 0 },
  reviews: { type: [mongoose.Types.ObjectId], ref: 'Reviews' },
  // owner: { type: mongoose.Types.ObjectId, ref: 'User' }, //майбутня фіча
  createdAt: { type: Date, default: new Date() }
})

export default mongoose.model('Good', schema)