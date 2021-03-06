import React from 'react';
import './css/Stories.scss';
import Story from './Story';

const Stories = ({ stories, query }) => {

  return (
    <ul className='Stories' >
      { stories.length ? (
        stories.map((story, idx) => (
          <Story 
            key={idx}
            idx={idx}
            story={story}
            query={query}
          />
      ))
      ) : null }
    </ul>
  );
}

export default Stories;