import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import History from "./pages/History";
import Redeem from "./pages/Redeem";
import { useAuth } from "./contexts/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBankSampahs from "./pages/admin/ManageBankSampahs";
import ManageRewards from "./pages/admin/ManageRewards";
import ViewWasteDeposits from './pages/admin/ViewWasteDeposits';
import ViewRewardRedemptions from './pages/admin/ViewRewardRedemptions';
import ManageUsers from "./pages/admin/ManageUsers";
import Loader from './components/Loader';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function ProtectedRoute({ element }) {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
      return <Loader message="Memuat data..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return element;
}

function AdminRoute({ element }) {
  const { isAuthenticated, role, loading } = useAuth();

   if (loading) {
       return <Loader message="Memuat data..." />;
   }

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return element;
}

export default function Router() {
  const { isAuthenticated, loading, role } = useAuth();

  if (!loading && isAuthenticated && role === 'admin' && !window.location.pathname.startsWith('/admin')) {
    window.location.replace('/admin');
    return null;
  }

  const defaultLoginRedirect = isAuthenticated ? "/dashboard" : "/login";


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/deposit" element={<ProtectedRoute element={<Deposit />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        <Route path="/redeem" element={<ProtectedRoute element={<Redeem />} />} />
         <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
         <Route path="/admin/bank-sampahs" element={<AdminRoute element={<ManageBankSampahs />} />} />
         <Route path="/admin/rewards" element={<AdminRoute element={<ManageRewards />} />} />
         <Route path="/admin/waste-deposits" element={<ViewWasteDeposits />} />
        <Route path="/admin/reward-redemptions" element={<ViewRewardRedemptions />} />
        <Route path="/admin/users" element={<AdminRoute element={<ManageUsers />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}