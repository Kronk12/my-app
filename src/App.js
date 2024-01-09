import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [forecast, setForecast] = useState(null);


  // gets users location in latitude and longitude
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherForecast(position.coords.latitude, position.coords.longitude);
      }, handleError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // gets the weather forecast for the users location
  const getWeatherForecast = (latitude, longitude) => {
    fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
      .then((response) => response.json())
      .then((result) => {
        const forecastUrl = result.properties.forecast;
        return fetch(forecastUrl, {
          headers: {
            'User-Agent': 'Purdue student project'
          }
        });
      })
      .then((response) => response.json())
      .then((result) => {
        setForecast(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleError = (error) => {
    console.error('Error getting user location:', error);
  };

  function displayForecast(item) {
    return (
      <div>
          <h1>{item.name}</h1>
          <img src={item.icon} alt="forecast icon"></img>
          <p>{item.temperature}</p>
          <p>{item.probabilityOfPrecipitation.value}</p>
          <p>{item.detailedForecast}</p>
      </div>
    );
  }

  if (forecast) {
    console.log(forecast);
    console.log(forecast.properties.periods[0].icon);
  }
  return (
    <div className="App">
      <header className="App-header">
        {forecast ? (
          forecast.properties.periods.map(displayForecast)
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App; 
