import React from 'react';

const Favorites = ({ favorites, setFavorites }) => {
  const removeFavorite = (locationToRemove) => {
    setFavorites(favorites.filter(location => location !== locationToRemove));
  };

  const retryLoad = () => {
    console.log('Retrying to load weather data...');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="brutal-text-xl">FAVORITE LOCATIONS</h1>
        <p className="brutal-text-sm" style={{ color: '#666', marginTop: '8px' }}>
          YOUR SAVED WEATHER SPOTS
        </p>
      </div>

      {/* Favorites List */}
      {favorites.map((location, index) => (
        <div key={index} className="brutal-container">
          <div 
            style={{ 
              background: index === 0 ? '#ff69b4' : '#ff4444',
              padding: '20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: index === 0 ? 'none' : '4px solid black'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>💖</span>
                <div>
                  <div className="brutal-text-lg">{location}</div>
                  <div className="brutal-text-sm">UNKNOWN</div>
                </div>
              </div>
            </div>
            
            {index === 0 ? (
              <button
                className="brutal-button"
                style={{ background: 'black', color: 'white', padding: '8px 12px' }}
                onClick={() => removeFavorite(location)}
              >
                🗑️
              </button>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div className="brutal-text-lg" style={{ marginBottom: '8px' }}>
                  FAILED TO LOAD
                </div>
                <button
                  className="brutal-button"
                  style={{ background: 'white', color: 'black', padding: '8px 16px' }}
                  onClick={retryLoad}
                >
                  RETRY
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {favorites.length === 0 && (
        <div className="brutal-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💔</div>
            <div className="brutal-text-lg">NO FAVORITES YET</div>
            <div className="brutal-text-sm" style={{ color: '#666', marginTop: '8px' }}>
              Add locations from the home page
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
