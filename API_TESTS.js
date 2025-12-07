// Test file to validate API endpoints
// Run this after starting the server

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
};

let authToken = '';

// Helper function to make API calls
async function makeRequest(method, endpoint, data = null, token = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();
        return {
            status: response.status,
            data: result
        };
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Test functions
async function testHealthCheck() {
    console.log('\n=== Testing Health Check ===');
    const response = await makeRequest('GET', '/health');
    console.log('Response:', response);
}

async function testRegister() {
    console.log('\n=== Testing User Registration ===');
    const response = await makeRequest('POST', '/auth/register', testUser);
    console.log('Response:', response);

    if (response && response.status === 201) {
        authToken = response.data.token;
        console.log('Token saved for subsequent requests');
    }
}

async function testLogin() {
    console.log('\n=== Testing User Login ===');
    const loginData = {
        email: testUser.email,
        password: testUser.password
    };

    const response = await makeRequest('POST', '/auth/login', loginData);
    console.log('Response:', response);

    if (response && response.status === 200) {
        authToken = response.data.token;
        console.log('Token updated');
    }
}

async function testGetProfile() {
    console.log('\n=== Testing Get Profile ===');
    const response = await makeRequest('GET', '/users/profile', null, authToken);
    console.log('Response:', response);
}

async function testUpdatePreferences() {
    console.log('\n=== Testing Update Preferences ===');
    const preferences = {
        categories: ['technology', 'business'],
        language: 'en',
        country: 'us'
    };

    const response = await makeRequest('PUT', '/users/preferences', preferences, authToken);
    console.log('Response:', response);
}

async function testGetPersonalizedNews() {
    console.log('\n=== Testing Get Personalized News ===');
    const response = await makeRequest('GET', '/news/personalized', null, authToken);
    console.log('Response:', response);
}

async function testSearchNews() {
    console.log('\n=== Testing Search News ===');
    const response = await makeRequest('GET', '/news/search?q=technology&sortBy=publishedAt', null, authToken);
    console.log('Response:', response);
}

// Run all tests
async function runAllTests() {
    console.log('Starting API tests...');

    await testHealthCheck();
    await new Promise(resolve => setTimeout(resolve, 500));

    await testRegister();
    await new Promise(resolve => setTimeout(resolve, 500));

    await testLogin();
    await new Promise(resolve => setTimeout(resolve, 500));

    await testGetProfile();
    await new Promise(resolve => setTimeout(resolve, 500));

    await testUpdatePreferences();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Note: These will fail without proper MongoDB and API keys configured
    // await testGetPersonalizedNews();
    // await new Promise(resolve => setTimeout(resolve, 500));

    // await testSearchNews();

    console.log('\n=== Tests Complete ===');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, makeRequest };
}

// Run if executed directly in browser console
if (typeof window !== 'undefined') {
    window.apiTests = { runAllTests, makeRequest };
}
