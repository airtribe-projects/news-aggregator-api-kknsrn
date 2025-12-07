# Quick Start Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB installed locally or Atlas account
- API keys from at least one news provider

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

Edit `.env` and add:
- `JWT_SECRET`: A strong random string
- `NEWSAPI_KEY`: Get from https://newsapi.org
- `GNEWS_API_KEY`: Get from https://gnews.io
- `MONGODB_URI`: Your MongoDB connection string

### 3. Start MongoDB
If running locally:
```bash
mongod
```

Or use MongoDB Atlas (cloud):
Update `MONGODB_URI` in `.env` with your Atlas connection string.

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## Verify Installation
Check health endpoint:
```bash
curl http://localhost:5000/api/health
```

## Next Steps

1. **Register a User**
   - POST `/api/auth/register` with name, email, password

2. **Login**
   - POST `/api/auth/login` to get JWT token

3. **Set Preferences**
   - PUT `/api/users/preferences` with your news categories

4. **Get News**
   - GET `/api/news/personalized` to get personalized news
   - GET `/api/news/search?q=topic` to search news

See `API_DOCUMENTATION.md` for complete endpoint documentation.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP address

### News API Errors
- Verify API keys are correct in `.env`
- Check API rate limits (NewsAPI: 100/day free tier)
- Review external API documentation

### Port Already in Use
Change `PORT` in `.env` to an available port

## Development Tips

- Use Postman or Insomnia to test endpoints
- Check logs in console for debugging
- Use `API_TESTS.js` for automated testing
- Keep `.env` file secure and don't commit to git

## Project Structure

```
├── app.js                 # Main server entry point
├── config/               # Configuration files
│   ├── constants.js       # App constants
│   └── database.js        # MongoDB connection
├── src/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth, validation
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── services/          # External API clients
│   └── utils/             # Helper functions
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md              # Full documentation
```

## Common Tasks

### Reset Database
```bash
# Connect to MongoDB
mongo

# In mongo shell
use news-aggregator
db.dropDatabase()
```

### View Database
```bash
mongo
use news-aggregator
db.users.find()
db.articles.find()
```

### Check Node Modules
```bash
npm list
```

### Update Dependencies
```bash
npm update
```
