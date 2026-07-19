# Stock Trading App - Backend Documentation

## Overview
This is the backend API for the Stock Trading application, built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, stock trading, portfolio management, and transaction history.

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Finnhub API Key (for real-time stock data)

### Installation
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server root and add the environment variables (see below)
4. Start the server:
   ```bash
   npm start
   # Or for development with nodemon:
   npm run dev
   ```
5. The server will run on `http://localhost:8060` by default

## Environment Variables
Create a `.env` file in the server root:
```env
# Server Configuration
PORT=8060
DEV_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/stock-trading

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# External API
FINNHUB_API_KEY=your-finnhub-api-key-here
```

## Project Structure
```
server/
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   ├── userController.js      # User authentication endpoints
│   ├── stockController.js     # Stock data endpoints
│   ├── orderController.js     # Order management endpoints
│   └── transactionController.js # Transaction endpoints
├── middlewares/
│   └── authMiddleware.js      # JWT authentication middleware
├── models/
│   ├── userSchema.js          # User model
│   ├── orderSchema.js         # Order model
│   └── transactionSchema.js   # Transaction model
├── routes/
│   ├── userRoute.js           # User routes
│   ├── stockRoute.js          # Stock routes
│   ├── orderRoute.js          # Order routes
│   └── transactionRoute.js    # Transaction routes
├── services/
│   └── stockService.js        # Finnhub API integration
├── index.js                   # Server entry point
└── package.json
```

## Database Models

### 1. User Model ([userSchema.js](file:///d:/Stock%20Trading/server/models/userSchema.js))
```javascript
{
  username: String (required)
  email: String (required, unique)
  usertype: String (enum: ["user", "admin"], default: "user")
  password: String (hashed, required)
  balance: Number (default: 100000, min: 0)
  portfolio: Array of objects:
    {
      symbol: String (uppercase, required)
      name: String (required)
      count: Number (min: 1, required)
      avgPrice: Number (min: 0, required)
    }
  timestamps: true
}
```

### 2. Order Model ([orderSchema.js](file:///d:/Stock%20Trading/server/models/orderSchema.js))
```javascript
{
  user: ObjectId (ref: "users", required)
  symbol: String (uppercase, required)
  name: String (required)
  price: Number (min: 0, required)
  count: Number (min: 1, required)
  totalPrice: Number (min: 0, required)
  stockType: String (enum: ["NASDAQ", "NYSE"], required)
  orderType: String (enum: ["BUY", "SELL"], required)
  orderStatus: String (enum: ["Pending", "Completed", "Cancelled"], default: "Pending")
  timestamps: true
}
```

### 3. Transaction Model ([transactionSchema.js](file:///d:/Stock%20Trading/server/models/transactionSchema.js))
```javascript
{
  user: ObjectId (ref: "users", required)
  type: String (enum: ["deposit", "withdraw"], required)
  paymentMethod: String (enum: ["UPI", "Card", "Bank Transfer"], required)
  amount: Number (min: 1, required)
  time: Date (default: Date.now)
  timestamps: true
}
```

## API Endpoints

### Base URL
`http://localhost:8060/api`

---

### Authentication Endpoints ([userRoute.js](file:///d:/Stock%20Trading/server/routes/userRoute.js))

#### 1. Register User
- **Endpoint**: `POST /users/register`
- **Public**: Yes
- **Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully.",
    "user": {
      "_id": "user_object_id",
      "username": "john_doe",
      "email": "john@example.com",
      "balance": 100000,
      "portfolio": []
    }
  }
  ```

#### 2. Login User
- **Endpoint**: `POST /users/login`
- **Public**: Yes
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "token": "jwt_token",
    "user": {
      "_id": "user_object_id",
      "username": "john_doe",
      "email": "john@example.com",
      "balance": 100000,
      "portfolio": []
    }
  }
  ```

