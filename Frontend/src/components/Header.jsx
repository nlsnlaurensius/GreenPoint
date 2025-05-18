import React from 'react';
import Logo from '../assets/Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <header className="navbar-blur shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/60">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>
            <img
              src={Logo}
              alt="GreenPoint logo"
              className="h-9 cursor-pointer"
            />
          </a>
        </div>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <a href="#tutorial" className="hover:text-black font-semibold" onClick={e => handleSmoothScroll(e, 'tutorial')}>Tutorial</a>
          <a href="#map" className="hover:text-black font-semibold" onClick={e => handleSmoothScroll(e, 'map')}>GP Location</a>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="hover:text-black font-semibold">Dashboard</a>
              <a href="/deposit" className="hover:text-black font-semibold">Deposit</a>
              <a href="/history" className="hover:text-black font-semibold">History</a>
              <a href="/redeem" className="hover:text-black font-semibold">Reedem</a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-[#004828] text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Login / Register
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
