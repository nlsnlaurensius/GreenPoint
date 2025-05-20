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
  let status = "Bronze";
  if (points > 100 && points < 500) {
    status = "Silver";
  } else if (points >= 500) {
    status = "Gold";
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {loading && <Loader message="Loading dashboard..." />}
      <div className={loading ? 'opacity-0 pointer-events-none' : 'transition-opacity duration-700 opacity-100'}>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#004828] mb-4 sm:mb-8 text-center drop-shadow-lg">Dashboard</h1>
          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border border-green-100">
              <img src={Handphone} alt="Handphone" className="w-28 h-28 object-contain mb-4" />
              <span className="text-lg font-semibold text-gray-700 mb-1">Welcome, <span className="text-[#004828]">{username}</span>!</span>
              <span className="text-base text-gray-500 mb-4">Status: <span className="font-bold text-[#00A86L]">{status}</span></span>
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#00A86B] to-[#004828] rounded-xl px-8 py-6 shadow-lg mb-2">
                <span className="text-5xl font-bold text-white mb-1">{points}</span>
                <span className="text-lg font-semibold text-white">Points</span>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center">
              <Link to="/deposit" className="w-full">
                <button className="w-full bg-[#004828] text-white text-xl font-semibold rounded-full px-8 py-4 shadow-lg hover:bg-green-800 hover:scale-105 transition-all duration-300">
                  Deposit Waste
                </button>
              </Link>
              <Link to="/redeem" className="w-full">
                <button className="w-full bg-[#00A86B] text-white text-xl font-semibold rounded-full px-8 py-4 shadow-lg hover:bg-[#004828] hover:scale-105 transition-all duration-300">
                  Redeem Points
                </button>
              </Link>
              <Link to="/history" className="w-full">
                <button className="w-full bg-gradient-to-r from-[#00A86B] to-[#004828] text-white text-xl font-semibold rounded-full px-8 py-4 shadow-lg hover:from-[#004828] hover:to-[#00A86B] hover:scale-105 transition-all duration-300">
                  View History
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}