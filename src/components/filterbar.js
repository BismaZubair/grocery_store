import React from 'react';

function FilterBar({ category, setCategory }) {
  return (
    <select value={category} onChange={e => setCategory(e.target.value)}>
      <option value="All">All Categories</option>
      <option value="Dairy">Dairy</option>
      <option value="Bakery">Bakery</option>
      <option value="Grains">Grains</option>
      <option value="Pantry">Pantry</option>
    </select>
  );
}

export default FilterBar;
