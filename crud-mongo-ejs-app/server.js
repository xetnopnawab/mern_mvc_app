import express from 'express';
//import fs from 'fs/promises'; // Use fs/promises for modern async operations
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/user.model.js';
const app = express();
//Create __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed "extends" typo to "extended"
app.set('view engine', 'ejs'); // Set EJS as the view engine
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/update/:userid', async (req, res) => {
  const { name, email, image } = req.body;
  const users = await User.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true }
  );
  res.redirect('/read');
});

app.get('/edit/:userid', async (req, res) => {
  const users = await User.findOne({ _id: req.params.userid });
  res.render('edit', { users });
});

app.get('/delete/:id', async (req, res) => {
  const users = await User.findOneAndDelete({ _id: req.params.id });
  res.redirect('/read');
});

app.get('/read', async (req, res) => {
  const users = await User.find();
  res.render('read', { users });
});

app.post('/create', async (req, res) => {
  const { name, email, image } = req.body;
  const createUser = await User.create({
    name,
    email,
    image,
  });
  res.redirect('/read');
});

app.listen(3000 || PORT, () => {
  console.log(`server is running on ${PORT}`);
});
