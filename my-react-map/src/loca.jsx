import React, { useState } from 'react';

function LocationComponent() {
  const [locationResult, setLocationResult] = useState('');

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationResult('User denied the request for geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationResult('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setLocationResult('The request to get location timed out.');
              break;
            default:
              setLocationResult('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      setLocationResult('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div>
      <h1>Get Current Location</h1>
      <button onClick={handleGetLocation}>Get Location</button>
      <p>{locationResult}</p>
    </div>
  );
}

export default LocationComponent;
