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
      <div className={loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-8">
          <h1 className="text-3xl font-bold text-[#004828] mb-4 text-center">Dashboard</h1>
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-4 text-center">
              <span className="block text-lg font-semibold text-gray-700">Welcome, {username}!</span>
              <span className="block text-base text-gray-500">Status: {status}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-[#004828] mb-2">{points}</span>
              <span className="text-base font-semibold text-gray-700">Points</span>
            </div>
          </div>
          <div className="w-full max-w-md flex flex-col gap-4">
            <Link to="/deposit">
              <button className="w-full bg-[#004828] text-white text-base font-semibold rounded-full px-6 py-3 shadow-md hover:bg-green-800 transition">
                Deposit Waste
              </button>
            </Link>
            <Link to="/redeem">
              <button className="w-full bg-[#004828] text-white text-base font-semibold rounded-full px-6 py-3 shadow-md hover:bg-green-800 transition">
                Redeem Points
              </button>
            </Link>
            <Link to="/history">
              <button className="w-full bg-[#004828] text-white text-base font-semibold rounded-full px-6 py-3 shadow-md hover:bg-green-800 transition">
                View History
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}