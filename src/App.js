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
