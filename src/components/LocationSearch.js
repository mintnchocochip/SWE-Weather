import React, { useState } from 'react';

const LocationSearch = ({ onLocationSelect, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Call the parent function to handle the search
      await onLocationSelect(searchQuery.trim());
      setSearchQuery('');
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="brutal-container">
      <div style={{ padding: '16px', borderBottom: '4px solid black' }}>
        <h2 className="brutal-text-md" style={{ marginBottom: '12px', fontSize: '1rem' }}>
          🔍 SEARCH LOCATION
        </h2>
        
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name..."
              className="brutal-input"
              style={{ 
                flex: 1, 
                fontSize: '12px', 
                padding: '10px',
                textTransform: 'uppercase'
              }}
              disabled={isSearching || isLoading}
            />
            <button
              type="submit"
              className="brutal-button blue"
              style={{ 
                padding: '10px 16px', 
                fontSize: '12px',
                minWidth: '80px'
              }}
              disabled={isSearching || isLoading || !searchQuery.trim()}
            >
              {isSearching ? '...' : '🔍 SEARCH'}
            </button>
          </div>
        </form>
        
        {(isSearching || isLoading) && (
          <div style={{ 
            marginTop: '12px', 
            textAlign: 'center', 
            fontSize: '12px', 
            color: '#666' 
          }}>
            {isSearching ? 'Searching location...' : 'Loading weather data...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
