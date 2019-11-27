import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import Stories from './components/Stories';
import SearchBar from './components/SearchBar';
import LoadingStories from './components/LoadingStories';

function App() {

  const [allStories, setAllStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // once the app mounts, this loads all stories from the fetch endpoint into state as 'stories'
  useEffect(() => {
    fetch('/api/stories').then(res => 
      res.json().then(data => {
        setAllStories(data.stories);
      })
    );
  }, []);

  // this is triggered when something is typed in the search bar, the stories are filtered based on whether they include what was typed in the search bar
  // this is all frontend filtering using JavaScript methods
  const queryStories = useCallback(query => {
    setSearchQuery(query);
    setFilteredStories(allStories.filter(story => {
      return (
        (story.location && 
          story.location.toLowerCase().includes(query.toLowerCase())) ||
        story.storylength.toLowerCase().includes(query.toLowerCase()) ||
        story.content.toLowerCase().includes(query.toLowerCase()) ||
        story.timestamp.toLowerCase().includes(query.toLowerCase())
      );
    }));
  }, [allStories]);

  return (
    <div className='App' >
      {allStories.length ? (
        <>
          <SearchBar 
            queryStories={queryStories} 
          />
          <Stories 
            stories={ (filteredStories.length || searchQuery) ?
              filteredStories : allStories } 
            query={searchQuery}
          />
        </>
      ) : (
        <LoadingStories />
      )}
    </div>
  );
}

export default App;
