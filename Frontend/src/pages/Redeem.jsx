import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export default function Redeem() {
  const { user, setUser } = useAuth();
  const userPoints = user?.total_points ?? 0;

  const [rewards, setRewards] = useState([]);
  const [loadingRewards, setLoadingRewards] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
      const fetchRewards = async () => {
          try {
              const response = await api.get('/rewards');
              if (response.data.success) {
                  setRewards(response.data.payload);
              } else {
                  setError(response.data.message || 'Failed to fetch rewards.');
              }
          } catch (err) {
              console.error('Error fetching rewards:', err.response?.data?.message || err.message);
              setError('Failed to fetch rewards.');
          } finally {
              setLoadingRewards(false);
          }
      };

      const fetchUserProfile = async () => {
          if (!user?.id) {
             setLoadingUser(false);
             return;
          }
          try {
              const response = await api.get(`/auth/profile`);
              if (response.data.success) {
                   const updatedUser = response.data.payload;
                   setUser(updatedUser);
                   localStorage.setItem('user', JSON.stringify(updatedUser));

              } else {
                  console.error('Failed to fetch user profile for points:', response.data.message);
              }
          } catch (err) {
              console.error('Error fetching user profile for points:', err.response?.data?.message || err.message);
          } finally {
               setLoadingUser(false);
          }
      };

      window._fetchRewards = fetchRewards;

      fetchRewards();
      fetchUserProfile();

  }, [user?.id, setUser]);

    const handleRedeem = async (rewardId, pointCost) => {
        if (!user || redeeming) return;

        if (userPoints < pointCost) {
            setError("Insufficient points to redeem this reward.");
            setSuccess(null);
            return;
        }

        setError(null);
        setSuccess(null);
        setRedeeming(true);

        try {
            const response = await api.post('/reward-redemptions', {
                reward_id: rewardId
            });

            if (response.data.success) {
                const updatedReward = response.data.payload.updatedReward || response.data.payload.updated_reward || response.data.payload.reward || null;
                setSuccess(`Successfully redeemed${updatedReward && updatedReward.name ? ' ' + updatedReward.name : ''}!`);
                setError(null);

                const { updatedUser } = response.data.payload;
                if (updatedUser && user) {
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }

                if (typeof window._fetchRewards === 'function') window._fetchRewards();
            } else {
                setError(response.data.message || 'Failed to redeem reward.');
                setSuccess(null);
            }
        } catch (err) {
             console.error('Redeem error:', err.response?.data?.message || err.message);
             setError(err.response?.data?.message || 'An error occurred while redeeming reward.');
             setSuccess(null);
        } finally {
             setRedeeming(false);
        }
    };


   if (loadingRewards || loadingUser) {
       return (
           <div className="min-h-screen bg-white flex flex-col">
               <Header />
               <main className="flex flex-col items-center pt-12 flex-1 w-full">
                   <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">Redeem Rewards</h1>
                   <Loader message="Memuat rewards..." />
               </main>
           </div>
       );
   }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-12 flex-1 w-full px-4">
        <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">Redeem</h1>

         {success && (
             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 w-full max-w-5xl" role="alert">
                 <strong className="font-bold">Success!</strong>
                 <span className="block sm:inline"> {success}</span>
             </div>
         )}
         {error && !success && !redeeming && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-full max-w-5xl" role="alert">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {error}</span>
              </div>
          )}


        <div className="text-2xl md:text-3xl font-medium text-black mb-8 w-full max-w-5xl">Your Points : {userPoints}</div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {rewards.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between items-center bg-white rounded-xl shadow-md px-6 py-6 text-black border border-gray-200 h-full min-h-[340px]"
            >
              <img
                src={item.img_url || "/src/assets/reward.png"}
                alt={item.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <div className="text-xl md:text-2xl font-bold text-center mb-2">
                {item.name}
              </div>
              <div className="flex flex-col flex-1 w-full justify-end">
                <div className="flex flex-row items-center justify-between w-full gap-2 mb-4">
                  <div className="text-lg text-gray-700">Cost: {item.point_cost} points</div>
                  <div className={`text-base font-semibold ${item.stock > 0 ? 'text-green-700' : 'text-red-500'}`}>Stock: {item.stock}</div>
                </div>
                <button
                  onClick={() => handleRedeem(item.id, item.point_cost)}
                  className={`w-full bg-[#004828] text-white text-base sm:text-lg font-semibold rounded-full px-6 py-3 shadow-md hover:bg-green-800 transition-transform duration-300 hover:scale-105 ${redeeming ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={redeeming || userPoints < item.point_cost || item.stock <= 0}
                >
                  {redeeming ? <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-b-2 border-green-200 mr-2"></span>Processing...</span> : 'Redeem'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}