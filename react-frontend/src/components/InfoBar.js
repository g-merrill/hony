import React from 'react';
import { Link } from 'react-router-dom';
import './css/InfoBar.scss';
import GenerateKeyBtn from './GenerateKeyBtn';

const InfoBar = ({ user, logoutUser, searchQuery, filteredStoriesLength, allStoriesLength, updateUserWithKey }) => (
  <div className="InfoBar">
  { searchQuery ? (
    <>
      <h3 className='results-msg'>
        {filteredStoriesLength} result(s) match the search query: "{searchQuery}"
      </h3>
    { filteredStoriesLength ? (
      <>
        <h3 className='api-msg'>
          API endpoint: 
        </h3>
      { user ? (
        <>
        { user.key ? (
          <h3 className='api-string'><a href={`https://hony.herokuapp.com/api/stories?search=${searchQuery}&key=${user.key}`} target='_blank' rel='noopener noreferrer'>
            https://hony.herokuapp.com/api/stories?search={searchQuery}&key={user.key}
            </a></h3>
        ) : (
          <h3 className='api-string'>
            https://hony.herokuapp.com/api/stories?search={searchQuery}
          </h3>
        )}
          <GenerateKeyBtn updateUserWithKey={updateUserWithKey} user={user} logoutUser={logoutUser} />
        </>
      ) : (
        <>
          <h3 className='api-string'>
            https://hony.herokuapp.com/api/stories?search={searchQuery}
          </h3>
          <p className='login-for-key'>Please <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link> to generate an API access key.</p>
        </>
      )}
      </>
    ) : null }
    </>
  ) : (
    <>
      <h3 className='results-msg'>
        {allStoriesLength} stories
      </h3>
      <h3 className='api-msg'>
        API endpoint: 
      </h3>
    { user ? (
      <>
      { user.key ? (
        <h3 className='api-string'><a href={`https://hony.herokuapp.com/api/stories?key=${user.key}`} target='_blank' rel='noopener noreferrer'>
          https://hony.herokuapp.com/api/stories?key={user.key}
        </a></h3>
      ) : (
        <h3 className='api-string'>
          https://hony.herokuapp.com/api/stories
        </h3>
      )}
        <GenerateKeyBtn updateUserWithKey={updateUserWithKey} user={user} logoutUser={logoutUser} />
      </>
    ) : (
      <>
        <h3 className='api-string'>
          https://hony.herokuapp.com/api/stories
        </h3>
        <p className='login-for-key'>Please <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link> to generate an API access key.</p>
      </>
    )}
    </>
  )}
  </div>
)

export default InfoBar;