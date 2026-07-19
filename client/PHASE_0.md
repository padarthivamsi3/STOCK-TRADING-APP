
# Stock Trading App - Frontend Phase 0 Analysis & Planning

---

## 1. Project Overview

### Purpose
A premium, modern, fintech stock trading application allowing users to:
- Register/Login with JWT authentication
- Search & view stock details
- Buy & sell stocks
- Manage their portfolio
- Track order history
- Manage wallet (deposit/withdraw)
- View transaction history

### Backend Integration
Backend is fully complete, running on `http://localhost:8060/api`
- Authentication via JWT stored in `token` cookie
- All endpoints use standard REST
- Responses follow consistent format `{ success: boolean, message?: string, ...data }`

---

## 2. Feature List

### Public Features
- Landing page (marketing)
- User registration
- User login
- Stock search
- Stock details view

### Protected Features
- Dashboard
- Portfolio overview
- Buy/sell stocks
- Order history
- Wallet management
- Transaction history
- Profile page
- Settings page
- Logout

---

## 3. User Flow

### New User Journey
1. Visit Landing Page → 2. Register → 3. Login → 4. Dashboard (starts with $100,000) → 5. Explore/Trade stocks

### Existing User Journey
1. Visit Landing Page → 2. Login → 3. Dashboard → 4. Navigate to desired page

---

## 4. Frontend Architecture

### Architecture Style
- Feature-Based Architecture
- Clean Architecture principles
- Atomic Design for UI components

### Core Architectural Decisions
- Global state via React Context (auth, theme)
- Server state via TanStack Query
- Form state via React Hook Form + Zod
- Animations via Framer Motion
- UI components via shadcn/ui + TailwindCSS

---

## 5. Folder Structure

```
src/
├── api/                      # API layer
│   ├── client.ts            # Axios instance & interceptors
│   └── endpoints.ts         # API endpoint definitions
├── components/              # Reusable UI components (Atomic)
│   ├── ui/                  # shadcn/ui components
│   └── [Feature Components]
├── features/                # Feature modules (Business logic)
│   ├── auth/
│   ├── dashboard/
│   ├── stocks/
│   ├── portfolio/
│   ├── orders/
│   ├── wallet/
│   ├── transactions/
│   ├── profile/
│   └── settings/
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useStocks.ts
│   └── ...
├── layouts/                 # Page layouts
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
├── pages/                   # Page components
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── StockSearch.tsx
│   ├── StockDetails.tsx
│   ├── Portfolio.tsx
│   ├── Orders.tsx
│   ├── Wallet.tsx
│   ├── Transactions.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── routes/                  # Routing configuration
│   └── index.tsx
├── services/                # Business services
│   └── ...
├── types/                   # TypeScript types & interfaces
│   ├── models.ts
│   └── api.ts
├── utils/                   # Helper functions
│   ├── formatters.ts
│   └── validators.ts
├── contexts/                # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── constants/               # App constants
│   └── index.ts
├── assets/                  # Static assets
│   ├── images/
│   └── icons/
├── styles/                  # Global styles
│   └── globals.css
├── App.tsx                  # Root component
└── main.tsx                 # App entry point
```

---

## 6. Routing Structure

| Path | Component | Auth Required |
|------|-----------|---------------|
| / | LandingPage | ❌ No |
| /login | LoginPage | ❌ No |
| /register | RegisterPage | ❌ No |
| /dashboard | DashboardPage | ✅ Yes |
| /stocks | StockSearchPage | ✅ Yes |
| /stocks/:symbol | StockDetailsPage | ✅ Yes |
| /portfolio | PortfolioPage | ✅ Yes |
| /orders | OrdersPage | ✅ Yes |
| /wallet | WalletPage | ✅ Yes |
| /transactions | TransactionsPage | ✅ Yes |
| /profile | ProfilePage | ✅ Yes |
| /settings | SettingsPage | ✅ Yes |
| * | NotFoundPage | ❌ No |

---

## 7. API Mapping

### Authentication API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login user |
| POST | /api/users/logout | Logout user |
| GET | /api/users/me | Get current user profile |

### Stock API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stocks | Search stocks (requires `search` query param) |
| GET | /api/stocks/:symbol | Get stock details (quote + profile) |

### Order API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders/buy | Buy stock |
| POST | /api/orders/sell | Sell stock |
| GET | /api/orders | Get all orders |
| GET | /api/orders/:id | Get order by ID |
| DELETE | /api/orders/:id | Cancel order |

### Transaction API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/transactions/deposit | Deposit money |
| POST | /api/transactions/withdraw | Withdraw money |
| GET | /api/transactions | Get all transactions |

---

## 8. State Management Plan

### Global State (React Context)
| State | Responsibility |
|-------|----------------|
| Auth Context | Current user, login/logout, check auth status |
| Theme Context | Dark/Light theme mode |

### Server State (TanStack Query)
| Query Key | Hook | Purpose |
|-----------|------|---------|
| ['user'] | useCurrentUser | Current user profile & portfolio |
| ['orders'] | useOrders | All orders |
| ['transactions'] | useTransactions | All transactions |
| ['stocks', search] | useSearchStocks | Stock search results |
| ['stock', symbol] | useStockDetails | Single stock details |

### Local State
| Component | State |
|-----------|-------|
| Forms | React Hook Form |
| UI | useState for modals, dropdowns, etc. |

---

## 9. UI Component Hierarchy

### Layout Components
- MainLayout
  - Navbar
  - Sidebar
  - Footer
- AuthLayout

### Reusable UI Components
- Buttons
- Inputs
- Cards
- Tables
- Dialogs/Modals
- Badges
- Skeletons
- Empty States
- Error States
- Charts (via Recharts)
- Search Components

### Feature-Specific Components
- PortfolioCard
- StockCard
- OrderCard
- TransactionCard
- WalletCard
- StatCard
- Buy/Sell Dialog

---

## 10. Development Roadmap

| Phase | Tasks |
|-------|-------|
| Phase 0 | ✅ Analysis & Planning (Current) |
| Phase 1 | Project Setup, Base Config, Layout |
| Phase 2 | Design System & Reusable Components |
| Phase 3 | Landing Page |
| Phase 4 | Authentication (Login/Register) |
| Phase 5 | Dashboard |
| Phase 6 | Stock Search & Details |
| Phase 7 | Portfolio |
| Phase 8 | Orders |
| Phase 9 | Wallet & Transactions |
| Phase 10 | Profile & Settings |
| Phase 11 | Polish & Optimization |

---
