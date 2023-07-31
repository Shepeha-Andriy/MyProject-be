import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  enMessage: { type: String, require: true },
  uaMessage: { type: String, require: true },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("Notification", schema);
