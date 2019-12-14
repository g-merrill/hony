import React, { useEffect } from 'react';
import './css/HighlightedLocation.scss';

const HighlightedLocation = ({ query, location, idx }) => {

  useEffect(() => {
    if (query.length > 2) {
      let highlightedLocation = location.split(query).join(`<span class="query-word">${query}</span>`);
      document.getElementById(`location-${idx}`).innerHTML = `(${highlightedLocation})`; 
    } else {
      document.getElementById(`location-${idx}`).innerHTML = `(${location})`;
    }
  }, [query, location, idx])

  return (
    <p className='Story-location' id={`location-${idx}`}>
      ({location})
    </p>
  );
}

export default HighlightedLocation;