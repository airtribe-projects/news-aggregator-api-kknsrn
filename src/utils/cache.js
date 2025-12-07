// Simple in-memory cache utility
const { CACHE_DURATION } = require('../../config/constants');

class Cache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, duration = CACHE_DURATION.MEDIUM) {
        // Clear any existing timeout for this key
        if (this.cache.has(key)) {
            clearTimeout(this.cache.get(key).timeout);
        }

        // Set timeout to auto-delete from cache
        const timeout = setTimeout(() => {
            this.cache.delete(key);
        }, duration);

        this.cache.set(key, {
            value,
            timeout,
            expiresAt: Date.now() + duration
        });
    }

    get(key) {
        if (this.cache.has(key)) {
            const item = this.cache.get(key);
            return item.value;
        }
        return null;
    }

    has(key) {
        return this.cache.has(key);
    }

    delete(key) {
        if (this.cache.has(key)) {
            clearTimeout(this.cache.get(key).timeout);
            this.cache.delete(key);
        }
    }

    clear() {
        for (const item of this.cache.values()) {
            clearTimeout(item.timeout);
        }
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }
}

module.exports = new Cache();
