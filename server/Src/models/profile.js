const mongoose = require("mongoose");
import mongoose, { model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/AbiBanaya");

const authSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    catagories: {
      type: Array,
      default: [],
    },
    datecreated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

authSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("Auth", authSchema);
