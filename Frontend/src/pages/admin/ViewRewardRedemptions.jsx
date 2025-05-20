import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'; // Pastikan path ini benar

function ViewRewardRedemptions() {
    const [redemptions, setRedemptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRewardRedemptions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/reward-redemptions');
            if (response.data.success) {
                setRedemptions(response.data.payload);
            } else {
                setError(response.data.message || 'Failed to fetch reward redemptions.');
            }
        } catch (err) {
            console.error('Error fetching reward redemptions:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An error occurred while fetching reward redemptions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewardRedemptions();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        let date = new Date(dateString);
        if (isNaN(date.getTime()) && typeof dateString === 'string') {
            date = new Date(dateString.replace(' ', 'T'));
        }
        if (isNaN(date.getTime())) {
            return "-";
        }
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="text-xl">Loading Reward Redemption data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#004828] text-white flex flex-col">
            <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
                <h1 className="text-3xl sm:text-5xl font-bold text-[#00A86L] mb-4 sm:mb-8 text-center drop-shadow-lg">All Reward Redemptions</h1>

                <div className="flex justify-start mb-6 max-w-4xl mx-auto">
                    <Link
                        to="/admin"
                        className="bg-gray-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300 flex items-center"
                    >
                        &larr; Back to Dashboard
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded relative mb-4 max-w-4xl mx-auto" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-lg max-w-4xl mx-auto overflow-x-auto">
                    {redemptions.length === 0 ? (
                        <p className="text-gray-400 text-center py-2 sm:py-4 text-xs sm:text-base">No reward redemptions found.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-base">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Reward Name</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Points Used</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {redemptions.map((redemption) => (
                                    <tr key={redemption.id} className="hover:bg-gray-700 transition-colors duration-200">
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words font-medium text-white max-w-[100px] sm:max-w-xs">{redemption.username || 'N/A'}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words text-gray-300 max-w-[100px] sm:max-w-xs">{redemption.reward_name || 'N/A'}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-300">{redemption.points_used}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-300">{formatDate(redemption.redemption_date || redemption.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ViewRewardRedemptions;