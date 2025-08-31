import React from 'react';

const AIRecommendations = ({ weatherData, recommendations, isGenerating, onGenerate }) => {
  return (
    <div className="brutal-container">
      <div 
        style={{ 
          background: isGenerating ? '#ffd700' : (recommendations ? '#32cd32' : '#4169e1'),
          padding: '16px',
          textAlign: 'center',
          border: 'none',
          borderBottom: recommendations && !isGenerating ? '4px solid black' : 'none',
          cursor: 'pointer'
        }}
        onClick={onGenerate}
      >
        <div className="brutal-text-lg" style={{ color: 'black', fontSize: '1rem' }}>
          {isGenerating ? 'GENERATING AI RECOMMENDATIONS...' : 
           recommendations ? '🤖 AI RECOMMENDATIONS' : '🤖 GET AI RECOMMENDATIONS'}
        </div>
        {isGenerating && (
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            Analyzing weather for {weatherData.location}...
          </div>
        )}
      </div>
      
      {recommendations && !isGenerating && (
        <div style={{ padding: '16px' }}>
          {/* Food Recommendations */}
          <div style={{ marginBottom: '20px' }}>
            <h3 className="brutal-text-md" style={{ marginBottom: '10px', color: '#ff69b4', fontSize: '1rem' }}>
              🍽️ FOOD RECOMMENDATIONS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {recommendations.food.map((food, index) => (
                <div
                  key={index}
                  style={{
                    background: '#ff69b4',
                    color: 'white',
                    padding: '6px 10px',
                    border: '3px solid black',
                    fontSize: '12px',
                    fontWeight: '900',
                    textTransform: 'uppercase'
                  }}
                >
                  {food}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '10px', marginTop: '6px', color: '#666' }}>
              Perfect for {weatherData.temperature}°C weather in {weatherData.location}
            </p>
          </div>

          {/* Clothing Recommendations */}
          <div>
            <h3 className="brutal-text-md" style={{ marginBottom: '10px', color: '#4169e1', fontSize: '1rem' }}>
              👕 CLOTHING RECOMMENDATIONS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {recommendations.clothing.map((clothing, index) => (
                <div
                  key={index}
                  style={{
                    background: '#4169e1',
                    color: 'white',
                    padding: '6px 10px',
                    border: '3px solid black',
                    fontSize: '12px',
                    fontWeight: '900',
                    textTransform: 'uppercase'
                  }}
                >
                  {clothing}
                </div>
              ))}
            </div>
            <p style={{ fontSize: '10px', marginTop: '6px', color: '#666' }}>
              Stay comfortable in {weatherData.condition.toLowerCase()} conditions
            </p>
          </div>

          <button 
            className="brutal-button yellow"
            style={{ width: '100%', marginTop: '16px', color: 'black', padding: '12px', fontSize: '12px' }}
            onClick={onGenerate}
          >
            🔄 GENERATE NEW RECOMMENDATIONS
          </button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
