import React, { useState } from 'react';

const WeatherSearch = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleQuickSearch = (city) => {
    setSearchQuery(city);
    onSearch(city);
  };

  const popularCities = ['Chennai', 'Mumbai', 'Delhi', 'New York', 'London', 'Tokyo'];

  return (
    <div className="brutal-container">
      <div style={{ padding: '16px' }}>
        <h2 className="brutal-text-md" style={{ marginBottom: '12px', fontSize: '1rem' }}>
          🔍 SEARCH WEATHER
        </h2>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name..."
              className="brutal-input"
              style={{ 
                flex: 1, 
                fontSize: '14px',
                padding: '10px'
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="brutal-button blue"
              style={{ 
                padding: '10px 16px',
                fontSize: '12px'
              }}
              disabled={isLoading || !searchQuery.trim()}
            >
              {isLoading ? '⏳' : '🔍'} {isLoading ? 'SEARCHING...' : 'SEARCH'}
            </button>
          </div>
        </form>

        <div>
          <h3 className="brutal-text-sm" style={{ marginBottom: '8px', fontSize: '0.8rem' }}>
            QUICK SEARCH:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => handleQuickSearch(city)}
                className="brutal-button"
                style={{
                  fontSize: '10px',
                  padding: '6px 10px',
                  background: searchQuery === city ? '#32cd32' : '#ff69b4'
                }}
                disabled={isLoading}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
