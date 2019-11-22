import React from 'react';
import './css/Stories.scss';

export const Stories = ({ stories }) => (
  <ul className='Stories' >
    {stories.map((story, idx) => (
      idx < 100 ? (
        <li key={idx} className='story'>
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
      ) : null
    ))}
  </ul>
)