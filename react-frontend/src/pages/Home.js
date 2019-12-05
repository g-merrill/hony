import React from 'react';
import './css/Home.scss';
import SearchBar from '../components/SearchBar';
import InfoBar from '../components/InfoBar';
import Stories from '../components/Stories';
import LoadingStories from '../components/LoadingStories';

const Home = ({ user, logoutUser, allStories, queryStories, searchQuery, filteredStories, updateUserWithKey }) => (
  <div className='Home'>
  { allStories.length ? (
    <>
      <SearchBar
        queryStories={queryStories} 
      />
      <InfoBar
        user={user}
        logoutUser={logoutUser}
        searchQuery={searchQuery}
        filteredStoriesLength={filteredStories.length}
        allStoriesLength={allStories.length}
        updateUserWithKey={updateUserWithKey}
      />
      <Stories
        stories={ searchQuery ? filteredStories : allStories } 
        query={searchQuery}
      />
    </>
  ) : (
    <LoadingStories />
  )}
  </div>
)

export default Home;