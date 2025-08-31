import React from 'react';

const FavoritesSection = ({ favorites, currentLocation, setCurrentLocation }) => {
  return (
    <div className="brutal-container">
      <div style={{ padding: '12px', borderBottom: '4px solid black' }}>
        <h2 className="brutal-text-md" style={{ marginBottom: '10px', fontSize: '1rem' }}>
          💖 FAVORITES
        </h2>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {favorites.map((location, index) => (
            <button
              key={index}
              className={`brutal-button ${currentLocation === location ? '' : 'green'}`}
              style={{ 
                fontSize: '10px',
                padding: '6px 12px',
                background: currentLocation === location ? '#32cd32' : '#4169e1'
              }}
              onClick={() => setCurrentLocation(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesSection;
