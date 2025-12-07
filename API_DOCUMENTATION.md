# API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "categories": ["general"],
      "sources": [],
      "language": "en",
      "country": "us"
    }
  }
}
```

### 2. Login User
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: Same as register

### 3. Get Current User
- **Method**: `GET`
- **Endpoint**: `/auth/me`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "user": { ... }
}
```

### 4. Logout
- **Method**: `POST`
- **Endpoint**: `/auth/logout`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## User Profile Endpoints

### 1. Get Profile
- **Method**: `GET`
- **Endpoint**: `/users/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Response**:
```json
{
  "success": true,
  "user": { ... }
}
```

### 2. Update Profile
- **Method**: `PUT`
- **Endpoint**: `/users/profile`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### 3. Update Preferences
- **Method**: `PUT`
- **Endpoint**: `/users/preferences`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "categories": ["technology", "business", "science"],
  "language": "en",
  "country": "us",
  "sources": ["newsapi", "gnews"]
}
```

### 4. Save Article
- **Method**: `POST`
- **Endpoint**: `/users/save-article`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "articleId": "article_object_id"
}
```

### 5. Get Saved Articles
- **Method**: `GET`
- **Endpoint**: `/users/saved-articles`
- **Headers**: `Authorization: Bearer {token}`

### 6. Remove Saved Article
- **Method**: `DELETE`
- **Endpoint**: `/users/saved-articles/{articleId}`
- **Headers**: `Authorization: Bearer {token}`

## News Endpoints

### 1. Get Personalized News
- **Method**: `GET`
- **Endpoint**: `/news/personalized`
- **Headers**: `Authorization: Bearer {token}`
- **Description**: Returns news based on user preferences
- **Response**:
```json
{
  "success": true,
  "totalResults": 40,
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description",
      "urlToImage": "image_url",
      "url": "article_url",
      "author": "Author name",
      "source": { "name": "Source name" },
      "publishedAt": "2025-12-06T12:00:00Z"
    }
  ]
}
```

### 2. Search News
- **Method**: `GET`
- **Endpoint**: `/news/search`
- **Headers**: `Authorization: Bearer {token}`
- **Query Parameters**:
  - `q` (required): Search query
  - `category` (optional): News category
  - `sortBy` (optional): publishedAt, relevancy (default: publishedAt)
  - `language` (optional): Language code (default: en)
- **Example**: `/news/search?q=artificial intelligence&sortBy=publishedAt`
- **Response**: Same as personalized news

### 3. Get Trending News
- **Method**: `GET`
- **Endpoint**: `/news/trending`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Same as personalized news

## Health Check
- **Method**: `GET`
- **Endpoint**: `/health`
- **Response**:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-12-06T12:00:00Z"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

## Categories Available
- business
- entertainment
- general
- health
- science
- sports
- technology

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Personalized News
```bash
curl -X GET http://localhost:5000/api/news/personalized \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Search News
```bash
curl -X GET "http://localhost:5000/api/news/search?q=technology" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
