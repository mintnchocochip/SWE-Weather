const express = require('express');
const WeatherController = require('../controllers/weatherController');

const router = express.Router();
const weatherController = new WeatherController();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Weather API is running',
    timestamp: new Date().toISOString()
  });
});

// Get current weather for a city
router.get('/weather/:city', (req, res) => {
  weatherController.getCurrentWeather(req, res);
});

// Get weather with AI recommendations
router.get('/weather/:city/recommendations', (req, res) => {
  weatherController.getWeatherWithRecommendations(req, res);
});

// Get forecast for a city
router.get('/forecast/:city', (req, res) => {
  weatherController.getForecast(req, res);
});

// Get AI recommendations for a city
router.get('/recommendations/:city', (req, res) => {
  weatherController.getRecommendations(req, res);
});

module.exports = router;
