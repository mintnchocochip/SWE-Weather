const axios = require('axios');

class WeatherService {
  constructor() {
    this.openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.openWeatherApiKey,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        location: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        feelsLike: Math.round(data.main.feels_like),
        wind: Math.round(data.wind.speed * 2.237), // Convert m/s to mph
        pressure: data.main.pressure,
        visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
        icon: this.getWeatherIcon(data.weather[0].main),
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      };
    } catch (error) {
      console.error('Weather API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getForecast(city) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          q: city,
          appid: this.openWeatherApiKey,
          units: 'metric'
        }
      });

      return response.data.list.slice(0, 5).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: this.getWeatherIcon(item.weather[0].main)
      }));
    } catch (error) {
      console.error('Forecast API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch forecast data');
    }
  }

  getWeatherIcon(condition) {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return iconMap[condition] || '🌤️';
  }

  // Mock weather data for development when API key is not available
  getMockWeatherData(city) {
    const mockData = {
      'Chennai': {
        location: 'Chennai',
        country: 'IN',
        temperature: 32,
        condition: 'Clear',
        description: 'clear sky',
        humidity: 65,
        feelsLike: 36,
        wind: 8,
        pressure: 1013,
        visibility: 10,
        icon: '☀️',
        coordinates: { lat: 13.0827, lon: 80.2707 }
      },
      'Mumbai': {
        location: 'Mumbai',
        country: 'IN',
        temperature: 28,
        condition: 'Clouds',
        description: 'partly cloudy',
        humidity: 78,
        feelsLike: 32,
        wind: 12,
        pressure: 1009,
        visibility: 8,
        icon: '⛅',
        coordinates: { lat: 19.0760, lon: 72.8777 }
      },
      'Delhi': {
        location: 'Delhi',
        country: 'IN',
        temperature: 35,
        condition: 'Haze',
        description: 'haze',
        humidity: 45,
        feelsLike: 40,
        wind: 5,
        pressure: 1005,
        visibility: 6,
        icon: '🌫️',
        coordinates: { lat: 28.7041, lon: 77.1025 }
      }
    };

    return mockData[city] || {
      location: city,
      country: 'Unknown',
      temperature: 25,
      condition: 'Clear',
      description: 'clear sky',
      humidity: 50,
      feelsLike: 27,
      wind: 10,
      pressure: 1013,
      visibility: 10,
      icon: '🌤️',
      coordinates: { lat: 0, lon: 0 }
    };
  }
}

module.exports = WeatherService;
