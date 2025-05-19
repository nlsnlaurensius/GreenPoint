import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  React.useEffect(() => {
    if (location.pathname === "/" && location.state && location.state.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <header className="navbar-blur shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/60">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <a href="#" onClick={e => { e.preventDefault(); navigate('/'); }}>
            <img
              src={Logo}
              alt="GreenPoint logo"
              className="h-9 cursor-pointer"
            />
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:flex-row flex-col md:items-center md:space-x-6 space-y-4 md:space-y-0 text-sm text-gray-700 px-6 py-4 md:py-0`}
        >
          
        <a
            href="/"
            onClick={e => {
              if (location.pathname !== "/") {
                e.preventDefault();
                navigate("/", { state: { scrollTo: "tutorial" } });
              } else {
                handleSmoothScroll(e, "tutorial");
              }
              setMenuOpen(false);
            }}
            className="hover:text-black font-semibold"
          >
            Tutorial
          </a>
          <a
            href="/"
            onClick={e => {
              if (location.pathname !== "/") {
                e.preventDefault();
                navigate("/", { state: { scrollTo: "map" } });
              } else {
                handleSmoothScroll(e, "map");
              }
              setMenuOpen(false);
            }}
            className="hover:text-black font-semibold"
          >
            GP Location
          </a>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="hover:text-black font-semibold">Dashboard</a>
              <a href="/deposit" className="hover:text-black font-semibold">Deposit</a>
              <a href="/history" className="hover:text-black font-semibold">History</a>
              <a href="/redeem" className="hover:text-black font-semibold">Reedem</a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
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
