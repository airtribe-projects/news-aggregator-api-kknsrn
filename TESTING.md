# Testing Guide

## Unit Test Structure

This project uses Node.js built-in assertions for testing. To add comprehensive tests, install a testing framework:

```bash
npm install --save-dev jest @testing-library/node
npm install --save-dev supertest  # for API endpoint testing
```

## Test Files Location

Create test files in:
```
tests/
├── auth.test.js
├── users.test.js
├── news.test.js
└── utils.test.js
```

## Example Test File: tests/auth.test.js

```javascript
const request = require('supertest');
const app = require('../app');
const User = require('../src/models/User');

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    // Connect to test database
  });

  afterAll(async () => {
    // Close connections
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });

    it('should not register duplicate email', async () => {
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'hashed_password'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/auth.test.js

# Run with coverage
npm test -- --coverage
```

## Manual Testing with cURL

### 1. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Save token from login response and use it:
```bash
TOKEN="your_token_here"

# Get profile
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Update preferences
curl -X PUT http://localhost:5000/api/users/preferences \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "categories": ["technology", "business"],
    "language": "en",
    "country": "us"
  }'

# Get personalized news
curl -X GET http://localhost:5000/api/news/personalized \
  -H "Authorization: Bearer $TOKEN"

# Search news
curl -X GET "http://localhost:5000/api/news/search?q=artificial%20intelligence" \
  -H "Authorization: Bearer $TOKEN"
```

## Testing with Postman

1. Open Postman
2. Create a new collection: "News Aggregator API"
3. Set environment variable: `token` = (from login response)
4. Create requests:

**POST /api/auth/register**
- URL: `http://localhost:5000/api/auth/register`
- Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST /api/auth/login**
- URL: `http://localhost:5000/api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- In Tests tab:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
```

**GET /api/users/profile**
- URL: `http://localhost:5000/api/users/profile`
- Headers: `Authorization: Bearer {{token}}`

**PUT /api/users/preferences**
- URL: `http://localhost:5000/api/users/preferences`
- Headers: `Authorization: Bearer {{token}}`
- Body:
```json
{
  "categories": ["technology", "business"],
  "language": "en",
  "country": "us"
}
```

## Integration Testing Checklist

- [ ] User registration works
- [ ] Password hashing is secure
- [ ] JWT tokens are generated correctly
- [ ] Auth middleware blocks unauthorized requests
- [ ] User preferences are saved correctly
- [ ] News APIs respond correctly
- [ ] Articles are cached properly
- [ ] Search functionality works
- [ ] Error handling returns correct status codes
- [ ] Input validation rejects invalid data
