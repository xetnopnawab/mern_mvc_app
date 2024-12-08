import express from 'express';
//import fs from 'fs/promises'; // Use fs/promises for modern async operations
import path from 'path';
import { fileURLToPath } from 'url';
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

app.get('/', () => {
  res.send('hello world');
});

app.listen(3000, () => {
  console.log(`posrt running on 3000`);
});
