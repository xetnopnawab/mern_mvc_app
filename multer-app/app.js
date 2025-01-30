import express from 'express';
import multer from 'multer';
//import fs from 'fs/promises'; // Use fs/promises for modern async operations
import path from 'path';
const app = express();
//Create __dirname equivalent in ES6 modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.get('/', (req, res) => {
  res.render('home');
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Fixed "extends" typo to "extended"
app.set('view engine', 'ejs'); // Set EJS as the view engine
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('profileImage'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect('/');
});

app.listen('3000', () => {
  console.log(`app running on ${PORT}`);
});
