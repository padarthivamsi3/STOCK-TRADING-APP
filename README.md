# Stock Trading Web Application 📈

A professional, full-stack stock trading platform built with modern web technologies. Users can search stocks, analyze market trends with interactive charts, buy/sell stocks virtually, manage portfolios, and track investments. Inspired by popular trading platforms like Zerodha Kite, Groww, Robinhood, and TradingView.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Backend Integration](#backend-integration)
- [Project Highlights](#project-highlights)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

## Project Overview

### Purpose
To build a production-quality stock trading platform that provides users with a seamless experience to explore markets, analyze stocks, and manage their virtual portfolios.

### Business Objective
Create an intuitive, professional trading interface that is responsive, visually appealing, and functionally complete for both beginners and experienced traders.

### Target Users
- Individual investors
- Trading enthusiasts
- Students learning about stock markets
- Developers building financial applications

### Key Functionalities
- **Authentication**: Secure login/register with JWT
- **Market Exploration**: Search stocks, view trending stocks, detailed stock information
- **Trading**: Buy and sell stocks with real-time portfolio updates
- **Portfolio Management**: View holdings, profit/loss, and allocation
- **Wallet**: Manage virtual funds, deposit/withdraw, track transactions
- **Analytics**: Interactive charts, investment summaries, order history

### Real-World Inspiration
This project draws inspiration from leading trading platforms:
- **Zerodha Kite**: Clean, professional UI and fast performance
- **Groww**: User-friendly onboarding and portfolio management
- **Robinhood**: Simple, modern trading experience
- **TradingView**: Powerful interactive charts

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication with Cookies
- Protected Routes

### Dashboard
- Portfolio Overview
- Wallet Balance Display
- Investment Summary
- Profit/Loss Analytics

### Markets
- Stock Search Functionality
- Trending Stocks Grid
- Detailed Stock Pages
- Interactive Candlestick/Line Charts
- Company Profile Information

### Trading
- Buy Stocks
- Sell Stocks
- Order Validation
- Real-time Portfolio Updates

### Portfolio
- Current Holdings
- Stock-wise Value
- Profit/Loss per Holding
- Portfolio Allocation Summary

### Wallet
- Deposit Virtual Funds
- Withdraw Virtual Funds
- Complete Transaction History

### Orders
- Buy/Sell Order History
- Order Details
- Order Status Tracking

### Profile
- User Information Display
- Account Management

## Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- React Router DOM
- Axios
- TanStack Query (React Query)
- React Hook Form
- Framer Motion
- TradingView Lightweight Charts
- Lucide React (Icons)
- Sonner (Notifications)
- shadcn/ui (UI Components)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- Mongoose ODM
- JWT Authentication
- Bcrypt (Password Hashing)
- RESTful API Architecture

### External APIs
- Finnhub API (Stock Quotes, Company Profile, Historical Data)

## Architecture

```
┌─────────────────┐
│   Frontend      │ React + Vite
└────────┬────────┘
         │ REST API Calls
         │
┌────────▼────────┐
│  Backend        │ Express.js + Node.js
└────────┬────────┘
         │ Database Queries
         │
┌────────▼────────┐
│   MongoDB       │ Database
└─────────────────┘
```

## Folder Structure

### Root
```
Stock Trading/
├── client/       # React Frontend
├── server/       # Express Backend
└── README.md
```

### Client (Frontend)
```
client/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── client.js          # Axios client setup
│   ├── assets/
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── constants/
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── features/
│   │   └── stocks/
│   │       └── components/
│   │           └── StockChart.jsx
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StockSearch.jsx
│   │   ├── StockDetails.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Wallet.jsx
│   │   ├── Orders.jsx
│   │   └── ...
│   ├── routes/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

### Server (Backend)
```
server/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── userController.js
│   ├── stockController.js
│   ├── orderController.js
│   └── transactionController.js
├── middlewares/
│   └── authMiddleware.js      # JWT validation
├── models/
│   ├── userSchema.js
│   ├── orderSchema.js
│   ├── transactionSchema.js
│   └── stockSchema.js
├── routes/
│   ├── userRoute.js
│   ├── stockRoute.js
│   ├── orderRoute.js
│   └── transactionRoute.js
├── services/
│   └── stockService.js        # Finnhub API integration
├── index.js
├── package.json
└── documentation.html         # Backend API docs
```

## Screenshots

> **Note**: Replace placeholder paths with actual screenshots

![Landing Page](screenshots/landing-page.png)
![Login Page](screenshots/login-page.png)
![Register Page](screenshots/register-page.png)
![Dashboard](screenshots/dashboard.png)
![Markets Page](screenshots/markets-page.png)
![Stock Details](screenshots/stock-details.png)
![Portfolio](screenshots/portfolio-page.png)
![Wallet](screenshots/wallet-page.png)
![Orders](screenshots/orders-page.png)
![Profile](screenshots/profile-page.png)

## Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or cloud instance)
- Finnhub API Key (free tier available)

### Clone the Repository
```bash
git clone https://github.com/padarthivamsi3/STOCK-TRADING-APP.git
cd stock-trading-app
```

## Environment Variables

### Backend (server/.env)
```env
# Server Configuration
PORT=8060

# Database
MONGO_URI=mongodb://127.0.0.1:27017/stock_trading

# JWT Secret Key (generate your own secure secret)
JWT_SECRET=your_jwt_secret_key_here

# Finnhub API (get from https://finnhub.io/)
FINNHUB_API_KEY=your_finnhub_api_key_here

# Frontend URL for CORS
DEV_URL=http://localhost:5175
```

### Frontend (client/.env)
```env
# Backend API URL
VITE_API_URL=http://localhost:8060/api
```

## Running the Project

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 2. Start Backend
```bash
cd server
npm run dev
```
Backend will start at `http://localhost:8060`

### 3. Start Frontend
```bash
cd client
npm run dev
```
Frontend will start at `http://localhost:5175` (or next available port)

## Backend Integration

### REST API Communication
The frontend communicates with the backend using a configured Axios client (`src/api/client.js`) that:
- Automatically includes JWT cookies
- Handles CORS properly
- Intercepts errors
- Base URL configured via environment variables

### Authentication Flow
1. User registers with email/password → password hashed with bcrypt
2. User logs in → JWT token generated and stored in HTTP-only cookie
3. Protected routes validate JWT via auth middleware
4. Token is automatically included in API requests

### API Endpoints Consumed
- `GET /api/stocks?search=`: Search stocks
- `GET /api/stocks/:symbol`: Get stock quote and profile
- `GET /api/stocks/:symbol/history`: Get historical OHLC data
- `POST /api/orders`: Create buy/sell order
- `GET /api/orders`: Get order history
- `POST /api/transactions`: Create wallet transaction
- `GET /api/transactions`: Get transaction history
- `GET /api/user/profile`: Get user profile and portfolio

### Error Handling & Loading States
- Comprehensive error handling with Sonner toast notifications
- Skeleton loading states for better UX
- Error boundary fallback components
- Proper HTTP status codes from backend

## Project Highlights

✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop  
✅ **Feature-Based Architecture**: Clean separation of concerns  
✅ **Reusable Components**: Modular, maintainable codebase  
✅ **Protected Routes**: Secure authentication system  
✅ **Professional UI/UX**: Dark theme with smooth animations  
✅ **Interactive Stock Charts**: TradingView Lightweight Charts integration  
✅ **Modern React Practices**: Hooks, Context API, React Query  
✅ **RESTful API Design**: Well-structured backend API  
✅ **State Management**: React Query for server state, Context for client state  
✅ **Optimized Performance**: Code splitting, lazy loading, proper caching

## Future Enhancements

- 🔜 Watchlist functionality
- 🔜 Live Stock Prices using WebSockets
- 🔜 Real-time Notifications
- 🔜 Advanced Candlestick Indicators (MACD, RSI, Bollinger Bands)
- 🔜 Technical Analysis Tools
- 🔜 AI-Powered Stock Recommendations
- 🔜 Stock News Feed integration
- 🔜 Multi-language Support
- 🔜 Dark/Light Theme Toggle
- 🔜 Native Mobile Application (React Native)
- 🔜 Advanced Portfolio Analytics and Reports
- 🔜 Price Alerts

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure your code follows the existing style and conventions.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

**Your Name**  
- GitHub: [@your-username](https://github.com/AkhilG3)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## Acknowledgements

Thanks to all these amazing technologies and resources!

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web application framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Finnhub API](https://finnhub.io/) - Stock market data API
- [TradingView Lightweight Charts](https://tradingview.github.io/lightweight-charts/) - Financial charting library
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Build tool
