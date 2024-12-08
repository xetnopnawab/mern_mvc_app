import mongoose from "mongoose";


const hosptalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    addressLin1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
      specializedIn: [{
        type: String,
      }],
  },
  { timestamps: true }
);

export const Hosptal = mongoose.Schema("Hosptal", hosptalSchema);
