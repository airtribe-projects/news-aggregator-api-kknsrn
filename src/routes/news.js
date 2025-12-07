// News routes
const express = require('express');
const router = express.Router();
const {
    getPersonalizedNews,
    searchNews,
    getTrendingNews
} = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Get personalized news
router.get('/personalized', getPersonalizedNews);

// Search news
router.get('/search', searchNews);

// Get trending news
router.get('/trending', getTrendingNews);

module.exports = router;
