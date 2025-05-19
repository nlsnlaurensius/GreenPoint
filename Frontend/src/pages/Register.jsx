import React from "react";
import Logo from "../assets/Logo.png";
import RRR from "../assets/RRR.png";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center px-6 py-4 border-b">
        <a href="/" className="focus:outline-none" tabIndex={0}>
          <img src={Logo} alt="GreenPoint logo" className="h-9 cursor-pointer" />
        </a>
      </header>
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-0 gap-8">
        {/* Left: Register Form */}
        <div className="w-full max-w-md mx-auto md:mx-0 md:mr-8">
          <h1 className="text-5xl font-bold text-[#004828] mb-8 text-center md:text-center">Sign Up</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-lg font-semibold mb-1">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your personal or work email"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-semibold mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004828] text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#004828] text-white py-2 rounded-full text-lg font-semibold shadow-md hover:bg-green-800 transition"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-700 mt-6">
            By continuing with Email, you agree to GreenPoint's <br />
            <a href="#" className="text-[#004828] underline">Terms of Service</a> and <a href="#" className="text-[#004828] underline">Privacy Policy</a>.
          </p>
          <p className="text-center text-base mt-6">
            Already signed up? <a href="/login" className="text-[#004828] font-bold">Go to login</a>
          </p>
        </div>
        {/* Right: Illustration */}
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
