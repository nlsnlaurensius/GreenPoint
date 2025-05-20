import React from 'react';

export default function WhyChoose() {
  const points = [
    "Practical and Easy to Use",
    "Promotes Sustainable Consumption (SDG 12)",
    "Transparent Waste & Point Tracking",
    "Connected to Local Waste Banks",
    "Available on Mobile & Desktop",
  ];

  return (
    <section className="container mx-auto px-6 md:px-12">
      <div className="text-center mb-10">
        <h1 className="text-[#004828] text-3xl md:text-5xl font-bold">
          Supporting SDG 12 for a Sustainable Future
        </h1>
        <p className="text-black text-base md:text-2xl mt-4">
          “We're raising environmental awareness by incentivizing waste recycling”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
        <div>
          <h2 className="text-lg md:text-3xl font-semibold text-[#004828] mb-4">
            Why Choose <span className="text-[#004828] font-bold">GreenPoint</span>?
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm md:text-xl">
            {points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/src/assets/Laptop.png" 
            alt="Laptop mockup"
            className="w-full max-w-lg"
          />

          <div className="absolute top-[7%] left-[18.6%] w-[63.9%] h-[65%] rounded-md overflow-hidden shadow-lg aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dn-hLQk49eA?si=vdRRmb97MxuoDd-y"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover aspect-video"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>
      </div>

      {!localStorage.getItem('isLoggedIn') && (
        <div className="text-center">
          <a href="/login">
            <button className="bg-[#004828] text-xl text-white px-8 py-2 rounded-full font-semibold hover:bg-green-800 transition">
              Get Started
            </button>
          </a>
        </div>
      )}
    </section>
  );
}
