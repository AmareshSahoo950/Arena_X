import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { createBrowserRouter } from "react-router-dom";
import "./styles/global.css";

import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardParticipant from "./pages/DashboardParticipant";
import DashboardAdmin from "./pages/DashboardAdmin";
import SubmissionFormPage from "./pages/SubmissionFormPage";
import AdminSubmissionsPage from "./pages/AdminSubmissionsPage";
import PublicSubmissionsPage from "./pages/PublicSubmissionsPage";

import { timerLoader } from "./loaders/timerLoader";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? <DashboardAdmin /> : <DashboardParticipant />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "submissions", element: <PublicSubmissionsPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: timerLoader, 
      },
      {
        path: "submission",
        element: (
          <ProtectedRoute>
            <SubmissionFormPage />
          </ProtectedRoute>
        ),
        loader: timerLoader,
      },

      // Admin-only pages
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        ),
        loader: timerLoader,
      },
      {
        path: "admin/submissions",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminSubmissionsPage />
          </ProtectedRoute>
        ),
        loader: timerLoader,
      },
    ],
  },
]);


const RootApp = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
