// NewsAPI service
const axios = require('axios');
const cache = require('../utils/cache');
const { CACHE_DURATION } = require('../../config/constants');

const BASE_URL = 'https://newsapi.org/v2';

class NewsAPIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getTopHeadlines(params = {}) {
        try {
            const cacheKey = `newsapi_headlines_${JSON.stringify(params)}`;

            // Check cache first
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    apiKey: this.apiKey,
                    ...params
                }
            });

            // Cache the results
            cache.set(cacheKey, response.data, CACHE_DURATION.MEDIUM);

            return response.data;
        } catch (error) {
            console.error('NewsAPI Error:', error.message);
            throw new Error(`NewsAPI Error: ${error.message}`);
        }
    }

    async searchNews(params = {}) {
        try {
            const cacheKey = `newsapi_search_${JSON.stringify(params)}`;

            // Check cache first
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const response = await axios.get(`${BASE_URL}/everything`, {
                params: {
                    apiKey: this.apiKey,
                    ...params
                }
            });

            // Cache the results
            cache.set(cacheKey, response.data, CACHE_DURATION.SHORT);

            return response.data;
        } catch (error) {
            console.error('NewsAPI Search Error:', error.message);
            throw new Error(`NewsAPI Search Error: ${error.message}`);
        }
    }
}

module.exports = NewsAPIService;
