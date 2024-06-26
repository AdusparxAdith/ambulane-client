import {
  createContext, useContext, useState, useEffect,
} from 'react';
import { useAuth } from './Auth.jsx'; // Import the useAuth hook

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { user, socket } = useAuth(); // Get the socket from AuthContext
  const [location, setLocation] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false); // Default to false

  useEffect(() => {
    let interval;
    if (sharingLocation) {
      // Check if sharingLocation is enabled
      interval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              // Send the location to the backend using the socket
              if (socket) {
                console.log('Updating location', new Date());
                socket.emit('update-location', { user, coordinates: [longitude, latitude] });
              }
            },
            (error) => {
              console.error('Error getting location:', error);
            },
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, 10000); // Send location every 5 seconds
    } else if (interval) clearInterval(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [sharingLocation, socket]);

  const contextValue = {
    location,
    sharingLocation,
    setSharingLocation,
  };

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};

export const useLocation = () => useContext(LocationContext);
