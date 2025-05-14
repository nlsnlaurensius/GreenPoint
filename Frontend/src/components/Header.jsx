import React from 'react';
import Logo from '../assets/Logo.png'; // pastikan path sesuai

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="GreenPoint logo"
            className="h-9" // kamu bisa sesuaikan ukuran sesuai kebutuhan
          />
        </div>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <a href="#" className="hover:text-black font-semibold">Tutorial</a>
          <a href="#" className="hover:text-black font-semibold">GP Location</a>
          <a
            href="#"
            className="bg-[#004828] text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Login / Register
          </a>
        </nav>
      </div>
    </header>
  );
}
