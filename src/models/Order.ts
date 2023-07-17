import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: { type: String, require: true },
  status: { type: String, require: true },
  description: { type: String },
  items: { type: Object },
  amount: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Order", schema);
