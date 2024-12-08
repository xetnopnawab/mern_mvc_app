import express from 'express';
import path from 'path';
const app = express();
import urlRouter from './routes/url.routes.js';
import connectDB from './db.js';
import { Url } from './models/url.models.js';

connectDB('mongodb://localhost:27017/short-url').then(() =>
  console.log('Mongodb connected')
);

app.set('view egine', 'views');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use('/url', urlRouter);

app.get('/read', async (req, res) => {
  const allUrl = await Url.find({});
  res.render('index', { allUrl });
});

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
});

app.listen(3000, () => {
  console.log('port running on 3000');
});
