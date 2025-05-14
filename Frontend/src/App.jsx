import React from 'react';
import Header from './components/Header';
import WhyChoose from './components/WhyChoose';
import Mission from './components/Mission';
import Tutorial from './components/Tutorial';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans text-gray-900">
      <Header />
      <main className="space-y-20 py-12 px-6 md:px-12 lg:px-24">
        <section id="why">
          <WhyChoose />
        </section>
        <section id="mission">
          <Mission />
        </section>
        <section id="tutorial">
          <Tutorial />
        </section>
        <section id="map">
          <MapSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}