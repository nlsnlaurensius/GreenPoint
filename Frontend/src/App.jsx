import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WhyChoose from './components/WhyChoose';
import Mission from './components/Mission';
import Tutorial from './components/Tutorial';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {loading && <Loader message="Memuat halaman..." />}
      <div className={loading ? 'opacity-0 pointer-events-none' : 'transition-opacity duration-700 opacity-100'}>
        <Header />
        <main className="space-y-20 py-12 px-6 md:px-12 lg:px-24">
          <section id="why">
            <WhyChoose />
          </section>
          <section id="mission">
            <Mission />
          </section>
          <section id="tutorial" className="">
            <Tutorial />
          </section>
          <section id="map">
            <MapSection />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}