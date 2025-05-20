import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import DepositB3 from '../assets/DepositB3.png';
import DepositInorganic from '../assets/DepositInorganic.png';
import DepositOrganic from '../assets/DepositOrganic.png';
import DepositCodeVerification from '../components/DepositCodeVerification';
import Loader from "../components/Loader";

export default function Deposit() {
  const { user, setUser } = useAuth();
  const userId = user?.id;

  const [availableWasteTypes, setAvailableWasteTypes] = useState([]);
  const [availableBankSampahs, setAvailableBankSampahs] = useState([]);

  const [selectedWasteTypeId, setSelectedWasteTypeId] = useState("");
  const [selectedBankSampahId, setSelectedBankSampahId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showVerification, setShowVerification] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await api.get('/waste-types');
        if (typesResponse.data.success) {
          setAvailableWasteTypes(typesResponse.data.payload);
        } else {
          setError(typesResponse.data.message || 'Failed to fetch waste types.');
        }

        const banksResponse = await api.get('/bank-sampahs');
         if (banksResponse.data.success) {
            setAvailableBankSampahs(banksResponse.data.payload);
         } else {
            setError(banksResponse.data.message || 'Failed to fetch bank sampahs.');
         }

      } catch (err) {
        console.error('Error fetching deposit options:', err);
        setError('Failed to load deposit options.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeSelect = (typeId) => {
    setSelectedWasteTypeId(typeId);
    setError("");
    setSuccess("");
  };

  const handleBankSampahSelect = (bankId) => {
     setSelectedBankSampahId(bankId);
     setError("");
     setSuccess("");
  }

  const handleQuantityChange = (e) => {
     const val = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
     setQuantity(val);
     setError("");
     setSuccess("");
   };


  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setShowVerification(true);
      return;
    }
    if (!selectedWasteTypeId) {
      setError("Please select a waste type.");
      return;
    }
     if (!selectedBankSampahId) {
       setError("Please select a bank sampah location.");
       return;
     }
     const weight = parseFloat(quantity);
     if (isNaN(weight) || weight <= 0) {
       setError("Please enter a valid quantity (must be a positive number).");
       return;
     }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await api.post('/waste-deposits', {
        user_id: userId,
        bank_sampah_id: selectedBankSampahId,
        waste_type_id: selectedWasteTypeId,
        weight_kg: weight,
      });

      if (response.data.success) {
        setSuccess('Deposit recorded successfully!');
        setQuantity('');
        setSelectedWasteTypeId('');
        setSelectedBankSampahId('');
        setIsVerified(false);
        setShowVerification(true);
        try {
          const userRes = await api.get(`/users/${userId}`);
          if (userRes.data.success && userRes.data.payload) {
            setUser(userRes.data.payload);
          }
        } catch (err) {
          console.error('Failed to refresh user data after deposit');
        }
      } else {
        setError(response.data.message || 'Failed to record deposit.');
      }
    } catch (err) {
      console.error('Deposit error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'An error occurred while recording deposit.');
    } finally {
      setSubmitting(false);
    }
  };

   if (loading) {
       return (
           <div className="min-h-screen bg-white flex flex-col">
               <Header />
               <main className="flex flex-col items-center pt-12 flex-1">
                   <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">Deposit Waste</h1>
                   <Loader message="Memuat pilihan deposit..." />
               </main>
           </div>
       );
   }


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-8 sm:pt-12 flex-1 px-2 sm:px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#004828] mb-4 sm:mb-12 text-center">Deposit Waste</h1>
        <form
          className="flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-6xl justify-center items-stretch transition-all duration-700"
          onSubmit={handleDeposit}
        >
          {/* Waste Type Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center min-w-[180px] sm:min-w-[320px] w-full">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 text-center">Type of Waste</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full justify-center">
              {availableWasteTypes.map((type) => {
                let imgSrc = null;
                const nameLower = type.name.toLowerCase();
                if (nameLower.includes('b3')) imgSrc = DepositB3;
                else if (nameLower.includes('anorganik') || nameLower.includes('inorganic')) imgSrc = DepositInorganic;
                else if (nameLower.includes('organik') || nameLower.includes('organic')) imgSrc = DepositOrganic;
                return (
                  <button
                    type="button"
                    key={type.id}
                    className={`flex flex-col items-center p-4 sm:p-8 rounded-2xl border-2 transition-all duration-200 focus:outline-none w-full ${
                      selectedWasteTypeId === type.id
                        ? "border-[#004828] bg-[#f8fcfc] shadow-lg scale-105"
                        : "border-transparent hover:border-[#b2dfdb] hover:scale-105"
                    }`}
                    onClick={() => handleTypeSelect(type.id)}
                    style={{ minHeight: '180px' }}
                  >
                    {imgSrc && (
                      <img src={imgSrc} alt={type.name} className="w-24 h-24 sm:w-40 sm:h-40 object-contain mb-4" />
                    )}
                    <span className="text-xl sm:text-3xl font-bold text-black text-center mt-2">
                      {type.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Bank Sampah Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center min-w-[180px] sm:min-w-[320px] w-full">
             <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 text-center">Select Bank Sampah</h2>
             <select
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl text-base sm:text-xl text-gray-700 mb-4 sm:mb-8 focus:outline-none focus:border-[#004828] bg-[#f8fcfc]"
                value={selectedBankSampahId}
                onChange={(e) => handleBankSampahSelect(e.target.value)}
                required
             >
                <option value="">-- Select Location --</option>
                {availableBankSampahs.map(bank => (
                   <option key={bank.id} value={bank.id}>
                      {bank.name} - {bank.location}
                   </option>
                ))}
             </select>
             <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 text-center">Quantity (kg)</h2>
             <input
               type="text"
               inputMode="decimal"
               pattern="[0-9]*[.,]?[0-9]*"
               className="text-3xl sm:text-[5rem] font-bold text-gray-700 text-center border-2 border-gray-200 rounded-xl w-full max-w-xs mb-4 sm:mb-8 focus:outline-none focus:border-[#004828] bg-[#f8fcfc]"
               value={quantity}
               onChange={handleQuantityChange}
               placeholder="0"
               maxLength={7}
             />
             <button
               type="submit"
               className={`w-full bg-[#004828] text-white text-base sm:text-xl font-semibold rounded-full px-6 sm:px-10 py-2 sm:py-3 shadow-md hover:bg-[#006d4c] transition-all duration-200 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
               disabled={submitting}
             >
               {submitting ? <span className="flex items-center justify-center"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-b-2 border-green-200 mr-2"></span>Processing...</span> : 'Deposit'}
             </button>
             {error && <div className="text-red-500 mt-2 sm:mt-4 text-center w-full">{error}</div>}
             {success && <div className="text-green-600 mt-2 sm:mt-4 text-center w-full">{success}</div>}
           </div>
        </form>
        {showVerification && (
          <DepositCodeVerification
            onVerified={() => {
              setIsVerified(true);
              setShowVerification(false);
            }}
            onCancel={() => {
              setIsVerified(false);
              setShowVerification(true);
            }}
          />
        )}
      </main>
    </div>
  );
}