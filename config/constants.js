// Application constants

const NEWS_CATEGORIES = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
];

const NEWS_SOURCES = [
    'newsapi',
    'gnews',
    'newscatcher',
    'newsapi-ai'
];

const CACHE_DURATION = {
    SHORT: 5 * 60 * 1000,        // 5 minutes
    MEDIUM: 30 * 60 * 1000,      // 30 minutes
    LONG: 24 * 60 * 60 * 1000    // 24 hours
};

const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid token',
    TOKEN_EXPIRED: 'Token expired',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error'
};

module.exports = {
    NEWS_CATEGORIES,
    NEWS_SOURCES,
    CACHE_DURATION,
    ERROR_MESSAGES
};
