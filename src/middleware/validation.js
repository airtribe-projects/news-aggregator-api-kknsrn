// Input validation middleware
const { ERROR_MESSAGES } = require('../../config/constants');

exports.validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email'
        });
    }
    next();
};

exports.validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }
    next();
};

exports.validateUserInput = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    if (name.length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Name must be at least 2 characters long'
        });
    }

    next();
};

exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || ERROR_MESSAGES.SERVER_ERROR
    });
};
