import React from 'react';

function SortBar({ sortOption, setSortOption }) {
  return (
     <div className="sortbar">
    <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name">Name</option>
    </select>
    </div>
  );
}

export default SortBar;
