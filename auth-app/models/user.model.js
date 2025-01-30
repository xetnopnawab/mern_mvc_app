import mongoose from 'mongoose';
mongoose.connect(`mongodb://127.0.0.1:27017/auth-app`);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});

export const User = mongoose.model('User', userSchema);
