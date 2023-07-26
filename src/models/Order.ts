import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
  orderId: { type: String, require: true, unique: true },
  status: { type: String, default: 'created' },  //створений, підтверджений, зафейлений, скасований, надісланий, доставлений
  location: { type: String },
  description: { type: String },
  items: { type: Object },
  amount: { type: Number },
  cost: { type: Number },
  jobTime: { type: Date },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Order", schema);
