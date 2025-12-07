# Personalized News Aggregator API

A RESTful API for a personalized news aggregator built with Node.js, Express.js, bcrypt, and JWT. This project integrates with multiple external news APIs to provide users with personalized news articles based on their preferences.

## Features

- **User Authentication**: Secure registration and login with bcrypt password hashing
- **JWT Token-Based Security**: Token-based authentication for protected endpoints
- **User Preferences**: Users can set their news preferences (categories, sources, etc.)
- **News Aggregation**: Fetch news from multiple external APIs
- **Caching**: Implement caching for efficient API calls
- **Error Handling**: Comprehensive error handling and input validation
- **User Profile Management**: Update user preferences and profile information

## Project Structure

```
src/
├── routes/          # API route definitions
├── controllers/     # Route handlers and business logic
├── middleware/      # Custom middleware (auth, validation, etc.)
├── models/          # Data models (User, Article, etc.)
├── services/        # External API services
├── utils/           # Helper functions and utilities
config/              # Configuration files
app.js              # Main application entry point
package.json        # Project dependencies
.env.example        # Environment variables template
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- API keys from at least one of the following:
  - [NewsAPI](https://newsapi.org)
  - [GNews API](https://gnews.io)
  - [NewsCatcher News API](https://newscatcherapi.com)
  - [NewsAPI.ai](https://newsapi.ai)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example` and add your configuration:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your actual API keys and database URI

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Profile
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)
- `PUT /api/users/preferences` - Update news preferences (requires auth)

### News
- `GET /api/news` - Get personalized news (requires auth)
- `GET /api/news/search` - Search news with filters (requires auth)

## External APIs Used

- **NewsAPI**: Comprehensive news API with 100 requests/day free tier
- **GNews API**: Global news with 100 requests/day free tier
- **NewsCatcher News API**: Flexible news aggregation
- **NewsAPI.ai**: High volume with 2000 requests/month free tier

## Development Steps

1. **Authentication System**
   - User registration with password hashing
   - JWT-based login system
   - Protected routes middleware

2. **User Preferences**
   - Store user news preferences
   - Category and source filters
   - Language preferences

3. **News Aggregation**
   - Integrate multiple news APIs
   - Fetch news based on user preferences
   - Implement caching for efficiency

4. **Error Handling & Validation**
   - Input validation for all endpoints
   - Comprehensive error messages
   - Proper HTTP status codes

5. **Additional Features**
   - User favorites/bookmarks
   - News trending analysis
   - Notification system

## Technologies Used

- **Express.js**: Web framework
- **bcrypt**: Password hashing
- **JWT**: Token-based authentication
- **Mongoose**: MongoDB ODM
- **Axios**: HTTP client for external APIs
- **dotenv**: Environment variable management

## License

ISC

## Author

Your Name
