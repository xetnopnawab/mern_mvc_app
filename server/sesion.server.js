import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
//!
// in route integrate session
// create session
req.session.kuchBhiName = true / false;
// Read session
req.session.kuchBhiName;
// Update session
req.session.kuchBhiName = "nawab";
// Delete session
req.session.destroy();

//! session
// app.get('/ban',(req,res,next)=>{
//   req.session.kuchhBhiName=true/false;
// })
app.get("/api/v1/ban", (req, res, next) => {
  req.session.ban = true;
  res.send("you are not acces this route | check route for ban");
});
// check ban
app.get("/api/v1/checkban", (req, res, next) => {
  if (req.session.ban === true) {
    res.send("you are banned");
  } else {
    res.send("note banned");
  }
  res.send("you are not acces this route");
});
// remove ban
app.get("/api/v1/removeban", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) throw error;
    res.send("banned remove");
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
