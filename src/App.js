import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/productlist';
import ProductDetail from './pages/productdetails';


function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,
      [
        React.createElement(Route, { path: '/', element: React.createElement(ProductList), key: 'list' }),
        React.createElement(Route, { path: '/product/:id', element: React.createElement(ProductDetail), key: 'detail' })
      ]
    )
  );
}

export default App;
