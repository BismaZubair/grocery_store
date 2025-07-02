import React, { useState } from 'react';
import productsData from '../data/products';
import ProductCard from '../components/productcard';
import SearchBar from '../components/searchbar';
import FilterBar from '../components/filterbar';
import SortBar from '../components/sortbar';

function ProductList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');

  const filtered = productsData
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

 
  const cards = filtered.map(product =>
    React.createElement(ProductCard, { product, key: product.id })
  );


  return React.createElement(
    'div',
    null,
    [
      React.createElement('h2', { key: 'head' }, ' Grocery Products'),
      React.createElement(SearchBar, { query, setQuery, key: 'search' }),
      React.createElement(FilterBar, { category, setCategory, key: 'filter' }),
      React.createElement(SortBar, { sortOption, setSortOption, key: 'sort' }),
      React.createElement('div', { className: 'grid', key: 'grid' }, cards)
    ]
  );
}

export default ProductList;
