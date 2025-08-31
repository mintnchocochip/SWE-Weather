import React, { useState } from 'react';

const WeatherMap = () => {
  const [activeLayer, setActiveLayer] = useState('TEMP');
  
  const layers = [
    { id: 'TEMP', label: 'TEMP', color: '#ff4444' },
    { id: 'RAIN', label: 'RAIN', color: '#4169e1' },
    { id: 'WIND', label: 'WIND', color: '#32cd32' },
    { id: 'CLOUDS', label: 'CLOUDS', color: '#666' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="brutal-text-xl">WEATHER MAP</h1>
        <p className="brutal-text-sm" style={{ color: '#666', marginTop: '4px' }}>
          LIVE WEATHER RADAR
        </p>
      </div>

      {/* Layer Selection */}
      <div className="brutal-container">
        <div style={{ padding: '12px', borderBottom: '4px solid black' }}>
          <h2 className="brutal-text-md" style={{ marginBottom: '10px', fontSize: '1rem' }}>
            🗂️ LAYERS
          </h2>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {layers.map((layer) => (
              <button
                key={layer.id}
                className="brutal-button"
                style={{
                  background: activeLayer === layer.id ? layer.color : '#ddd',
                  color: activeLayer === layer.id ? 'white' : 'black',
                  fontSize: '10px',
                  padding: '8px 12px'
                }}
                onClick={() => setActiveLayer(layer.id)}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="brutal-container">
        <div 
          style={{ 
            height: '300px', 
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '4px solid black'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗺️</div>
            <div className="brutal-text-lg">INTERACTIVE MAP</div>
            <div className="brutal-text-sm" style={{ color: '#666', marginTop: '6px' }}>
              {activeLayer} LAYER ACTIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
