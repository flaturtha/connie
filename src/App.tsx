import React, { useState } from 'react';
import axios from 'axios';
import { Star, Info } from 'lucide-react';
import ConstellationSVG from './components/ConstellationSVG';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [constellations, setConstellations] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setConstellations([]);
    setLoading(true);

    if (!/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code.');
      setLoading(false);
      return;
    }

    try {
      // Get location data from zip code
      const locationResponse = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
      const { latitude, longitude } = locationResponse.data.places[0];

      // Get current date and time
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];

      // Make API call to astronomy API (example using Astronomics API)
      const astronomyResponse = await axios.get('https://api.astronomyapi.com/api/v2/bodies/positions', {
        params: {
          latitude,
          longitude,
          elevation: 0,
          from_date: date,
          to_date: date,
          time,
        },
        headers: {
          'Authorization': 'Basic ' + btoa('YOUR_API_KEY:YOUR_API_SECRET')
        }
      });

      // Process the response to get visible constellations
      const visibleConstellations = astronomyResponse.data.data.bodies
        .filter((body: any) => body.type === 'constellation' && body.position.horizon.altitude > 0)
        .map((body: any) => body.name);

      setConstellations(visibleConstellations);
    } catch (err) {
      setError('Error fetching astronomical data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Star Constellation Viewer</h1>
      {/* ... rest of the JSX remains the same ... */}
      {constellations.length > 0 && (
        <div className="text-center mb-8 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Visible Constellations:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constellations.map((constellation, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 flex items-center">
                  <Star className="mr-2 text-yellow-300" /> {constellation}
                </div>
                <ConstellationSVG name={constellation} />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ... rest of the JSX remains the same ... */}
    </div>
  );
}

export default App;