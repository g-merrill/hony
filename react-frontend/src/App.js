import React, { useEffect, useState } from 'react';
import './App.css';
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
    <div 
      style={{ marginTop: 40 }}
    >
      <Stories 
        stories={ stories }
      />
    </div>
  );
}

export default App;
