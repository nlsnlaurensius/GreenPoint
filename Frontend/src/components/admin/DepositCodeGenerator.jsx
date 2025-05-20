import React, { useState, useEffect } from 'react';
import api from '../../api';

function DepositCodeGenerator() {
  const [activeCode, setActiveCode] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchActiveCode = async () => {
    try {
      setLoading(true);
      const response = await api.get('/deposit-codes/active');
      if (response.data.success && response.data.payload) {
        setActiveCode(response.data.payload);
        const expireTime = new Date(response.data.payload.expired_at).getTime();
        const now = new Date().getTime();
        setCountdown(Math.max(0, Math.floor((expireTime - now) / 1000)));
      } else {
        setActiveCode(null);
        setCountdown(0);
      }
    } catch (err) {
      setError('Failed to fetch active code.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveCode();
    const interval = setInterval(fetchActiveCode, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (activeCode && countdown === 0) {
      fetchActiveCode();
    }
  }, [countdown, activeCode]);

  const generateNewCode = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await api.post('/deposit-codes/generate');
      if (response.data.success) {
        setActiveCode(response.data.payload);
        const expireTime = new Date(response.data.payload.expired_at).getTime();
        const now = new Date().getTime();
        setCountdown(Math.max(0, Math.floor((expireTime - now) / 1000)));
        setSuccess('New deposit code generated!');
      } else {
        setError(response.data.message || 'Failed to generate code');
      }
    } catch (err) {
      setError('Failed to generate deposit code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-5 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-white flex items-center justify-between">
        Deposit Verification Code
      </h2>
      {activeCode ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">Active Code:</span>
            <span className="text-[#00C890] font-mono">{countdown}s</span>
          </div>
          <div className="text-4xl font-bold text-center text-white tracking-widest font-mono py-3 select-all">
            {activeCode.code}
          </div>
          <p className="text-gray-400 text-center text-sm mt-2">
            This code is valid for 30 seconds and can only be used once.
          </p>
          <button
            onClick={generateNewCode}
            disabled={loading || countdown > 0}
            className={`w-full mt-4 font-semibold rounded-xl px-6 py-3 ${countdown > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00A86B] hover:bg-[#00C890] text-white'}`}
          >
            {loading ? 'Generating...' : countdown > 0 ? 'Wait for code to expire' : 'Generate New Code'}
          </button>
        </>
      ) : (
        <>
          <div className="text-center py-6 text-gray-300">
            No active code. Generate a new one.
          </div>
          <button
            onClick={generateNewCode}
            disabled={loading}
            className="w-full bg-[#00A86B] hover:bg-[#00C890] text-white font-semibold rounded-xl px-6 py-3 mt-4"
          >
            {loading ? 'Generating...' : 'Generate New Code'}
          </button>
        </>
      )}
      {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
      {success && <div className="mt-4 text-green-400 text-center">{success}</div>}
    </div>
  );
}

export default DepositCodeGenerator;
