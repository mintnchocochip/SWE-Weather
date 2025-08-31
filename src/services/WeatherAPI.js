// Weather API service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class WeatherAPI {
  // Search for weather data by location
  static async searchWeather(location) {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API error:', error);
      // Fallback to mock data for development
      return this.getMockWeatherData(location);
    }
  }

  // Get AI recommendations from backend
  static async getAIRecommendations(weatherData, location) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          weather: weatherData,
          location: location
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI API error:', error);
      // Fallback to mock recommendations
      return this.getMockRecommendations(weatherData);
    }
  }

  // Mock weather data for development/fallback
  static getMockWeatherData(location) {
    const mockData = {
      'Chennai': { 
        location: 'Chennai', 
        condition: 'Clear', 
        temperature: 22, 
        humidity: 50, 
        feelsLike: 24, 
        wind: 5, 
        icon: '☀️',
        country: 'India',
        coordinates: { lat: 13.0827, lon: 80.2707 }
      },
      'Mumbai': { 
        location: 'Mumbai', 
        condition: 'Partly Cloudy', 
        temperature: 28, 
        humidity: 70, 
        feelsLike: 32, 
        wind: 8, 
        icon: '⛅',
        country: 'India',
        coordinates: { lat: 19.0760, lon: 72.8777 }
      },
      'Delhi': { 
        location: 'Delhi', 
        condition: 'Hazy', 
        temperature: 35, 
        humidity: 40, 
        feelsLike: 40, 
        wind: 3, 
        icon: '🌫️',
        country: 'India',
        coordinates: { lat: 28.7041, lon: 77.1025 }
      },
      'New York': {
        location: 'New York',
        condition: 'Cloudy',
        temperature: 18,
        humidity: 65,
        feelsLike: 20,
        wind: 12,
        icon: '☁️',
        country: 'USA',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      'London': {
        location: 'London',
        condition: 'Rainy',
        temperature: 15,
        humidity: 80,
        feelsLike: 13,
        wind: 15,
        icon: '🌧️',
        country: 'UK',
        coordinates: { lat: 51.5074, lon: -0.1278 }
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const weather = mockData[location] || {
          location: location,
          condition: 'Unknown',
          temperature: 20,
          humidity: 60,
          feelsLike: 22,
          wind: 7,
          icon: '❓',
          country: 'Unknown',
          coordinates: { lat: 0, lon: 0 }
        };
        resolve({ success: true, data: weather });
      }, 1000); // Simulate API delay
    });
  }

  // Mock AI recommendations
  static getMockRecommendations(weatherData) {
    const temp = weatherData.temperature;
    const condition = weatherData.condition.toLowerCase();
    
    let foodRecs, clothingRecs;
    
    // Generate food recommendations based on temperature and weather
    if (temp < 15) {
      foodRecs = ['Hot Soup', 'Masala Chai', 'Hot Chocolate', 'Biryani'];
    } else if (temp < 25) {
      foodRecs = ['Fresh Juice', 'Salad', 'Fruit Bowl', 'Iced Tea'];
    } else {
      foodRecs = ['Ice Cream', 'Cold Drinks', 'Watermelon', 'Coconut Water'];
    }
    
    // Generate clothing recommendations
    if (temp < 15) {
      clothingRecs = ['Heavy Jacket', 'Sweater', 'Long Pants', 'Boots'];
    } else if (temp < 25) {
      clothingRecs = ['Light Jacket', 'T-Shirt', 'Jeans', 'Sneakers'];
    } else {
      clothingRecs = ['Shorts', 'Tank Top', 'Sandals', 'Hat'];
    }
    
    // Add weather-specific recommendations
    if (condition.includes('rain')) {
      clothingRecs.push('Umbrella', 'Raincoat');
      foodRecs = ['Hot Coffee', 'Pakoras', 'Hot Tea', 'Soup'];
    }
    if (condition.includes('sun') || condition.includes('clear')) {
      clothingRecs.push('Sunglasses', 'Sunscreen');
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            food: foodRecs.slice(0, 3),
            clothing: clothingRecs.slice(0, 4),
            generatedAt: new Date().toISOString()
          }
        });
      }, 2000); // Simulate AI processing time
    });
  }
}

export default WeatherAPI;
