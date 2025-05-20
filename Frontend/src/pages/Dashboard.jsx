import Header from "../components/Header";
import Handphone from "../assets/hendphone.png";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


export default function Dashboard() {
   const { user } = useAuth();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
     const timer = setTimeout(() => setLoading(false), 800);
     return () => clearTimeout(timer);
   }, []);
   const username = user?.username || "User";
   const points = user?.total_points ?? 0;
   const status = "Gold";
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {loading && <Loader message="Loading dashboard..." />}
      <div className={loading ? 'opacity-0 pointer-events-none' : 'transition-opacity duration-700 opacity-100'}>
        <Header />
        <main className="flex flex-col items-center pt-8 sm:pt-12 flex-1 px-2 sm:px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#004828] mb-4 sm:mb-6 text-center transition-transform duration-700" style={{transform: loading ? 'translateY(40px)' : 'translateY(0)'}}>
            Dashboard
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-medium text-black mb-6 sm:mb-12 text-center transition-opacity duration-700" style={{opacity: loading ? 0 : 1}}>
            Welcome, <span className="font-bold">{username}</span>!
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-5xl px-2 sm:px-0">
            <div className="bg-gradient-to-br from-[#004828] to-gray-100 rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col items-center w-full max-w-xs transition-transform duration-500 hover:scale-105">
              <span className="text-5xl font-bold text-[#004828] mb-2">{points}</span>
              <span className="text-lg font-semibold text-gray-700">Points</span>
            </div>
            <div className="bg-gradient-to-br from-[#00A86B] to-[#004828] rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col items-center w-full max-w-xs transition-transform duration-500 hover:scale-105">
              <span className="text-5xl font-bold text-white mb-2">{status}</span>
              <span className="text-lg font-semibold text-gray-200">Status</span>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#004828] mb-2 sm:mb-4 text-center md:text-left">Quick Actions</h3>
          <Link to="/deposit" className="w-full">
            <button className="w-full bg-[#004828] text-white text-base sm:text-xl font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md hover:bg-green-800 transition-transform duration-300 hover:scale-105">
              Deposit Waste
            </button>
          </Link>
          <Link to="/redeem" className="w-full">
            <button className="w-full bg-[#004828] text-white text-base sm:text-xl font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md hover:bg-green-800 transition-transform duration-300 hover:scale-105">
              Redeem Points
            </button>
          </Link>
          <Link to="/history" className="w-full">
            <button className="w-full bg-[#004828] text-white text-base sm:text-xl font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md hover:bg-green-800 transition-transform duration-300 hover:scale-105">
              View History
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
}