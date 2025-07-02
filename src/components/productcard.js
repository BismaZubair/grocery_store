import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return React.createElement(
    'div',
    { className: 'card' },
    [
      React.createElement('img', {
        src: product.image,
        alt: product.name,
        key: 'img'
      }),
      React.createElement('h3', { key: 'name' }, product.name),
      React.createElement('p', { key: 'price' }, `$${product.price}`),
      React.createElement(
        Link,
        { to: `/product/${product.id}`, key: 'link' },
        React.createElement('button', null, 'View Details')
      )
    ]
  );
}

export default ProductCard;
