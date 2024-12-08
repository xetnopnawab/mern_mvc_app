//import module
// import { DB_NAME } from "../../constants";
import mongoose from "mongoose";
import { plm } from "passport-local-mongoose";

//++++++++++++++++++++++++++++++++++++++++DB Connection ++++++++++++++++++++++++++++++++++++++++++++++++++++
// ;( async () =>{
//  try{
//   mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// }
//  catch(error){
//   console.error("ERROR: ", error)
// }
// })()

// const userSchema = mongoose.Schema({
//   username:String,
//   name:String,
//   age:Number
// })
// module.exports=mongoose.model('user',userSchema);
//++++++++++++++++++++++++++++++++++++++++++++ OR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DB connection
// const mongoose = require("mongoose");
// const plm = require("passport-local-mongoose");

// (async () => {
//   try {
//     mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//   } catch (error) {
//     console.error("ERROR: ", error);
//   }
// })();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Make User Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
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
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    catagories: [
      {
        type: String,
      },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    dp: {
      type: String, // Assuming dp is a file path or URL, modify as needed
    },
  },
  { timestamps: true } // its store createAt and updatedAt information about documents and model
);
userSchema.plugin(plm);
//module.exports = mongoose.model("User", userSchema); or
export const Users = mongoose.model("Users", userSchema);
