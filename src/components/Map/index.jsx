'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icon definition
const customIcon = new L.Icon({
  iconUrl: '/ambulance.png',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/shadow.png',
  shadowSize: [60, 60],
});

const Map = ({ user }) => {
  const [markers, setMarkers] = useState([
    { lat: 28.6139, lng: 77.209, description: 'New Delhi' },
    { lat: 19.076, lng: 72.8777, description: 'Mumbai' },
    { lat: 12.9716, lng: 77.5946, description: 'Bangalore' },
    { lat: 13.0827, lng: 80.2707, description: 'Chennai' },
  ]);

  return (
    <MapContainer
      center={markers[Math.floor(Math.random() * markers.length)]}
      zoom={20}
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={customIcon}
        >
          <Popup>{marker.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
