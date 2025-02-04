import mongoose, { mongo } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true }
);

export const Url = mongoose.model("Url", urlSchema);
