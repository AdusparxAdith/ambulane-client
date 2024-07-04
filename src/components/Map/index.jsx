'use client';

import { useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from '../../utils/axios';
import { useLocation } from '../../context/Location.jsx';
import { useAuth } from '../../context/Auth.jsx';
import MapCenterer from './MapCenter.jsx';

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

const Map = () => {
  const { user } = useAuth();
  const { location } = useLocation();
  const [markers, setMarkers] = useState([]);

  // For Ambulance Users
  useEffect(() => {
    async function fetchNearby() {
      if (location) {
        const response = await axios.post('/location/nearby', {
          coordinates: [location.longitude, location.latitude],
          type: user.type,
        });
        setMarkers(response.data);
      }
    }
    fetchNearby();
  }, [location]);

  // For Signal Users
  useEffect(() => {
    let interval;
    if (user.type === 2) {
      interval = setInterval(async () => {
        const response = await axios.post('/location/nearby', {
          coordinates: [location.longitude, location.latitude],
          type: user.type,
        });
        setMarkers(response.data);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  return location ? (
    <MapContainer
      center={{ lat: location.latitude, lng: location.longitude }}
      zoom={20}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapCenterer location={location} />
      <Marker
        key={user.id}
        position={{ lat: location.latitude, lng: location.longitude }}
        icon={user.type === 1 ? ambulanceIcon : signalIcon}
      >
        <Popup>{"You're here"}</Popup>
      </Marker>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.location}
          icon={marker.type === 1 ? ambulanceIcon : signalIcon}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <></>
  );
};

export default Map;
