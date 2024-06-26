'use client';

import { useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Custom icon definition
const ambulanceIcon = new L.Icon({
  iconUrl: '/ambulance.png',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/shadow.png',
  shadowSize: [60, 60],
});

// Custom icon definition
const signalIcon = new L.Icon({
  iconUrl: '/signal.png',
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/shadow.png',
  shadowSize: [60, 60],
});

const Map = ({ location, user }) => {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.post(
        'http://localhost:8080/location/nearby',
        { coordinates: [location.longitude, location.latitude] },
        {
          withCredentials: true,
        },
      );
      setMarkers(response.data);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <MapContainer
      center={{ lat: location.latitude, lng: location.longitude }}
      zoom={20}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {markers.map((marker) => (
        <Marker
          key={marker.username}
          position={marker.location}
          icon={marker.type === 1 ? ambulanceIcon : signalIcon}
        >
          <Popup>{marker.id === user.id ? "You're here" : marker.username}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
