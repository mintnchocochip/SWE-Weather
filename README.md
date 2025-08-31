# Brutal Weather App 🌧️⚡

A neo-brutalist styled weather application with AI-powered recommendations for food and clothing based on current weather conditions.

## Features

- 📱 Mobile-optimized with 9:16 aspect ratio (phone-like)
- 🔍 Location search with real-time weather data
- 🤖 AI-powered recommendations using Gemini AI
- 💖 Favorite locations management
- 🗺️ Weather map interface
- ⚙️ Customizable settings
- 🎨 Neo-brutalist design with bold colors and thick borders

## Tech Stack

### Frontend
- React 18
- React Router DOM
- CSS-in-JS styling
- Responsive design

### Backend
- Node.js with Express
- Google Gemini AI integration
- OpenWeatherMap API
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brutal-weather
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Setup Environment Variables**
   
   **Backend (.env in /backend directory):**
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   WEATHER_API_KEY=your_openweathermap_api_key_here
   NODE_ENV=development
   ```

   **Frontend (.env in root directory):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Getting API Keys

1. **Gemini AI API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your backend `.env` file

2. **OpenWeatherMap API Key**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up and get a free API key
   - Add it to your backend `.env` file

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   # or
   npm start
   ```
   Backend will run on http://localhost:5000

2. **Start the Frontend (in a new terminal)**
   ```bash
   # From the root directory
   npm start
   ```
   Frontend will run on http://localhost:3000 (or next available port)

## Features Overview

### Home Screen
- **Location Search**: Type any city name to get weather data
- **Weather Card**: Shows current temperature, condition, humidity, feels-like temp, and wind
- **AI Recommendations**: Smart suggestions for food and clothing based on weather and location
- **Favorites**: Quick access to saved locations

### Weather Map
- Interactive map with weather layers
- Toggle between temperature, rain, wind, and cloud layers

### Favorites
- Save and manage favorite locations
- Quick weather overview for saved places

### Settings
- Temperature unit preference (°C/°F)
- Alert configurations
- Default city setting

## API Endpoints

### Weather Search
```
POST /api/weather/search
Body: { "location": "city_name" }
```

### AI Recommendations
```
POST /api/ai/recommendations
Body: { 
  "weather": {...weather_data}, 
  "location": "city_name" 
}
```

## Development Mode

The app works in development mode even without API keys:
- Uses mock weather data for common cities
- Generates fallback AI recommendations
- Full functionality for testing and development

## Design Philosophy

This app follows a **Neo-Brutalism** design approach:
- Bold, high-contrast colors
- Thick black borders (3-4px)
- Harsh drop shadows
- Intentionally "raw" and "undesigned" aesthetic
- Strong typography with uppercase text
- No gradients or subtle effects

## Mobile Optimization

- 9:16 aspect ratio container for desktop
- Responsive design that adapts to mobile screens
- Touch-friendly button sizes
- Optimized for one-handed use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Troubleshooting

### Backend Issues
- Make sure Node.js is installed
- Check if port 5000 is available
- Verify environment variables are set correctly

### Frontend Issues
- Ensure the backend is running before starting frontend
- Check console for API connection errors
- Verify REACT_APP_API_URL in .env file

### API Issues
- App works with mock data if APIs are unavailable
- Check API key validity
- Monitor API rate limits

## Support

For issues and questions, please create an issue in the repository.
