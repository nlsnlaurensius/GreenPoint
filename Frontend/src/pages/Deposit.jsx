import React, { useState } from "react";
import Header from "../components/Header";

const wasteTypes = [
  {
    key: "organic",
    label: "Organic",
    img: "/src/assets/DepositOrganic.png", // Ganti dengan path gambar jika ada
    alt: "Organic waste illustration",
    fallback: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none"><rect width="120" height="80" rx="16" fill="#f3f3f3"/><text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="#bbb">Organic</text></svg>
    ),
  },
  {
    key: "inorganic",
    label: "Inorganic",
    img: "/src/assets/DepositInorganic.png", // Ganti dengan path gambar jika ada
    alt: "Inorganic waste illustration",
    fallback: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none"><rect width="120" height="80" rx="16" fill="#f3f3f3"/><text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="#bbb">Inorganic</text></svg>
    ),
  },
  {
    key: "b3",
    label: "B3",
    img: "/src/assets/DepositB3.png", // Ganti dengan path gambar jika ada
    alt: "B3 waste illustration",
    fallback: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none"><rect width="120" height="80" rx="16" fill="#f3f3f3"/><text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="#bbb">B3</text></svg>
    ),
  },
];

export default function Deposit() {
  const [selectedType, setSelectedType] = useState("organic");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setError("");
    setSuccess("");
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setQuantity(val);
    setError("");
    setSuccess("");
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Deposit successful!");
    // Simpan data deposit ke backend di sini jika perlu
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-12 flex-1">
        <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">Deposit Waste</h1>
        <form
          className="flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-6xl justify-center items-stretch"
          onSubmit={handleDeposit}
        >
          {/* Waste Type Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center min-w-[320px] max-w-[500px]">
            <h2 className="text-3xl font-semibold mb-8 text-center">Type of Waste</h2>
            <div className="flex flex-row gap-6 w-full justify-center">
              {wasteTypes.map((type) => (
                <button
                  type="button"
                  key={type.key}
                  className={`flex flex-col items-center flex-1 px-4 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    selectedType === type.key
                      ? "border-[#004828] bg-[#f8fcfc] shadow-md"
                      : "border-transparent hover:border-[#b2dfdb]"
                  }`}
                  onClick={() => handleTypeSelect(type.key)}
                >
                  {/* Gambar ilustrasi, fallback jika tidak ada */}
                  {type.img ? (
                    <img
                      src={type.img}
                      alt={type.alt}
                      className="w-32 h-24 object-contain mb-2"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    type.fallback
                  )}
                  <span className="text-xl font-bold mt-2 mb-1 text-black">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center min-w-[320px] max-w-[500px]">
            <h2 className="text-3xl font-semibold mb-8 text-center">Quantity (kg)</h2>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="text-[5rem] font-bold text-gray-400 text-center border-2 border-gray-200 rounded-xl w-full max-w-xs mb-8 focus:outline-none focus:border-[#004828] bg-[#f8fcfc]"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
              maxLength={4}
            />
            <button
              type="submit"
              className="bg-[#004828] text-white text-xl font-semibold rounded-full px-10 py-3 shadow-md hover:bg-[#006d4c] transition-all duration-200"
            >
              Deposit
            </button>
            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
            {success && <div className="text-green-600 mt-4 text-center">{success}</div>}
          </div>
        </form>
      </main>
    </div>
  );
}
