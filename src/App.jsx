import React, { useState } from 'react';

const API_KEY = "38b18ad36cbb412086f211113251305";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setWeather(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">🌤️ Weather App</h1>

        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4 focus:outline-none"
        />

        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {loading && <p className="mt-4 text-gray-600">Loading...</p>}

        {weather && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">{weather.location.name}, {weather.location.country}</h2>
            <p className="capitalize text-gray-700">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="mx-auto my-2"
            />
            <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-sm text-gray-500">Feels like {weather.current.feelslike_c}°C</p>
            <p className="text-sm mt-2">Humidity: {weather.current.humidity}% | Wind: {weather.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );
}
