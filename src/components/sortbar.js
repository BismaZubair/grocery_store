import React from 'react';

function SortBar({ sortOption, setSortOption }) {
  return React.createElement(
    'select',
    {
      value: sortOption,
      onChange: e => setSortOption(e.target.value)
    },
    [
      React.createElement('option', { value: '', key: 'default' }, 'Sort by'),
      React.createElement('option', { value: 'price-asc', key: 'asc' }, 'Price: Low to High'),
      React.createElement('option', { value: 'price-desc', key: 'desc' }, 'Price: High to Low'),
      React.createElement('option', { value: 'name', key: 'name' }, 'Name')
    ]
  );
}

export default SortBar;
