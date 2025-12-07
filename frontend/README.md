# Frontend Setup Guide

## Simple HTML/CSS/JavaScript Frontend

This is a lightweight frontend that works directly in your browser without needing Node.js or npm.

### Quick Start

1. **Open in Browser**
   - If running locally: Open `frontend/pages/login.html` in your browser
   - Or use Live Server extension in VS Code

2. **Access the App**
   - Homepage: `frontend/index.html` (dashboard)
   - Login: `frontend/pages/login.html`
   - Register: `frontend/pages/register.html`
   - Profile: `frontend/pages/profile.html`
   - Search News: `frontend/pages/news.html`

### Features

✅ **Authentication**
- Register new account
- Login with email/password
- Logout functionality

✅ **Dashboard**
- View personalized news feed
- Based on user preferences

✅ **Profile Management**
- Update news preferences
- Select categories (7 types)
- Choose language and country

✅ **News Search**
- Search news by topic
- View search results

### How to Run

**Option 1: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `frontend/pages/login.html`
3. Click "Open with Live Server"
4. Browser will open at `http://localhost:5500/frontend/pages/login.html`

**Option 2: Using Python**
```bash
# Python 3
cd frontend
python -m http.server 8000

# Then visit: http://localhost:8000/pages/login.html
```

**Option 3: Using Node.js**
```bash
# Install http-server globally
npm install -g http-server

# Run in frontend directory
cd frontend
http-server

# Then visit: http://localhost:8080/pages/login.html
```

### File Structure

```
frontend/
├── pages/                    # HTML pages
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── profile.html         # User profile page
│   └── news.html            # News search page
├── assets/                  # JavaScript and CSS
│   ├── styles.css           # Main stylesheet
│   ├── auth.js              # Authentication functions
│   ├── api.js               # API client functions
│   ├── dashboard.js         # Dashboard logic
│   ├── profile.js           # Profile page logic
│   └── news.js              # News search logic
└── index.html               # Dashboard (home page)
```

### Usage Flow

1. **First Time User**
   - Go to Register page
   - Create account with name, email, password
   - Automatically logged in and redirected to dashboard

2. **Existing User**
   - Go to Login page
   - Enter credentials
   - Access personalized news

3. **Customize Preferences**
   - Go to Profile page
   - Select news categories
   - Choose language and country
   - Click "Update Preferences"

4. **Search News**
   - Go to Search News page
   - Enter topic/keyword
   - View search results

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Requirements

- Backend API running at `http://localhost:5000/api`
- Modern web browser
- No installation needed!

### Troubleshooting

**"Cannot reach API"**
- Make sure backend is running: `npm run dev`
- Check API is on port 5000
- Check browser console for CORS errors

**"Login not working"**
- Verify backend server is running
- Check credentials are correct
- Look at browser Network tab for error responses

**"Styles not loading"**
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure CSS file path is correct
- Check browser console for 404 errors

### API Endpoints Used

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Get profile
- `PUT /api/users/preferences` - Update preferences
- `GET /api/news/personalized` - Get news
- `GET /api/news/search` - Search news

### Notes

- All data is stored in browser localStorage (except backend database)
- Token expires every 7 days (set in backend)
- News images are cached by browser
- No external UI framework needed (vanilla CSS)
- Pure vanilla JavaScript (no jQuery or frameworks)

Enjoy using the News Aggregator! 📰
