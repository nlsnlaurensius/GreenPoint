import React, { useState } from "react";
import api from "../api";
import Loader from "../components/Loader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await api.post("/auth/forgot-password", { email });
      if (res.data.success) {
        setMessage("A password reset link has been sent to your email if it is registered.");
      } else {
        setError(res.data.message || "Failed to send password reset email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {loading && <Loader message="Sending reset email..." />}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#004828] mb-6 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004828]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#004828] text-white py-2 rounded-full font-semibold shadow-md hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
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
