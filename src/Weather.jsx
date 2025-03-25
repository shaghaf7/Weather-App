import React, { useState } from 'react';
import './Weather.css';
import { FaSearch } from 'react-icons/fa';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async () => {
    if (query) {
      try {
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        const result = await response.json();
        setWeather(result);
        setQuery('');
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const getBackgroundClass = () => {
    if (weather.main) {
      const temp = weather.main.temp;
      return temp < 10 ? 'cold' : temp <= 25 ? 'moderate' : 'hot';
    }
    return 'default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <header className='app-header'>
        <h1 className='app-title'>WeatherNest</h1>
        <p className='app-description'>Stay updated with real-time weather forecasts from around the world. Simply enter your city and get instant weather details.</p>
      </header>
      
      <main className='weather-container'>
        <div className='content-container'>
          <div className='search-container'>
            <input 
              type='text'
              className='search-bar'
              placeholder='Enter city...'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className='search-button wide-button' onClick={search}>
              <FaSearch />
            </button>
          </div>

          {weather.main && (
            <div className='weather-info'>
              <h2 className='location'>{weather.name}, {weather.sys?.country}</h2>
              <div className='weather-details'>
                <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
                <p className='weather-condition'>{weather.weather[0].main}</p>
                <p className='humidity'>Humidity: {weather.main.humidity}%</p>
                <p className='wind'>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Weather;
