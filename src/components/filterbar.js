import React from 'react';

function FilterBar({ category, setCategory }) {
  return React.createElement(
    'select',
    {
      value: category,
      onChange: e => setCategory(e.target.value)
    },
    [
      React.createElement('option', { value: 'All', key: 'all' }, 'All Categories'),
      React.createElement('option', { value: 'Electronics', key: 'el' }, 'Electronics'),
      React.createElement('option', { value: 'Footwear', key: 'ft' }, 'Footwear')
    ]
  );
}

export default FilterBar;
