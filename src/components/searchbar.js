import React from 'react';

function SearchBar({ query, setQuery }) {
  return (
     <div className="searchbar">
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
    </div>
  );
}

export default SearchBar;
