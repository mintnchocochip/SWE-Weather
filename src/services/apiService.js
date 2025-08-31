const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      console.log(`Making API request to: ${url}`);
      
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error.message);
      throw error;
    }
  }

  async searchWeather(location) {
    return this.makeRequest('/weather/search', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });
  }

  async getRecommendations(weatherData, location) {
    return this.makeRequest('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify({ 
        weather: weatherData, 
        location: location 
      }),
    });
  }

  async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default new ApiService();
