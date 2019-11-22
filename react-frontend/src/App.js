import React, { useEffect, useState } from 'react';
import './App.scss';
import { Stories } from './components/Stories';

function App() {

  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('/api/stories').then(res => 
      res.json().then(data => {
        setStories(data.stories)
      })
    );
  }, []);

  return (
    <div className='App' >
      <Stories stories={ stories } />
    </div>
  );
}

export default App;
