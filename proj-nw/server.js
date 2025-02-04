import express from 'express';
const app = express();
const PORT = 8000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Fixed "extends" typo to "extended"
app.set('view engine', 'ejs'); // Set EJS as the view engine
// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`app running on PORT:${PORT}`);
});
