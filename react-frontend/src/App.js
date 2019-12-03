import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import Stories from './components/Stories';
import SearchBar from './components/SearchBar';
import LoadingStories from './components/LoadingStories';
import GenerateKeyBtn from './components/GenerateKeyBtn';

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
          { searchQuery ? (
            <>
              <h3 className='results-msg'>
                {filteredStories.length} result(s) match the search query: "{searchQuery}"
              </h3>
              { filteredStories.length ? (
                <h3 className='api-msg'>
                  API endpoint: https://hony.herokuapp.com/api/stories?search={searchQuery}
                </h3>
              ) : null }
            </>
          ) : (
            <>
              <h3 className='results-msg'>
                {allStories.length} stories
              </h3>
              <h3 className='api-msg'>
                API endpoint: https://hony.herokuapp.com/api/stories
              </h3>
            </>
          )}
          <GenerateKeyBtn />
          <Stories 
            stories={ searchQuery ? filteredStories : allStories } 
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
