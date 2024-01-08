import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => response.json())
      .then((result) => {
        setJoke(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Joke of the Day</h1>
        {joke ? (
          <div>
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
