import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.scss';
import SearchBar from '../components/SearchBar';
import InfoBar from '../components/InfoBar';
import Stories from '../components/Stories';
import LoadingStories from '../components/LoadingStories';

const Home = ({ user, logoutUser, allStories, queryStories, searchQuery, filteredStories }) => (
  <div className='Home'>
  { user ? (
    <button onClick={logoutUser}>Log Out</button>
  ) : (
    <Link to='/login'>Log In</Link>
  )}
  { allStories.length ? (
    <>
      <SearchBar
        queryStories={queryStories} 
      />
      <InfoBar
        searchQuery={searchQuery}
        filteredStoriesLength={filteredStories.length}
        allStoriesLength={allStories.length}
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