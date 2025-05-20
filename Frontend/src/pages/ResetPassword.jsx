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
    if (password !== confirmPassword) {
      setError("Password tidak sama.");
      setLoading(false);
      return;
    }
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      if (res.data.success) {
        setMessage("Password berhasil direset. Silakan login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Gagal reset password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {loading && <Loader message="Mengganti password..." />}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <label className="block mb-2 font-semibold">Password Baru</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-600"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold">Konfirmasi Password</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-600"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition mb-2">
          Reset Password
        </button>
        <button type="button" onClick={() => navigate('/login')} className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition mb-2">
          Back to Login
        </button>
        {message && <div className="text-green-600 mt-4 text-center">{message}</div>}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </form>
    </div>
  );
}
