import React, { useEffect } from 'react';
import './css/HighlightedQueryStory.scss';

const HighlightedQueryStory = ({ query, content, idx }) => {

  useEffect(() => {
    if (query.length > 2) {
      let highlightedStory = content.split(query).join(`<span class="query-word">${query}</span>`);
      document.getElementById(`content-${idx}`).innerHTML = highlightedStory; 
    } else {
      document.getElementById(`content-${idx}`).innerHTML = content;
    }
  }, [query, content, idx])

  return (
    <p className='Story-content' id={`content-${idx}`}>
      {content}
    </p>
  );
}

export default HighlightedQueryStory;