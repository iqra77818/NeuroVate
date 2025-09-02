import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useSocket from '../hooks/useSocket';

// Fix default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function SOS({ token }) {
  const socketRef = useSocket(token);
  const [status, setStatus] = useState('Hold to send SOS');
  const [location, setLocation] = useState(null);

  const sendSOS = async () => {
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej)
      );
      const loc = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLocation(loc); // Update location state to show marker on map
      socketRef.current?.emit('sosAlert', {
        patientId: 'demo-patient',
        location: loc,
        time: new Date(),
      });
      setStatus('✅ SOS sent with location');
    } catch (e) {
      socketRef.current?.emit('sosAlert', {
        patientId: 'demo-patient',
        location: null,
        time: new Date(),
      });
      setStatus('⚠️ SOS sent (no location available)');
    }
  };

  // Default center for map (fallback)
  const defaultCenter = [20, 78]; // India approx center for example

  return (
    <>
      {/* Full-page background overlay */}
      <div className="absolute inset-0 bg-sky-200 -z-10" />

      {/* Container for heading + content */}
      <div className="relative w-full min-h-screen flex flex-col px-4 py-10 max-w-full mx-auto">

        {/* Heading at top */}
        <p className="text-2xl sm:text-3xl font-bold font-noto  text-center text-sky-900 mb-8 max-w-6xl mx-auto leading-relaxed px-4">
          In case of confusion, danger, or emergency, 
          press the red SOS button. Your caregiver will be notified immediately with your live location.
        </p>

        {/* Split screen content: map left 50%, right side 50% */}
        <div className="flex flex-row h-[calc(100vh-160px)] max-w-full px-4 gap-8">

          {/* Left side: Map - 50% width */}
          <div className="w-1/2 rounded-lg overflow-hidden h-[600px] shadow-lg border-4 border-sky-700">
            <MapContainer
              center={location ? [location.lat, location.lon] : defaultCenter}
              zoom={location ? 15 : 5}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {location && (
                <Marker position={[location.lat, location.lon]}>
                  <Popup>Your current location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          {/* Right side: SOS + Caregiver cards - 50% width */}
          <div className="w-1/2 flex flex-col items-center justify-center space-y-10 px-6">

            {/* SOS Button */}
            <button
              onClick={sendSOS}
              className="w-64 h-64 rounded-full bg-red-600 text-white text-6xl font-bold shadow-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
            >
              SOS
            </button>

            {/* Status text */}
            <div className="text-lg text-gray-700 text-center">{status}</div>

            {/* Caregiver cards */}
            <div className="w-full max-w-md space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Sarah Johnson</h3>
                <p className="text-gray-700"><strong>Phone:</strong> +1 234 567 890</p>
                <p className="text-gray-700"><strong>Email:</strong> sarah.johnson@example.com</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-1 text-gray-800">James Smith</h3>
                <p className="text-gray-700"><strong>Phone:</strong> +1 987 654 321</p>
                <p className="text-gray-700"><strong>Email:</strong> james.smith@example.com</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
