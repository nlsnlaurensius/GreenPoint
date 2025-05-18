import React from "react";
import Header from "../components/Header";

const dummyHistory = [
  {
    date: "Monday, 12 May 2025",
    type: "Organic",
    qty: 2,
  },
  {
    date: "Tuesday, 13 May 2025",
    type: "Inorganic",
    qty: 5,
  },
  {
    date: "Wednesday, 14 May 2025",
    type: "Organic",
    qty: 10,
  },
  {
    date: "Thursday, 15 May 2025",
    type: "B3",
    qty: 2,
  },
  {
    date: "Friday, 16 May 2025",
    type: "Inorganic",
    qty: 5,
  },
];

export default function History() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex flex-col items-center pt-12 flex-1 w-full">
        <h1 className="text-6xl font-bold text-[#004828] mb-12 text-center">History</h1>
        <div className="flex flex-col gap-8 w-full max-w-4xl px-4">
          {dummyHistory.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between items-center bg-white rounded-xl shadow-md px-8 py-6 text-black text-2xl md:text-3xl font-medium"
              style={{ minHeight: 80 }}
            >
              <span>{item.date}</span>
              <span className="font-normal">{item.type} / {item.qty} kg</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
