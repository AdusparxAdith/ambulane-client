import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

// Component to handle map centering
const MapCenterer = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 20);
    }
  }, [location, map]);

  return null;
};

export default MapCenterer;
