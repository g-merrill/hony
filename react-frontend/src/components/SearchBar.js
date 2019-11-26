import React, { useState } from 'react';
import './css/SearchBar.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(query);
  };

  const handleChange = evt => setQuery(evt.target.value);

  return (
    <form className='SearchBar-form' onSubmit={handleSubmit}>
      <input className='SearchBar-input' placeholder='Search HONY stories' type='text' value={query} onChange={handleChange} />
    </form>
  );
}

export default SearchBar;