import dotenv from "dotenv";
import connectDB from "./Src/db/db.js";
// import { User } from "./Src/models/user.model.js";
import { app } from "./app.js";
import users from "./MOCK_DATA.json" assert { type: "json" };
import jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"
dotenv.config({
  path: "./.env",
});

connectDB();
// jwt
const token = jwt.sign("_id:122525d556516","s,knlxNAlxnllliaalXlX")
console.log(token)
const verfytoken =jwt.verify("eyJhbGciOiJIUzI1NiJ9.X2lkOjEyMjUyNWQ1NTY1MTY.bqNDRw5LPnKHzLQkui0bCltqzBbYtqyoQNm4d8cRi6s","s,knlxNAlxnllliaalXlX")
console.log(verfytoken)
// bcrypt
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      console.log(myPlaintextPassword)
  });
});

// with Local Json  Data crud
/* GET home page. */
app.get("/api/v1/users", (req, res, next) => {
  res.json(users);
});

app.post("/api/v1/users", (req, res, next) => {
  const body = req.body;
  console.log("body",body)
  res.json({ status: "pending" });
});

app
  .route("/api/v1/users/:id")
  .get((req, res, next) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res, next) => {
    res.json({ status: "pending" });
  })
  .delete((req, res, next) => {
    res.json({ status: "pending" });
  });

// app.get("/api/v1/users/:id", (req,res,next) => {
//   const id = Number(req.params.id) ;
//   const user = users.find((user)=>user.id === id);
//   res.json(user)
// })

// app.patch("/api/v1/users/:id", (req,res,next) => {
//   res.json({status:"pending"})
// })

// app.delete("/api/v1/users/:id", (req,res,next) => {
//   res.json({status:"pending"})
// })

//!++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/api/v1/name/:username", function (req, res) {
  res.send(`hello Mr ${req.params.username}`);
});

//!create;
app.get("/api/v1/createusers", async (req, res, next) => {
  const createdUsers = await User.create({
    username: "xetnopnawab",
    password: "1234567890",
    fullname: "Nawab",
    email: "nawab@gmail.com",
    age: 30,
  });
  res.send(createdUsers);
});

//! Read
app.get("/api/v1/readusers", async (req, res, next) => {
  const allUser = await User.find({});
  res.send(allUser);
});
//! delete
app.get("/api/v1/delete", async (req, res, next) => {
  const deletedUsers = await User.findOneAndDelete({
    username: "xetnopnawab",
  });
  res.send(deletedUsers);
});

//!++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/api/v1/create", async (req, res, next) => {
  const userData = await User.create({
    username: "raj",
    fullname: "raj  bhai",
    password: "123456",
    email: "raj@gmail.com",
    description: "i am a girl with feshion love",
    catagories: ["feshion", "modeling", "designer", "artist"],
  });
  res.send(userData);
});
//!exact match filter
app.get("/api/v1/find", async (req, res, next) => {
  new RegExp(search, flags);
  new RegExp("^xeTnaaWab$", "i");
  const allUsers = await User.find({ username: "xetnopnawab" });
  res.send(allUsers);
});
//! catagory on based filter
app.get("/api/v1/find", async (req, res, next) => {
  new RegExp(search, flags);
  new RegExp("^xeTnaaWab$", "i");
  const allUsers = await User.find({ catagories: { $all: ["feshion"] } });
  res.send(allUsers);
});
//! date wise filter
app.get("/api/v1/find", async (req, res, next) => {
  const date1 = new Date("2023-11-29");
  const date2 = new Date("2023-11-30");
  const allUsers = await User.find({
    datecreated: { $gte: date1, $lte: date2 },
  });
  res.send(allUsers);
});
app.get("/api/v1/find", async (req, res, next) => {
  const allUsers = await User.find({
    catagories: { $exists: true },
  });
  res.send(allUsers);
});
app.get("/api/v1/find", async (req, res, next) => {
  const allUsers = await User.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nickname" }, 0] },
        { $lte: [{ $strLenCP: "$nickname" }, 12] },
      ],
    },
  });
  res.send(allUsers);
});

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on port https://localhost:${process.env.PORT}`
  );
});
