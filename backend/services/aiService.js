const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.genAI = this.geminiApiKey ? new GoogleGenerativeAI(this.geminiApiKey) : null;
  }

  async generateRecommendations(weatherData) {
    if (!this.genAI) {
      console.log('Using mock AI recommendations - no API key provided');
      return this.getMockRecommendations(weatherData);
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = this.createRecommendationPrompt(weatherData);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAIResponse(text);
    } catch (error) {
      console.error('Gemini AI Error:', error.message);
      return this.getMockRecommendations(weatherData);
    }
  }

  createRecommendationPrompt(weatherData) {
    return `Based on the current weather conditions, provide recommendations for food and clothing.

Weather Information:
- Location: ${weatherData.location}, ${weatherData.country}
- Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)
- Condition: ${weatherData.condition} - ${weatherData.description}
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.wind} mph

Please provide:
1. 3-4 food recommendations suitable for this weather
2. 3-4 clothing recommendations suitable for this weather

Format your response as JSON:
{
  "food": ["item1", "item2", "item3"],
  "clothing": ["item1", "item2", "item3"],
  "reasoning": "Brief explanation of why these recommendations suit the current weather"
}

Consider local cuisine if possible, and practical weather-appropriate suggestions.`;
  }

  parseAIResponse(text) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      console.error('Failed to parse AI response:', error.message);
      // Fallback to parsing text manually
      return this.parseTextResponse(text);
    }
  }

  parseTextResponse(text) {
    const lines = text.split('\n');
    const food = [];
    const clothing = [];
    let currentSection = null;

    for (const line of lines) {
      const cleanLine = line.trim();
      if (cleanLine.toLowerCase().includes('food')) {
        currentSection = 'food';
      } else if (cleanLine.toLowerCase().includes('clothing') || cleanLine.toLowerCase().includes('wear')) {
        currentSection = 'clothing';
      } else if (cleanLine.startsWith('-') || cleanLine.match(/^\d+\./)) {
        const item = cleanLine.replace(/^[-\d.\s]+/, '').trim();
        if (item && currentSection === 'food' && food.length < 4) {
          food.push(item);
        } else if (item && currentSection === 'clothing' && clothing.length < 4) {
          clothing.push(item);
        }
      }
    }

    return {
      food: food.length > 0 ? food : ['Local cuisine', 'Seasonal fruits', 'Refreshing drinks'],
      clothing: clothing.length > 0 ? clothing : ['Comfortable wear', 'Weather-appropriate layers'],
      reasoning: 'Recommendations based on current weather conditions'
    };
  }

  getMockRecommendations(weatherData) {
    const temp = weatherData.temperature;
    const condition = weatherData.condition.toLowerCase();
    
    let food, clothing;
    
    // Temperature-based recommendations
    if (temp < 15) {
      food = ['Hot soup', 'Masala chai', 'Spiced curry', 'Hot chocolate'];
      clothing = ['Heavy jacket', 'Sweater', 'Long pants', 'Boots'];
    } else if (temp < 25) {
      food = ['Fresh salad', 'Fruit juice', 'Light snacks', 'Herbal tea'];
      clothing = ['Light jacket', 'T-shirt', 'Jeans', 'Sneakers'];
    } else {
      food = ['Ice cream', 'Cold drinks', 'Fresh fruits', 'Coconut water'];
      clothing = ['Shorts', 'Tank top', 'Sandals', 'Sun hat'];
    }
    
    // Weather condition adjustments
    if (condition.includes('rain')) {
      clothing.push('Umbrella');
      clothing.push('Raincoat');
      food = food.map(item => item.includes('cold') ? 'Hot beverage' : item);
    }
    
    if (condition.includes('sun') || condition.includes('clear')) {
      clothing.push('Sunglasses');
      clothing.push('Sunscreen');
    }
    
    // Location-specific adjustments
    if (weatherData.location.toLowerCase().includes('chen')) {
      food = ['Filter coffee', 'Dosa', 'Sambar', 'Coconut water'];
    } else if (weatherData.location.toLowerCase().includes('mum')) {
      food = ['Vada pav', 'Cutting chai', 'Bhel puri', 'Fresh lime soda'];
    } else if (weatherData.location.toLowerCase().includes('del')) {
      food = ['Chole bhature', 'Lassi', 'Paranthas', 'Kulfi'];
    }
    
    return {
      food: food.slice(0, 4),
      clothing: clothing.slice(0, 4),
      reasoning: `Perfect recommendations for ${temp}°C ${condition} weather in ${weatherData.location}`
    };
  }
}

module.exports = AIService;
