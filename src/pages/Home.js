import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import AIRecommendations from '../components/AIRecommendations';
import FavoritesSection from '../components/FavoritesSection';
import LocationSearch from '../components/LocationSearch';
import WeatherAPI from '../services/WeatherAPI';

const Home = ({ currentLocation, setCurrentLocation, favorites, setFavorites }) => {
  const [weatherData, setWeatherData] = useState({
    location: 'Chennai',
    condition: 'Clear',
    temperature: 22,
    humidity: 50,
    feelsLike: 24,
    wind: 5,
    icon: '☀️'
  });

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);

  // Handle location search
  const handleLocationSearch = async (location) => {
    setIsLoadingWeather(true);
    setError(null);
    
    try {
      const response = await WeatherAPI.searchWeather(location);
      
      if (response.success) {
        setWeatherData(response.data);
        setCurrentLocation(response.data.location);
        setRecommendations(null); // Reset recommendations for new location
      } else {
        setError(`Failed to get weather data for ${location}`);
      }
    } catch (error) {
      setError(`Error searching for ${location}: ${error.message}`);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Generate AI recommendations
  const generateAIRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    
    try {
      const response = await WeatherAPI.getAIRecommendations(weatherData, weatherData.location);
      
      if (response.success) {
        setRecommendations(response.data);
      } else {
        setError('Failed to generate AI recommendations');
      }
    } catch (error) {
      setError(`Error generating recommendations: ${error.message}`);
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };

  // Load weather data when current location changes
  useEffect(() => {
    if (currentLocation !== weatherData.location) {
      handleLocationSearch(currentLocation);
    }
  }, [currentLocation]);

  // Auto-generate recommendations when weather data changes
  useEffect(() => {
    if (weatherData.location && !isLoadingWeather) {
      generateAIRecommendations();
    }
  }, [weatherData.location, weatherData.temperature]);

  return (
    <div>
      {/* Location Search */}
      <LocationSearch 
        onLocationSelect={handleLocationSearch}
        isLoading={isLoadingWeather}
      />

      {/* Error Display */}
      {error && (
        <div className="brutal-container">
          <div style={{ 
            background: '#ff4444', 
            color: 'white', 
            padding: '12px', 
            textAlign: 'center' 
          }}>
            <div className="brutal-text-sm">⚠️ {error}</div>
            <button 
              className="brutal-button"
              style={{ 
                marginTop: '8px', 
                padding: '6px 12px', 
                fontSize: '10px',
                background: 'white',
                color: 'black'
              }}
              onClick={() => setError(null)}
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
      
      {/* Favorites Section */}
      <FavoritesSection 
        favorites={favorites}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      
      {/* Weather Card */}
      <WeatherCard 
        weatherData={weatherData}
        isLoading={isLoadingWeather}
        onSave={() => {
          if (!favorites.includes(weatherData.location)) {
            setFavorites([...favorites, weatherData.location]);
          }
        }}
        onRefresh={() => handleLocationSearch(weatherData.location)}
      />
      
      {/* AI Recommendations */}
      <AIRecommendations 
        weatherData={weatherData}
        recommendations={recommendations}
        isGenerating={isGeneratingRecommendations}
        onGenerate={generateAIRecommendations}
      />
    </div>
  );
};

export default Home;
