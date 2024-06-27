import constants from '../constants';

// Function to calculate the distance between two coordinates using Haversine formula
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)
      + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Function to increment location over time
export function moveTowards(speed, callback) {
  const start = constants.TEST_AMBULANCE_START;
  const end = constants.TEST_AMBULANCE_END;

  const interval = 1000; // 1 second
  const distance = calculateDistance(start.lat, start.lng, end.lat, end.lng);
  const steps = distance / speed; // number of steps required
  const latStep = (end.lat - start.lat) / steps;
  const lngStep = (end.lng - start.lng) / steps;

  const currentLocation = { ...start };
  let stepCount = 0;

  const intervalId = setInterval(() => {
    if (stepCount >= steps) {
      clearInterval(intervalId);
      callback(end); // Final callback with end location
      return;
    }

    currentLocation.lat += latStep;
    currentLocation.lng += lngStep;
    stepCount += stepCount;

    callback(currentLocation); // Update callback with current location
  }, interval);

  return intervalId;
}
