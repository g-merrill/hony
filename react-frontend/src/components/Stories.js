import React from 'react';
import './css/Stories.scss';

export const Stories = ({ stories }) => {
  return (
    <ul
      className='Stories'
    >
      {stories.map((story, idx) => {
        return (
          <li 
            key={idx}
            className='story'
          >
            {story.timestamp && <p>{story.timestamp}</p>}
            <p>
              {story.sequence && <span>{story.sequence}</span>}
              {story.content}
            </p>
            {story.location && <p>({story.location})</p>}
            <img 
              className='story-img'
              src={story.url} 
              alt="honypic"
            />
          </li>
        );
      })}
    </ul>
  );
}