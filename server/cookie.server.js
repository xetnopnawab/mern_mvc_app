import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

// create cookie
app.get("/api/v1/cookie", (req, res, next) => {
  res.cookie("age", 25);
  res.send("cookie mila");
});
// Read cookie
app.get("/api/v1/readcookie", (req, res, next) => {
  console.log(req.cookies.age);
  res.send("check");
});
//delete cookie
app.get("/api/v1/deletecookie", (req, res, next) => {
  res.clearCookie("age");
  res.send("check");
});

// in route integrate flash
// req.flash('jis name se bana hai', 'value')
// req.flash('error', 'this is error')
app.get("/api/v1/flash", (req, res, next) => {
  req.flash("age", 25);
  req.flash("name", "nawab");
  res.send("ban gya flash");
});
app.get("/api/v1/checkkro", (req, res, next) => {
  console.log(req.flash("age"), req.flash("name"));
  res.send("ckeck krlo backend ke terminal par");
});
app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
