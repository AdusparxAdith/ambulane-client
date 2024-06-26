'use client';

import { useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
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

const Map = ({ location, user }) => (
  <MapContainer
    center={{ lat: location.latitude, lng: location.longitude }}
    zoom={20}
    style={{ height: '100vh', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
    />
    <Marker key={user.id} position={[location.latitude, location.longitude]} icon={customIcon}>
      <Popup>{"You're here"}</Popup>
    </Marker>
  </MapContainer>
);

export default Map;
