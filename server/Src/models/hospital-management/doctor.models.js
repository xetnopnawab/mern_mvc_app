import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema(
  {
    name: {
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
      salary:{
        type:String,
        required:true,
    },
    qualification: {
        type: String,
        required: true,
      },
    exprienceInYears:{
        type: Number,
        default:0,
    },
    workInHospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital",
    }
  },
  { timestamps: true }
);

export const Doctor = mongoose.Schema("Doctor", doctorSchema);
