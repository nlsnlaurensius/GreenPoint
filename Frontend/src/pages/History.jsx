import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import moment from 'moment';
import Loader from "../components/Loader";

export default function History() {
  const { user } = useAuth();
  const userId = user?.id;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
         return;
      }
      try {
        const response = await api.get(`/waste-deposits/user/${userId}`);
        if (response.data.success) {
          setHistory(response.data.payload);
        } else {
          setError(response.data.message || 'Failed to fetch deposit history.');
        }
      } catch (err) {
        console.error('Error fetching history:', err.response?.data?.message || err.message);
        setError('Failed to fetch deposit history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

   if (loading) {
       return (
           <div className="min-h-screen bg-white flex flex-col">
               <Header />
               <main className="flex flex-col items-center pt-12 flex-1 w-full">
                   <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">History</h1>
                   <Loader message="Memuat riwayat..." />
               </main>
           </div>
       );
   }

   if (!loading && history.length === 0) {
      return (
           <div className="min-h-screen bg-white flex flex-col">
               <Header />
               <main className="flex flex-col items-center pt-12 flex-1 w-full">
                   <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">History</h1>
                   <div className="text-center text-gray-600">No deposit history found.</div>
               </main>
           </div>
       );
   }

    if (error) {
      return (
          <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex flex-col items-center pt-12 flex-1 w-full">
                  <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">History</h1>
                  <div className="text-red-500 text-center">Error loading history: {error}</div>
              </main>
          </div>
      );
    }


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-8 sm:pt-12 flex-1 w-full px-2 sm:px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#004828] mb-4 sm:mb-12 text-center">History</h1>
        <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-4xl">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-md px-4 sm:px-6 py-3 sm:py-4 text-black text-base sm:text-lg md:text-xl font-medium"
              style={{ minHeight: 60 }}
            >
              <span className="mb-1 md:mb-0 text-center md:text-left">{moment(item.deposit_date).format('dddd, DD MMMM YYYY')}</span>
              <span className="font-normal text-right">
                {item.waste_type_name} / {item.weight_kg} kg ({item.points_earned} points)
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}