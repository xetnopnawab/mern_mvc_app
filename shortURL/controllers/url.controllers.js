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
  });
  res.json({
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

export { handleGenerateNewShortURL, handleGetAnalytics };
