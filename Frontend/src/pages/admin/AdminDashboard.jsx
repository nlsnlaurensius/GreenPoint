import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Gift, Trash2, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DepositCodeGenerator from '../../components/admin/DepositCodeGenerator';

function AdminDashboard() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = '/'; 
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#004828] text-white flex flex-col">
      <header className="w-full flex justify-end px-4 sm:px-8 py-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow transition"
        >
          Logout
        </button>
      </header>
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#00A86L] mb-4 sm:mb-8 text-center drop-shadow-lg">Admin Dashboard</h1>
        <p className="text-gray-200 mb-8 sm:mb-12 text-center text-lg sm:text-xl">Welcome to the admin panel. Select an option to manage data.</p>
        <div className="max-w-md mx-auto mb-10">
          <DepositCodeGenerator />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-6 sm:gap-8 max-w-5xl mx-auto justify-center items-center text-center">
          <Link 
            to="/admin/bank-sampahs" 
            className="bg-gradient-to-br from-[#004828] to-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center group border border-[#00A86B]/30"
          >
            <Briefcase size={48} className="mb-3 text-[#00C890] group-hover:text-white transition-colors duration-300" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-[#00C890] transition-colors duration-300">Manage Bank Sampahs</h2>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base">Add, edit, or delete bank sampah locations.</p>
          </Link>

          <Link 
            to="/admin/rewards" 
            className="bg-gradient-to-br from-[#004828] to-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center group border border-[#00A86B]/30"
          >
            <Gift size={48} className="mb-3 text-[#00C890] group-hover:text-white transition-colors duration-300" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-[#00C890] transition-colors duration-300">Manage Rewards</h2>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base">Define and update rewards for users.</p>
          </Link>

          <Link 
            to="/admin/waste-deposits" 
            className="bg-gradient-to-br from-[#004828] to-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center group border border-[#00A86B]/30"
          >
            <Trash2 size={48} className="mb-3 text-[#00C890] group-hover:text-white transition-colors duration-300" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-[#00C890] transition-colors duration-300">View All Waste Deposits</h2>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base">Review all waste deposit transactions.</p>
          </Link>
          
          <Link 
            to="/admin/reward-redemptions" 
            className="bg-gradient-to-br from-[#004828] to-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center group border border-[#00A86B]/30"
          >
            <Award size={48} className="mb-3 text-[#00C890] group-hover:text-white transition-colors duration-300" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-[#00C890] transition-colors duration-300">View All Reward Redemptions</h2>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base">Track all redeemed rewards.</p>
          </Link>

          <Link 
            to="/admin/users" 
            className="bg-gradient-to-br from-[#004828] to-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center group border border-[#00A86B]/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 text-[#00C890] group-hover:text-white transition-colors duration-300" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" /></svg>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-[#00C890] transition-colors duration-300">Manage Users</h2>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm sm:text-base">Add, edit, or delete user accounts.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;