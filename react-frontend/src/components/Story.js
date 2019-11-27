import React from 'react';
import './css/Story.scss';
import HighlightedQueryStory from './HighlightedQueryStory';
import HighlightedLocation from './HighlightedLocation';

const Story = ({ idx, story, query }) => {

  return (
    <li className='Story' id={`story-${idx}`}>
  
      {story.timestamp && 
      <p className='Story-timestamp'>
        {story.timestamp}
      </p>}
    
      {query && story.content.includes(query) ? (
        <HighlightedQueryStory 
          query={query} 
          content={story.content}
          idx={idx}
        />
      ) : (
      <p className='Story-content'>
        {story.content}
      </p>
      )}
  
      {story.location && (query && story.location.includes(query) ? (
        <HighlightedLocation 
          query={query} 
          location={story.location}
          idx={idx}
        />
      ) : (
        <p className='Story-location'>
          ({story.location})
        </p>
      ))
      }
  
      <img 
        className='Story-img'
        src={story.url} 
        alt="honypic"
      />
  
    </li>
  );
} 

export default Story;