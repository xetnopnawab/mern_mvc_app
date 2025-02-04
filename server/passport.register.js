import dotenv from "dotenv";
import dotenv from "dotenv";
import connectDB from "./Src/db/db.js";
import {app} from './app.js'
import passport from "passport";
import localStrategy from "passport-local";
passport.use(new localStrategy(userModel.authenticate()));

dotenv.config({
    path: "./.env",
  });

connectDB()

/* GET home page. */
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/profile", IsLoggedIn, function (req, res) {
  res.send(`Welocme Mr.: ${req.body.username} on your profile`);
});
// Register user
app.post("/register", function (req, res) {
  const userdata = new userModel({
    username: req.body.username,
    username: req.body.password,
    secret: req.body.secret,
  });
  userModel
    .register(userdata, req.body.password)
    .than((registeredusers) => {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
});
// Login User
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
//Log Out
app.get('/logout',(req,res,next)=>{
  req.logout(function(error){
  if(error){
  return next(error);
  }
  res.redirect('/')
  });
});
//IsLoggedIn Middleware
function IsLoggedIn(req,res,next){
  if(req.isAuthenticate()){
   return next(); // agar ap login ho to next rout par jao other wise go on "/" route
  }
  res.redirect('/');
}

app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Server is running on port https://localhost:${process.env.PORT}`
    );
  });

