import express from 'express';
const router = express.Router();
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} from '../controllers/url.controllers.js';

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;
