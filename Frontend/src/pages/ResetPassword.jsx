import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    // Password regex: min 8 chars, uppercase, lowercase, number, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      if (res.data.success) {
        setMessage("Password successfully reset. Please login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {loading && <Loader message="Resetting password..." />}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#004828] mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004828]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004828]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#004828] text-white py-2 rounded-full font-semibold shadow-md hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && <div className="text-green-600 mt-4 text-center">{message}</div>}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        <div className="mt-6 text-center">
          <a href="/login" className="text-[#004828] hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
