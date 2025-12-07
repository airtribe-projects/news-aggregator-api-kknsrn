// User routes
const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    updatePreferences,
    saveArticle,
    removeSavedArticle,
    getSavedArticles
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// User preferences routes
router.put('/preferences', updatePreferences);

// Saved articles routes
router.get('/saved-articles', getSavedArticles);
router.post('/save-article', saveArticle);
router.delete('/saved-articles/:articleId', removeSavedArticle);

module.exports = router;
