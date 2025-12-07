// API Configuration
const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Check authentication
function checkAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// API Helper Function
async function apiCall(method, endpoint, data = null) {
    const token = getToken();
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `Error: ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Get Personalized News
async function getPersonalizedNews() {
    try {
        const response = await apiCall('GET', '/news/personalized');
        return response.articles || [];
    } catch (error) {
        throw error;
    }
}

// Search News
async function searchNews(query) {
    try {
        const response = await apiCall('GET', `/news/search?q=${encodeURIComponent(query)}`);
        return response.articles || [];
    } catch (error) {
        throw error;
    }
}

// Get User Profile
async function getUserProfile() {
    try {
        const response = await apiCall('GET', '/users/profile');
        return response.user;
    } catch (error) {
        throw error;
    }
}

// Update Preferences
async function updatePreferences(preferences) {
    try {
        const response = await apiCall('PUT', '/users/preferences', preferences);
        return response;
    } catch (error) {
        throw error;
    }
}

// Show message helper
function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
    }
}

// Hide message helper
function hideMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}
