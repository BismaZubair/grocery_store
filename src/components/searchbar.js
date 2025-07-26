import React from 'react';

function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
