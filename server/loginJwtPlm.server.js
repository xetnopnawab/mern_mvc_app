import dotenv from "dotenv";
import connectDB from "./Src/db/db.js";
import { app } from "./app.js";
import { Auth } from "./Src/models/loginJwtPlm.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import passport from "passport";
import passportLocal from "passport-local";
dotenv.config({
  path: "./.env",
});

connectDB();

/* GET home page. */
app.get("/", function (req, res, next) {
  let messages = req.flash("msg");
  res.render("index", { messages });
});

/* GET login page */
app.get("/login", (req, res, next) => {
  jwt.sign(
    { data: "Expample of JWT" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      res.json({
        success: true,
        token,
      });
    }
  );
});

/* GET profile page. */
app.get("/profile", verifyToken, function (req, res, next) {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" }, (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      res.json({
        success: true,
        authData,
      });
    }
  });
});

/* GET profile page. */
app.get("/profile/:id", isLoggedIn, function (req, res, next) {
  Auth.findOne({ _id: req.params.id })
    .then((data) => res.render("profile", { data }))
    .catch((err) => res.send(err));
});
// app.get('/profile', isLoggedIn, function(req, res, next) {
//   res.send('Welcome to login. <a href="/logout">logout</a>');
// });

/* POST reset Page */
app.post("/resetPassword", isLoggedIn, function (req, res, next) {
  Auth.findOne({ _id: req.user._id })
    .then((user) => {
      user
        .setPassword(req.body.newPassword)
        .then(() => {
          user
            .save()
            .then((renewPassword) => {
              res.json({ message: "Password Changed!", renewPassword });
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

/* POST forgot Page */
app.post("/forgotPassword", isLoggedIn, function (req, res, next) {
  Auth.findOne({ _id: req.user._id })
    .then((user) => {
      user
        .changePassword(req.body.oldPassword, req.body.newPassword)
        .then(() => {
          user
            .save()
            .then((renewPassword) => {
              res.json({ message: "Password Changed!", renewPassword });
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

/* GET logout page. */
app.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

// POST register page.
app.post(
  "/register",
  [
    check("email").isEmail(),
    check("password")
      .isLength({ min: 6 })
      .withMessage("password must not be empty and have atleat 6 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("msg", errors.errors);
      res.redirect("/");
    }

    const newAuth = new Auth({
      email: req.body.email,
    });

    Auth.register(newAuth, req.body.password)
      .then((user) => {
        passport.authenticate("local")(req, res, function () {
          req.flash("msg", `${user.email} successfully registered.`);
          res.redirect("/");
        });
      })
      .catch((err) => res.send(err));
  }
);

// POST login page
app.post("/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    // if (err) { return next(err); }
    if (!user) {
      req.flash("msg", info);
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // console.log(req.session)
      // console.log(req.user)
      return res.redirect("/profile/" + user._id);
    });
  })(req, res, next);
});

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     res.redirect('/profile/' + req.user._id);
//   });
// app.post('/login', passport.authenticate('local',{
//   successRedirect: '/profile',
//   failureRedirect: '/'
// }), (req, res, next)=>{});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("msg", "you are logged out, can not access.");
  res.redirect("/");
}

// Format of Token
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  // console.log(req.headers)
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
