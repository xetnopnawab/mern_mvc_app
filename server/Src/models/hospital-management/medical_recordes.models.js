import mongoose from "mongoose";


const medicalSchema = new mongoose.Schema(
  {
    medicalname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

export const Medical = mongoose.Schema("Medical", medicalSchema);
