import './App.css';
import IconLoop from './assets/IconLoop';
import { ListIcon } from './assets/data_icon.js';
import React, { useState } from 'react';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const API_key = "023fc4012cfb2d5c583a877e349d2fd3"; 

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}&units=metric`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const weatherData = await response.json();
      
      
      const formattedData = {
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        temperature: `${weatherData.main.temp}°C`,
        condition: weatherData.weather[0].main, 
      };

      setData(formattedData); 
      setLocation(''); 
    } catch (error) {
      alert(error.message); 
      setData(null); 
    }
  };
  const getIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <img src={ListIcon[0].img} alt="Clear weather icon" className='snow'/>;
      case 'Clouds':
        return <img src={ListIcon[3].img} alt="Cloudy weather icon" className='snow' />;
      case 'Rain':
        return <img src={ListIcon[1].img} alt="Rainy weather icon" className='snow'/>;
      case 'Snow':
        return <img src={ListIcon[2].img} alt="Snowy weather icon" className='snow' />;
      case 'Haze':
        return <img src={ListIcon[4].img} alt="Snowy weather icon" className='snow' />;
      case 'Smoke':
        return <img src={ListIcon[5].img} alt="Snowy weather icon" className='snow' />;
      case 'Mist':
        return <img src={ListIcon[6].img} alt="Snowy weather icon" className='snow' />;
      case 'Drizzle':
        return <img src={ListIcon[7].img} alt="Snowy weather icon" className='snow' />;
      default:
        return null; 
    }
  };

  return (
    <div className="wholeapp">
      <div className="app">
        <form onSubmit={handleSubmit}> 
          <input 
            type='text' 
            placeholder='ENTER YOUR LOCATION: ' 
            value={location} 
            onChange={handleInputChange} 
          />
          <span>
            <IconLoop />
          </span>
        </form>
      </div>
      {data && (
        <div className="conclusion">
          <h2>{data.location}</h2>
          <p>{data.temperature}</p>
          {getIcon(data.condition)}
          <p> {data.condition}</p> 
        </div>
      )}
    </div>
  );
}

export default App;
