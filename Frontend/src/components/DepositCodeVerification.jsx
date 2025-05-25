import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function DepositCodeVerification({ onVerified, onCancel }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/deposit-codes/validate', { code: code.trim().toUpperCase() });
      if (response.data.success) {
        onVerified();
      } else {
        setError(response.data.message || 'Invalid or expired code');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to validate code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004828] mb-4 text-center">
          Deposit Verification
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter the verification code from admin to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-xl uppercase tracking-widest font-mono text-center focus:outline-none focus:ring-2 focus:ring-[#004828] focus:border-transparent"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ENTER CODE"
              maxLength={6}
              autoFocus
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors w-full sm:w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#004828] hover:bg-[#006d4c] text-white rounded-xl font-semibold transition-colors w-full sm:w-1/2 disabled:opacity-70"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepositCodeVerification;
