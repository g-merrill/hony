import React from 'react';
import './css/Stories.scss';

const Stories = ({ stories, query }) => {

  return (
    <ul className='Stories' >
      {stories.map((story, idx) => (
        idx < 100 ? (
          <li 
            key={idx} 
            className='story'
          >

            {story.timestamp && 
            <p 
              className='story-timestamp'
            >
              {story.timestamp}
            </p>}

            <p 
              className='story-content'
            >
              {story.content}
            </p>

            {story.location && 
            <p
              className='story-location'
            >
              ({story.location})
            </p>}

            <img 
              className='story-img'
              src={story.url} 
              alt="honypic"
            />

          </li>
        ) : null
      ))}
    </ul>
  );
}

export default Stories;