import express from 'express';
const router = express.Router();
import { Url } from '../models/url.models.js';
import { restrictTo } from '../middleware/auth.js';

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
  const allurls = await Url.find({});
  return res.render('home', {
    urls: allurls,
  });
});
router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  const allurls = await Url.find({ createdBy: req.user._id });
  return res.render('home', {
    urls: allurls,
  });
});
router.get('/login', (req, res) => {
  return res.render('login');
});
router.get('/signup', (req, res) => {
  return res.render('signup');
});

export default router;
