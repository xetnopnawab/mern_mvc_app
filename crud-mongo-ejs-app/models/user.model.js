import mongoose, { Schema } from 'mongoose';
mongoose.connect(`mongodb://127.0.0.1:27017/db`);
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
  },
  { timestamps: true }
);
export const User = mongoose.model('User', userSchema);
