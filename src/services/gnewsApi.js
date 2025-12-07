// GNews API service
const axios = require('axios');
const cache = require('../utils/cache');
const { CACHE_DURATION } = require('../../config/constants');

const BASE_URL = 'https://gnews.io/api/v4';

class GNewsAPIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async searchNews(params = {}) {
        try {
            const cacheKey = `gnews_search_${JSON.stringify(params)}`;

            // Check cache first
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    apikey: this.apiKey,
                    ...params
                }
            });

            // Cache the results
            cache.set(cacheKey, response.data, CACHE_DURATION.MEDIUM);

            return response.data;
        } catch (error) {
            console.error('GNews API Error:', error.message);
            throw new Error(`GNews API Error: ${error.message}`);
        }
    }

    async getTopNews(params = {}) {
        try {
            const cacheKey = `gnews_top_${JSON.stringify(params)}`;

            // Check cache first
            if (cache.has(cacheKey)) {
                return cache.get(cacheKey);
            }

            const response = await axios.get(`${BASE_URL}/top`, {
                params: {
                    apikey: this.apiKey,
                    ...params
                }
            });

            // Cache the results
            cache.set(cacheKey, response.data, CACHE_DURATION.MEDIUM);

            return response.data;
        } catch (error) {
            console.error('GNews API Error:', error.message);
            throw new Error(`GNews API Error: ${error.message}`);
        }
    }
}

module.exports = GNewsAPIService;