#### 3. Logout User
- **Endpoint**: `POST /users/logout`
- **Public**: No (requires auth)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully."
  }
  ```

#### 4. Get User Profile
- **Endpoint**: `GET /users/profile` or `GET /users/me`
- **Public**: No (requires auth)
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_object_id",
      "username": "john_doe",
      "email": "john@example.com",
      "balance": 100000,
      "portfolio": []
    }
  }
  ```

---

### Stock Endpoints ([stockRoute.js](file:///d:/Stock%20Trading/server/routes/stockRoute.js))

#### 1. Search Stocks
- **Endpoint**: `GET /stocks`
- **Public**: Yes
- **Query Parameters**:
  - `search`: Search query (required)
- **Example**: `GET /stocks?search=apple`
- **Response**:
  ```json
  {
    "success": true,
    "stocks": { /* Finnhub search results */ }
  }
  ```

#### 2. Get Stock Details
- **Endpoint**: `GET /stocks/:symbol`
- **Public**: Yes
- **Parameters**:
  - `symbol`: Stock ticker symbol (e.g., AAPL)
- **Example**: `GET /stocks/AAPL`
- **Response**:
  ```json
  {
    "success": true,
    "quote": { /* Finnhub quote data */ },
    "profile": { /* Finnhub company profile data */ }
  }
  ```

---

### Order Endpoints ([orderRoute.js](file:///d:/Stock%20Trading/server/routes/orderRoute.js))
All endpoints require authentication.

#### 1. Buy Stock
- **Endpoint**: `POST /orders/buy`
- **Body**:
  ```json
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "count": 10,
    "stockType": "NASDAQ"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Stock bought successfully.",
    "order": { /* Order object */ }
  }
  ```

#### 2. Sell Stock
- **Endpoint**: `POST /orders/sell`
- **Body**:
  ```json
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "count": 5,
    "stockType": "NASDAQ"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Stock sold successfully.",
    "order": { /* Order object */ }
  }
  ```

#### 3. Get All Orders
- **Endpoint**: `GET /orders`
- **Response**:
  ```json
  {
    "success": true,
    "orders": [ /* Array of order objects */ ]
  }
  ```

#### 4. Get Order by ID
- **Endpoint**: `GET /orders/:id`
- **Parameters**:
  - `id`: Order ObjectId
- **Response**:
  ```json
  {
    "success": true,
    "order": { /* Order object */ }
  }
  ```

#### 5. Cancel Order
- **Endpoint**: `DELETE /orders/:id`
- **Parameters**:
  - `id`: Order ObjectId
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order cancelled successfully.",
    "order": { /* Order object with orderStatus: "Cancelled" */ }
  }
  ```

---

### Transaction Endpoints ([transactionRoute.js](file:///d:/Stock%20Trading/server/routes/transactionRoute.js))
All endpoints require authentication.

#### 1. Deposit Money
- **Endpoint**: `POST /transactions/deposit`
- **Body**:
  ```json
  {
    "amount": 5000,
    "paymentMethod": "UPI"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Money deposited successfully.",
    "transaction": { /* Transaction object */ }
  }
  ```

#### 2. Withdraw Money
- **Endpoint**: `POST /transactions/withdraw`
- **Body**:
  ```json
  {
    "amount": 2000,
    "paymentMethod": "Card"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Money withdrawn successfully.",
    "transaction": { /* Transaction object */ }
  }
  ```

#### 3. Get All Transactions
- **Endpoint**: `GET /transactions`
- **Response**:
  ```json
  {
    "success": true,
    "transactions": [ /* Array of transaction objects */ ]
  }
  ```

---

## Error Handling
All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Authentication
Protected endpoints require a valid JWT token, which is stored in a cookie named `token`. The JWT is generated during login and includes the user ID and email. The [authMiddleware.js](file:///d:/Stock%20Trading/server/middlewares/authMiddleware.js) handles token verification.

## External Services
This application uses the [Finnhub API](https://finnhub.io/) to fetch real-time stock data. You will need to sign up for a free API key from their website and add it to your `.env` file as `FINNHUB_API_KEY`.
