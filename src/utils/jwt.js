// JWT utility functions
const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

exports.sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = exports.generateToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        success: true,
        token,
        user
    });
};
