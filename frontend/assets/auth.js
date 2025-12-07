// Authentication Functions

// Register function
async function register(name, email, password) {
    const errorEl = document.getElementById('error-message');
    const button = document.querySelector('button[type="submit"]');

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '../index.html';
    } catch (error) {
        errorEl.textContent = error.message;
        errorEl.style.display = 'block';
    }
}

// Login function
async function login(email, password) {
    const errorEl = document.getElementById('error-message');
    const button = document.querySelector('button[type="submit"]');

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '../index.html';
    } catch (error) {
        errorEl.textContent = error.message;
        errorEl.style.display = 'block';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'pages/login.html';
}

// Check if user is authenticated on page load
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    const isAuthPage = currentPage.includes('login.html') || currentPage.includes('register.html');

    const token = localStorage.getItem('token');

    if (!token && !isAuthPage && !currentPage.includes('index.html')) {
        window.location.href = 'pages/login.html';
    }
});
