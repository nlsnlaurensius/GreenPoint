import React from 'react';
import SignUpIcon from '../assets/SignUp.svg';
import FindGreenIcon from '../assets/FindGreen.svg';
import DepositWasteIcon from '../assets/DepositWaste.svg';
import GetRewardsIcon from '../assets/GetRewards.svg';

export default function Tutorial() {
  const steps = [
    { img: SignUpIcon, title: 'Sign Up', text: 'Create an account to start recycling waste and earn points' },
    { img: FindGreenIcon, title: 'Find a Green Point', text: 'Locate nearby waste collection points to drop off your recyclables' },
    { img: DepositWasteIcon, title: 'Deposit Waste', text: 'Bring your sorted waste to a collection point for recycling' },
    { img: GetRewardsIcon, title: 'Get Rewards', text: 'Redeem your points for various rewards and benefits' }
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-5xl font-bold text-[#004828] mb-4">Tutorial</h2>
      <p className="text-lg text-black font-bold mb-8">
        Learn how to exchange waste for points and contribute to a greener planet
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-4 bg-[#004828] text-white p-6 rounded-lg shadow-md hover:bg-green-800 transition"
          >
            <img src={step.img} alt={step.title} className="w-12 h-12" />
            <div>
              <p className="font-bold text-xl">Step {idx + 1}: {step.title}</p>
              <p className="font-semibold text-2sm">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
