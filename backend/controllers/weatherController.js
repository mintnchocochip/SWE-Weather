const WeatherService = require('../services/weatherService');
const AIService = require('../services/aiService');

class WeatherController {
  constructor() {
    this.weatherService = new WeatherService();
    this.aiService = new AIService();
  }

  async getCurrentWeather(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({ 
          error: 'City parameter is required' 
        });
      }

      console.log(`Fetching weather for: ${city}`);
      
      let weatherData;
      try {
        weatherData = await this.weatherService.getCurrentWeather(city);
      } catch (error) {
        console.log('Using mock data due to API error:', error.message);
        weatherData = this.weatherService.getMockWeatherData(city);
      }

      res.json({
        success: true,
        data: weatherData
      });
    } catch (error) {
      console.error('Weather Controller Error:', error.message);
      res.status(500).json({ 
        error: 'Failed to fetch weather data',
        message: error.message 
      });
    }
  }

  async getWeatherWithRecommendations(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({ 
          error: 'City parameter is required' 
        });
      }

      console.log(`Fetching weather and recommendations for: ${city}`);
      
      // Get weather data
      let weatherData;
      try {
        weatherData = await this.weatherService.getCurrentWeather(city);
      } catch (error) {
        console.log('Using mock weather data due to API error:', error.message);
        weatherData = this.weatherService.getMockWeatherData(city);
      }

      // Get AI recommendations
      const recommendations = await this.aiService.generateRecommendations(weatherData);

      res.json({
        success: true,
        data: {
          weather: weatherData,
          recommendations: recommendations
        }
      });
    } catch (error) {
      console.error('Weather with Recommendations Error:', error.message);
      res.status(500).json({ 
        error: 'Failed to fetch weather data and recommendations',
        message: error.message 
      });
    }
  }

  async getForecast(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({ 
          error: 'City parameter is required' 
        });
      }

      console.log(`Fetching forecast for: ${city}`);
      
      let forecastData;
      try {
        forecastData = await this.weatherService.getForecast(city);
      } catch (error) {
        console.log('Using mock forecast data due to API error:', error.message);
        // Mock forecast data
        forecastData = [
          { time: '12 PM', temperature: 25, condition: 'Clear', icon: '☀️' },
          { time: '3 PM', temperature: 27, condition: 'Clear', icon: '☀️' },
          { time: '6 PM', temperature: 24, condition: 'Clouds', icon: '☁️' },
          { time: '9 PM', temperature: 22, condition: 'Clear', icon: '🌙' },
          { time: '12 AM', temperature: 20, condition: 'Clear', icon: '🌙' }
        ];
      }

      res.json({
        success: true,
        data: forecastData
      });
    } catch (error) {
      console.error('Forecast Controller Error:', error.message);
      res.status(500).json({ 
        error: 'Failed to fetch forecast data',
        message: error.message 
      });
    }
  }

  async getRecommendations(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({ 
          error: 'City parameter is required' 
        });
      }

      console.log(`Generating recommendations for: ${city}`);
      
      // Get weather data first
      let weatherData;
      try {
        weatherData = await this.weatherService.getCurrentWeather(city);
      } catch (error) {
        console.log('Using mock weather data for recommendations:', error.message);
        weatherData = this.weatherService.getMockWeatherData(city);
      }

      // Generate recommendations
      const recommendations = await this.aiService.generateRecommendations(weatherData);

      res.json({
        success: true,
        data: recommendations
      });
    } catch (error) {
      console.error('Recommendations Controller Error:', error.message);
      res.status(500).json({ 
        error: 'Failed to generate recommendations',
        message: error.message 
      });
    }
  }
}

module.exports = WeatherController;
