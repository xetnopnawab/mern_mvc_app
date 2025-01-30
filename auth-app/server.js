import express from 'express';
import cookieParser from 'cookie-parser';
//import fs from 'fs/promises'; // Use fs/promises for modern async operations
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './models/user.model.js';
const app = express();
//Create __dirname equivalent in ES6 modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed "extends" typo to "extended"
app.set('view engine', 'ejs'); // Set EJS as the view engine
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// Routes
// Cookies set here
// app.get('/', (req, res) => {
//   res.cookie('key', 'rahul');
//   res.send('Done');
// });
//read cookies info
// app.get('/read', (req, res) => {
//   console.log(req.cookies);
//   res.send('read page');
// });
//hashing password incripted
// app.get('/hashpwd', (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash('awdnbkk', salt, function (err, hash) {
//       console.log(hash);
//     });
//   });
// });
//hashing password Decreapted
// app.get('/pwdcheck', (req, res) => {
//   bcrypt.compare(
//     'awdnbkk',
//     '$2b$10$yUTbs6RlpJp6pRHwE5hBGeZmesmlirTnaxLkljYVlyVZ.TiWYQ1oy',
//     function (err, result) {
//       console.log(result);
//     }
//   );
// });
//Jwt implementation
// app.get('/jwt', (req, res) => {
//   let token = jwt.sign({ email: 'nawab@gmail.com' }, 'secret');
//   console.log(token);
//   res.cookie('token', token);
//   res.send('done');
// });
// app.get('/jwtread', (req, res) => {
//   console.log(req.cookies.token);
//   let data = jwt.verify(req.cookies.token, 'secret');
//   res.send('done');
//   console.log(data);
// });
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/create', (req, res) => {
  let { username, email, age, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);
      const createdUser = await User.create({
        username,
        email,
        password: hash,
        age,
      });
      const token = jwt.sign({ email }, 'ssss');
      res.cookie('token', token);
      res.send(createdUser);
    });
  });
});
app.get('/login', async (req, res) => {
  res.render('login');
});
app.post('/login', async (req, res) => {
  const users = await User.findOne({ email: req.body.email });
  if (!users) return res.send('Something went wrong');
  bcrypt.compare(req.body.password, users.password, (err, result) => {
    if (result) {
      return res.send('LoggedIn');
      const token = jwt.sign({ email: users.email }, 'ssss');
      res.cookie('token', token);
    } else res.redirect('/login');
  });
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
app.listen(3000, () => {
  console.log(`posrt running on 3000`);
});
