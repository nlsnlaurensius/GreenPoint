import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import RRR from "../assets/RRR.png";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {loading && <Loader message="Checking account..." />}
      <header className="flex items-center px-6 py-4 border-b">
        <a href="/" className="focus:outline-none" tabIndex={0}>
          <img src={Logo} alt="GreenPoint logo" className="h-9 cursor-pointer transition-transform duration-300 hover:scale-110" />
        </a>
      </header>
      <main className={`flex-1 flex flex-col md:flex-row items-center justify-center px-2 sm:px-4 py-8 md:py-0 gap-6 sm:gap-8 transition-opacity duration-700 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full max-w-md mx-auto md:mx-0 md:mr-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#004828] mb-6 sm:mb-8 text-center md:text-center">Login</h1>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-base sm:text-lg font-semibold mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base sm:text-lg font-semibold mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#004828] text-white py-2 rounded-full text-base sm:text-lg font-semibold shadow-md hover:bg-green-800 transition"
              disabled={loading}
            >
               {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-green-700 hover:underline">Forgot your password?</a>
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-700 mt-4 sm:mt-6">
            By continuing with Email, you agree to GreenPoint's <br />
            <a href="#" className="text-[#004828] underline">Terms of Service</a> and <a href="#" className="text-[#004828] underline">Privacy Policy</a>.
          </p>
          <p className="text-center text-sm sm:text-base mt-4 sm:mt-6">
            Don't have an account? <a href="/register" className="text-[#004828] font-bold">Sign up</a>
          </p>
        </div>
        <div className="hidden md:block w-full max-w-lg">
          <img
            src={RRR}
            alt="Reduce Reuse Recycle"
            className="rounded-full w-full h-auto object-cover shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}