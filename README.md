# SB Stocks

SB Stocks is a production-style paper trading platform built with the MERN stack for practicing stock trading with virtual money.

## Features
- Authentication with JWT
- Responsive dashboard and market pages
- Portfolio, transactions, watchlist, and profile management
- Stock detail views and mock market data integration
- Dark modern UI with Tailwind and Recharts-ready charts

## Tech Stack
- Frontend: React, Vite, Tailwind, React Router, Axios, Recharts, React Icons, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, helmet, rate limiting

## Setup
1. Install dependencies:
   - `npm run install:all`
2. Create backend environment file:
   - Copy `backend/.env.example` to `backend/.env`
3. Start MongoDB locally.
4. Run the app:
   - `npm run dev`

## Environment Variables
Create `backend/.env` with:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sbstocks
JWT_SECRET=supersecretjwtkey
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

## Folder Structure
- `client/` for the React frontend
- `backend/` for the Express API with MVC structure
