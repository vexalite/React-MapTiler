import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locationResult, setLocationResult] = useState('');
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = 'mIFRCaflon3Q8FfaoQdb';

  useEffect(() => {
    if (map.current) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(locationResult); // Corrected placement
          
          // Create the map and marker after getting the location
          map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [longitude, latitude], // Center the map at the user's location
            zoom: zoom
          });

          new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([longitude, latitude]) // Set marker at user's location
            .addTo(map.current);
        },
        
        (error) => {
          console.error('Error getting location:', error);
          setLocationResult('Unable to retrieve location.');
        }
      );
    } else {
      setLocationResult('Geolocation is not available in this browser.');
    }
  }, [locationResult, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div>{locationResult}</div>
    </div>
  );
}
