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
        setMessage("Link reset password telah dikirim ke email Anda jika terdaftar.");
      } else {
        setError(res.data.message || "Gagal mengirim email reset password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "There is an Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {loading && <Loader message="Mengirim email reset..." />}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot the Password</h1>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-600"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition mb-2">
          Send
        </button>
        <button type="button" onClick={() => window.location.href = '/login'} className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition mb-2">
          Back to Login
        </button>
        {message && <div className="text-green-600 mt-4 text-center">{message}</div>}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
}
