import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  owner: {type: String, require: true},
  items: { type: Object, default: {"sdfgsdfgsd": 1 } },
  amount: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  createdAt: {type: Date, default: new Date()}
})

export default mongoose.model('Cart', schema)
