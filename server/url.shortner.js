import dotenv from "dotenv";
import connectDB from "./Src/db/db.js"
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB();
// import routes
import urlRoutes from "./Src/routes/url.routes.js"
// with Local Json  Data crud
/* GET home page. */
app.get("/", (req, res, next) => {
  res.json("hello");
});

app.use('/url',urlRoutes)

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
