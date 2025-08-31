import React, { useState } from 'react';

const Settings = () => {
  const [tempUnit, setTempUnit] = useState('C');
  const [alerts, setAlerts] = useState({
    severe: true,
    daily: true,
    sound: true
  });
  const [defaultCity, setDefaultCity] = useState('Chennai');

  const toggleAlert = (type) => {
    setAlerts(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveSettings = () => {
    console.log('Settings saved:', { tempUnit, alerts, defaultCity });
    alert('SETTINGS SAVED!');
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="brutal-text-xl">OPTIONS</h1>
        <p className="brutal-text-sm" style={{ color: '#666', marginTop: '8px' }}>
          CONFIGURE YOUR WEATHER APP
        </p>
      </div>

      {/* Temperature Unit */}
      <div className="brutal-container">
        <div style={{ padding: '20px', borderBottom: '4px solid black' }}>
          <h3 className="brutal-text-md" style={{ marginBottom: '16px' }}>
            🌡️ TEMPERATURE
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="brutal-button"
              style={{
                flex: 1,
                background: tempUnit === 'F' ? '#ddd' : '#4169e1',
                color: tempUnit === 'F' ? 'black' : 'white'
              }}
              onClick={() => setTempUnit('F')}
            >
              °F
            </button>
            <button
              className="brutal-button"
              style={{
                flex: 1,
                background: tempUnit === 'C' ? '#4169e1' : '#ddd',
                color: tempUnit === 'C' ? 'white' : 'black'
              }}
              onClick={() => setTempUnit('C')}
            >
              °C
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="brutal-container">
        <div style={{ padding: '20px', borderBottom: '4px solid black' }}>
          <h3 className="brutal-text-md" style={{ marginBottom: '16px' }}>
            🔔 ALERTS
          </h3>
          
          {[
            { key: 'severe', label: 'SEVERE WEATHER' },
            { key: 'daily', label: 'DAILY UPDATE' },
            { key: 'sound', label: 'SOUND' }
          ].map((alert) => (
            <div
              key={alert.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                border: '3px solid black',
                marginBottom: '8px',
                background: 'white'
              }}
            >
              <span className="brutal-text-sm">{alert.label}</span>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid black',
                  background: alerts[alert.key] ? '#4169e1' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '900'
                }}
                onClick={() => toggleAlert(alert.key)}
              >
                {alerts[alert.key] ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Default City */}
      <div className="brutal-container">
        <div style={{ padding: '20px', borderBottom: '4px solid black' }}>
          <h3 className="brutal-text-md" style={{ marginBottom: '16px' }}>
            📍 DEFAULT CITY
          </h3>
          <input
            type="text"
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
            className="brutal-input"
            style={{ width: '100%' }}
            placeholder="Enter city name"
          />
        </div>
      </div>

      {/* Source Code */}
      <div className="brutal-container">
        <div style={{ padding: '20px', borderBottom: '4px solid black' }}>
          <h3 className="brutal-text-md" style={{ marginBottom: '8px' }}>
            💻 SOURCE CODE
          </h3>
          <p className="brutal-text-sm" style={{ color: '#666', marginBottom: '16px' }}>
            FREE & OPEN SOURCE PROJECT
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="brutal-button blue" style={{ width: '100%' }}>
              👁️ VIEW FILES
            </button>
            <button className="brutal-button green" style={{ width: '100%' }}>
              ⬇️ DOWNLOAD INFO
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="brutal-container">
        <button
          className="brutal-button"
          style={{ width: '100%', padding: '20px', fontSize: '18px' }}
          onClick={saveSettings}
        >
          💾 SAVE OPTIONS
        </button>
      </div>
    </div>
  );
};

export default Settings;
