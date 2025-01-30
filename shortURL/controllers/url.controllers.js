import { Url } from '../models/url.models.js';
import shortid from 'shortid';

async function handleGenerateNewShortURL(req, res) {
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(4000).json({ error: 'url is required' });
  await Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
  res.render('home', { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export { handleGenerateNewShortURL, handleGetAnalytics };
