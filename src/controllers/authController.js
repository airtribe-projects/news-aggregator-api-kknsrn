// Authentication controller
const User = require('../models/User');
const { generateToken, sendTokenResponse } = require('../utils/jwt');
const { ERROR_MESSAGES } = require('../../config/constants');

// Register user
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: ERROR_MESSAGES.USER_EXISTS
            });
        }

        // Create user
        user = await User.create({
            name,
            email,
            password
        });

        // Send token response
        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: ERROR_MESSAGES.INVALID_CREDENTIALS
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: ERROR_MESSAGES.INVALID_CREDENTIALS
            });
        }

        // Send token response
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get current logged in user
exports.getMe = async (req, res, next) => {
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

// Logout user
exports.logout = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
