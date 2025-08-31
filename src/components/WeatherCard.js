import React from 'react';

const WeatherCard = ({ weatherData, isLoading, onSave, onRefresh }) => {
  if (isLoading) {
    return (
      <div className="brutal-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          background: '#ffd700',
          color: 'black'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <div className="brutal-text-lg">LOADING WEATHER...</div>
          <div className="brutal-text-sm" style={{ marginTop: '8px' }}>
            Fetching latest data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brutal-container">
      {/* Location Header */}
      <div style={{ textAlign: 'center', padding: '16px', borderBottom: '4px solid black' }}>
        <h1 className="brutal-text-xl" style={{ marginBottom: '4px' }}>
          {weatherData.location}
        </h1>
        <p className="brutal-text-sm" style={{ color: '#666', textTransform: 'uppercase' }}>
          Unknown
        </p>
      </div>

      {/* Weather Icon */}
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div className="weather-icon" style={{ fontSize: '3rem', marginBottom: '16px' }}>
          {weatherData.icon}
        </div>
        
        {/* Temperature */}
        <div className="temp-display" style={{ marginBottom: '8px' }}>
          {weatherData.temperature}°C
        </div>
        
        <div className="brutal-text-lg" style={{ marginBottom: '16px' }}>
          {weatherData.condition}
        </div>

        {/* Feels Like and Humidity */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          <div 
            className="brutal-button blue"
            style={{ 
              flex: 1, 
              padding: '12px', 
              textAlign: 'center',
              cursor: 'default'
            }}
          >
            <div style={{ fontSize: '10px', marginBottom: '2px' }}>FEELS LIKE</div>
            <div style={{ fontSize: '16px' }}>{weatherData.feelsLike}°C</div>
          </div>
          <div 
            className="brutal-button green"
            style={{ 
              flex: 1, 
              padding: '12px', 
              textAlign: 'center',
              cursor: 'default'
            }}
          >
            <div style={{ fontSize: '10px', marginBottom: '2px' }}>HUMIDITY</div>
            <div style={{ fontSize: '16px' }}>{weatherData.humidity}%</div>
          </div>
        </div>

        {/* Wind and Temp Info */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          <div 
            style={{ 
              flex: 1, 
              border: '4px solid black',
              padding: '12px',
              textAlign: 'center',
              background: 'white'
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '2px' }}>💨</div>
            <div className="brutal-text-sm">WIND</div>
            <div className="brutal-text-md">{weatherData.wind} mph</div>
          </div>
          <div 
            style={{ 
              flex: 1, 
              border: '4px solid black',
              padding: '12px',
              textAlign: 'center',
              background: 'white'
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '2px' }}>🌡️</div>
            <div className="brutal-text-sm">TEMP</div>
            <div className="brutal-text-md">{weatherData.temperature}°C</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className="brutal-button"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
            onClick={onSave}
          >
            💖 SAVE
          </button>
          <button 
            className="brutal-button green"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
          >
            📤 SHARE
          </button>
          <button 
            className="brutal-button blue"
            style={{ flex: 1, padding: '10px', fontSize: '12px' }}
            onClick={onRefresh}
          >
            🔄 REFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
