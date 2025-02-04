const User = require("../models/userschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.SignupService = (body) => {
  const { name, email, password, username } = body;
  const newUser = new User({ name, email, password, username });
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .then((user) => {
        if (user) return reject("User Exists");
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser
              .save()
              .then((user) => resolve(user))
              .catch((err) => reject(err));
          });
        });
      })
      .catch((err) => reject(err));
  });
};

exports.SigninService = (req) => {
  const { password, username } = req.body;
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) return reject("User not found");
        bcrypt.compare(password, user.password).then((res) => {
          if (!res) return reject("Incorrect password");
          const token = jwt.sign({ user }, process.env.SECRET_KEY_JWT, {
            expiresIn: 60 * 60,
          });
          req.header("auth-token", token);
          resolve(token);
        });
      })
      .catch((err) => reject(err));
  });
};
