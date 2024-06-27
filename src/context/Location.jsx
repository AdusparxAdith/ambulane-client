import {
  createContext, useContext, useState, useEffect,
} from 'react';
import { useAuth } from './Auth.jsx'; // Import the useAuth hook
import { moveTowards } from '../utils/location';
import constants from '../constants/index';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { user, socket } = useAuth(); // Get the socket from AuthContext
  const [location, setLocation] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false); // Default to false

  // Only for test ambulance
  useEffect(() => {
    if (user && user.test) {
      // Speed in meters per second (adjust as needed)
      const speed = constants.TEST_AMBULANCE_SPEED;

      // Start moving towards the end point when the component mounts
      const intervalId = moveTowards(speed, (currentLocation) => {
        setLocation({ latitude: currentLocation.lat, longitude: currentLocation.lng });
        // Send the updated location to the backend using the socket
        if (socket) {
          console.log('Updating test location', new Date());
          socket.emit('update-location', {
            user,
            coordinates: [currentLocation.lng, currentLocation.lat],
          });
        }
      });

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [socket, user]);

  useEffect(() => {
    if (user && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (user.type === 2 || user.test) {
            setLocation({ latitude: user.location.lat, longitude: user.location.lng });
          } else setLocation({ latitude, longitude });

          // Send the location to the backend using the socket
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
  }, [user]);

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
