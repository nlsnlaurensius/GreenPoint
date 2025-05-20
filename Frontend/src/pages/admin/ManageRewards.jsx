import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

function ManageRewards() {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReward, setCurrentReward] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        point_cost: '',
        stock: '',
        img_url: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchRewards = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/rewards');
            if (response.data.success) {
                setRewards(response.data.payload);
            } else {
                setError(response.data.message || 'Failed to fetch rewards.');
            }
        } catch (err) {
            console.error('Error fetching rewards:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An error occurred while fetching rewards.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (reward = null) => {
        setIsModalOpen(true);
        if (reward) {
            setCurrentReward(reward);
            setFormData({
                name: reward.name,
                point_cost: reward.point_cost.toString(),
                stock: reward.stock.toString(),
                img_url: reward.img_url || ''
            });
        } else {
            setCurrentReward(null);
            setFormData({
                name: '',
                point_cost: '',
                stock: '',
                img_url: ''
            });
        }
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentReward(null);
        setFormData({
            name: '',
            point_cost: '',
            stock: '',
            img_url: ''
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const parsedPointCost = parseInt(formData.point_cost, 10);
        const parsedStock = parseInt(formData.stock, 10);

        if (isNaN(parsedPointCost) || parsedPointCost < 0) {
            setError("Point Cost must be a non-negative number.");
            setSubmitting(false);
            return;
        }
        if (isNaN(parsedStock) || parsedStock < 0) {
            setError("Stock must be a non-negative number.");
            setSubmitting(false);
            return;
        }

        try {
            let response;
            const dataToSend = {
                ...formData,
                point_cost: parsedPointCost,
                stock: parsedStock
            };

            if (currentReward) {
                response = await api.put(`/rewards/${currentReward.id}`, dataToSend);
            } else {
                response = await api.post('/rewards', dataToSend);
            }

            if (response.data.success) {
                fetchRewards();
                handleCloseModal();
            } else {
                setError(response.data.message || `Failed to ${currentReward ? 'update' : 'add'} reward.`);
            }
        } catch (err) {
            console.error(`${currentReward ? 'Update' : 'Add'} reward error:`, err.response?.data?.message || err.message);
            setError(err.response?.data?.message || `An error occurred while ${currentReward ? 'updating' : 'adding'} reward.`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reward?")) {
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(`/rewards/${id}`);
            if (response.data.success) {
                setRewards(prev => prev.filter(reward => reward.id !== id));
            } else {
                setError(response.data.message || 'Failed to delete reward.');
            }
        } catch (err) {
            console.error('Delete reward error:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An error occurred while deleting reward.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="text-xl">Loading rewards data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#004828] text-white flex flex-col">
            <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
                <h1 className="text-3xl sm:text-5xl font-bold text-[#00A86L] mb-4 sm:mb-8 text-center drop-shadow-lg">Manage Rewards</h1>

                <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                    <Link
                        to="/admin"
                        className="bg-gray-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300 flex items-center"
                    >
                        &larr; Back to Dashboard
                    </Link>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#00A86B] text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-lg font-semibold shadow-md hover:bg-[#00C890] transition duration-300"
                    >
                        Add New Reward
                    </button>
                </div>

                {error && (
                    <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded relative mb-4 max-w-4xl mx-auto" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}

                <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-lg max-w-4xl mx-auto overflow-x-auto">
          {rewards.length === 0 ? (
            <p className="text-gray-400 text-center py-2 sm:py-4 text-xs sm:text-base">No rewards found. Add one!</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-base">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Cost</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="relative px-2 sm:px-4 py-2 sm:py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {rewards.map((reward) => (
                  <tr key={reward.id} className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words font-medium text-white max-w-[100px] sm:max-w-xs">{reward.name}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-gray-300">{reward.point_cost}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-gray-300">{reward.stock}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-right font-medium">
                      <button
                        onClick={() => handleOpenModal(reward)}
                        className="text-[#00C890] hover:text-[#00A86B] mr-2 sm:mr-4 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(reward.id)}
                        className="text-red-500 hover:text-red-700 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#00A86B] mb-4 sm:mb-6 text-center">
                                {currentReward ? 'Edit Reward' : 'Add New Reward'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl"
                            >
                                &times;
                            </button>
                            {error && (
                                <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Error!</strong>
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="point_cost" className="block text-sm font-medium text-gray-300 mb-1">Point Cost</label>
                                    <input
                                        type="number"
                                        id="point_cost"
                                        name="point_cost"
                                        value={formData.point_cost}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="img_url" className="block text-sm font-medium text-gray-300 mb-1">Image URL (Optional)</label>
                                    <input
                                        type="text"
                                        id="img_url"
                                        name="img_url"
                                        value={formData.img_url}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#00A86B] text-white py-2 sm:py-3 rounded-full text-xs sm:text-lg font-semibold shadow-md hover:bg-[#00C890] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : (currentReward ? 'Update Reward' : 'Add Reward')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageRewards;