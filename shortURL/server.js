import express from 'express';
import path from 'path';
const app = express();
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import { Url } from './models/url.models.js';
import { checkForAuthantication, restrictTo } from './middleware/auth.js';
//Create __dirname equivalent in ES6 modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB('mongodb://localhost:27017/short-url').then(() =>
  console.log('Mongodb connected')
);

import urlRouter from './routes/url.routes.js';
import userRouter from './routes/user.routes.js';
import staticRouter from './routes/static.routes.js';

app.set('view engine', 'ejs'); // Set EJS as the view engine
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // Fixed "extends" typo to "extended"
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthantication);

app.use('/url', restrictTo(['NORMAL']), urlRouter);
app.use('/user', userRouter);
app.use('/', staticRouter);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.send(entry);
  //.redirectURL
});

app.listen(3000, () => {
  console.log('port running on 3000');
});
