import React from 'react';
import DepositImg from '../assets/Deposit.png';
import PointsImg from '../assets/Points.png';
import AwardsImg from '../assets/Awards.png';

export default function Mission() {
  const items = [
    { img: DepositImg, title: 'Deposit waste', text: 'Submit your waste and start earning points for a greener future' },
    { img: PointsImg, title: 'Earn points', text: 'Track points and rewards. Exchange for eco-friendly products' },
    { img: AwardsImg, title: 'Redeem rewards', text: 'Redeem rewards. Help the environment while enjoying your prizes' }
  ];

  return (
    <section className="container mx-auto px-6 py-14">
      <h2 className="text-5xl font-bold text-[#004828] mb-14">Our Sustainable Mission</h2>
      <div className="flex flex-col md:flex-row">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex-1 text-center px-6 py-4 ${idx === 1 ? 'border-x-4 border-gray-300' : ''}`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="mx-auto mb-4 w-34 h-32 object-contain"
            />
            <h3 className="font-bold text-3xl text-black mb-2">{item.title}</h3>
            <p className="text-black text-2sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
