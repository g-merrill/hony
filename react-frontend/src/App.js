import React, { useEffect, useState } from 'react';
import './App.scss';
import { Stories } from './components/Stories';
import SearchBar from './components/SearchBar';

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
      <SearchBar />
      <Stories stories={ stories } />
    </div>
  );
}

export default App;
