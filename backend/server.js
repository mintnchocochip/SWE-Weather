const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI integration (placeholder for now)
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI (you'll need to get an API key)
const genAI = process.env.GEMINI_API_KEY ? 
  new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Weather API endpoint (using OpenWeatherMap as example)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo_key';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper function to get weather icon emoji
const getWeatherIcon = (condition, temp) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
  if (conditionLower.includes('cloud')) return '☁️';
  if (conditionLower.includes('partly')) return '⛅';
  if (conditionLower.includes('rain')) return '🌧️';
  if (conditionLower.includes('snow')) return '❄️';
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
  if (conditionLower.includes('thunder')) return '⛈️';
  return '🌤️';
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Brutal Weather API is running!' });
});

// Search weather by location
app.post('/api/weather/search', async (req, res) => {
  try {
    const { location } = req.body;
    
    if (!location) {
      return res.status(400).json({ 
        success: false, 
        error: 'Location is required' 
      });
    }

    // Try to fetch from real weather API if available
    if (WEATHER_API_KEY !== 'demo_key') {
      try {
        const weatherResponse = await axios.get(
          `${WEATHER_BASE_URL}/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        const data = weatherResponse.data;
        const weatherData = {
          location: data.name,
          country: data.sys.country,
          condition: data.weather[0].main,
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          feelsLike: Math.round(data.main.feels_like),
          wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          icon: getWeatherIcon(data.weather[0].main, data.main.temp),
          coordinates: {
            lat: data.coord.lat,
            lon: data.coord.lon
          }
        };
        
        return res.json({ success: true, data: weatherData });
      } catch (apiError) {
        console.log('Weather API failed, using mock data:', apiError.message);
      }
    }

    // Fallback to mock data
    const mockData = {
      'chennai': { 
        location: 'Chennai', 
        country: 'IN',
        condition: 'Clear', 
        temperature: 32, 
        humidity: 60, 
        feelsLike: 36, 
        wind: 15, 
        icon: '☀️',
        coordinates: { lat: 13.0827, lon: 80.2707 }
      },
      'mumbai': { 
        location: 'Mumbai', 
        country: 'IN',
        condition: 'Partly Cloudy', 
        temperature: 28, 
        humidity: 75, 
        feelsLike: 32, 
        wind: 18, 
        icon: '⛅',
        coordinates: { lat: 19.0760, lon: 72.8777 }
      },
      'delhi': { 
        location: 'Delhi',
        country: 'IN', 
        condition: 'Hazy', 
        temperature: 38, 
        humidity: 45, 
        feelsLike: 42, 
        wind: 8, 
        icon: '🌫️',
        coordinates: { lat: 28.7041, lon: 77.1025 }
      },
      'new york': {
        location: 'New York',
        country: 'US',
        condition: 'Cloudy',
        temperature: 22,
        humidity: 65,
        feelsLike: 25,
        wind: 12,
        icon: '☁️',
        coordinates: { lat: 40.7128, lon: -74.0060 }
      },
      'london': {
        location: 'London',
        country: 'GB',
        condition: 'Rainy',
        temperature: 18,
        humidity: 80,
        feelsLike: 16,
        wind: 20,
        icon: '🌧️',
        coordinates: { lat: 51.5074, lon: -0.1278 }
      },
      'tokyo': {
        location: 'Tokyo',
        country: 'JP',
        condition: 'Partly Cloudy',
        temperature: 26,
        humidity: 70,
        feelsLike: 29,
        wind: 10,
        icon: '⛅',
        coordinates: { lat: 35.6762, lon: 139.6503 }
      }
    };

    const locationKey = location.toLowerCase().trim();
    const weatherData = mockData[locationKey] || {
      location: location,
      country: 'Unknown',
      condition: 'Unknown',
      temperature: 25,
      humidity: 50,
      feelsLike: 27,
      wind: 10,
      icon: '❓',
      coordinates: { lat: 0, lon: 0 }
    };

    // Add some random variation to make it feel more realistic
    weatherData.temperature += Math.floor(Math.random() * 6) - 3;
    weatherData.feelsLike = weatherData.temperature + Math.floor(Math.random() * 6) - 1;
    weatherData.humidity += Math.floor(Math.random() * 20) - 10;
    weatherData.wind += Math.floor(Math.random() * 10) - 5;

    // Ensure values are within reasonable ranges
    weatherData.humidity = Math.max(20, Math.min(95, weatherData.humidity));
    weatherData.wind = Math.max(0, weatherData.wind);

    res.json({ success: true, data: weatherData });

  } catch (error) {
    console.error('Weather search error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch weather data' 
    });
  }
});

// Get AI recommendations
app.post('/api/ai/recommendations', async (req, res) => {
  try {
    const { weather, location } = req.body;
    
    if (!weather || !location) {
      return res.status(400).json({ 
        success: false, 
        error: 'Weather data and location are required' 
      });
    }

    let recommendations;

    // Try to use Gemini AI if available
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Based on the current weather in ${location}:
        - Temperature: ${weather.temperature}°C
        - Condition: ${weather.condition}
        - Humidity: ${weather.humidity}%
        - Feels like: ${weather.feelsLike}°C
        - Wind: ${weather.wind} km/h

        Please provide 3-4 local food recommendations and 3-4 clothing recommendations that would be perfect for this weather. Consider local cuisine and cultural preferences for ${location}.

        Format your response as JSON with this structure:
        {
          "food": ["item1", "item2", "item3"],
          "clothing": ["item1", "item2", "item3", "item4"]
        }

        Keep recommendations short and practical.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Try to parse the JSON response
        try {
          recommendations = JSON.parse(text);
        } catch (parseError) {
          console.log('Failed to parse Gemini response, using fallback');
          recommendations = getFallbackRecommendations(weather, location);
        }
      } catch (aiError) {
        console.log('Gemini AI failed, using fallback:', aiError.message);
        recommendations = getFallbackRecommendations(weather, location);
      }
    } else {
      recommendations = getFallbackRecommendations(weather, location);
    }

    res.json({ 
      success: true, 
      data: {
        ...recommendations,
        generatedAt: new Date().toISOString(),
        location: location,
        temperature: weather.temperature
      }
    });

  } catch (error) {
    console.error('AI recommendations error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate recommendations' 
    });
  }
});

// Fallback recommendation function
function getFallbackRecommendations(weather, location) {
  const temp = weather.temperature;
  const condition = weather.condition.toLowerCase();
  const locationLower = location.toLowerCase();
  
  let foodRecs, clothingRecs;
  
  // Location-specific food recommendations
  if (locationLower.includes('india') || locationLower.includes('chennai') || 
      locationLower.includes('mumbai') || locationLower.includes('delhi')) {
    if (temp < 20) {
      foodRecs = ['Hot Masala Chai', 'Samosas', 'Hot Biryani', 'Garam Soup'];
    } else if (temp < 30) {
      foodRecs = ['Mango Lassi', 'Fresh Fruit Chat', 'Coconut Water', 'Curd Rice'];
    } else {
      foodRecs = ['Kulfi Ice Cream', 'Nimbu Paani', 'Watermelon Juice', 'Buttermilk'];
    }
  } else if (locationLower.includes('japan') || locationLower.includes('tokyo')) {
    if (temp < 20) {
      foodRecs = ['Hot Ramen', 'Green Tea', 'Takoyaki', 'Hot Sake'];
    } else {
      foodRecs = ['Cold Soba', 'Iced Tea', 'Kakigori', 'Cold Udon'];
    }
  } else {
    // Generic recommendations
    if (temp < 15) {
      foodRecs = ['Hot Soup', 'Hot Coffee', 'Warm Stew', 'Hot Chocolate'];
    } else if (temp < 25) {
      foodRecs = ['Fresh Salad', 'Iced Tea', 'Light Sandwich', 'Fruit Bowl'];
    } else {
      foodRecs = ['Ice Cream', 'Cold Drinks', 'Fresh Fruit', 'Smoothies'];
    }
  }
  
  // Weather and temperature-based clothing
  if (temp < 10) {
    clothingRecs = ['Heavy Coat', 'Wool Sweater', 'Thermal Wear', 'Winter Boots'];
  } else if (temp < 20) {
    clothingRecs = ['Light Jacket', 'Long Sleeves', 'Jeans', 'Closed Shoes'];
  } else if (temp < 30) {
    clothingRecs = ['T-Shirt', 'Light Pants', 'Sneakers', 'Light Scarf'];
  } else {
    clothingRecs = ['Shorts', 'Tank Top', 'Sandals', 'Sun Hat'];
  }
  
  // Add weather-specific items
  if (condition.includes('rain')) {
    clothingRecs.push('Umbrella');
    clothingRecs = clothingRecs.slice(0, 3).concat(['Umbrella']);
  }
  if (condition.includes('sun') || condition.includes('clear')) {
    clothingRecs.push('Sunglasses');
    clothingRecs = clothingRecs.slice(0, 3).concat(['Sunglasses']);
  }
  
  return {
    food: foodRecs.slice(0, 3),
    clothing: clothingRecs.slice(0, 4)
  };
}

// Start server
app.listen(PORT, () => {
  console.log(`🌟 Brutal Weather API running on port ${PORT}`);
  console.log(`🤖 Gemini AI: ${genAI ? 'Enabled' : 'Disabled (set GEMINI_API_KEY)'}`);
  console.log(`🌤️ Weather API: ${WEATHER_API_KEY !== 'demo_key' ? 'Enabled' : 'Mock Mode'}`);
});
