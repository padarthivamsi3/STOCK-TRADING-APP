import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Skeleton } from "../components/ui/skeleton";

import Landing from "../pages/Landing";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

// Lazy loaded pages
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const StockSearch = React.lazy(() => import("../pages/StockSearch"));
const StockDetails = React.lazy(() => import("../pages/StockDetails"));
const Portfolio = React.lazy(() => import("../pages/Portfolio"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Wallet = React.lazy(() => import("../pages/Wallet"));
const Transactions = React.lazy(() => import("../pages/Transactions"));
const Profile = React.lazy(() => import("../pages/Profile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

/* ---------------- Protected Route ---------------- */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/* ---------------- Guest Only Route ---------------- */

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        Loading...
      </div>
    );
  }

  // Logged-in users should not see Login/Register pages
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ---------------- Loading Skeleton ---------------- */

const PageSkeleton = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

/* ---------------- Router ---------------- */

export const router = createBrowserRouter([
  // Landing Page (Accessible to Everyone)
  {
    path: "/",
    element: <Landing />,
  },

  // Authentication Pages
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Suspense fallback={<PageSkeleton />}>
              <Login />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Suspense fallback={<PageSkeleton />}>
              <Register />
            </Suspense>
          </PublicRoute>
        ),
      },
    ],
  },

  // Protected Application
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/stocks",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <StockSearch />
          </Suspense>
        ),
      },
      {
        path: "/stocks/:symbol",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <StockDetails />
          </Suspense>
        ),
      },
      {
        path: "/portfolio",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "/wallet",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Wallet />
          </Suspense>
        ),
      },
      {
        path: "/transactions",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Transactions />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },

  // 404
  {
    path: "*",
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <NotFound />
      </Suspense>
    ),
  },
]);