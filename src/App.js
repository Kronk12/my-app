import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [forecast, setForecast] = useState(null);


  useEffect(() => {
    fetch('https://api.weather.gov/gridpoints/IND/30,97/forecast', {
      headers: new Headers({
        'User-Agent' : 'Purdue student project'
      })
    })
      .then((response) => response.json())
      .then((result) => {
        setForecast(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (forecast) {
    console.log(forecast);
    console.log(forecast.properties.periods[0].icon);
  }
  return (
    <div className="App">
      <header className="App-header">
        {forecast ? (
          <div>
            <h1>{forecast.properties.periods[0].name}</h1>
            <img src={forecast.properties.periods[0].icon} alt="forecast icon"></img>
            <p>{forecast.properties.periods[0].temperature}</p>
            <p>{forecast.properties.periods[0].probabilityOfPrecipitation.value}</p>
            <p>{forecast.properties.periods[0].detailedForecast}</p>
            <h1>{forecast.properties.periods[1].name}</h1>
            <img src={forecast.properties.periods[1].icon} alt="forecast icon"></img>
            <p>{forecast.properties.periods[1].temperature}</p>
            <p>{forecast.properties.periods[1].probabilityOfPrecipitation.value}</p>
            <p>{forecast.properties.periods[1].detailedForecast}</p>
          </div>
          
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
