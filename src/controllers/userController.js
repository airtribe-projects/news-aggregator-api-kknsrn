// User controller
const User = require('../models/User');
const { ERROR_MESSAGES } = require('../../config/constants');

// Update user profile
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;

        // Check if email is already taken
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken'
                });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Update user preferences
exports.updatePreferences = async (req, res, next) => {
    try {
        const { categories, sources, language, country } = req.body;
        const userId = req.user.id;

        const updateData = { preferences: {} };

        if (categories) updateData.preferences.categories = categories;
        if (sources) updateData.preferences.sources = sources;
        if (language) updateData.preferences.language = language;
        if (country) updateData.preferences.country = country;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Preferences updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get user profile
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Save article
exports.saveArticle = async (req, res, next) => {
    try {
        const { articleId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user.savedArticles.includes(articleId)) {
            user.savedArticles.push(articleId);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Article saved successfully',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Remove saved article
exports.removeSavedArticle = async (req, res, next) => {
    try {
        const { articleId } = req.params;
        const userId = req.user.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { savedArticles: articleId } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Article removed from saved',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get saved articles
exports.getSavedArticles = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('savedArticles');

        res.status(200).json({
            success: true,
            articles: user.savedArticles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};
