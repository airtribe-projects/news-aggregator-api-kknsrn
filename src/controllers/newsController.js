// News controller
const User = require('../models/User');
const Article = require('../models/Article');
const NewsAPIService = require('../services/newsApi');
const GNewsAPIService = require('../services/gnewsApi');
const { ERROR_MESSAGES } = require('../../config/constants');

// Initialize services
const newsApiService = new NewsAPIService(process.env.NEWSAPI_KEY);
const gNewsService = new GNewsAPIService(process.env.GNEWS_API_KEY);

// Get personalized news
exports.getPersonalizedNews = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ERROR_MESSAGES.USER_NOT_FOUND
            });
        }

        const { categories, country, language } = user.preferences;

        // Fetch news from NewsAPI
        let articles = [];

        try {
            const newsApiResponse = await newsApiService.getTopHeadlines({
                category: categories[0] || 'general',
                country: country || 'us',
                pageSize: 20
            });

            articles = [...articles, ...newsApiResponse.articles];
        } catch (error) {
            console.error('Error fetching from NewsAPI:', error.message);
        }

        // Fetch news from GNews
        try {
            const gNewsResponse = await gNewsService.getTopNews({
                topic: categories[0] || 'general',
                lang: language || 'en',
                max: 20
            });

            articles = [...articles, ...gNewsResponse.articles];
        } catch (error) {
            console.error('Error fetching from GNews:', error.message);
        }

        // Remove duplicates
        const uniqueArticles = Array.from(
            new Map(articles.map(article => [article.url, article])).values()
        );

        // Save articles to database
        for (const article of uniqueArticles) {
            await Article.findOneAndUpdate(
                { url: article.url },
                {
                    title: article.title,
                    description: article.description,
                    urlToImage: article.image || article.urlToImage,
                    url: article.url,
                    author: article.author,
                    source: article.source,
                    category: categories[0] || 'general',
                    publishedAt: article.publishedAt,
                    language: language || 'en'
                },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({
            success: true,
            totalResults: uniqueArticles.length,
            articles: uniqueArticles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Search news
exports.searchNews = async (req, res, next) => {
    try {
        const { q, category, sortBy, language } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search query'
            });
        }

        let articles = [];

        // Search using NewsAPI
        try {
            const newsApiResponse = await newsApiService.searchNews({
                q,
                sortBy: sortBy || 'publishedAt',
                pageSize: 20
            });

            articles = [...articles, ...newsApiResponse.articles];
        } catch (error) {
            console.error('Error searching NewsAPI:', error.message);
        }

        // Search using GNews
        try {
            const gNewsResponse = await gNewsService.searchNews({
                q,
                lang: language || 'en',
                max: 20
            });

            articles = [...articles, ...gNewsResponse.articles];
        } catch (error) {
            console.error('Error searching GNews:', error.message);
        }

        // Remove duplicates
        const uniqueArticles = Array.from(
            new Map(articles.map(article => [article.url, article])).values()
        );

        res.status(200).json({
            success: true,
            query: q,
            totalResults: uniqueArticles.length,
            articles: uniqueArticles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};

// Get trending news
exports.getTrendingNews = async (req, res, next) => {
    try {
        const articles = await Article.find()
            .sort({ publishedAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            totalResults: articles.length,
            articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            error: error.message
        });
    }
};
