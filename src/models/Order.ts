import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: { type: String, require: true },
  status: { type: String, require: true },  //створений, підтверджений, зафейлений, скасований, надісланий, доставлений
  location: { type: String, require: true },
  description: { type: String },
  items: { type: Object },
  amount: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  jobTime: { type: Date },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Order", schema);
