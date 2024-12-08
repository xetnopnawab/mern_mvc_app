// import express from 'express';
// import fs from 'fs/promises'; // Use fs/promises for modern async operations
// import path from 'path';
// import { fileURLToPath } from 'url';

const express = require('express');
const fs = require('fs');
const path = require('path');
// Create __dirname equivalent in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed "extends" typo to "extended"
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the homepage
// app.get('/', async (req, res) => {
//   try {
//     const files = await fs.readdir(path.join(__dirname, 'files')); // Async/await for reading directory
//     res.render('index', { files }); // Render the "index.ejs" template with the list of files
//   } catch (error) {
//     console.error('Error reading files directory:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// app.get('/', (req, res) => {
//   fs.readdir(`./files`, (err, files) => {
//     res.render('index', { files: files });
//   });
// });
app.get('/', (req, res) => {
  res.cookie('name', 'nawab');
  res.send(`done`);
});
app.post('/create', (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(' ').join('')}.txt`,
    req.body.details,
    (err) => {
      res.redirect('/');
    }
  );
});

app.get('/file/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata) => {
    res.render('show', {
      filename: req.params.filename,
      filedata: filedata,
    });
  });
});

app.get('/edit/:filename', (req, res) => {
  res.render('edit', { filename: req.params.filename });
});
app.post('/edit', (req, res) => {
  fs.rename(`files/${req.body.previous}`, `files/${req.body.new}`, (err) => {
    res.redirect('/');
  });
});

// Dynamic route for profile
app.get('/profile/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`); // Send dynamic profile response
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
