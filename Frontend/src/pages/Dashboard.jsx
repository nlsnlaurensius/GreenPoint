import Header from "../components/Header";
import Handphone from "../assets/hendphone.png"; 
import React from "react";

export default function Dashboard() {
  // Simulasi data user
  const username = "Username";
  const points = 999;
  const status = "Gold";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-12 flex-1">
        <h1 className="text-6xl font-bold text-[#004828] mb-6 text-center">Dashboard</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-black mb-12 text-center">
          Welcome in, <span className="font-bold">{username}</span>!
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
          {/* Points Card */}
          <div className="bg-[#f8fcfc] rounded-xl shadow-lg p-10 flex flex-col items-center w-[350px] md:w-[500px] mb-8 md:mb-0">
            <h3 className="text-3xl font-bold text-black mb-4 text-center">Total Points</h3>
            <div className="text-[7rem] font-bold text-black leading-none mb-4 text-center">{points}</div>
            <div className="flex justify-center">
              <span className="bg-[#004828] text-white text-xl font-bold rounded-full px-6 py-2">Status : {status}</span>
            </div>
          </div>
          {/* Phone Illustration */}
          <div className="flex justify-center items-center">
            <img
              src={Handphone}
              alt="Dashboard phone preview"
              className="w-[200px] md:w-[300px] rotate-[5deg]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
