import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'NORMAL',
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Users = mongoose.model('User', userSchema);
