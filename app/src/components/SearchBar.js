import React, { useState, useEffect } from 'react';
import './css/SearchBar.scss';

const SearchBar = ({ queryStories }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleChange = evt => setQuery(evt.target.value);

  useEffect(() => {
    queryStories(query);
  }, [queryStories, query]);

  return (
    <form 
      className='SearchBar-form' 
      onSubmit={handleSubmit}
    >
      <input 
        className='SearchBar-input' 
        placeholder='Search HONY stories' 
        type='text' 
        value={query} 
        onChange={handleChange} 
      />
    </form>
  );
}

export default SearchBar;