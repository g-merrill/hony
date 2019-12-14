import React, { useEffect } from 'react';
import './css/HighlightedTimestamp.scss';

const HighlightedTimestamp = ({ query, timestamp, idx }) => {

  useEffect(() => {
    if (query.length > 2) {
      let highlightedTimestamp = timestamp.split(query).join(`<span class="query-word">${query}</span>`);
      document.getElementById(`timestamp-${idx}`).innerHTML = highlightedTimestamp; 
    } else {
      document.getElementById(`timestamp-${idx}`).innerHTML = timestamp;
    }
  }, [query, timestamp, idx])

  return (
    <p className='Story-timestamp' id={`timestamp-${idx}`}>
      {timestamp}
    </p>
  );
}

export default HighlightedTimestamp;