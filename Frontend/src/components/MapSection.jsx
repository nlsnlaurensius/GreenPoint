import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../api';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Loader from './Loader'; // Assuming you have a Loader component

// Fix leaflet's default icon path for Vite/React
// This must be at the top-level, not inside the component
// so it only runs once
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapSection() {
  const [bankSampahs, setBankSampahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultCenter = [-2.5489, 118.0149];
  const defaultZoom = 5;

  useEffect(() => {
    const fetchBankSampahs = async () => {
      try {
        const response = await api.get('/bank-sampahs');
        if (response.data.success) {
          setBankSampahs(response.data.payload);
        } else {
          setError(response.data.message || 'Failed to fetch bank sampahs.');
        }
      } catch (err) {
        console.error('Error fetching bank sampahs:', err);
        setError('Failed to fetch bank sampahs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBankSampahs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader message="Loading map..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section id="map" className="relative z-0 mb-12 max-w-4xl mx-auto px-4 w-full">
      <h2 className="text-green-900 font-bold text-5xl text-center mb-12">
        Find Your Nearest Exchange Point
      </h2>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bankSampahs.map(bank => (
          bank.latitude && bank.longitude ? (
            <Marker key={bank.id} position={[bank.latitude, bank.longitude]}>
              <Popup>
                <strong>{bank.name}</strong><br />{bank.location}
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </section>
  );
}

export default MapSection;