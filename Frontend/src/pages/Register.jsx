import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import RRR from "../assets/RRR.png";
import api from "../api";
import Loader from "../components/Loader";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
     setLoading(true);

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
       setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', { username, email, password });

      if (response.data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
          setError(response.data.message || 'Registration failed.');
      }
    } catch (err) {
       console.error('Registration error:', err.response?.data?.message || err.message);
       setError(err.response?.data?.message || 'An error occurred during registration.');
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {loading && <Loader message="Registering account..." />}
      <header className="flex items-center px-6 py-4 border-b">
        <a href="/" className="focus:outline-none" tabIndex={0}>
          <img src={Logo} alt="GreenPoint logo" className="h-9 cursor-pointer transition-transform duration-300 hover:scale-110" />
        </a>
      </header>
      <main className={`flex-1 flex flex-col md:flex-row items-center justify-center px-2 sm:px-4 py-8 md:py-0 gap-6 sm:gap-8 transition-opacity duration-700 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full max-w-md mx-auto md:mx-0 md:mr-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#004828] mb-6 sm:mb-8 text-center md:text-center">Register</h1>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-base sm:text-lg font-semibold mb-1">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 sm:px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base sm:text-lg font-semibold mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your personal or work email"
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
            {success && <div className="text-green-600 text-center">{success}</div>}

            <button
              type="submit"
              className="w-full bg-[#004828] text-white py-2 rounded-full text-base sm:text-lg font-semibold shadow-md hover:bg-green-800 transition"
              disabled={loading}
            >
               {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <p className="text-center text-xs sm:text-sm text-gray-700 mt-4 sm:mt-6">
            By continuing with Email, you agree to GreenPoint's <br />
            <a href="#" className="text-[#004828] underline">Terms of Service</a> and <a href="#" className="text-[#004828] underline">Privacy Policy</a>.
          </p>
          <p className="text-center text-sm sm:text-base mt-4 sm:mt-6">
            Already signed up? <a href="/login" className="text-[#004828] font-bold">Go to login</a>
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