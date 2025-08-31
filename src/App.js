import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WeatherMap from './pages/WeatherMap';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [currentLocation, setCurrentLocation] = useState('Chennai');
  const [favorites, setFavorites] = useState(['Chennai']);

  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                currentLocation={currentLocation}
                setCurrentLocation={setCurrentLocation}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            } 
          />
          <Route path="/map" element={<WeatherMap />} />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                favorites={favorites}
                setFavorites={setFavorites}
              />
            } 
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <BottomNavigation />
    </Router>
  );
}

export default App;
