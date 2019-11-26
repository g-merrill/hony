import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import Stories from './components/Stories';
import SearchBar from './components/SearchBar';

function App() {

  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // once the app mounts, this loads all stories from the fetch endpoint into state as 'stories'
  useEffect(() => {
    fetch('/api/stories').then(res => 
      res.json().then(data => {
        setStories(data.stories);
      })
    );
  }, []);

  // this is triggered when something is typed in the search bar, the stories are filtered based on whether they include what was typed in the search bar
  // this is all frontend filtering
  const queryStories = useCallback(
    (query) => {
      setSearchQuery(query);
      setFilteredStories(stories.filter(story => {
        return (
          (story.location && 
            story.location.toLowerCase().includes(query.toLowerCase())) ||
          story.storylength.toLowerCase().includes(query.toLowerCase()) ||
          story.content.toLowerCase().includes(query.toLowerCase()) ||
          story.timestamp.toLowerCase().includes(query.toLowerCase())
        );
      }));
    }, [stories]);

  return (
    <div className='App' >
      <SearchBar 
        queryStories={queryStories} 
      />
      <Stories 
        stories={ (filteredStories.length || searchQuery) ? filteredStories : stories } 
        query={ filteredStories.length ? searchQuery : null }
      />
    </div>
  );
}

export default App;
