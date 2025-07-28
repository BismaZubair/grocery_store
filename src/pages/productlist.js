import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productcard'; 
import SearchBar from '../components/searchbar';
import FilterBar from '../components/filterbar';
import SortBar from '../components/sortbar';
import './ProductList.css';
import productsData from '../data/products';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(productsData);
      localStorage.setItem('products', JSON.stringify(productsData));
    }
  }, []);

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Grocery Products</h2>

      <div className="wrapper">
        <SearchBar query={query} setQuery={setQuery} />
        <FilterBar category={category} setCategory={setCategory} />
        <SortBar sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
