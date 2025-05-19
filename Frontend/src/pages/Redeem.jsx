import React from "react";
import Header from "../components/Header";

const userPoints = 999;
const rewards = Array(6).fill({
  name: "Trash Can",
  points: 10,
  img: "/src/assets/reward.png"
});

export default function Redeem() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-12 flex-1 w-full">
        <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">Reedem</h1>
        <div className="text-2xl md:text-3xl font-medium text-black mb-8 w-full max-w-5xl px-4">Your Points : {userPoints}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          {rewards.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-xl shadow-md px-8 py-8 text-black border border-gray-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-40 h-40 object-contain mb-6"
              />
              <div className="text-xl md:text-2xl font-bold text-center">
                {item.name} - {item.points} points
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
