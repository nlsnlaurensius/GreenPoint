import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Pastikan Link diimpor
import api from '../../api'; // Pastikan path ini benar

function ManageBankSampahs() {
    const [bankSampahs, setBankSampahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBankSampah, setCurrentBankSampah] = useState(null); // For edit mode
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        latitude: '',
        longitude: ''
    });
    const [submitting, setSubmitting] = useState(false); // For form submission loading

    const fetchBankSampahs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/bank-sampahs');
            if (response.data.success) {
                setBankSampahs(response.data.payload);
            } else {
                setError(response.data.message || 'Failed to fetch bank sampahs.');
            }
        } catch (err) {
            console.error('Error fetching bank sampahs:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An error occurred while fetching bank sampahs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBankSampahs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (bankSampah = null) => {
        setIsModalOpen(true);
        if (bankSampah) {
            setCurrentBankSampah(bankSampah);
            setFormData({
                name: bankSampah.name,
                location: bankSampah.location,
                latitude: bankSampah.latitude,
                longitude: bankSampah.longitude
            });
        } else {
            setCurrentBankSampah(null);
            setFormData({
                name: '',
                location: '',
                latitude: '',
                longitude: ''
            });
        }
        setError(null); // Clear previous errors
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBankSampah(null);
        setFormData({
            name: '',
            location: '',
            latitude: '',
            longitude: ''
        });
        setError(null); // Clear errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            let response;
            if (currentBankSampah) {
                // Edit existing bank sampah
                response = await api.put(`/bank-sampahs/${currentBankSampah.id}`, formData);
            } else {
                // Add new bank sampah
                response = await api.post('/bank-sampahs', formData);
            }

            if (response.data.success) {
                fetchBankSampahs(); // Re-fetch list to get latest data
                handleCloseModal(); // Close modal on success
            } else {
                setError(response.data.message || `Failed to ${currentBankSampah ? 'update' : 'add'} bank sampah.`);
            }
        } catch (err) {
            console.error(`${currentBankSampah ? 'Update' : 'Add'} bank sampah error:`, err.response?.data?.message || err.message);
            setError(err.response?.data?.message || `An error occurred while ${currentBankSampah ? 'updating' : 'adding'} bank sampah.`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this bank sampah?")) {
            return;
        }
        setLoading(true); // Set loading while deleting
        setError(null);
        try {
            const response = await api.delete(`/bank-sampahs/${id}`);
            if (response.data.success) {
                setBankSampahs(prev => prev.filter(bank => bank.id !== id)); // Remove from UI
            } else {
                setError(response.data.message || 'Failed to delete bank sampah.');
            }
        } catch (err) {
            console.error('Delete bank sampah error:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'An error occurred while deleting bank sampah.');
        } finally {
            setLoading(false); // End loading
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="text-xl">Loading Bank Sampah data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-[#004828] text-white flex flex-col">
            <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
                <h1 className="text-3xl sm:text-5xl font-bold text-[#00A86B] mb-4 sm:mb-8 text-center drop-shadow-lg">Manage Bank Sampahs</h1>
                <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                    <Link
                        to="/admin"
                        className="bg-gray-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300 flex items-center"
                    >
                        &larr; Back to Dashboard
                    </Link>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#00A86B] text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-lg font-semibold shadow-md hover:bg-[#00C890] transition duration-300"
                    >
                        Add New Bank Sampah
                    </button>
                </div>
                {error && (
                    <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded relative mb-4 max-w-4xl mx-auto" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-lg max-w-4xl mx-auto overflow-x-auto">
                    {bankSampahs.length === 0 ? (
                        <p className="text-gray-400 text-center py-2 sm:py-4 text-xs sm:text-base">No bank sampahs found. Add one!</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700 text-xs sm:text-base">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Location</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Latitude</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">Longitude</th>
                                    <th className="relative px-2 sm:px-4 py-2 sm:py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {bankSampahs.map((bank) => (
                                    <tr key={bank.id} className="hover:bg-gray-700 transition-colors duration-200">
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words font-medium text-white max-w-[100px] sm:max-w-xs">{bank.name}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-normal break-words text-gray-300 max-w-[100px] sm:max-w-xs">{bank.location}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-300">{bank.latitude}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-300">{bank.longitude}</td>
                                        <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-right font-medium">
                                            <button
                                                onClick={() => handleOpenModal(bank)}
                                                className="text-[#00C890] hover:text-[#00A86B] mr-2 sm:mr-4 text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bank.id)}
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
                {/* Modal for Add/Edit Bank Sampah */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#00A86L] mb-4 sm:mb-6 text-center">
                                {currentBankSampah ? 'Edit Bank Sampah' : 'Add New Bank Sampah'}
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
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-300 mb-1">Latitude</label>
                                    <input
                                        type="text"
                                        id="latitude"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-300 mb-1">Longitude</label>
                                    <input
                                        type="text"
                                        id="longitude"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-[#00C890] focus:border-[#00C890]"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#00A86B] text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#00C890] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : (currentBankSampah ? 'Update Bank Sampah' : 'Add Bank Sampah')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ManageBankSampahs;