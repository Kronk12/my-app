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

  console.log(forecast);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Forecast Today</h1>
        {forecast ? (
          <div>
            <p>{forecast.properties.periods[0].detailedForecast}</p>
            <p>{forecast.punchline}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
