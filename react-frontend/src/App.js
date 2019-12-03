import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import SeedDataBtn from './components/SeedDataBtn';

const App = () => {

  const [allStories, setAllStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  // once the app mounts, this loads all stories from the fetch endpoint into state as 'stories'
  useEffect(() => {
    fetch('/api/stories?key=G4TCdX').then(res => 
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

  const loginUser = userObj => {
    setUser(userObj);
  }

  const logoutUser = () => {
    fetch('/auth/logout').then(res => {
      if (res.ok) setUser(null);
    });
  }

  return (
    <div className='App' >
      <Switch>
        <Route exact path='/' render={({ history }) => (
          <Home
            history={history}
            user={user}
            logoutUser={logoutUser}
            allStories={allStories}
            queryStories={queryStories}
            searchQuery={searchQuery}
            filteredStories={filteredStories}
          />
        )}/>
        <Route exact path='/login' render={({ history }) => (
          <Login 
            history={history}
            loginUser={loginUser}
          />
        )}/>
        <Route exact path='/signup' render={({ history }) => (
          <Signup 
            history={history}
          />
        )}/>
      </Switch>
    </div>
  );
}

export default App;
