import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapSection() {
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '8px',
  };

  const center = {
    lat: 51.505, // Latitude
    lng: -0.09, // Longitude
  };

  return (
    <section className="mb-12 max-w-4xl mx-auto px-4">
      <h2 className="text-green-900 font-bold text-5xl text-center mb-12">
        Find Your Nearest Exchange Point
      </h2>
      <LoadScript googleMapsApiKey="AIzaSyBVZw7gGZfJTCMaA7Wd-S-JcVbq8ZOL6P8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </section>
  );
}

export default MapSection;
