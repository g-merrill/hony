import React from 'react';
import './css/InfoBar.scss';
import GenerateKeyBtn from './GenerateKeyBtn';

const InfoBar = props => (
  <div className="InfoBar">
  { props.searchQuery ? (
    <>
      <h3 className='results-msg'>
        {props.filteredStoriesLength} result(s) match the search query: "{props.searchQuery}"
      </h3>
    { props.filteredStoriesLength ? (
      <h3 className='api-msg'>
        API endpoint: https://hony.herokuapp.com/api/stories?search={props.searchQuery}
      </h3>
    ) : null }
    </>
  ) : (
    <>
      <h3 className='results-msg'>
        {props.allStoriesLength} stories
      </h3>
      <h3 className='api-msg'>
        API endpoint: https://hony.herokuapp.com/api/stories
      </h3>
    </>
  )}
    <GenerateKeyBtn />
  </div>
)

export default InfoBar;