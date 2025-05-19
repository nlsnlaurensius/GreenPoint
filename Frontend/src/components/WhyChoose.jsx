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
    <section className="container mx-auto px-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-[#004828] text-center text-5xl font-bold leading">
        Supporting SDG 12 for a Sustainable Future
        </h1>

        <p className="text-black text-base md:text-2xl mt-4">
          “We're raising environmental awareness by incentivizing waste recycling”
        </p>
      </div>

      {/* Main content with text and image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
        {/* Left: Text */}
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

        {/* Right: Video thumbnail */}
        <div className="flex justify-center">
          <img
            src="https://storage.googleapis.com/a1aa/image/123db1ed-912d-45e1-9f41-2658add0b131.jpg"
            alt="Video tutorial on responsible consumption"
            className="w-full max-w-sm rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* CTA Button centered */}
      { !localStorage.getItem('isLoggedIn') && (
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
