// Article model
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        content: {
            type: String
        },
        urlToImage: {
            type: String
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String
        },
        source: {
            id: String,
            name: String
        },
        category: {
            type: String,
            enum: [
                'business',
                'entertainment',
                'general',
                'health',
                'science',
                'sports',
                'technology'
            ],
            default: 'general'
        },
        publishedAt: {
            type: Date
        },
        language: {
            type: String,
            default: 'en'
        },
        country: {
            type: String
        },
        externalId: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
